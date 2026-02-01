<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarLineZoomCharts',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    chartData: {
      type: Array,
      default: () => [
        {name: '2012年', value: 451, tooltipText: '年初推广活动\n效果显著'},
        {name: '2013年', value: 352, tooltipText: '政策调整期间'},
        {name: '2014年', value: 303},
        {name: '2015年', value: 534},
        {name: '2016年', value: 95},
        {name: '2017年', value: 236},
        {name: '2018年', value: 217}
      ]
    },
    chartTitle: {
      type: String,
      default: '用户变动统计图'
    },
    colorMain: {
      type: String,
      default: 'rgb(255,81,141)'
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    showStatistics: {
      type: Boolean,
      default: true
    },
    unit: {
      type: String,
      default: '数量'
    },
    displayCount: {
      type: Number,
      default: 5
    },
    playInterval: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      timer: null,
      startIndex: 0
    };
  },
  computed: {
    // 预计算总数和平均值，方便在点击事件中使用
    stats() {
      const rawValues = this.chartData.map(item => Number(item.value) || 0);
      const total = rawValues.reduce((a, b) => a + b, 0);
      const avg = total > 0 ? (total / rawValues.length).toFixed(2) : 0;
      return {total, avg};
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.initChart();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener('resize', this.handleResize);
    });
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
    hexToRgba(opacity) {
      // 处理不完整的 rgba(r, g, b) 格式（缺少透明度值）
      const incompleteRgbaMatch = this.colorMain.match(/rgba\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (incompleteRgbaMatch) {
        const r = parseInt(incompleteRgbaMatch[1]);
        const g = parseInt(incompleteRgbaMatch[2]);
        const b = parseInt(incompleteRgbaMatch[3]);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }

      // 处理标准 rgb(r, g, b) 格式
      const rgbMatch = this.colorMain.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }

      // 处理标准 rgba(r, g, b, a) 格式
      const rgbaMatch = this.colorMain.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1]);
        const g = parseInt(rgbaMatch[2]);
        const b = parseInt(rgbaMatch[3]);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }

      // 如果都不匹配，返回默认值
      return `rgba(23, 255, 243, ${opacity})`;
    },
    initChart() {
      if (this.chart) this.chart.dispose();
      this.chart = echarts.init(this.$refs.chartRef);

      this.setOption();

      // --- 新增：点击事件监听 ---
      this.chart.on('click', (params) => {
        // 过滤点击对象，确保点击的是数据系列
        if (params.componentType === 'series') {
          const dataIndex = params.dataIndex;
          const item = this.chartData[dataIndex];

          // 向父组件抛出事件
          this.$emit('item-click', {
            ...item,
            dataIndex: dataIndex,
            seriesName: params.seriesName,
            percent: this.stats.total > 0 ? ((item.value / this.stats.total) * 100).toFixed(2) : 0,
            total: this.stats.total,
            avg: this.stats.avg
          });
        }
      });

      // 自动轮播与鼠标交互
      if (this.autoPlay) {
        this.startRotation();
        this.chart.getZr().on('mousemove', this.stopRotation);
        this.chart.getZr().on('globalout', this.startRotation);
      }
    },

    setOption() {
      const data = this.chartData;
      const xLabels = data.map(item => item.name);
      const rawValues = data.map(item => item.value);
      const {total, avg} = this.stats;

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          textStyle: {color: '#fff', fontSize: 18},
          left: 'center',
          top: '1%'
        },
        legend: {
          data: ['折线图', '柱形图', '平均线'],
          textStyle: {color: 'rgb(0,253,255,0.6)'},
          right: '4%',
          top: '6%'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: this.hexToRgba(0.8),
          borderWidth: 1,
          textStyle: {color: '#fff'},
          formatter: (params) => {
            const idx = params[0].dataIndex;
            const item = data[idx];
            const color = this.hexToRgba(0.8)
            let res = `<div style="font-weight:bold; color:${color}; border-bottom:1px solid #555; padding-bottom:5px;">${item.name}</div>`;

            if (this.showStatistics) {
              res += `<div style="font-size:12px; color:#aaa; margin: 5px 0;">总计: ${total} | 平均: ${avg}</div>`;
            }

            const val = item.value;
            let ratioHtml = '';
            if (idx > 0) {
              const prevVal = data[idx - 1].value;
              const diff = val - prevVal;
              const percent = prevVal !== 0 ? ((diff / prevVal) * 100).toFixed(1) : 0;
              const color = diff >= 0 ? '#ff4d4f' : '#52c41a';
              ratioHtml = `<span style="color:${color}; margin-left:8px;">${diff >= 0 ? '+' : ''}${diff} (${percent}%)</span>`;
            }

            const percentOfTotal = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
            res += `数值: <b style="font-size:16px;">${val}</b> <small>(${percentOfTotal}%)</small>${ratioHtml}<br/>`;

            if (item.tooltipText) {
              res += `<div style="margin-top:8px; padding:8px; background:rgba(23, 255, 243, 0.1); border-left: 3px solid ${color}; font-size:12px; line-height:1.5;">
                        ${item.tooltipText.replace(/\n/g, '<br/>')}
                      </div>`;
            }
            return res;
          }
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'slider', // 下方滑动条
            show: true,
            xAxisIndex: [0],
            left: '10%',
            right: '10%',
            bottom: '2%',
            height: 20,
            borderColor: 'transparent',
            fillerColor: this.hexToRgba(0.2),
            handleStyle: {color: this.hexToRgba(0.8)},
            textStyle: {color: 'rgb(0,253,255,0.6)'}
          },
          {
            type: 'inside', // 允许鼠标滚轮缩放
            xAxisIndex: [0]
          }
        ],
        xAxis: {
          type: 'category',
          data: xLabels,
          axisLabel: {color: 'rgb(0,253,255,0.6)'}
        },
        yAxis: {
          name: this.unit,
          type: 'value',
          splitLine: {lineStyle: {color: 'rgba(23,255,243,0.1)'}},
          axisLabel: {color: 'rgb(0,253,255,0.6)'}
        },
        series: [
          {
            name: '折线图',
            type: 'line',
            smooth: true,
            symbolSize: 10, // 增大 symbol 以便点击
            color: this.colorMain,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: this.hexToRgba(0.3)},
                {offset: 0.8, color: this.hexToRgba(0)}
              ])
            },
            data: rawValues
          },
          {
            name: '柱形图',
            type: 'bar',
            barWidth: '20%',
            itemStyle: {
              borderRadius: [10, 10, 0, 0],
              barBorderRadius: [10, 10, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: this.hexToRgba(0.8)},
                {offset: 1, color: this.hexToRgba(0.1)}
              ])
            },
            data: rawValues
          },
          {
            name: '平均线',
            type: 'line',
            markLine: {
              symbol: 'none',
              data: [{
                yAxis: avg,
                lineStyle: {color: '#ffea00', type: 'dashed'},
                label: {
                  show: true,
                  position: 'end',
                  formatter: '平均线',
                  // 添加以下样式属性
                  color: '#ffffff',           // 文字颜色
                  fontSize: 12,              // 字体大小
                  fontWeight: 'bold',        // 字体粗细
                  textStyle: {               // 文本样式（旧版本兼容）
                    color: '#ffffff'
                  }
                }
              }]
            },
            data: []
          }
        ]
      };

      this.chart.setOption(option);
    },

    startRotation() {
      if (!this.autoPlay || this.chartData.length <= this.displayCount) return;
      this.stopRotation();
      this.timer = setInterval(() => {
        if (this.startIndex >= this.chartData.length - this.displayCount) {
          this.startIndex = 0;
        } else {
          this.startIndex++;
        }
        this.chart.setOption({
          dataZoom: [{startValue: this.startIndex, endValue: this.startIndex + this.displayCount - 1}]
        });
      }, this.playInterval);
    },

    stopRotation() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    handleResize() {
      if (this.chart) this.chart.resize();
    }
  }
};
</script>
