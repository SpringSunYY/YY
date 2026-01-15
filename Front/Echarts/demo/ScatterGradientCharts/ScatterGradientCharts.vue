<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ScatterGradientCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    chartData: {
      type: Array,
      default: () => [
        {name: '具有相关企业资质证书', value: 22342, max: 30000, min: 10000, tooltipText: '企业需具备一级\n或二级资质'},
        {name: '三年内无违法违规记录', value: 29821, max: 50000},
        {name: '企业注册资产超过300w', value: 12919, min: 5000},
        {name: '不接受联合投标', value: 22314},
      ]
    },
    chartTitle: {type: String, default: '数据分布概览'},
    labelMaxLength: {type: Number, default: 6},
    backgroundColor: {type: String, default: 'transparent'},
    minSize: {type: Number, default: 0.15},
    maxSize: {type: Number, default: 0.6},
    // --- 是否显示额外统计信息（总量/平均值） ---
    showExtraInfo: {
      type: Boolean,
      default: true
    },
  },

  data() {
    return {
      chart: null
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(newData) {
        this.setOption(newData)
      }
    },
    // 监听开关变化，实时刷新图表
    showExtraInfo() {
      this.setOption(this.chartData)
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
      window.addEventListener('resize', this.handleResize)
    })
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    getRandomColor() {
      return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: `rgba(${Math.round(Math.random() * 150)}, ${Math.round(Math.random() * 150)}, 255, 0.9)`
      }, {
        offset: 1,
        color: `rgba(${Math.round(Math.random() * 150)}, 255, ${Math.round(Math.random() * 150)}, 0.9)`
      }]);
    },

    initChart() {
      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(this.$refs.chartRef);
      this.setOption(this.chartData);
    },

    setOption(data) {
      if (!data || !data.length || !this.chart) return;

      const width = this.chart.getWidth();
      const height = this.chart.getHeight();
      const baseSize = Math.min(width, height);
      const minSymbolSize = baseSize * this.minSize;
      const maxSymbolExtra = baseSize * this.maxSize;

      // --- 根据 showExtraInfo 决定是否计算 ---
      let total = 0;
      let avg = 0;
      if (this.showExtraInfo) {
        total = data.reduce((sum, item) => sum + Number(item.value), 0);
        avg = (total / data.length).toFixed(2);
      } else {
        // 如果不显示额外信息，total 仅用于计算 symbolSize 的比例
        total = data.reduce((sum, item) => sum + Number(item.value), 0);
      }

      const pointCache = [];
      const seriesData = data.map((item) => {
        // 只有在需要显示时才计算百分比字符串
        const percentage = this.showExtraInfo ? `(${((item.value / total) * 100).toFixed(2)}%)` : '';

        let x, y, tooClose;
        let retry = 0;
        do {
          tooClose = false;
          x = Math.floor(Math.random() * 70 + 15);
          y = Math.floor(Math.random() * 70 + 15);
          for (let p of pointCache) {
            const d = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2));
            if (d < 20) {
              tooClose = true;
              break;
            }
          }
          retry++;
        } while (tooClose && retry < 50);

        pointCache.push({x, y});

        return {
          name: item.name,
          value: [x, y],
          symbolSize: minSymbolSize + (item.value / total) * maxSymbolExtra,
          rawVal: item.value,
          max: item.max,
          min: item.min,
          currentAvg: item.avg,
          percentage: percentage,
          tooltipText: item.tooltipText || '',
          itemStyle: {
            normal: {
              color: this.getRandomColor(),
              shadowBlur: 15,
              shadowColor: 'rgba(0,0,0,0.2)'
            }
          }
        }
      });

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          left: 'center',
          top: 20,
          textStyle: {color: '#fff', fontSize: 18}
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderColor: '#444',
          padding: 12,
          textStyle: {color: '#fff'},
          formatter: (params) => {
            const {name, rawVal, percentage, tooltipText, max, min, currentAvg} = params.data

            // --- 动态构建 Tooltip 内容 ---
            let header = '';
            if (this.showExtraInfo) {
              header = `
                <div style="margin-bottom: 5px;">
                  <b style="color:#FFD700;">数据概览</b><br/>
                  总计: ${total} | 平均: ${avg}
                </div>
                <hr style="border:0;border-top:1px solid #555;margin:6px 0;">`;
            }

            let res = `<div style="line-height:22px;">
              ${header}
              <b style="color:#10EBE3; font-size:14px;">${name}</b><br/>
              <b>数值:</b> ${rawVal} ${percentage}<br/>`;

            if (currentAvg !== undefined) res += `<b>平均:</b> ${currentAvg}<br/>`;
            if (max !== undefined) res += `<b>最大:</b> ${max}<br/>`;
            if (min !== undefined) res += `<b>最小:</b> ${min}<br/>`;

            if (tooltipText) {
              res += `<span style="color:#aaa;font-size:12px;margin-top:4px;display:block;">说明: ${tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            res += '</div>'
            return res
          }
        },
        // 缩放控制逻辑
        dataZoom: [
          // X 轴内置缩放
          {type: 'inside', xAxisIndex: 0, minSpan: 60},
          {type: 'inside', yAxisIndex: 0, minSpan: 60},
        ],
        xAxis: {show: false, min: 0, max: 100},
        yAxis: {show: false, min: 0, max: 100},
        series: [{
          type: 'scatter',
          label: {
            show: true,
            formatter: (params) => {
              const name = params.name;
              return name.length > this.labelMaxLength ? name.substring(0, this.labelMaxLength) + '..' : name;
            },
            color: '#fff',
            position: 'inside',
            fontSize: Math.max(12, baseSize * 0.02)
          },
          data: seriesData
        }]
      };

      this.chart.setOption(option);
    },

    handleResize() {
      if (this.chart) {
        this.chart.resize();
        this.setOption(this.chartData);
      }
    }
  }
}
</script>
