<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'ScatterRippleCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    chartTitle: {type: String, default: '人员构成分布'},
    chartData: {
      type: Array,
      default: () => [
        {name: "电力热力", value: 130, max: 150, min: 100, tooltipText: "电力供应与热力生产"},
        {name: "管理员", value: 80, max: 100, min: 50},
        {name: "护工", value: 600, max: 700, min: 400},
        {name: "志愿者", value: 50}
      ]
    },
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
    },
    // 最小比例
    minSize: {type: Number, default: 0.1},
    // 最大比例
    maxSize: {type: Number, default: 0.2},
    // 是否显示额外统计信息
    showExtraInfo: {type: Boolean, default: false}
  },
  data() {
    return {
      chart: null,
      totalSum: 0,
      avgVal: 0 // 平均值
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
     * 带碰撞检测的随机位置生成（优化响应式尺寸）
     */
    generateBubbleData() {
      if (!this.chart) return [];

      const datas = [];
      const maxVal = Math.max(...this.chartData.map(d => d.value));

      // 1. 根据容器大小计算像素尺寸
      const chartW = this.chart.getWidth();
      const chartH = this.chart.getHeight();
      const baseSize = Math.min(chartW, chartH);
      const minPixelSize = baseSize * this.minSize;
      const maxPixelSize = baseSize * this.maxSize;

      this.chartData.forEach((item) => {
        // 根据比例映射实际像素大小
        const currentSize = minPixelSize + (item.value / maxVal) * (maxPixelSize - minPixelSize);

        let x, y, isOverlap;
        let attempts = 0;

        do {
          isOverlap = false;
          x = Math.floor(Math.random() * 60) + 20;
          y = Math.floor(Math.random() * 60) + 30;
          attempts++;

          for (let i = 0; i < datas.length; i++) {
            const prev = datas[i];
            const dx = x - prev.value[0];
            const dy = y - prev.value[1];
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 安全间距：映射到坐标系（0-100）
            const minDistance = (currentSize + prev.symbolSize) / (baseSize / 50);
            if (distance < minDistance) {
              isOverlap = true;
              break;
            }
          }
        } while (isOverlap && attempts < 100);

        datas.push({
          name: item.name,
          value: [x, y],
          symbolSize: currentSize,
          tooltipText: item.tooltipText || item.name,
          rawValue: item.value,
          max: item.max, // 透传最大值
          min: item.min, // 透传最小值
          itemStyle: {
            normal: {
              color: generateRandomColor(this.defaultColor),
              opacity: 0.9,
              shadowBlur: 15,
              shadowColor: 'rgba(0,0,0,0.2)'
            }
          }
        });
      });
      return datas;
    },

    initChart() {
      if (!this.$refs.chartRef) return;
      if (this.chart) this.chart.dispose();
      this.chart = echarts.init(this.$refs.chartRef);
      this.setOptions();
    },

    setOptions() {
      if (!this.chart) return;

      // 1. 计算总计与平均值
      const count = this.chartData.length;
      this.totalSum = this.chartData.reduce((sum, item) => sum + (item.value || 0), 0);
      this.avgVal = count > 0 ? (this.totalSum / count).toFixed(2) : 0;

      const processedData = this.generateBubbleData();

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          left: 'center',
          top: 20,
          textStyle: {color: '#fff', fontSize: 20}
        },
        dataZoom: [
          // X 轴内置缩放
          {type: 'inside', xAxisIndex: 0, minSpan: 60},
          {type: 'inside', yAxisIndex: 0, minSpan: 60},
        ],
        tooltip: {
          show: true,
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#555',
          textStyle: {color: '#fff'},
          formatter: (params) => {
            const d = params.data;
            const percentage = ((d.rawValue / this.totalSum) * 100).toFixed(2);

            let res = `<div style="line-height:22px; padding: 5px;">`;

            // 额外统计信息展示
            if (this.showExtraInfo) {
              res += `<div style="border-bottom: 1px solid #666; margin-bottom: 5px;">
                        <b style="color:#FFD700">总计: ${this.totalSum}</b>&nbsp;&nbsp;
                        <b style="color:#00FF7F">平均: ${this.avgVal}</b>
                      </div>`;
            }
            res += `<b>${d.name}: ${d.rawValue}</b> <small>(${percentage}%)</small>`;
            // 显式最大值/最小值
            if (d.max !== undefined || d.min !== undefined) {
              res += `<br/><span style="font-size:12px; color:#ccc;">范围: ${d.min ?? '-'} ~ ${d.max ?? '-'}</span>`;
            }
            if (d.tooltipText) {
              res += `<br/><span style="color:#00FFFF; font-size:12px;">${d.tooltipText}</span>`;
            }
            res += `</div>`;
            return res;
          }
        },
        grid: {left: 0, right: 0, top: 0, bottom: 0},
        xAxis: {type: 'value', show: false, min: 0, max: 100},
        yAxis: {type: 'value', show: false, min: 0, max: 100},
        series: [{
          type: 'effectScatter',
          symbol: 'circle',
          label: {
            normal: {
              show: true,
              formatter: '{b}',
              color: '#fff',
              textStyle: {fontSize: '14'} // 建议根据 baseSize 动态调整，或固定较小值
            }
          },
          data: processedData
        }]
      };

      this.chart.setOption(option);
    },

    handleResize() {
      if (this.chart) {
        this.chart.resize();
        // Resize 时重新计算气泡大小和位置，保持比例正确
        this.setOptions();
      }
    }
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
