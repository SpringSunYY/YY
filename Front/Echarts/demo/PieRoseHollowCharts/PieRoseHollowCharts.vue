<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'PieRoseHollowCharts',
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
    // 模拟数据结构，支持 tooltipText
    chartData: {
      type: Array,
      default: () => [
        {name: "形式主义", value: 20, tooltipText: "基层负担过重\n会议偏多"},
        {name: "官僚主义", value: 20, tooltipText: "办事推诿\n不作为现象"},
        {name: "享乐主义", value: 30},
        {name: "奢靡之风", value: 40, tooltipText: "违规吃喝\n公车私用"},
        {name: "年休假", value: 40, tooltipText: "年度法定假期\n已休天数统计"}
      ]
    },
    chartTitle: {
      type: String,
      default: '风险预警分析统计'
    },
    // 是否显示 Total 和 Avg
    showExtraInfo: {
      type: Boolean,
      default: false
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
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(newData) {
        this.setOption(newData);
      }
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
    initChart() {
      if (this.chart) {
        this.chart.dispose();
      }
      this.chart = echarts.init(this.$refs.chartRef);
      this.setOption(this.chartData);
    },

    setOption(data) {
      if (!data || !data.length) return;

      const total = data.reduce((sum, item) => sum + Number(item.value), 0);
      const avg = (total / data.length).toFixed(2);

      const seriesData = data.map((item, index) => {
        // 优先使用传入的随机函数，否则根据索引取色
        const baseColor = typeof generateRandomColor === 'function'
          ? generateRandomColor(this.defaultColor)
          : this.defaultColor[index % this.defaultColor.length];

        return {
          ...item,
          itemStyle: {
            color: baseColor,
            borderRadius: 8, // 继承原生JS的圆角
            borderColor: '#fff',
            borderWidth: 1
          }
        };
      });

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: "item",
          backgroundColor: 'rgba(0, 40, 70, 0.9)',
          borderColor: '#03e0ff',
          borderWidth: 1,
          textStyle: {color: '#fff'},
          formatter: params => {
            let res = `<div style="line-height:24px;">`;
            res += `<b style="font-size:16px">${params.name}</b><br/>`;
            res += `数值: ${params.value} (${params.percent}%)<br/>`;

            // 额外统计信息
            if (this.showExtraInfo) {
              res += `<hr style="border:0;border-top:1px solid rgba(255,255,255,0.2);margin:5px 0;">`;
              res += `总和: ${total}<br/>`;
              res += `平均: ${avg}<br/>`;
            }

            // 自定义详情文本提示
            if (params.data.tooltipText) {
              res += `<hr style="border:0;border-top:1px solid rgba(255,255,255,0.2);margin:5px 0;">`;
              res += `<span style="color:#03e080">详情提示：</span><br/>`;
              res += params.data.tooltipText.replace(/\n/g, '<br/>');
            }

            res += `</div>`;
            return res;
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          bottom: '2%',
          left: 'center',
          pageIconColor: '#03e0ff',
          pageTextStyle: {color: '#fff'},
          itemGap: 15,
          textStyle: {
            color: "#fff",
            fontSize: 14
          },
          data: data.map(item => item.name)
        },
        series: [
          {
            name: "风险预警",
            type: "pie",
            radius: ["30%", "75%"],
            center: ["50%", "50%"],
            roseType: "radius", // 南丁格尔玫瑰图
            avoidLabelOverlap: true,
            itemStyle: {},
            label: {
              show: true,
              fontSize: 14,
              color: '#fff',
              formatter: params => {
                return params.name + '\n' + params.percent + "%";
              }
            },
            labelLine: {
              length: 15,
              length2: 10,
              smooth: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.5)'
              }
            },
            data: seriesData
          }
        ]
      };

      this.chart.setOption(option, true);
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize();
        this.setOption(this.chartData)
      }
    }
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
