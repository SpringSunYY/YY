<template>
  <div class="chart-container">
    <div :class="className" :style="{ height, width }" ref="chartRef"/>
    <div class="back" @click="handleReset" v-show="selectedName">重置</div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import dongguanGeoJson from './dongguan.json';

export default {
  name: 'DongGuanMapCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    chartName: {type: String, default: '东莞市业务分布'},
    chartData: {
      type: Array,
      default: () => [
        {
          name: "用户人数",
          value: [
            {location: "南城街道", value: 1200},
            {location: "长安镇", value: 2500},
            {location: "松山湖", value: 1800},
            {location: "虎门镇", value: 2100},
            {location: "东城街道", value: 1600},
            {location: "厚街镇", value: 1400},
            {location: "寮步镇", value: 1100}
          ]
        },
        {
          name: "用户登录数",
          value: [
            {location: "南城街道", value: 800},
            {location: "长安镇", value: 1500},
            {location: "松山湖", value: 1000}
          ]
        },
      ]
    },
    //不需要计算总数的
    notCalculateTotal: {
      type: Array,
      default: () => []
    },
    defaultIndexName: {
      type: String,
      default: "用户人数"
    },
  },
  data() {
    return {
      chart: null,
      selectedName: '',
      resizeTimer: null,
    };
  },
  computed: {
    defaultDataItem() {
      if (!this.chartData || !Array.isArray(this.chartData) || this.chartData.length === 0) {
        return null;
      }
      const index = this.chartData.findIndex(item => item.name === this.defaultIndexName);
      return this.chartData[index >= 0 ? index : 0] || null;
    },
    dataSummary() {
      const summary = {};
      if (!this.chartData || !Array.isArray(this.chartData)) {
        return summary;
      }
      this.chartData.forEach(dataItem => {
        if (dataItem && dataItem.name
          && Array.isArray(dataItem.value)
          && !this.notCalculateTotal.find(item => item === dataItem.name)) {
          summary[dataItem.name] = dataItem.value.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
        }
      });
      return summary;
    }
  },
  watch: {
    chartData: {
      handler() {
        this.renderMap();
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose();
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleReset() {
      this.selectedName = '';

      // 首先取消所有选中状态
      if (this.chart) {
        try {
          this.chart.clear(); // 清除之前的状态
        } catch (e) {
          console.warn('Clear chart state failed:', e);
        }
      }
      // 重新渲染图表
      this.renderMap();
      // 重新绑定事件监听器（因为 clear 后可能会丢失）
      this.chart.off('click');
      this.chart.on('click', (params) => {
        if (params.data) {
          this.selectedName = params.name;
          this.$emit('mapClick', this.selectedName);

          if (params.seriesType === 'bar') {
            this.chart.dispatchAction({
              type: 'select',
              seriesIndex: 0,
              name: params.name
            });
          }
        }
      });

      this.$emit('mapClick', '');
    },

    getDataValuesByLocation(locationName) {
      const result = {};
      this.chartData.forEach(dataItem => {
        const locationData = dataItem.value.find(item => {
          const itemLocation = item.location;
          if (itemLocation === locationName) return true;
          if (itemLocation.includes(locationName) || locationName.includes(itemLocation)) return true;
          const normalize = (str) => str.replace(/(镇|街道|管委会)$/, '').replace(/\s/g, '');
          if (normalize(itemLocation) === normalize(locationName)) return true;
          return false;
        });
        result[dataItem.name] = locationData ? (Number(locationData.value) || 0) : 0;
      });
      return result;
    },

    getMapData() {
      const features = dongguanGeoJson.features || [];
      // 根据 name 去重，保留第一个出现的
      const seen = new Set();
      const uniqueFeatures = features.filter(feature => {
        const name = feature.properties?.name;
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      });

      const tmp = uniqueFeatures.map(feature => {
        const {name, adcode, center} = feature.properties || {};
        const dataValues = this.getDataValuesByLocation(name);
        const mainValue = (this.defaultDataItem && dataValues[this.defaultDataItem.name]) || 0;

        return {
          name,
          cityCode: adcode,
          center,
          value: mainValue,
          ...dataValues
        };
      }).sort((a, b) => a.value - b.value);

      return {
        mapData: tmp,
        pointData: tmp.map(item => ({
          name: item.name,
          value: [item.center?.[0] || 113.75, item.center?.[1] || 23.04, item.value],
          ...item
        }))
      };
    },

    renderMap() {
      if (!this.chart || !this.chartData || !this.defaultDataItem) return;

      const {mapData, pointData} = this.getMapData();
      const values = mapData.map(d => d.value);
      const max = values.length ? Math.max(...values) : 1000;
      const yCategories = mapData.map(d => d.name);

      // 计算默认指标的排名
      const sortedByDefault = [...mapData].sort((a, b) => b.value - a.value);
      const rankMap = {};
      sortedByDefault.forEach((item, index) => {
        rankMap[item.name] = index + 1;
      });

      const option = {
        title: {
          left: 'center',
          top: 10,
          text: this.chartName,
          textStyle: {color: 'rgb(179, 239, 255)', fontSize: 36}
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            if (!params?.data) return '';
            const d = params.data;
            const rank = rankMap[d.name] || '-';
            let content = `<div style="text-align:left"><b>${d.name}</b> (第${rank}名)<br/>`;
            this.chartData.forEach(item => {
              content += `${item.name}：${d[item.name] || 0} <br/>`;
            });
            return content + `</div>`;
          },
          backgroundColor: 'rgba(60, 60, 60, 0.7)',
          textStyle: {color: '#fff'}
        },
        graphic: this.generateGraphicElements(),
        grid: {
          right: '10%',
          top: '15%',
          bottom: '30%',
          width: '16%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {textStyle: {color: '#c0e6f9', fontSize: 10}},
          data: yCategories
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            right: '2%',
            start: 50,
            end: 100,
            width: 15,
            borderColor: 'rgba(0,0,0,0)',
            fillerColor: 'rgba(17, 170, 254, 0.3)',
            handleSize: '80%',
            textStyle: {color: '#fff', fontSize: 10}
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            zoomOnMouseWheel: true,
            moveOnMouseMove: true
          }
        ],
        visualMap: {
          min: 0,
          max: max,
          left: '3%',
          bottom: '5%',
          calculable: true,
          inRange: {color: ['rgba(123,232,255,0.4)', '#2E98CA', '#0059ff']},
          textStyle: {color: '#24CFF4'},
          controller: {inRange: {symbolSize: [30, 100]}}
        },
        series: [
          {
            name: '地图',
            type: 'map',
            map: 'dongguan',
            data: mapData,
            selectedMode: 'single',
            roam: true,
            layoutCenter: ['40%', '50%'],
            layoutSize: '85%',
            label: {
              show: true,
              color: 'rgb(249, 249, 249)',
              fontSize: 10
            },
            itemStyle: {
              normal: {
                areaColor: '#24CFF4',
                borderColor: '#53D9FF',
                borderWidth: 1.3,
                shadowBlur: 15,
                shadowColor: 'rgb(58,115,192)',
                shadowOffsetY: 6
              },
              emphasis: {areaColor: '#8dd7fc'}
            },
            select: {
              itemStyle: {areaColor: '#f75a00'},
              label: {show: true, color: '#fff'}
            }
          },
          {
            name: '散点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {brushType: 'fill'},
            itemStyle: {color: '#F4E925', opacity: 0.8},
            symbolSize: (val) => 5 + (val[2] / max) * 10,
            data: pointData
          },
          {
            name: '排行柱状图',
            type: 'bar',
            data: mapData,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {offset: 0, color: 'rgba(17, 170, 254, 0)'},
                  {offset: 1, color: 'rgba(17, 170, 254, 1)'}
                ]),
                barBorderRadius: 4
              }
            },
            label: {
              show: true,
              position: 'right',
              color: '#fff',
              fontSize: 10
            }
          }
        ]
      };

      this.chart.setOption(option);
    },

    generateGraphicElements() {
      if (!this.chartData || !Array.isArray(this.chartData) || this.chartData.length === 0) {
        return [];
      }
      const summaryEntries = Object.entries(this.dataSummary);
      const lineHeight = 22;
      const padding = 12;
      const totalHeight = summaryEntries.length * lineHeight + padding * 2;
      const textContent = summaryEntries.map(([name, total]) => `总${name}：${total}`).join('\n');

      return [{
        type: 'group',
        right: 20,
        bottom: 30,
        children: [
          {
            type: 'rect',
            shape: {width: 180, height: totalHeight, r: 4},
            style: {fill: 'rgba(0,40,80,0.6)', stroke: '#00cfff', lineWidth: 1}
          },
          {
            type: 'text',
            style: {
              text: textContent,
              x: padding, y: padding,
              fill: '#00f6ff', font: 'bold 13px Microsoft YaHei', lineHeight: lineHeight
            }
          }
        ]
      }];
    },

    initChart() {
      this.chart = echarts.init(this.$refs.chartRef);
      echarts.registerMap('dongguan', dongguanGeoJson);
      this.renderMap();

      this.chart.on('click', (params) => {
        if (params.data) {
          this.selectedName = params.name;
          this.$emit('mapClick', this.selectedName);

          // 核心逻辑：点击柱形图时，通过 dispatchAction 让地图同步高亮/选中
          if (params.seriesType === 'bar') {
            this.chart.dispatchAction({
              type: 'select',
              seriesIndex: 0,
              name: params.name
            });
          }
        }
      });
    },

    handleResize() {
      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.chart && this.chart.resize();
      }, 300);
    }
  }
};
</script>

<style scoped>
/* 样式完全保留，未做任何修改 */
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.back {
  position: absolute;
  left: 25px;
  top: 25px;
  color: rgb(179, 239, 255);
  font-size: 16px;
  cursor: pointer;
  z-index: 100;
  border: 1px solid #53D9FF;
  padding: 5px 15px;
  border-radius: 4px;
  background-color: rgba(36, 207, 244, 0.2);
  backdrop-filter: blur(4px);
  transition: all 0.3s;
}

.back:hover {
  background-color: rgba(36, 207, 244, 0.5);
  box-shadow: 0 0 10px rgba(83, 217, 255, 0.5);
}
</style>
