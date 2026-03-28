<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'ScatterRandomTooltipCharts',
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
    chartTitle: {
      type: String,
      default: '行业分布占比图'
    },
    // 数据格式兼容性：支持 name, value, tooltipText
    chartData: {
      type: Array,
      default: () => [
        {name: "电力热力", value: 130, tooltipText: "电力供应与热力生产"},
        {name: "水利环境", value: 150, tooltipText: "水利管理及环境治理"},
        {name: "批发零售", value: 130},
        {name: "制造业", value: 170, tooltipText: "高端装备制造业"},
        {name: "房地产", value: 140, tooltipText: "住宅与商业地产"},
        {name: "交通运输", value: 70, tooltipText: "物流与公共交通"},
        {name: "居民服务", value: 140},
        {name: "教育", value: 130, tooltipText: "高等教育与职业培训"}
      ]
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    // 调色盘
    defaultColor: {
      type: Array,
      default: () => [
        '#2ca1ff', '#0adbfa', '#febe13', '#65e5dd',
        '#7b2cff', '#fd5151', '#f071ff', '#85f67a',
        '#0baefd', '#fdcd0b', '#0bfdab', '#ff5353',
        '#ff72cb', '#8488ff', '#A5DEE4', '#81C7D4', '#24936E',
        '#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86A92',
        '#7262FD', '#269A29', '#8E36BE', '#41A7E2', '#7747A3',
        '#FF7F50', '#FFDAB9', '#ADFF2F', '#00CED1', '#9370DB',
        '#3CB371', '#FF69B4', '#FFB6C1', '#DA70D6', '#98FB98',
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ]
    },
    // 是否显示总数和平均值
    showExtraInfo: {
      type: Boolean,
      default: true
    },
    symbolSize: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      chart: null,
      totalSum: 0
    };
  },
  watch: {
    chartData: {
      handler() {
        this.setOptions();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener('resize', this.handleResize);
    });
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    /**
     * 初始化图表
     */
    initChart() {
      if (!this.$refs.chartRef) return;

      if (this.chart) {
        this.chart.dispose();
      }
      this.chart = echarts.init(this.$refs.chartRef);
      this.setOptions();
      // 点击事件监听
      this.chart.on('click', (params) => {
        if (params.name && params.data) {
          this.$emit('item-click', params.data);
        }
      });
    },
    setOptions() {

      // 1. 计算总计
      this.totalSum = this.chartData.reduce((sum, item) => sum + (item.value || 0), 0);
      // 2. 处理数据映射
      const processedData = this.chartData.map((item, index) => {
        const percentage = ((item.value / this.totalSum) * 100).toFixed(2);
        // 气泡大小逻辑：基于占比，设定基准大小
        const symbolSize = (item.value / this.totalSum) * this.symbolSize;
        const color = generateRandomColor(this.defaultColor)
        return {
          name: item.name,
          // 随机位置：10-90，配合坐标轴-30到130的范围实现大边距
          value: [
            Math.floor(Math.random() * 80) + 5,
            Math.floor(Math.random() * 80) + 5
          ],
          symbolSize: Math.max(symbolSize, 50),
          realValue: item.value,
          percentage: percentage,
          tooltipText: item.tooltipText || '',
          itemStyle: {
            normal: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                {offset: 0.2, color: "rgba(27, 54, 72, 0.3)"},
                {offset: 1, color: color}
              ]),
              borderColor: color,
              borderWidth: 2
            }
          }
        };
      });

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          left: 'center',
          top: 20,
          textStyle: {color: '#fff', fontSize: 20}
        },
        // 提示框逻辑：支持总计显示和动态tooltipText
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#555',
          textStyle: {color: '#fff'},
          formatter: (params) => {
            const d = params.data;
            const avg = (this.totalSum / this.chartData.length).toFixed(2);
            let res = `<div style="line-height:22px;">`;
            if (this.showExtraInfo) {
              res += `<b style="color:#FFD700">总计: ${this.totalSum}</b><br/> `;
              res += `<b style="color:#00FFFF">平均: ${avg}</b><br/>`;
              res += `<hr style="border:0.3px solid #555;margin:5px 0;"/>`;
            }
            res += `${d.name}: ${d.realValue} (${d.percentage}%)`;
            if (d.tooltipText) {
              res += `<hr style="border:0.3px solid #555;margin:5px 0;"/>`;
              res += `<span style="color:#00FFFF">${d.tooltipText}</span>`;
            }
            res += `</div>`;
            return res;
          }
        },
        // 缩放控制逻辑
        dataZoom: [
          // X 轴内置缩放
          {type: 'inside', xAxisIndex: 0, minSpan: 60},
          {type: 'inside', yAxisIndex: 0, minSpan: 60},
        ],
        grid: {
          top: 40,
          bottom: 40,
          left: 10,
          right: 10
        },
        xAxis: {
          type: "value",
          show: false,
          min: -10, // 边距留白
          max: 100
        },
        yAxis: {
          type: "value",
          show: false,
          min: -10,
          max: 100
        },
        series: [{
          type: "scatter",
          data: processedData,
          label: {
            show: true,
            formatter: "{b}",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14
          },
          // 优化缩放体验，减小更新延迟
          animationDurationUpdate: 400
        }]
      };

      this.chart.setOption(option);
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  }
};
</script>

<style scoped>
/* 确保容器有高度 */
.chart {
  min-height: 400px;
}
</style>
