<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script>
// 确保您已安装并引入 ECharts 库
import * as echarts from 'echarts'

export default {
  name: 'BarRateCharts', // 组件名称

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
      default: '300px' // 默认高度
    },
    // 图表标题
    chartTitle: {
      type: String,
      default: '单位:个'
    },
    // 内层系列名称 (例如: 待确认)
    innerName: {
      type: String,
      default: '待确认'
    },
    // 外层系列名称 (例如: 已确认)
    outerName: {
      type: String,
      default: '已确认'
    },
    // 核心图表数据
    chartData: {
      type: Object,
      default: () => ({
        names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        outerValues: [2220, 1682, 2791, 3000, 4090, 3230, 2910], // 外层/背景/总量 (通常值较大)
        innerValues: [1220, 682, 791, 1000, 2090, 2230, 1910]  // 内层/前景/实际值 (通常值较小)
      })
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
    // 侦听名称和标题变化
    chartTitle: 'setOptions',
    innerName: 'setOptions',
    outerName: 'setOptions'
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

      // 柱子的圆角设置 (顶部圆角，底部直角)
      const borderRadius = [10, 10, 0, 0]

      const option = {
        title: {
          text: this.chartTitle,
          top: 20,
          left: 0,
          textStyle: {
            color: '#C5E5F9',
            fontSize: 18
          }
        },
        grid: {
          top: 80,
          left: 10,
          right: 10,
          bottom: '10%',
          containLabel: true
        },
        legend: {
          icon: 'rect',
          itemWidth: 15,
          itemHeight: 10,
          right: 0,
          top: 30,
          itemGap: 20,
          data: [innerName, outerName], // 使用 Props 中的名称
          textStyle: {
            color: '#BCE6FF',
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(9, 24, 48, 0.8)',
          borderColor: 'rgba(75, 253, 238, 0.6)',
          textStyle: {
            color: '#C5E5F9',
            fontSize: 18
          },
          // 添加显示内层占比外层的逻辑
          formatter: function(params) {
            let tooltip = `<div>${params[0].name}</div>`
            let outerValue = 0
            let innerValue = 0

            // 找出 innerName (待确认) 和 outerName (已确认) 对应的数据
            params.forEach(function(item) {
              if (item.seriesName === innerName) {
                innerValue = item.value
              } else if (item.seriesName === outerName) {
                outerValue = item.value
              }

              // 默认的 tooltip 内容
              tooltip += `<div style="display:flex; justify-content: space-between; align-items: center;">
                                    <span style="display:inline-block; margin-right:5px; border-radius:10px; width:10px; height:10px; background-color:${item.color};"></span>
                                    ${item.seriesName}:
                                    <span style="font-weight: bold; margin-left: 20px;">${item.value}</span>
                                </div>`
            })

            // 计算占比
            let ratio = 0
            if (outerValue > 0) {
              ratio = (innerValue / outerValue) * 100
            }

            // 只有当至少一个数据存在时才显示占比
            if (outerValue > 0 || innerValue > 0) {
              tooltip += `<div style="margin-top: 5px; padding-top: 5px; border-top: 1px dashed rgba(255,255,255,0.3);">
                                     占比:
                                    <span style="color: #41EDFF; font-weight: bold;">${ratio.toFixed(2)}%</span>
                                </div>`
            }

            return tooltip
          }
        },
        xAxis: {
          type: 'category',
          data: data.names, // 使用提取的 xdata
          axisLine: {
            lineStyle: {
              color: 'rgba(118, 169, 250, .8)'
            }
          },
          axisTick: { show: false },
          axisLabel: {
            interval: 0,
            color: '#C5E5F9',
            fontSize: 12,
            margin: 20
          }
        },
        yAxis: {
          type: 'value',
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            color: '#C5E5F9',
            fontSize: 18,
            margin: 40
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(118, 169, 250, .5)'
            }
          }
        },
        dataZoom: [
          {
            type: 'slider', // 滑块型 dataZoom (拖动条)
            show: true,
            xAxisIndex: [0],
            start: 0,        // 初始显示范围起始
            end: 100,      // 初始显示范围结束
            height: 20,
            bottom: '2%',    // 放置在底部
            textStyle: {
              color: '#ccc'
            }
          },
          {
            type: 'inside', // 内置型 dataZoom (鼠标滚轮/触摸板操作)
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: innerName, // 待确认 (内层)
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#41EDFF' },
                { offset: 1, color: 'rgba(65,237,255,0)' }
              ]),
              barBorderRadius: borderRadius // **内层添加圆角**
            },
            data: data.innerValues, // 使用提取的 innerValues
            label: {
              show: true,
              position: 'top',
              color: '#fff',
              fontSize: 16
            },
            z: 10 // 确保内层在上面
          },
          {
            name: outerName, // 已确认 (外层)
            type: 'bar',
            barGap: '-100%', // 实现重叠效果
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#62E9C1' },
                { offset: 1, color: 'rgba(98,233,193,0)' }
              ]),
              barBorderRadius: borderRadius // **外层添加圆角**
            },
            data: data.outerValues, // 使用提取的 outerValues
            label: {
              show: true,
              position: 'top',
              color: '#fff',
              fontSize: 16
            },
            z: 5 // 确保外层在下面
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