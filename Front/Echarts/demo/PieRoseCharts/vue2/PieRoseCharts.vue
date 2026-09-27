<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/theme/macarons' // 引入 'macarons' 主题

export default {
  name: 'PieRoseCharts', // 组件名称设置为 PieRoseCharts

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
      default: '100%'
    },
    // ECharts 颜色列表
    defaultColor: {
      type: Array,
      default: () => [
        '#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86A92',
        '#7262FD', '#269A29', '#8E36BE', '#41A7E2', '#7747A3',
        '#FF7F50', '#FFDAB9', '#ADFF2F', '#00CED1', '#9370DB',
        '#3CB371', '#FF69B4', '#FFB6C1', '#DA70D6', '#98FB98',
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ]
    },
    // 核心数据
    chartData: {
      type: Array,
      default: () => [
        {name: '加工成本', value: 920},
        {name: '实验成本', value: 458},
        {name: '能源成本', value: 653},
        {name: '研发成本', value: 372}
      ]
    },
    //标题
    chartTitle: {
      type: String,
      default: 'pieRose'
    }
  },

  data() {
    return {
      chart: null, // ECharts 实例
      pieCenter: ['50%', '50%']
    }
  },

  watch: {
    // 深度侦听 chartData 的变化
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart(this.chartData)
      window.addEventListener('resize', this.handleResize)
    })
  },

  beforeDestroy() {
    // 销毁 ECharts 实例
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    // 移除窗口监听事件
    window.removeEventListener('resize', this.handleResize)
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

      this.chart = echarts.init(this.$refs.chartRef, 'macarons')
      this.setOptions(this.chartData)
    },

    /**
     * 设置 ECharts 配置项
     * @param {Array} data - 从 this.chartData 传入的数据
     */
    setOptions(data) {
      if (!this.chart) return
      //计算所有value的总数，并且删除value为0的项
      let pieData = [];
      const total = data.reduce((acc, item) => {
        if (Number(item.value) > 0) {
          acc += Number(item.value)
          pieData.push(item)
        }
        return acc;
      }, 0);
      const option = {
        title: {
          text: this.chartTitle,
          textStyle: {
            color: '#ccc'
          },
          left: 'center'
        },
        color: this.defaultColor,
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: 'transparent', // 完全透明
          borderWidth: 0,
          textStyle: {
            color: '#FFF'
          },
          formatter: (params) => {
            return `总计 ${total} <br/>${params.name} <br/> 值: ${params.value} (${params.percent}%)`;
          }
        },

        legend: {
          show: true,
          orient: 'horizontal',
          type: 'scroll',
          left: '5%',
          right: '5%',
          bottom: '5%',
          height: 60,
          textStyle: {
            color: '#FFF'
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 10, // 如果名称过长，可以尝试减小到 5
          formatter(name) {
            return name // 只显示名称
          }
        },

        series: [
          // 背景装饰0 实心白圆 zlevel: 4
          {
            type: 'pie',
            zlevel: 4,
            radius: ['0%', '7%'],
            center: this.pieCenter,
            silent: true,
            label: {show: false},
            data: [{value: 0, itemStyle: {color: '#FFF'}}]
          },
          // 背景装饰1 半透明圆 zlevel: 3
          {
            type: 'pie',
            radius: ['0%', '15%'],
            center: this.pieCenter,
            zlevel: 3,
            silent: true,
            label: {show: false},
            data: [{value: 0, itemStyle: {color: 'rgba(255,255,255, 0.1)'}}]
          },
          // 背景装饰3 半透明底盘 zlevel: 1
          {
            type: 'pie',
            zlevel: 1,
            radius: ['0%', '65%'], // 匹配缩小后的外圈大小
            center: this.pieCenter,
            silent: true,
            label: {show: false},
            data: [{value: 0, itemStyle: {color: 'rgba(255,255,255, 0.1)'}}]
          },

          // 数据源
          {
            type: 'pie',
            roseType: 'area', // 玫瑰图类型
            clockwise: false,
            center: this.pieCenter,
            zlevel: 2,
            radius: ['15%', '60%'], // 缩小尺寸
            itemStyle: {
              borderRadius: 4
            },
            data: pieData, // 使用传入的数据
            label: {
              normal: {
                formatter: params => {
                  const percentage = params.percent.toFixed(1)
                  return (
                    '{icon|●}{name|' + params.name + '}\n{value|' +
                    ' (' + percentage + '%)}' // 显示 值 (百分比%)
                  )
                },
                rich: {
                  icon: {fontSize: 16, color: 'inherit'},
                  name: {fontSize: 18, padding: [0, 0, 0, 10], color: '#fff'},
                  value: {fontSize: 14, padding: [10, 0, 0, 20], color: '#fff'}
                }
              }
            },
            labelLine: {
              length: 10,
              length2: 10,
              lineStyle: {color: '#fff'}
            }
          }
        ]
      }

      this.chart.setOption(option)
    },

    /**
     * 处理窗口大小变化，重绘图表
     */
    handleResize() {
      if (this.chart) {
        this.chart.resize()
      }
    }

  }
}
</script>

<style scoped>
/* 确保图表容器有正确的布局 */
.chart {
  overflow: hidden;
}
</style>
