<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'PieRoseLineCharts',
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
        {value: 63, name: '容量小设备老旧', tooltipText: '设备服役年限>15年\n需近期更换'},
        {value: 27, name: '季节性企业用电', tooltipText: '夏季用电高峰期'},
        {value: 7, name: '企业用电高峰'},
        {value: 13, name: '节假日', tooltipText: '法定节假日补偿'},
        {value: 10, name: '临时用电'},
        {value: 6, name: '三相用电不平衡', tooltipText: '负载分配不均'},
        {value: 73, name: '小设备老旧', tooltipText: '设备服役年限>15年\n需近期更换'},
        {value: 57, name: '企业用电', tooltipText: '夏季用电高峰期'},
        {value: 70, name: '用电高峰'},
      ]
    },
    chartTitle: {
      type: String,
      default: '用电异常原因分析'
    },
    // 允许外部开启额外信息统计
    showExtraInfo: {
      type: Boolean,
      default: true
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
    // 将十六进制颜色转换为带透明度的 rgba
    hexToRgba(hex, opacity) {
      let rgba = 'rgba(60,170,211,0.05)'; // 默认回退色
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        let color = hex.substring(1);
        if (color.length === 3) {
          color = color.split('').map(s => s + s).join('');
        }
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return rgba;
    },

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

      // 为每个数据项生成样式
      const seriesData = data.map((item) => {
        // 随机颜色
        const baseColor = generateRandomColor ? generateRandomColor(this.defaultColor) : this.defaultColor[Math.floor(Math.random() * this.defaultColor.length)];

        return {
          ...item,
          itemStyle: {
            borderColor: baseColor,
            borderWidth: 2,
            shadowBlur: 20,
            shadowColor: baseColor,
            // 使用 hexToRgba 生成 0.05 透明度的填充背景
            color: this.hexToRgba(baseColor, 0.05)
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
            color: '#3bd2fe',
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#3bd2fe',
          borderWidth: 1,
          textStyle: {color: '#fff'},
          formatter: (params) => {
            let res = '';
            if (this.showExtraInfo) {
              res += `总数: ${total} | 平均值: ${avg}<br/>`;
              res += `<hr style="border:0.3px solid #555;margin:5px 0;"/>`;
            }
            res += `${params.name} : ${params.value} (${params.percent}%)`;
            if (params.data.tooltipText) {
              res += `<br/><span style="color:#3bd2fe; font-size:12px;">说明：${params.data.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            return res;
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          bottom: '1%',
          left: 'center',
          pageIconColor: '#3bd2fe',
          pageTextStyle: {color: '#fff'},
          textStyle: {
            color: '#d0fffc',
            fontSize: 12
          },
          data: data.map(item => item.name)
        },
        // 隐藏坐标轴逻辑（极坐标配置）
        polar: {radius: ['10%', '80%']},
        angleAxis: {
          type: 'category',
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {show: false},
          splitLine: {show: false}
        },
        radiusAxis: {
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {show: false},
          splitLine: {show: false}
        },
        series: [{
          type: 'pie',
          radius: ['15%', '75%'],
          roseType: 'radius',
          center: ['50%', '55%'],
          startAngle: 100,
          avoidLabelOverlap: true,
          data: seriesData,
          label: {
            formatter: ['{b|{b}}', '{d|{d}%}'].join('\n'),
            rich: {
              b: {color: '#3bd2fe', fontSize: 13, lineHeight: 20},
              d: {color: '#d0fffc', fontSize: 14, fontWeight: 'bold'},
            }
          },
          labelLine: {
            lineStyle: {color: '#0096b1'},
            length: 15,
            length2: 10
          }
        }]
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
