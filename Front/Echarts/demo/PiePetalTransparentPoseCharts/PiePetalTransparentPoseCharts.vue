<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'PiePetalTransparentPoseCharts',
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
    chartData: {
      type: Array,
      default: () => [
        {name: "退休", value: 61, tooltipText: "已办理退休手续\n享受社保待遇"},
        {name: "下岗", value: 30, tooltipText: "企业编制内\n协议离岗人员"},
        {name: "无业", value: 40},
        {name: "在职", value: 55, tooltipText: "正常缴纳公积金\n在岗人员"},
        {name: "待业", value: 24},
        {name: "其他", value: 36, tooltipText: "包含兼职、自由职业\n等特殊情况"},
      ]
    },
    chartTitle: {
      type: String,
      default: '人员状态分布统计'
    },
    // 是否显示 Total 和 Avg
    showExtraInfo: {
      type: Boolean,
      default: true
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    // 默认配色方案
    defaultColor: {
      type: Array,
      default: () => [
        'rgb(0, 47, 167)', 'rgb(31, 106, 225)', 'rgb(63, 142, 252)', 'rgb(136, 217, 255)',
        'rgb(11, 60, 93)', 'rgb(28, 93, 153)', 'rgb(58, 124, 165)', 'rgb(127, 183, 217)',
        'rgb(90, 200, 250)', 'rgb(107, 196, 255)', 'rgb(136, 217, 255)', 'rgb(190, 233, 255)',
        'rgb(91, 124, 250)', 'rgb(106, 111, 242)', 'rgb(138, 124, 246)', 'rgb(161, 132, 243)',
        'rgb(95, 75, 139)', 'rgb(122, 108, 157)', 'rgb(156, 137, 184)', 'rgb(193, 178, 214)',
        'rgb(140, 29, 24)', 'rgb(178, 34, 34)', 'rgb(200, 0, 0)', 'rgb(235, 87, 87)',
        'rgb(158, 42, 43)', 'rgb(178, 58, 72)', 'rgb(200, 85, 61)', 'rgb(224, 122, 95)',
        'rgb(212, 160, 23)', 'rgb(235, 156, 16)', 'rgb(242, 201, 76)', 'rgb(255, 224, 138)',
        'rgb(46, 125, 50)', 'rgb(67, 160, 71)', 'rgb(102, 187, 106)', 'rgb(165, 214, 167)',
        'rgb(31, 122, 122)', 'rgb(47, 164, 169)', 'rgb(106, 219, 207)', 'rgb(191, 239, 239)',
        'rgb(78, 214, 230)', 'rgb(111, 231, 240)', 'rgb(159, 243, 245)', 'rgb(214, 251, 251)',
        'rgb(244, 143, 177)', 'rgb(245, 138, 217)', 'rgb(227, 140, 235)', 'rgb(255, 209, 232)'
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
    },
    chartTitle() {
      this.setOption(this.chartData);
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
      // 点击事件监听
      this.chart.on('click', (params) => {
        if (params.name && params.data ) {
          this.$emit('item-click', params.data);
        }
      });
      this.setOption(this.chartData);
    },

    setOption(data) {
      if (!data || !data.length) return;

      // 统计计算
      const total = data.reduce((sum, item) => sum + Number(item.value), 0);
      const avg = (total / data.length).toFixed(2);

      // 数据处理：排序并添加半透明样式
      const sortedData = [...data].sort((a, b) => a.value - b.value);
      const seriesData = sortedData.map((item, index) => {
        const baseColor = generateRandomColor(this.defaultColor);
        const transparentColor = baseColor.replace('rgb', 'rgba').replace(')', ', 0.5)');

        return {
          ...item,
          itemStyle: {
            color: transparentColor,
            borderColor: baseColor,
            borderWidth: 2,
            borderRadius: 10 // 圆角效果
          }
        };
      });

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          top: '3%',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          padding: 10,
          backgroundColor: 'rgba(0, 30, 60, 0.9)',
          borderColor: '#0be5ff',
          borderWidth: 1,
          textStyle: {color: '#fff'},
          formatter: (params) => {
            let res = `<div style="line-height:24px;">`;
            res += `<b style="font-size:16px; color:${params.borderColor}">${params.name}</b><br/>`;

            if (this.showExtraInfo) {
              res += `总数：<span style="color:#0be5ff">${total}</span><br/>`;
              res += `平均：<span style="color:#0be5ff">${avg}</span><br/>`;
            }

            res += `当前数值：${params.value}<br/>`;
            res += `占比：${params.percent}%<br/>`;

            if (params.data.tooltipText) {
              const formattedText = params.data.tooltipText.replace(/\n/g, '<br/>');
              res += `<hr style="border:none; border-top:1px solid rgba(255,255,255,0.2); margin:5px 0;" />`;
              res += `<span style="font-size:12px; color:#aaa">${formattedText}</span>`;
            }
            res += `</div>`;
            return res;
          }
        },
        legend: {
          show: true,
          type: 'scroll',
          orient: 'horizontal',
          bottom: '2%',
          left: 'center',
          pageIconColor: '#0be5ff',
          pageTextStyle: {color: '#fff'},
          textStyle: {color: '#8E99B3', fontSize: 14},
          data: sortedData.map(item => item.name)
        },
        series: [
          // 中心装饰圆
          {
            type: "pie",
            silent: true,
            radius: ["0%", "12%"],
            center: ["50%", "50%"],
            label: {show: false},
            data: [{value: 0, itemStyle: {color: '#8E99B3', opacity: 0.3}}],
          },
          // 主玫瑰图层
          {
            name: this.chartTitle,
            type: "pie",
            radius: ["25%", "75%"], // 放大图表占比
            center: ["50%", "50%"],
            roseType: "area",
            avoidLabelOverlap: true,
            label: {
              show: true,
              color: '#fff',
              fontSize: 14,
              formatter: '{percent|{d}%}\n{name|{b}}',
              rich: {
                percent: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#0be5ff',
                },
                name: {
                  color: '#fff',
                  padding: [5, 0],
                  fontSize: 14
                }
              }
            },
            labelLine: {
              length: 15,
              length2: 15,
              smooth: true,
              lineStyle: {color: 'rgba(255, 255, 255, 0.5)'}
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
