<template>
  <div class="chart-container">
    <div :class="className" :style="{ height, width }" ref="chartRef"/>
    <div class="back" @click="goBack" v-show="showBack">返回</div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {getGeoJson} from '@/api/file.js';
import {hexToRgba} from "@/utils/ruoyi";

export default {
  name: 'MapCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    initCountry: {type: String, default: 'china'},
    initName: {type: String, default: '中华人民共和国'},
    chartName: {type: String, default: '用户分布'},
    chartData: {
      type: Array,
      default: () => [
        {name: "用户人数", value: [{location: "广东省", value: 1000}]},
        {name: "用户登录数", value: [{location: "广东省", value: 1000}]},
      ]
    },
    defaultIndexName: {
      type: String,
      default: "用户人数"
    },
    summaryIndexNames: {
      type: Array,
      default: () => []
    },
    returnLevel: {
      type: Array,
      default: () => ['province', 'china']
    },
    maxLevel: {
      type: Number,
      default: 2
    },
    colorMain: {
      type: String,
      default: 'rgb(36,207,244)'
    },
  },
  data() {
    return {
      chart: null,
      chartTitle: this.chartName,
      geoJsonFeatures: [],
      showBack: false,
      parentInfo: [],
      isChartReady: false,
      resizeTimer: null,
      isRendering: false,
      _isDestroyed: false,
    };
  },
  computed: {
    defaultDataIndex() {
      const index = this.chartData.findIndex(item => item.name === this.defaultIndexName);
      return index >= 0 ? index : 0;
    },
    defaultDataItem() {
      if (!this.chartData || !Array.isArray(this.chartData)) return {name: '', value: []};
      return this.chartData[this.defaultDataIndex] || this.chartData[0] || {name: '', value: []};
    },
    dataSummary() {
      const summary = {};
      if (!this.chartData || !Array.isArray(this.chartData)) return summary;
      this.chartData.forEach(dataItem => {
        if (!dataItem || !Array.isArray(dataItem.value)) return;
        summary[dataItem.name] = dataItem.value.reduce((sum, item) => Number(sum) + (Number(item.value) || 0), 0);
      });
      return summary;
    },
    visibleSummary() {
      if (!this.summaryIndexNames || this.summaryIndexNames.length === 0) return this.dataSummary;
      const result = {};
      this.summaryIndexNames.forEach(name => {
        if (name in this.dataSummary) result[name] = this.dataSummary[name];
      });
      return result;
    }
  },
  watch: {
    initName(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initializeParentInfo();
        this.loadMapData();
      }
    },
    chartData: {
      handler() {
        if (this.chart && this.isChartReady) {
          this.renderMap();
        }
      },
      deep: true
    },
    defaultIndexName() {
      if (this.chart && this.isChartReady) {
        this.renderMap();
      }
    },
    summaryIndexNames: {
      handler() {
        if (this.chart && this.isChartReady) {
          this.renderMap();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(async () => {
      await this.initChart();
      this.bindResizeEvent();
    });
  },
  beforeDestroy() {
    this._isDestroyed = true;

    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = null;
    }

    if (this.chart) {
      try {
        if (!this.chart.isDisposed()) {
          this.chart.dispose();
        }
      } catch (error) {
        console.warn('图表销毁时出错:', error);
      }
      this.chart = null;
    }

    window.removeEventListener('resize', this.handleResize);
    this.isChartReady = false;
    this.isRendering = false;
  },
  methods: {
    formateLevel(currentLevel) {
      switch (currentLevel) {
        case this.initCountry:
          return 'province';
        case 'province':
          return 'city';
        case 'city':
          return 'county';
        case 1:
          return 'province';
        case 2:
          return 'city';
        case 3:
          return 'county';
        default:
          console.warn('未知层级:', currentLevel);
          return '';
      }
    },
    formateLevelLabel(level) {
      const labelMap = {
        'china': '国家级',
        'province': '省级',
        'city': '市级',
        'county': '县级',
      };
      return labelMap[level] || level;
    },
    initializeParentInfo() {
      if (this.initName === '中华人民共和国') {
        this.parentInfo = [{name: '中华人民共和国', level: 'china'}];
      } else {
        this.parentInfo = [{name: this.initName, level: 'province'}];
      }
    },
    getDataValuesByLocation(locationName) {
      const result = {};
      if (!this.chartData || !Array.isArray(this.chartData)) return result;

      this.chartData.forEach(dataItem => {
        if (!dataItem || !Array.isArray(dataItem.value)) {
          result[dataItem?.name || ''] = 0;
          return;
        }
        const locationData = dataItem.value.find(item =>
          item.location === locationName ||
          (item.location && locationName && (item.location.includes(locationName) || locationName.includes(item.location)))
        );
        result[dataItem.name] = locationData ? locationData.value : 0;
      });

      return result;
    },
    getMapData() {
      if (this.geoJsonFeatures.length === 0) {
        return {mapData: [], pointData: []};
      }

      const tmp = this.geoJsonFeatures.map(feature => {
        const {name, fullname, adcode, level, center} = feature.properties || {};
        const dataValues = this.getDataValuesByLocation(fullname || name);
        const mainValue = dataValues[this.defaultDataItem.name] || 0;

        return {
          name,
          fullname,
          cityCode: adcode,
          level,
          center,
          value: mainValue,
          ...dataValues
        };
      }).sort((a, b) => a.value - b.value);

      const mapData = tmp.map(item => ({
        name: item.name,
        value: item.value,
        level: item.level,
        cityCode: item.cityCode,
        fullname: item.fullname,
        ...Object.keys(this.dataSummary).reduce((acc, key) => {
          acc[key] = item[key] || 0;
          return acc;
        }, {})
      }));

      const pointData = tmp.map(item => ({
        name: item.name,
        value: [
          item.center?.[0] || (116 + Math.random()),
          item.center?.[1] || (30 + Math.random()),
          item.value
        ],
        cityCode: item.cityCode,
        fullname: item.fullname,
        ...Object.keys(this.dataSummary).reduce((acc, key) => {
          acc[key] = item[key] || 0;
          return acc;
        }, {})
      }));

      return {mapData, pointData};
    },
    generateTooltipFormatter() {
      return (params) => {
        if (!params?.data) return '';
        const d = params.data;

        const escapeHtml = (str) => {
          if (!str) return '';
          return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        };

        const locationName = escapeHtml(d.fullname || d.name);
        let content = `<div style="text-align:left">
          ${locationName}<br/>`;

        this.chartData.forEach(dataItem => {
          const value = d[dataItem.name] || 0;
          content += `${escapeHtml(dataItem.name)}：${value} <br/>`;
        });

        content += `<hr style="border:0;border-top:1px solid #666;margin:4px 0"/>`;

        Object.entries(this.visibleSummary).forEach(([name, total]) => {
          content += `总${escapeHtml(name)}：${total} <br/>`;
        });

        content += `</div>`;
        return content;
      };
    },
    generateGraphicElements() {
      const summaryEntries = Object.entries(this.visibleSummary);
      if (summaryEntries.length === 0) return [];

      const lineHeight = 20;
      const padding = 10;
      const totalHeight = summaryEntries.length * lineHeight + padding * 2;
      const textContent = summaryEntries.map(([name, total]) => `总${name}：${total}`).join('\n');

      return [
        {
          type: 'group',
          right: 20,
          bottom: 30,
          children: [
            {
              type: 'rect',
              shape: {width: 200, height: totalHeight, r: 8},
              style: {
                fill: hexToRgba(this.colorMain,0.1),
                stroke: '#00cfff',
                lineWidth: 1,
                shadowBlur: 8,
                shadowColor: hexToRgba(this.colorMain,0.1)
              }
            },
            {
              type: 'text',
              style: {
                text: textContent,
                x: padding,
                y: padding,
                fill: '#fff',
                font: '14px Microsoft YaHei',
                lineHeight: lineHeight
              }
            }
          ]
        }
      ];
    },
    renderMap() {
      if (!this.chart || this.isRendering || this.isComponentDestroyed()) return;

      this.isRendering = true;
      const mapName = 'map';

      if (this.geoJsonFeatures.length > 0) {
        echarts.registerMap(mapName, {features: this.geoJsonFeatures});
      }

      const {mapData, pointData} = this.getMapData();
      const values = mapData.map(d => d.value);
      const min = values.length ? Math.min(...values) : 0;
      const max = values.length ? Math.max(...values) : 10000;

      let visualMapMin = min;
      let visualMapMax = max;
      if (min === max) {
        visualMapMin = max === 0 ? 0 : max * 0.8;
        visualMapMax = max === 0 ? 1000 : max;
      }

      const isAllZero = visualMapMin === 0 && visualMapMax === 0;

      const yCategories = mapData.map(d => d.name);
      const barSeriesData = mapData.map(d => ({
        name: d.name,
        value: d.value,
        cityCode: d.cityCode,
        level: d.level,
        fullname: d.fullname,
        ...Object.keys(this.dataSummary).reduce((acc, key) => {
          acc[key] = d[key] || 0;
          return acc;
        }, {})
      }));

      // 根据当前层级动态调整缩放参数
      const currentInfo = this.parentInfo[this.parentInfo.length - 1];
      const isChinaMap = currentInfo && currentInfo.level === 'china';
      const layoutSize = isChinaMap ? '200%' : '90%';
      const geoZoom = isChinaMap ? 1.25 : 1.0;
      const layoutCenter = isChinaMap ? ['0%', '75%'] : ['42%', '55%'];
      const option = {
        animation: false,
        title: [{
          left: 'center',
          top: 10,
          text: this.chartTitle,
          textStyle: {color: hexToRgba(this.colorMain,0.2), fontSize: 16}
        }],
        tooltip: {
          trigger: 'item',
          formatter: this.generateTooltipFormatter(),
          backgroundColor: 'rgba(60, 60, 60, 0.7)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: {color: '#fff'}
        },
        graphic: this.generateGraphicElements(),
        geo: {
          map: mapName,
          roam: true,
          zoom: geoZoom,
          scaleLimit: {min: 1, max: 5},
          layoutCenter: layoutCenter,
          layoutSize: layoutSize,
          label: {
            normal: {show: true, color: 'rgb(249, 249, 249)'},
            emphasis: {show: true, color: '#f75a00'}
          },
          itemStyle: {
            normal: {
              areaColor: hexToRgba(this.colorMain,1),
              borderColor: hexToRgba(this.colorMain,0.9),
              borderWidth: 1.3,
              shadowBlur: 15,
              shadowColor: 'rgb(58,115,192)',
              shadowOffsetX: 0,
              shadowOffsetY: 6
            },
            emphasis: {areaColor: hexToRgba(this.colorMain,0.5), borderWidth: 1.6, shadowBlur: 25}
          }
        },
        ...(barSeriesData.length > 0 ? {
          grid: {
            right: '1%',
            top: '10%',
            bottom: '20%',
            width: '12%',
            containLabel: false,
            show: false,
            z: 2
          },
          xAxis: {
            type: 'value',
            position: 'top',
            axisLine: {lineStyle: {color: hexToRgba(this.colorMain,1)}},
            axisTick: {show: false},
            axisLabel: {
              interval: 'auto',
              rotate: 45,
              textStyle: {color: '#ffffff'},
              fontSize: 10
            },
            splitNumber: 5,
            minInterval: 'auto',
            splitLine: {show: false},
            show: true
          },
          yAxis: {
            type: 'category',
            axisLine: {lineStyle: {color: '#ffffff'}},
            axisTick: {show: false},
            axisLabel: {textStyle: {color: '#ffffff'}},
            data: yCategories,
            inverse: false,
            show: true
          }
        } : {}),
        visualMap: {
          min: visualMapMin,
          max: visualMapMax,
          left: '3%',
          bottom: '5%',
          calculable: true,
          seriesIndex: [0],
          inRange: {color: [hexToRgba(this.colorMain,0.1), hexToRgba(this.colorMain,0.5), hexToRgba(this.colorMain,1)]},
          textStyle: {color: '#24CFF4'},
        },
        series: [
          {
            name: this.defaultDataItem.name,
            type: 'map',
            geoIndex: 0,
            map: mapName,
            roam: true,
            label: {show: false},
            data: mapData,
            itemStyle: {
              normal: {
                areaColor: hexToRgba(this.colorMain,0.9),
                borderColor: hexToRgba(this.colorMain,0.8)
              }
            }
          },
          {
            name: '散点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            rippleEffect: {brushType: 'fill'},
            itemStyle: {
              color: '#F4E925',
              shadowBlur: 6,
              shadowColor: '#333',
              opacity: 0.8
            },
            symbolSize: (val) => {
              const v = val?.[2] || 0;
              const minSize = 3, maxSize = 10;
              if (visualMapMax === visualMapMin || isAllZero) return (minSize + maxSize) / 2;
              const ratio = (v - visualMapMin) / (visualMapMax - visualMapMin);
              return minSize + Math.max(0, Math.min(1, ratio)) * (maxSize - minSize);
            },
            showEffectOn: 'render',
            data: pointData
          },
          ...(barSeriesData.length > 0 ? [{
            name: '柱状',
            type: 'bar',
            data: barSeriesData,
            barGap: '-100%',
            barCategoryGap: '30%',
            barWidth: 6,
            itemStyle: {
              normal: {
                color: hexToRgba(this.colorMain,0.7),
                barBorderRadius: [0, 6, 6, 0],
                opacity: 0.8
              }
            },
            z: 3
          }] : []),
        ]
      };

      try {
        this.chart.clear();
        this.chart.setOption(option);
        this.chart.hideLoading();
        this.isChartReady = true;
      } catch (error) {
        console.error('图表渲染失败:', error);
        this.isChartReady = false;
      } finally {
        this.isRendering = false;
      }
    },
    async loadMapData() {
      if (this.isComponentDestroyed()) return;
      if (this.parentInfo.length > this.maxLevel) return;

      const currentInfo = this.parentInfo[this.parentInfo.length - 1];
      if (!currentInfo?.level) return;

      try {
        this.isChartReady = false;
        this.chart?.showLoading();

        let requestLevel = currentInfo.level;
        if (currentInfo.level !== 'china' && !requestLevel.startsWith(this.initCountry)) {
          requestLevel = `${this.initCountry}/${currentInfo.level}`;
        }

        const res = await getGeoJson(requestLevel, currentInfo.name);

        if (this.isComponentDestroyed()) return;

        if (!res?.geoJson) {
          console.warn('无地图数据，回退上一级');
          this.parentInfo.pop();
          return;
        }

        let data;
        try {
          data = JSON.parse(res.geoJson);
        } catch (parseError) {
          console.error('地图数据 JSON 解析失败:', parseError);
          this.geoJsonFeatures = [];
          this.renderMap();
          return;
        }

        this.geoJsonFeatures = data.features || [];
        this.chartTitle = `${currentInfo.fullname || currentInfo.name}${this.chartName}`;

        await this.$nextTick();

        if (this.isComponentDestroyed()) return;

        this.renderMap();

        if (this.geoJsonFeatures.length === 0 && this.parentInfo.length > 1) {
          console.warn('无下级数据，自动回退');
          this.goBack();
        }

        if (this.returnLevel.find(level => level === currentInfo?.level)) {
          this.$emit('getData', currentInfo);
        }
      } catch (err) {
        console.error('地图数据加载失败:', err);
        this.geoJsonFeatures = [];
        if (!this.isComponentDestroyed()) {
          this.renderMap();
        }
      } finally {
        this.chart?.hideLoading();
      }
    },
    handleDrillDown(data) {
      if (!data?.name) {
        console.warn('无效数据，无法下钻');
        return;
      }

      const currentLevelInfo = this.parentInfo[this.parentInfo.length - 1];
      const nextLevel = this.formateLevel(currentLevelInfo.level);
      const canDrillDown = !!nextLevel && this.parentInfo.length < this.maxLevel;

      const emitLevel = nextLevel || currentLevelInfo?.level || 'country';
      this.$emit('clickRegion', {
        name: data.fullname || data.name,
        level: emitLevel,
        levelLabel: this.formateLevelLabel(emitLevel),
        cityCode: data.cityCode,
        value: data.value,
        canDrillDown
      });

      if (!canDrillDown) {
        if (!nextLevel) {
          console.warn('已达最低层级，无法下钻');
        } else {
          console.warn('已达最大层级，无法继续下钻');
        }
        return;
      }

      this.parentInfo.push({
        name: data.fullname || data.name,
        level: nextLevel
      });

      this.loadMapData();
      this.showBack = this.parentInfo.length > 1;
    },
    goBack() {
      if (this.parentInfo.length <= 1) {
        console.log('已达最高层级');
        return;
      }

      const currentInfo = this.parentInfo[this.parentInfo.length - 1];

      this.parentInfo.pop();
      if (this.parentInfo.length === 0) {
        this.initializeParentInfo();
      }

      const newCurrentInfo = this.parentInfo[this.parentInfo.length - 1];
      const backLevel = newCurrentInfo?.level || 'china';
      this.$emit('clickRegion', {
        name: newCurrentInfo?.name || '中华人民共和国',
        level: backLevel,
        levelLabel: this.formateLevelLabel(backLevel),
        cityCode: currentInfo?.cityCode,
        isBack: true
      });

      this.loadMapData();
      this.showBack = this.parentInfo.length > 1;
    },
    handleResize() {
      if (this.isComponentDestroyed()) return;

      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }

      if (!this.chart || this.isRendering) {
        console.log('图表不可用或正在渲染，跳过 resize');
        return;
      }

      this.resizeTimer = setTimeout(() => {
        try {
          if (this.chart && !this.chart.isDisposed()) {
            if (!this.isChartReady) {
              console.log('图表未就绪，执行重新渲染');
              this.renderMap();
            } else {
              this.chart.resize({
                width: 'auto',
                height: 'auto',
                silent: true
              });
            }
          }
        } catch (error) {
          this.isChartReady = false;
          setTimeout(() => {
            if (this.chart && !this.chart.isDisposed() && !this.isComponentDestroyed()) {
              this.renderMap();
            }
          }, 300);
        }
      }, 300);
    },
    async initChart() {
      if (!this.$refs.chartRef || this.isComponentDestroyed()) return;

      try {
        if (this.chart) {
          this.chart.dispose();
          this.chart = null;
        }

        this.chart = echarts.init(this.$refs.chartRef);

        this.chartTitle = this.chartName;
        this.initializeParentInfo();
        await this.loadMapData();

        if (this.isComponentDestroyed()) return;

        this.chart.off('click');
        this.chart.on('click', (params) => {
          if ((params.seriesType === 'map' || params.seriesType === 'bar') && params.data) {
            this.handleDrillDown(params.data);
          }
        });
      } catch (error) {
        console.error('图表初始化失败:', error);
      }
    },
    bindResizeEvent() {
      window.removeEventListener('resize', this.handleResize);
      window.addEventListener('resize', this.handleResize, {passive: true});
    },
    isComponentDestroyed() {
      return this._isDestroyed || !this.$refs.chartRef;
    }
  }
};
</script>

<style scoped>
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
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(36, 207, 244, 0.2);
  transition: background-color 0.2s ease;
}

.back:hover {
  background-color: rgba(36, 207, 244, 0.4);
}
</style>
