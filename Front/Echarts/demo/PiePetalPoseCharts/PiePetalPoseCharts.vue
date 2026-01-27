<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'PiePetalPoseCharts',
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
        {name: '年休假', value: 40, tooltipText: '法定额度\n今年已休10天'},
        {name: '事假', value: 15, tooltipText: '个人私事处理'},
        {name: '病假', value: 25, tooltipText: '医生证明\n全薪'},
        {name: '调休', value: 60, tooltipText: '加班补偿'},
        {name: '婚假', value: 10}
      ]
    },
    chartTitle: {
      type: String,
      default: '假期统计'
    },
    showExtraInfo: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#000'
    },
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
    },
    // 图表位置配置
    pieCenter: {
      type: Array,
      default: () => ['40%', '55%']
    },
    // 半径大小配置
    radiusSize: {
      type: Array,
      default: () => ['16%', '90%']
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
    },
    chartTitle() {
      this.setOption(this.chartData);
    },
    backgroundColor() {
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
      if (this.chart) this.chart.dispose();
      this.chart = echarts.init(this.$refs.chartRef);

      // 点击事件监听
      this.chart.on('click', (params) => {
        if (params.name && params.data && params.data.originItem) {
          this.$emit('item-click', params.data.originItem);
        }
      });

      this.setOption(this.chartData);
    },

    setOption(data) {
      if (!data || !data.length) return;

      // 统计计算
      const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);
      const avg = (total / data.length).toFixed(2);

      // 处理数据并添加随机颜色
      const seriesData = data.map((item, index) => {
        const color = generateRandomColor(this.defaultColor);

        return {
          name: item.name,
          value: item.value,
          originItem: item, // 保存原始数据，用于点击事件
          tooltipText: item.tooltipText,
          itemStyle: {
            color: color
          }
        };
      });

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          textStyle: {
            color: '#FFF',
            fontSize: 20
          },
          top: 20,
          left: 20
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50, 50, 50, 0.8)',
          borderColor: '#777',
          borderWidth: 1,
          padding: [10, 15],
          textStyle: {
            color: '#fff'
          },
          formatter: (params) => {
            if (!params || !params.name) return '';

            const data = params.data;
            const percent = params.percent + '%';

            let res = `<div style="font-weight:bold;margin-bottom:5px;border-bottom:1px solid #777">${params.name}</div>`;
            res += `数值：${data.value} (${percent})<br/>`;

            if (this.showExtraInfo) {
              res += `总计：${total} | 平均：${avg}<br/>`;
            }

            if (data.tooltipText) {
              res += `<span style="color: #FFEF00">说明：${data.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }

            return res;
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: '2%',
          top: 'middle',
          textStyle: {
            color: '#FFF'
          },
          itemGap: 15,
          formatter: (name) => name,
          data: data.map(item => item.name)
        },
        color: this.defaultColor,
        series: [
          // 背景装饰层
          {
            type: 'pie',
            zlevel: 1,
            radius: ['0%', '85%'],
            center: this.pieCenter,
            silent: true,
            label: {
              show: false
            },
            data: [{
              value: 0,
              itemStyle: {
                color: 'rgba(255,255,255,0.05)'
              }
            }]
          },
          // 内部装饰环（最小）
          {
            type: 'pie',
            zlevel: 4,
            radius: ['0%', '10%'],
            center: this.pieCenter,
            silent: true,
            label: {
              show: false
            },
            data: [{
              value: 0,
              itemStyle: {
                color: '#FFF'
              }
            }]
          },
          // 内部装饰环（中等）
          {
            type: 'pie',
            zlevel: 3,
            radius: ['0%', '22%'],
            center: this.pieCenter,
            silent: true,
            label: {
              show: false
            },
            data: [{
              value: 0,
              itemStyle: {
                color: 'rgba(255,255,255, 0.4)'
              }
            }]
          },
          // 数据主体层（玫瑰图）
          {
            name: '数据主体',
            type: 'pie',
            roseType: 'area',
            zlevel: 2,
            clockwise: false,
            center: this.pieCenter,
            radius: this.radiusSize,
            itemStyle: {
              borderRadius: 8,
              borderColor: this.backgroundColor,
              borderWidth: 2
            },
            label: {
              show: true,
              color: '#ddd',
              formatter: '{b}: {c}'
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
}
</style>
