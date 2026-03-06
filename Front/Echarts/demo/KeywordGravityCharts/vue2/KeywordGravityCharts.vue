<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'KeywordGravityCharts',

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
    chartName: {
      type: String,
      default: '一天的时间流逝'
    },
    chartData: {
      type: Array,
      default: () => [
        {name: '听音乐', value: 2},
        {name: '看电影', value: 12},
        {name: '跑步', value: 22},
        {name: '瑜伽', value: 42},
        {name: '发呆', value: 52},
        {name: '阅读', value: 62},
        {name: '敲代码', value: 72},
        {name: '收纳', value: 80},
        {name: '熬夜', value: 65},
        {name: '旅行', value: 24},
        {name: '创作', value: 72},
        {name: '悲伤', value: 72},
        {name: '开心', value: 72}
      ]
    },
    fontSizeRange: {
      type: Array,
      default: () => [24, 48]
    },
    defaultColor: {
      type: Array,
      default: () => [
        '#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86A92',
        '#7262FD', '#269A29', '#8E36BE', '#41A7E2', '#7747A3',
        '#FF7F50', '#FFDAB9', '#ADFF2F', '#00CED1', '#9370DB'
      ]
    },
    maxLabelLength: {
      type: Number,
      default: 4
    },
    // 是否显示 Total 和 Avg
    showExtraInfo: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      chart: null,
      isFirstRender: true // 记录是否是第一次渲染
    };
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

  watch: {
    chartData: {
      handler() {
        // 数据变化时更新，重新初始化图表
        this.initChart();
      },
      deep: true
    }
  },

  methods: {
    calculateTotal(data) {
      return data.reduce((sum, item) => Number(sum) + (Number(item.value) || 0), 0);
    },

    getMinMaxValue(data) {
      if (!data || data.length === 0) return {min: 0, max: 0};
      const values = data.map(item => item.value);
      return {min: Math.min(...values), max: Math.max(...values)};
    },

    getFontSize(value, minDataValue, maxDataValue, minFontSize, maxFontSize) {
      if (maxDataValue === minDataValue) return minFontSize;
      const valueRatio = (value - minDataValue) / (maxDataValue - minDataValue);
      return minFontSize + valueRatio * (maxFontSize - minFontSize);
    },

    truncateName(name, maxLength) {
      if (!name) return '';
      let width = 0;
      let result = '';
      for (const char of name) {
        const isFullWidth = /[\u4E00-\u9FFF]/.test(char) || char.charCodeAt(0) > 255;
        width += isFullWidth ? 1 : 0.5;
        if (width > maxLength) break;
        result += char;
      }
      return result;
    },

    initChart() {
      const data = this.chartData;
      if (!data || data.length === 0) return;

      // 如果实例不存在才初始化，存在则复用
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chartRef);
      }
      this.isFirstRender = false;
      // 事件绑定
      this.chart.off('click');
      this.chart.on('click', (params) => {
        if (params.dataType === 'node') {
          this.$emit('item-click', params.data);
        }
      });
      this.setOption();
    },
    setOption() {
      const data = this.chartData;
      if (!data || data.length === 0) return;
      const {min: minChartValue, max: maxChartValue} = this.getMinMaxValue(data);
      const total = this.calculateTotal(data);
      const avg = data.length > 0 ? (total / data.length).toFixed(2) : 0;

      const seriesData = data.map((item) => {
        const calculatedFontSize = this.getFontSize(
          item.value,
          minChartValue,
          maxChartValue,
          this.fontSizeRange[0],
          this.fontSizeRange[1]
        );

        return {
          name: item.name,
          value: item.value,
          label: {
            show: true,
            formatter: () => this.truncateName(item.name, this.maxLabelLength),
            color: generateRandomColor(this.defaultColor),
            fontSize: calculatedFontSize
          },
          tooltipText: item.tooltipText,
          itemStyle: {color: 'rgba(0,0,0,0)', borderWidth: 0},
          symbolSize: calculatedFontSize * 1.4, // 球体大小
        };
      });

      const option = {
        title: {
          show: true,
          text: this.chartName,
          textStyle: {fontSize: 16, color: '#ffffff'},
          top: '5%', left: '5%',
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (params) => {
            const percentage = total > 0 ? ((params.data.value / total) * 100).toFixed(1) : '0.0';
            let res = `${params.data.name}: ${params.data.value} (${percentage}%)`;
            if (this.showExtraInfo) {
              res += `<br/><hr style="margin: 5px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.2)"/>`;
              res += `Total: ${total}<br/>Avg: ${avg}`;
            }
            if (params.data.tooltipText) {
              res += `<br/><div style="margin-top:8px; padding:8px; background:rgba(91, 143, 249, 0.2); border-left: 3px solid #5B8FF9; font-size:12px; line-height:1.5;">
                        ${params.data.tooltipText.replace(/\n/g, '<br/>')}
                      </div>`;
            }
            return res;
          },
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {color: '#fff'}
        },
        series: [{
          // 添加缩放控制配置
          scaleLimit: {
            min: 0.5,   // 最小缩放比例
            max: 2     // 最大缩放比例
          },
          // 控制缩放灵敏度
          zoomSensitivity: 2,  // 默认为1，降低值可减缓缩放速度
          type: 'graph',
          layout: 'force',
          roam: 'scale',
          force: {
            repulsion: 100,
            gravity: 0.5,
            edgeLength: 3,
            friction: 0.5,
            layoutAnimation: true
          },
          data: seriesData,
          lineStyle: {opacity: 0},
          animationDuration: 1500,
          animationEasing: 'cubicOut'
        }]
      };

      // 核心：设置 notMerge 为 false，不强制刷新整个图表
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
.chart {
  padding: 10px;
  box-sizing: border-box;
}
</style>
