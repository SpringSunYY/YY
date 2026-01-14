<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts'
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'PieGhostingCharts',

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
        {value: 12, name: '重大危险源企业', tooltipText: '需要重点监管\n包含一级和二级'},
        {value: 121, name: '危险化学品生产经营单位'},
        {value: 20, name: '加油站', tooltipText: '全市范围内的\n在营加油站'},
        {value: 41, name: '规上企业'},
        {value: 328, name: '粉尘涉爆企业', tooltipText: '重点排查行业'},
        {value: 142, name: '易制毒企业'},
        {value: 95, name: '锂电池企业'},
        {value: 50, name: '其他类型企业A'},
        {value: 30, name: '其他类型企业B'}
      ]
    },
    chartTitle: {
      type: String,
      default: '问题分类'
    },
    // 背景颜色
    backgroundColor: {type: String, default: 'transparent'},
    defaultColor: {
      type: Array,
      default: () => [
        '#002FA7', '#1F6AE1', '#3F8EFC', '#88D9FF', // 克莱因蓝系（理性 / 科技 / 主视觉）
        '#0B3C5D', '#1C5D99', '#3A7CA5', '#7FB7D9', // 深海蓝系（秩序 / 稳定 / 后台）
        '#5AC8FA', '#6BC4FF', '#88D9FF', '#BEE9FF', // 天空蓝系（清爽 / 数据可视化）
        '#5B7CFA', '#6A6FF2', '#8A7CF6', '#A184F3', // 紫蓝过渡系（理性 + 情绪）
        '#5F4B8B', '#7A6C9D', '#9C89B8', '#C1B2D6', // 高级紫系（创造 / 想象）
        '#8C1D18', '#B22222', '#C80000', '#EB5757', // 中国红系（权威 / 关键状态）
        '#9E2A2B', '#B23A48', '#C8553D', '#E07A5F', // 胭脂红系（人文 / 温度）
        '#D4A017', '#EB9C10', '#F2C94C', '#FFE08A', // 金黄系（价值 / 成就）
        '#2E7D32', '#43A047', '#66BB6A', '#A5D6A7', // 东方绿系（生命 / 成长）
        '#1F7A7A', '#2FA4A9', '#6ADBCF', '#BFEFEF', // 青绿系（治愈 / 正反馈）
        '#4ED6E6', '#6FE7F0', '#9FF3F5', '#D6FBFB', // 薄荷青系（轻盈 / 呼吸感）
        '#F48FB1', '#F58AD9', '#E38CEB', '#FFD1E8'  // 樱粉系（情绪点缀）
      ]
    }
  },

  data() {
    return {
      chart: null // ECharts 实例
    }
  },

  watch: {
    // 深度侦听 chartData 的变化
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
     * 初始化图表
     */
    initChart() {
      // 销毁已有实例
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
      this.chart = echarts.init(this.$refs.chartRef);
      this.setOption(this.chartData);
    },
    setOption(data) {
      if (!data || !data.length) {
        return
      }
      const chartData = data

      // 2. 计算指标
      let colorList = []
      let sum = 0
      chartData.map(item => {
        sum += Number(item.value)
        colorList.push(generateRandomColor(this.defaultColor))
      })
      const avg = (sum / chartData.length).toFixed(2)

      const gap = (1 * sum) / 100
      const pieData1 = []
      const pieData2 = []
      const gapData = {
        name: '',
        value: gap,
        itemStyle: {color: 'transparent'},
        tooltip: {show: false} // 间隔不触发提示
      }
      chartData.forEach((item, i) => {
        pieData1.push({
          ...item,
          itemStyle: {
            borderRadius: 10,
            color: colorList[i]
          }
        }, gapData)

        pieData2.push({
          ...item,
          itemStyle: {
            color: colorList[i],
            opacity: 0.21
          }
        }, gapData)
      })

      const chartCenter = ['40%', '50%'] // 统一图表中心点,留出右侧给图例

      this.chart = echarts.init(this.$refs.chartRef)

      const option = {
        backgroundColor: this.backgroundColor,
        // 1. 增加中心标题
        title: {
          text: this.chartTitle,
          subtext: sum,
          left: chartCenter[0],
          top: '43%',
          textAlign: 'center',
          textStyle: {
            color: '#D8DDE3',
            fontSize: 24,
            fontWeight: 'bold',

          },
          subtextStyle: {
            color: '#10EBE3',
            fontSize: 24,
            fontWeight: 'bold',
            padding: [10, 0]
          }
        },
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, .8)',
          textStyle: {color: '#fff'},
          formatter: (params) => {
            if (params.name === '') return null;
            const item = params.data;
            const percent = ((item.value / sum) * 100).toFixed(1);
            let res = '';
            res += `${params.marker}${params.name}: ${params.value} (${percent}%)<br/>`;
            res += `总数: ${sum}<br/>平均值: ${avg}`
            if (item.tooltipText) {
              res += `<br/><span style="color: #aaa; font-size: 12px;">${item.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            return res;
          }
        },
        // 2. 优化 Legend：竖向、分页
        legend: {
          type: 'scroll',      // 开启分页
          orient: 'vertical',  // 竖向排列
          right: '2%',
          top: 'center',
          itemGap: 15,
          itemWidth: 10,
          itemHeight: 10,
          pageIconColor: '#10EBE3',    // 分页按钮颜色
          pageTextStyle: {color: '#fff'},
          textStyle: {
            color: '#D8DDE3',
            fontSize: 16
          },
          // 只显示有名称的数据项
          data: chartData.filter(item => item.name && item.name.trim() !== '').map(item => item.name),
        },
        series: [
          {
            type: 'pie',
            radius: ['78%', '85%'], // 调整半径，给中间标题留空间
            center: chartCenter,
            label: {
              show: true,
              color: '#D8DDE3',
              fontSize: 16,
            },
            data: pieData1
          },
          {
            type: 'pie',
            radius: ['50%', '75%'],
            center: chartCenter,
            silent: true,
            label: {show: false},
            data: pieData2
          },
          {
            type: 'pie',
            center: chartCenter,
            radius: [0, '49%'],
            silent: true,
            label: {show: false},
            itemStyle: {
              color: 'rgba(75, 126, 203,.05)'
            },
            data: [{value: 100, name: ''}]
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
        this.setOption(this.chartData)
      }
    }
  }
}
</script>

<style scoped>
.chart {
  overflow: hidden;
}
</style>
