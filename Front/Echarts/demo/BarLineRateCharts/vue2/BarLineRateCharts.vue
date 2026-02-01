<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script>
// 确保您已安装并引入 ECharts 库
import * as echarts from 'echarts'

export default {
  name: 'BarLineRateCharts', // 组件名称

  // 定义 Props
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
      default: '100%' // 默认高度
    },
    // 内层系列名称 (柱状图)
    innerName: {
      type: String,
      default: '实际值'
    },
    // 外层系列名称 (折线图)
    outerName: {
      type: String,
      default: '总量'
    },
    // 核心图表数据
    chartData: {
      type: Object,
      default: () => ({
        names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        outerValues: [2220, 1682, 2791, 3000, 4090, 3230, 2910], // 折线图数据
        innerValues: [1220, 682, 791, 1000, 2090, 2230, 1910]  // 柱状图数据
      })
    },
    // 图表标题
    chartTitle: {
      type: String,
      default: 'BarLineRate'
    }
  },

  data() {
    return {
      chart: null // ECharts 实例
    }
  },

  watch: {
    // 深度侦听 chartData 的变化，如果数据更新，则重绘图表
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
      // 监听窗口大小变化以适应图表
      window.addEventListener('resize', this.handleResize)
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },

  methods: {
    /**
     * 初始化图表实例
     */
    initChart() {
      if (!this.$refs.chartRef) return

      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }

      this.chart = echarts.init(this.$refs.chartRef)
      this.setOptions(this.chartData)
    },

    /**
     * 设置 ECharts 配置项并渲染图表
     * @param {Object} data - 从 this.chartData 传入的数据
     */
    setOptions(data) {
      if (!this.chart || !data || !data.outerValues || data.outerValues.length === 0) return

      const innerName = this.innerName
      const outerName = this.outerName
      const barBorderRadius = [30, 30, 0, 0]

      const option = {
        title: {
          text: this.chartTitle,
          top: 10,
          left: 0,
          textStyle: {
            color: '#C5E5F9',
            fontSize: 18
          }
        },
        grid: {
          top: '16%',
          left: '0%',
          right: '7%',
          bottom: '12%',
          containLabel: true
        },
        legend: {
          itemGap: 30,
          top: '4%',
          right: '7%',
          data: [innerName, outerName],
          textStyle: {
            color: '#fff',
            borderColor: '#fff'
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
            bottom: '4%',
            height: 20,
            textStyle: {
              color: '#fff'
            }
          },
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        tooltip: {
          trigger: 'axis',
          padding: [5, 10, 5, 10],
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textStyle: {
            color: '#fff'
          },
          // 纯文本 formatter，使用 \n 换行
          formatter: (param) => {
            // 确保在 Vue 组件环境中可以访问 formatToFixed 和 getEquiUnit
            const formatToFixed_fn = typeof formatToFixed === 'function' ? formatToFixed : (val) => val
            const getEquiUnit_fn = typeof getEquiUnit === 'function' ? getEquiUnit : (name) => ''

            let tooltipContent = ''

            // 1. 标题（X轴类别名），后面接换行
            tooltipContent += `${param[0]?.axisValue}<br/>`

            // 2. 过滤并添加显示的系列数据
            const visibleItems = param.filter(item => item.seriesName === innerName || item.seriesName === outerName)
            visibleItems.forEach(item => {
              tooltipContent += `${item.seriesName}: ${formatToFixed_fn(item.data)}${item.data !== '--' ? getEquiUnit_fn(item.seriesName) : ''}<br/>`
            })

            // 3. 计算占比
            const innerItem = param.find(item => item.seriesName === innerName)
            const outerItem = param.find(item => item.seriesName === outerName)

            if (innerItem && outerItem && outerItem.data !== 0) {
              const ratio = (innerItem.data / outerItem.data * 100)
              tooltipContent += `${innerName} / ${outerName} 占比: ${ratio.toFixed(2)}%`
            }

            return tooltipContent
          }
        },
        xAxis: [{
          nameGap: 5,
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#9eaaba'
          },
          axisTick: {
            show: false
          },
          data: data.names // 使用 Prop 数据
        }],
        yAxis: [
          {
            nameTextStyle: {
              color: '#9eaaba'
            },
            offset: 0,
            type: 'value',
            axisLabel: {
              show: true,
              color: '#9eaaba'
            },
            axisLine: {
              show: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(49,105,129,0.4)',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: innerName, // 柱状图
            type: 'bar',
            barWidth: 15,
            label: {
              show: false,
              position: 'top',
              color: '#fff'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#32ACF0' },
                { offset: 1, color: 'rgba(124,248,255,1)' }
              ], false),
              lineStyle: {
                width: 1,
                type: 'solid'
              },
              barBorderRadius: barBorderRadius
            },
            data: data.innerValues
          },
          {
            name: outerName, // 折线图
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              color: 'rgba(44, 244, 255, 1)',
              borderColor: '#f0f'
            },
            label: {
              show: false,
              position: 'top',
              color: '#fff'
            },
            itemStyle: {
              color: '#2CF2FD',
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2CF4FF' },
                { offset: 1, color: 'rgba(124,248,255,0.1)' }
              ], false),
              shadowColor: 'rgba(124,248,255, 0)',
              shadowBlur: 20
            },
            data: data.outerValues
          }
        ]
      }

      this.chart.setOption(option, true)
    },

    /**
     * 处理窗口大小变化，重绘图表
     */
    handleResize() {
      this.chart && this.chart.resize()
    }
  }
}
</script>

<style scoped>
.chart {
  /* 确保容器有高度才能显示图表 */
  overflow: hidden;
}
</style>