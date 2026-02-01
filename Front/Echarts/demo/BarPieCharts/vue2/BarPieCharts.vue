<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/theme/macarons'

import {generateRandomColor} from '@/utils/ruoyi.js'

export default {
  name: 'PieBarCharts',

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
    // 主数据结构
    chartData: {
      type: Array,
      default: () => [
        {
          name: 'AAA',
          tooltipText: '这个比较好\n总体表现优秀', // 饼图自定义提示文本
          values: [
            {name: '9.1', value: 39, tooltipText: '挺不错的\n是的挺不错'},
            {name: '9.2', value: 42, tooltipText: '表现优秀\n继续保持'},
            {name: '9.3', value: 27, tooltipText: '有所下降\n需要关注'},
            {name: '9.4', value: 29, tooltipText: '回升趋势\n正在好转'},
            {name: '9.5', value: 39, tooltipText: '稳定增长\n效果显著'},
            {name: '9.6', value: 36, tooltipText: '持续稳定\n保持良好'},
            {name: '9.7', value: 34, tooltipText: '略有波动\n整体平稳'}
          ]
        },
        {
          name: 'BBB',
          tooltipText: '这个还行\n中规中矩',
          values: [
            {name: '9.1', value: 45, tooltipText: '开局不错\n值得肯定'},
            {name: '9.2', value: 45, tooltipText: '保持稳定\n继续努力'},
            {name: '9.3', value: 34, tooltipText: '有所回落\n注意调整'},
            {name: '9.4', value: 25, tooltipText: '需要改进\n加强管理'},
            {name: '9.5', value: 43, tooltipText: '强势反弹\n表现出色'},
            {name: '9.6', value: 37, tooltipText: '趋于稳定\n良好态势'},
            {name: '9.7', value: 31, tooltipText: '小幅调整\n正常波动'}
          ]
        },
        {
          name: 'CCC',
          tooltipText: '波动较大\n潜力很大',
          values: [
            {name: '9.1', value: 45, tooltipText: '起步良好\n开门红'},
            {name: '9.2', value: 22, tooltipText: '大幅下滑\n需要重视'},
            {name: '9.3', value: 44, tooltipText: '快速恢复\n值得表扬'},
            {name: '9.4', value: 16, tooltipText: '明显下降\n查找原因'},
            {name: '9.5', value: 43, tooltipText: '显著提升\n效果明显'},
            {name: '9.6', value: 37, tooltipText: '平稳运行\n状态良好'},
            {name: '9.7', value: 31, tooltipText: '稳中有进\n继续保持'}
          ]
        }
      ]
    },
    chartName: {type: String, default: 'PieBarChart'},
    backgroundColor: {type: String, default: 'transparent'},
    // 默认颜色池（用于 generateRandomColor）
    defaultColor: {
      type: Array,
      default: () => [
        '#A5DEE4', '#81C7D4', '#24936E', // 示例中的颜色
        '#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86A92',
        '#7262FD', '#269A29', '#8E36BE', '#41A7E2', '#7747A3',
        '#FF7F50', '#FFDAB9', '#ADFF2F', '#00CED1', '#9370DB',
        '#3CB371', '#FF69B4', '#FFB6C1', '#DA70D6', '#98FB98',
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ]
    }
  },

  data() {
    return {
      chart: null, // ECharts 实例
      currentIndex: 0, // 当前聚焦的饼图索引
      piecolor: [], // 动态生成的颜色数组
      pieData: [], // 饼图数据
      grandTotal: 0, // 总和
      option: {} // ECharts 配置项
    }
  },

  watch: {
    // 监听数据变化，重新初始化图表
    chartData: {
      deep: true,
      handler(newData) {
        if (newData && newData.length) {
          this.prepareData(newData)
          this.initChart()
        }
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.chartData && this.chartData.length) {
        this.prepareData(this.chartData)
        this.initChart()
      }
      window.addEventListener('resize', this.handleResize)
    })
  },

  beforeUnmount() {
    this.disposeChart()
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    /**
     * 销毁图表实例
     */
    disposeChart() {
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
    },

    /**
     * 处理数据计算、颜色分配等预处理工作
     */
    prepareData(data) {
      // 1. 生成颜色数组 (基于数据项数量)
      const colorSet = new Set()
      // 从默认颜色中选取，如果不够， generateRandomColor 内部应处理重复或不足
      while (colorSet.size < data.length) {
        colorSet.add(generateRandomColor(this.defaultColor))
      }
      this.piecolor = Array.from(colorSet)

      // 2. 计算饼图数据和总和
      this.grandTotal = 0
      this.pieData = data.map((item, index) => {
        const total = item.values.reduce((sum, bar) => sum + bar.value, 0)
        this.grandTotal += total
        return {
          name: item.name,
          value: total,
          tooltipText: item.tooltipText,
          barTotal: total,
          itemStyle: {
            color: this.piecolor[index] || this.defaultColor[index % this.defaultColor.length]
          }
        }
      })

      // 3. 重置聚焦索引 (如果新数据长度变了)
      if (this.currentIndex >= data.length) {
        this.currentIndex = 0
      }
    },

    /**
     * 初始化图表
     */
    initChart() {
      // 销毁已有实例
      this.disposeChart()

      this.chart = echarts.init(this.$refs.chartRef, 'macarons')
      this.option = this.getOption()
      this.chart.setOption(this.option)
      this.bindEvents() // 绑定点击事件
    },

    /**
     * 获取 ECharts 配置项
     */
    getOption() {
      const {currentIndex, pieData, piecolor, grandTotal, chartData} = this

      return {
        backgroundColor: this.backgroundColor,

        title: [
          {
            // 固定的总标题
            text: this.chartName,
            left: 'center',
            top: 10,
            textStyle: {
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold'
            }
          },
          {
            // 柱状图的动态标题（右侧）
            id: 'barTitle',
            text: chartData[currentIndex].name,
            left: '60%',
            top: 50,
            textStyle: {
              color: piecolor[currentIndex],
              fontSize: 20
            }
          }
        ],

        legend: {
          orient: 'vertical',
          left: '2%',
          top: '20%',
          textStyle: {
            color: '#fff'
          },
          data: pieData.map(item => item.name)
        },

        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderColor: '#333',
          borderWidth: 0,
          shadowBlur: 10,
          padding: 10,
          textStyle: {color: '#fff', fontSize: 14},
          // 统一处理 MarkLine, Pie, Bar 的 Tooltip 逻辑
          formatter: (params) => {

            // 1. 处理 MarkLine 逻辑 (平均值线)
            if (params.componentType === 'markLine') {
              return params.name + ': ' + params.value.toFixed(2);
            }

            // 2. 排除其他非 Series 组件 (如 Grid, Axis)
            if (params.componentType !== 'series') {
              return;
            }

            // 3. 饼图 (Pie/Rose) 的 Tooltip 逻辑
            if (params.seriesType === 'pie') {

              const rawTooltipText = params.data.tooltipText;
              const percent = (params.value / grandTotal * 100).toFixed(2);

              // 统一使用 <br> 换行
              return `${params.name}:
                      ${params.value}/${grandTotal} (${percent}%)<br/>
                      ${rawTooltipText.replace(/\n/g, '<br/>')}`;
            }

            // 4. 柱状图 (Bar) 的 Tooltip 逻辑
            else if (params.seriesType === 'bar') {

              const currentBarData = chartData[this.currentIndex];
              const barItem = currentBarData.values[params.dataIndex];
              const barTotal = currentBarData.values.reduce((sum, bar) => sum + bar.value, 0);

              const rawTooltipText = barItem.tooltipText;
              if (rawTooltipText) {
                // 统一使用 <br> 换行
                return `${currentBarData.name}<br/>
                      ${barItem.name}：${barItem.value}<br/>
                      总数: ${barTotal}<br/>
                      ${rawTooltipText.replace(/\n/g, '<br/>')}`;
              } else {
                return `${currentBarData.name}<br/>
                      ${barItem.name}：${barItem.value}<br/>
                      总数: ${barTotal}`;
              }

            }
            // 默认返回
            return params.name + ': ' + params.value;
          }
        },
        grid: {
          top: 60,
          bottom: 70,
          left: '50%',
          width: '45%'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
          },
          {type: 'inside', xAxisIndex: [0], start: 0, end: 100}
        ],
        xAxis: {
          type: 'category',
          data: chartData[currentIndex].values.map(item => item.name), // 动态数据
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          nameTextStyle: {
            color: '#fff'
          },
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          }
        },

        series: [
          {
            // 饼图（左侧）
            type: 'pie',
            center: ['25%', '50%'],
            radius: ['10%', '28%'],
            roseType: 'area',
            // 初始设置高亮
            data: pieData.map((item, index) => {
              return {
                name: item.name,
                value: item.value,
                tooltipText: item.tooltipText,
                itemStyle: {
                  color: piecolor[index],
                  // 初始高亮当前索引项
                  borderColor: index === currentIndex ? '#fff' : 'transparent',
                  borderWidth: index === currentIndex ? 3 : 0
                }
              }
            }),
            label: {
              color: '#fff'
            },
            emphasis: {
              itemStyle: {
                borderColor: 'transparent',
                borderWidth: 0
              }
            }
          },
          {
            // 柱状图（右侧）
            type: 'bar',
            barWidth: 15,
            data: chartData[currentIndex].values.map(item => item.value), // 动态数据
            itemStyle: {
              color: piecolor[currentIndex], // 动态颜色
              barBorderRadius: 8
            },
            // 平均值线
            markLine: {
              symbol: 'none',
              data: [
                {
                  type: 'average',
                  name: '平均值'
                }
              ],
              lineStyle: {
                color: '#FFD700',
                width: 2,
                type: 'dashed'
              },
              label: {
                show: true,
                position: 'end',
                color: '#FFD700',
                formatter: function (params) {
                  return '平均值: ' + params.value.toFixed(2);
                }
              }
            }
          }
        ]
      }
    },

    /**
     * 绑定饼图点击事件，实现联动
     */
    bindEvents() {
      if (!this.chart) return

      this.chart.on('click', (params) => {
        if (params.seriesType === 'pie') {
          // 更新当前聚焦索引
          this.currentIndex = params.dataIndex;
          const newIndex = this.currentIndex
          const newBarData = this.chartData[newIndex]
          const newColor = this.piecolor[newIndex]

          // 1. 更新柱状图的动态标题 (title[1])，并更新颜色
          this.option.title[1].text = newBarData.name;
          this.option.title[1].textStyle.color = newColor;

          // 2. 更新柱状图数据和颜色
          this.option.series[1].data = newBarData.values.map(item => item.value);
          this.option.series[1].itemStyle.color = newColor;
          this.option.dataZoom[0].backgroundColor = newColor;

          // 3. 更新 x 轴数据
          this.option.xAxis.data = newBarData.values.map(item => item.name);

          // 4. 更新饼图高亮状态
          this.option.series[0].data = this.pieData.map((item, index) => {
            return {
              ...item, // 保持原有数据和 itemStyle.color
              itemStyle: {
                ...item.itemStyle,
                // 设置选中项的边框
                borderColor: index === newIndex ? '#fff' : 'transparent',
                borderWidth: index === newIndex ? 3 : 0
              }
            }
          });

          // 5. 刷新图表
          this.chart.setOption(this.option, true);
        }
      });
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
.chart {
  overflow: hidden;
}
</style>
