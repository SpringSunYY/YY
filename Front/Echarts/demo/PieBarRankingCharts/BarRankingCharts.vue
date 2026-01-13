<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarRankingCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    // 基础数据
    chartData: {
      type: Array,
      default: () => [
        {"name": "沈河区", "value": 3143, "tooltipText": "沈阳市的政治、经济、文化中心", "moreInfo": "沈阳的political"},
        {"name": "皇姑区", "value": 2889, "tooltipText": "教育资源丰富，学区密集"},
        {"name": "新民市", "value": 2844, "tooltipText": "重要的农产品基地"},
        {"name": "于洪区", "value": 2736, "tooltipText": "物流仓储集散地"},
        {"name": "铁西区", "value": 2367, "tooltipText": "老工业基地转型典范"},
        {"name": "大东区", "value": 2229, "tooltipText": "汽车产业集群所在地"},
        {"name": "沈北新区", "value": 2168, "tooltipText": "大学城及新兴产业区"},
        {"name": "苏家屯区", "value": 1941, "tooltipText": "沈阳南大门"},
        {"name": "康平县", "value": 1918, "tooltipText": "风能发电重点县"},
        {"name": "和平区", "value": 1827, "tooltipText": "商业步行街太原街所在地"},
        {"name": "辽中区", "value": 1593, "tooltipText": "国家级近海经济区"},
        {"name": "浑南区", "value": 1337, "tooltipText": "高新技术开发区"},
        {"name": "法库县", "value": 954, "tooltipText": "陶瓷产业基地"}
      ]
    },
    chartTitle: {type: String, default: '沈阳市各区县数据排行榜'},
    showCount: {type: Number, default: 6},
    // 轮播间隔，设置为 0 则停止轮播
    intervalTime: {type: Number, default: 2500},
    backgroundColor: {type: String, default: 'transparent'},
    // 新增方向参数：'right' (默认) 或 'left'
    direction: {
      type: String,
      default: 'right',
      validator: (value) => ['left', 'right'].includes(value)
    }
  },

  data() {
    return {
      chart: null,
      timer: null,
      startIndex: 0,
      isInteracting: false,
      sortedData: [] // 内部维护排序后的数据
    };
  },

  watch: {
    chartData: {
      deep: true,
      handler() {
        this.renderChart();
        this.resetRotation();
      }
    },
    intervalTime() {
      this.resetRotation();
    }
  },

  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    this.stopRotation();
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = echarts.init(this.$refs.chartRef);
      this.renderChart();
      this.resetRotation(); // 根据 intervalTime 判断是否开启轮播
      this.initChartEvents();
    },

    renderChart() {
      if (!this.chart) return;

      // 1. 内部排序
      this.sortedData = [...this.chartData].sort((a, b) => b.value - a.value);
      const names = this.sortedData.map(item => item.name);
      const values = this.sortedData.map(item => item.value);

      // 2. 根据方向计算样式
      const isLeft = this.direction === 'left';

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          left: 'center',
          top: 5,
          textStyle: {color: '#fff', fontSize: 20, fontWeight: 'bold'}
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'shadow'},
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 0,
          formatter: (params) => {
            const index = params[0].dataIndex;
            const item = this.sortedData[index];
            const rank = index + 1;
            let html = `<div style="padding:10px; color:#fff;">
                          <b style="font-size:16px; color:#56fb93">NO.${rank} - ${item.name}</b><br/>
                          <span style="opacity:0.8">数值：</span>${item.value}<br/>`;
            if (item.tooltipText) {
              html += `<span style="opacity:0.8">描述：</span><span style="color:#347CDD">${item.tooltipText}</span>`;
            }
            html += `</div>`;
            return html;
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '12%',
          bottom: '5%',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside',
          yAxisIndex: 0,
          startValue: this.startIndex,
          endValue: this.startIndex + this.showCount,
          zoomLock: false,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true,
          moveOnMouseWheel: true
        }],
        xAxis: {
          type: 'value',
          show: false,
          inverse: isLeft // 坐标轴反向实现向左增长
        },
        yAxis: {
          type: 'category',
          data: names,
          inverse: true,
          position: isLeft ? 'right' : 'left', // Y轴左右切换
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {
            color: "#fff",
            fontSize: 14,
            formatter: (value, index) => {
              if (index === 0) return '{a|' + value + '}';
              if (index === 1) return '{b|' + value + '}';
              if (index === 2) return '{c|' + value + '}';
              return value;
            },
            rich: {
              a: {color: '#ffde00', fontSize: 16, fontWeight: 'bold'},
              b: {color: '#cfcfcf', fontSize: 15},
              c: {color: '#d39050', fontSize: 14}
            }
          }
        },
        series: [{
          type: 'bar',
          barWidth: 18,
          showBackground: true,
          backgroundStyle: {color: 'rgba(255, 255, 255, 0.05)', borderRadius: 10},
          itemStyle: {
            borderRadius: [10, 10, 10, 10],
            // 渐变方向根据 direction 调整
            color: new echarts.graphic.LinearGradient(isLeft ? 1 : 0, 0, isLeft ? 0 : 1, 0, [
              {offset: 0, color: '#347CDD'},
              {offset: 1, color: '#56fb93'}
            ])
          },
          label: {
            show: true,
            position: isLeft ? 'left' : 'right', // 标签数值位置
            color: '#fff',
            distance: 10,
            formatter: '{c}'
          },
          data: values
        }]
      };

      this.chart.setOption(option, true);
    },

    initChartEvents() {
      // 1. 交互停止轮播
      this.chart.on('mousemove', () => {
        this.isInteracting = true;
      });
      this.chart.on('globalout', () => {
        this.isInteracting = false;
      });

      // 2. 滚动同步
      this.chart.on('dataZoom', (params) => {
        let start = params.batch ? params.batch[0].startValue : params.startValue;
        if (start !== undefined) this.startIndex = Math.ceil(start);
      });

      // 3. 点击事件 - 返回整个原始数据对象
      this.chart.on('click', (params) => {
        const itemData = this.sortedData[params.dataIndex];
        this.$emit('item-click', itemData);
      });
    },

    resetRotation() {
      this.stopRotation();
      if (this.intervalTime > 0) {
        this.startRotation();
      }
    },

    startRotation() {
      this.timer = setInterval(() => {
        if (!this.isInteracting) {
          const totalLength = this.chartData.length;
          if (this.startIndex >= totalLength - this.showCount - 1) {
            this.startIndex = 0;
          } else {
            this.startIndex++;
          }
          this.chart.dispatchAction({
            type: 'dataZoom',
            startValue: this.startIndex,
            endValue: this.startIndex + this.showCount
          });
        }
      }, this.intervalTime);
    },

    stopRotation() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    handleResize() {
      this.chart?.resize();
    }
  }
};
</script>
