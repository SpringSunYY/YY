<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
// 注意：请确保此路径下有 generateRandomColor 工具函数，如果没有，请参考下方附带的工具代码
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'PieRoundCharts',
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
    // 外部传入的数据
    chartData: {
      type: Array,
      default: () => [
        {value: 38, name: "刑满释放人员", tooltipText: "近期释放人员\n需重点关注"},
        {value: 145, name: "社区矫正人员", tooltipText: "在册矫正人员"},
        {value: 45, name: "吸毒人员", tooltipText: "定期尿检人员"},
        {value: 21, name: "邪教人员"},
        {value: 51, name: "艾滋病", tooltipText: "医疗帮扶对象"},
        {value: 9, name: "重点青少年", tooltipText: "帮教对象"},
      ]
    },
    // 图表标题
    chartTitle: {
      type: String,
      default: '重点人员趋势'
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    // 默认备选颜色池
    defaultColor: {
      type: Array,
      default: () => [
        '#88D9FF', '#0092FF', '#81EDD2', '#B0FA93',
        '#63F2FF', '#9999FE', '#115FEA', '#10EBE3',
        '#10A9EB', '#EB9C10', '#2E10EB', '#9B10EB',
        '#F2E110', '#C1232B', '#27727B', '#5AD8A6',
        '#5D7092', '#F6BD16', '#E86A92', '#7262FD',
        '#269A29', '#8E36BE', '#41A7E2', '#7747A3',
        '#FF7F50', '#FFDAB9', '#ADFF2F', '#00CED1',
        '#9370DB', '#3CB371', '#FF69B4', '#FFB6C1',
        '#DA70D6', '#98FB98', '#FF6B6B', '#4ECDC4',
        '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ]
    }
  },
  data() {
    return {
      chart: null
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
        this.chart = null;
      }
      this.chart = echarts.init(this.$refs.chartRef);
      this.setOption(this.chartData);

    },
    setOption(data) {
      if (!data || !data.length) return;
      // 1. 数据处理与颜色分配
      const total = data.reduce((per, cur) => per + Number(cur.value), 0);
      const avg = (total / data.length).toFixed(2);
      const colorList = data.map(() => generateRandomColor(this.defaultColor));

      // 2. 构造间隙数据 (Gap)
      const gap = (1 * total) / 100;
      const gapData = {
        name: "",
        value: gap,
        itemStyle: {color: "transparent"},
        label: {show: false},
        labelLine: {show: false},
        tooltip: {show: false}
      };

      const pieData1 = []; // 外层数据层
      const pieData2 = []; // 内层修饰层

      data.forEach((item, i) => {
        pieData1.push({
          ...item,
          itemStyle: {
            borderRadius: 10,
            color: colorList[i]
          }
        }, gapData);

        pieData2.push({
          ...item,
          itemStyle: {
            color: colorList[i],
            opacity: 0.21,
          },
        }, gapData);
      });

      const chartCenter = ['50%', '50%'];

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          subtext: total.toString(),
          left: "center",
          top: "40%",
          itemGap: 15,
          textStyle: {color: "#f5f5f6", fontSize: 18, fontWeight: "bold"},
          subtextStyle: {color: "#f5f5f6", fontSize: 40, fontWeight: "bold"},
        },
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderWidth: 0,
          textStyle: {color: "#fff"},
          formatter: (params) => {
            if (!params.name) return null;
            const dataItem = data.find(item => item.name === params.name);
            const ratio = ((params.value / total) * 100).toFixed(2) + '%';

            let str = `<div style="line-height:24px;">
              <span style="font-weight:bold;">统计概览</span><br/>
              总计：${total} | 平均：${avg}<br/>
              <hr style="border-color:rgba(255,255,255,0.2)"/>
              <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>
              ${params.name}：${params.value} (${ratio})`;

            if (dataItem && dataItem.tooltipText) {
              str += `<br/><span style="color:#aaa;font-size:12px;">说明：${dataItem.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            str += `</div>`;
            return str;
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          bottom: '1%',
          left: 'center',
          icon: 'circle',
          itemGap: 20,
          textStyle: {color: '#ffffff', fontSize: 14},
          pageTextStyle: {color: '#fff'},
          data: data.map(item => item.name)
        },
        series: [
          {
            name: '数据层',
            type: 'pie',
            radius: ['78%', '85%'],
            center: chartCenter,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {d}%',
              color: '#fff',
              fontSize: 14
            },
            labelLine: {
              show: true,
              lineStyle: {color: 'rgba(255,255,255,0.3)'}
            },
            data: pieData1
          },
          {
            name: '修饰背景层',
            type: 'pie',
            radius: ['65%', '77%'],
            center: chartCenter,
            silent: true,
            label: {show: false},
            data: pieData2
          },
          // 刻度盘修饰层
          {
            type: 'gauge',
            radius: '60%',
            center: chartCenter,
            startAngle: 90,
            endAngle: -269.9999,
            splitNumber: 60,
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
            splitLine: {
              show: true,
              length: 5,
              lineStyle: {width: 2, color: 'rgb(33,85,130)'},
            },
            pointer: {show: false},
            detail: {show: false},
          },
          // 中心最内层阴影
          {
            type: 'pie',
            center: chartCenter,
            radius: [0, '50%'],
            silent: true,
            itemStyle: {color: 'rgba(75, 126, 203,.1)'},
            data: [{value: 100}]
          }
        ],
      };

      this.chart.setOption(option,true);
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
