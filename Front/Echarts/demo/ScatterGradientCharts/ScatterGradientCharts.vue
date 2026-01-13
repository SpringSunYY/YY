<template>
  <div :class="className" :style="{ height, width }" ref="chartRef" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ScatterGradientCharts',
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
    // 传入的图表数据
    chartData: {
      type: Array,
      default: () => [
        { name: '具有相关企业资质证书', value: 22342, tooltipText: '企业需具备一级\n或二级资质' },
        { name: '三年内无违法违规记录', value: 29821, tooltipText: '由工商部门开具\n无违规证明' },
        { name: '企业注册资产超过300w', value: 12919 },
        { name: '不接受联合投标', value: 22314, tooltipText: '仅限独立法人' },
        { name: '本项目不得转包、分包给其他任何单位', value: 22903 },
        { name: '具有独立承担民事责任能力', value: 22391 },
        { name: '投标人财产没有处于被接管、冻结或破产状态', value: 15781 }
      ]
    },
    chartTitle: {
      type: String,
      default: '数据分布概览'
    },
    // Label 截断长度
    labelMaxLength: {
      type: Number,
      default: 6
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
  },

  data() {
    return {
      chart: null // ECharts 实例
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(newData) {
        this.setOption(newData)
      }
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
    /**
     * 生成随机渐变色
     */
    getRandomColor() {
      return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(' + [Math.round(Math.random() * 150), Math.round(Math.random() * 150), 255].join(',') + ', 0.9)'
      }, {
        offset: 1,
        color: 'rgba(' + [Math.round(Math.random() * 150), 255, Math.round(Math.random() * 150)].join(',') + ', 0.9)'
      }]);
    },

    initChart() {
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
      this.chart = echarts.init(this.$refs.chartRef);
      this.setOption(this.chartData);
    },

    setOption(data) {
      if (!data || !data.length) return;

      const total = data.reduce((sum, item) => sum + Number(item.value), 0);
      const avg = (total / data.length).toFixed(2);

      // --- 加入简单的防重叠逻辑 ---
      const pointCache = [];
      const seriesData = data.map((item) => {
        const percentage = ((item.value / total) * 100).toFixed(2) + '%';

        let x, y, tooClose;
        let retry = 0;
        do {
          tooClose = false;
          x = Math.floor(Math.random() * 70 + 15);
          y = Math.floor(Math.random() * 70 + 15);
          // 这里的 18 是距离阈值，可以根据视觉效果微调
          for (let p of pointCache) {
            const d = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2));
            if (d < 18) {
              tooClose = true;
              break;
            }
          }
          retry++;
        } while (tooClose && retry < 50); // 最多重试50次避免死循环

        pointCache.push({ x, y });

        return {
          name: item.name,
          value: [x, y],
          // 根据 Value 占比确定大小 (基础 70 + 权重 250)
          symbolSize: 70 + (item.value / total) * 250,
          rawVal: item.value,
          percentage: percentage,
          tooltipText: item.tooltipText || '',
          itemStyle: {
            normal: {
              color: this.getRandomColor(), // 调用你指定的渐变色逻辑
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,0.3)'
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
          textStyle: { color: '#fff', fontSize: 20 }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          borderWidth: 0,
          padding: 12,
          formatter: (params) => {
            const { name, rawVal, percentage, tooltipText } = params.data
            let res = `<div style="line-height:24px; color:#fff;">
              <b style="color:#10EBE3;">汇总信息</b><br/>
              总计: ${total} | 平均: ${avg}<br/>
              <hr style="border:0;border-top:1px solid #444;margin:4px 0;">
              <b>项目:</b> ${name}<br/>
              <b>数值:</b> ${rawVal} (${percentage})`;
            if (tooltipText) {
              res += `<br/><span style="color:#aaa;font-size:12px;">${tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            res += '</div>'
            return res
          }
        },
        // --- 设置 minSpan 降低缩放灵敏度 ---
        dataZoom: [
          { type: 'inside', xAxisIndex: 0, minSpan: 60 },
          { type: 'inside', yAxisIndex: 0, minSpan: 60 }
        ],
        xAxis: { show: false, min: 0, max: 100 },
        yAxis: { show: false, min: 0, max: 100 },
        series: [{
          type: 'scatter',
          symbol: 'circle',
          label: {
            show: true,
            formatter: (params) => {
              var name = params.name;
              if (name.length > this.labelMaxLength) {
                return name.substring(0, this.labelMaxLength);
              }
              return name;
            },
            color: '#fff',
            position: 'inside',
            fontSize: 14,
            lineHeight: 16
          },
          data: seriesData
        }]
      };

      this.chart.setOption(option);
    },

    handleResize() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
