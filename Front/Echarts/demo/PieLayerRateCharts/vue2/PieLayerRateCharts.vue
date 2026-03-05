<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'PieLayerRateCharts',
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
      default: '访问来源'
    },
    chartData: {
      type: Array,
      default: () => [
        {name: '场馆运行', value: 5},
        {name: '场馆安全', value: 5},
        {name: '医疗服务安全', value: 6},
        {name: '技术故障', value: 3}
      ]
    },
    // 基础颜色配置（循环使用）
    colorList: {
      type: Array,
      default: () =>  [
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
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    // 饼图中心位置
    chartCenter: {
      type: Array,
      default: () => ['50%', '45%']
    },
    // 内环半径
    radiusInnerRing: {
      type: Array,
      default: () => ['48%', '59%']
    },
    // 外环半径
    radiusOuterRing: {
      type: Array,
      default: () => ['62%', '64%']
    },
    // 装饰圈1半径
    radiusDecoration1: {
      type: Array,
      default: () => ['68.5%', '68.7%']
    },
    // 装饰圈2半径
    radiusDecoration2: {
      type: Array,
      default: () => ['68.5%', '69.1%']
    },
    // 是否在 tooltip 中显示总计/平均等额外信息
    showExtraInfo: {
      type: Boolean,
      default: true
    },
    // label 是否显示 value 数值
    labelShowValue: {
      type: Boolean,
      default: true
    },
    // label / 图例名称最大显示长度，超出截断
    maxLabelLength: {
      type: Number,
      default: 4
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
    backgroundColor() {
      this.setOption(this.chartData);
    },
    showExtraInfo() {
      this.setOption(this.chartData);
    },
    labelShowValue() {
      this.setOption(this.chartData);
    },
    maxLabelLength() {
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
    // 动态生成颜色数组（根据数据量自动循环）
    generateColorList(baseColors, dataLength) {
      const result = [];
      let colorList=[]
      for (let i = 0; i < dataLength; i++) {
        const items = generateRandomColor(baseColors);
        colorList.push(items);
        result.push(items);
        result.push(''); // 间隔
      }
      return [result, colorList];
    },

    // 生成带透明度的颜色数组
    generateColorList2(baseColors, dataLength) {
      const result = [];
      for (let i = 0; i < dataLength; i++) {
        const color = baseColors[i % baseColors.length];
        const hex = color.startsWith('#') ? color.slice(1) : color;
        const rgba = hex.match(/.{2}/g).map(x => parseInt(x, 16));
        result.push(`rgba(${rgba[0]},${rgba[1]},${rgba[2]}, 0.8)`);
        result.push(''); // 间隔
      }
      return result;
    },

    initChart() {
      if (this.chart) this.chart.dispose();
      this.chart = echarts.init(this.$refs.chartRef);

      // 点击事件监听
      this.chart.on('click', (params) => {
        if (params.name && params.name !== '' && params.data && params.data.originItem) {
          this.$emit('item-click', params.data.originItem);
        }
      });

      this.setOption(this.chartData);
    },

    setOption(data) {
      if (!data || !data.length) return;

      const totalValue = data.reduce((sum, item) => sum + Number(item.value || 0), 0);
      const avgValue = (totalValue / data.length).toFixed(2);

      const [colorList1,colors] = this.generateColorList(this.colorList, data.length);
      const colorList2 = this.generateColorList2(colors, data.length);

      let valueSum = 0;
      const optionData = [];

      data.forEach((item, index) => {
        valueSum += Number(item.value || 0);
        optionData.push({
          value: item.value,
          name: item.name,
          tooltipText: item.tooltipText || '',
          originItem: item  // 保存原始数据，用于点击事件
        });
        optionData.push({
          name: '',
          value: valueSum / 100,
          itemStyle: {color: 'transparent'}
        });
      });

      const valueOnlyData = data.map(item => ({value: item.value, name: item.name, originItem: item}));

      const option = {
        backgroundColor: this.backgroundColor,
        tooltip: {
          trigger: 'item',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          textStyle: {
            color: '#fff'
          },
          formatter: (params) => {
            if (params.name === '') return '';
            const value = params.value;
            const percent = ((value / valueSum) * 100).toFixed(2);
            let res = `${params.name}<br/>数值：${value} (${percent}%)`;
            if (this.showExtraInfo) {
              res += `<br/><div style="border-top:1px solid rgba(255,255,255,0.2);margin:4px 0;"></div>`;
              res += `总计：${totalValue}<br/>平均：${avgValue}`;
            }
            if (params.data && params.data.tooltipText) {
              res += `<div style="border-top:1px solid rgba(255,255,255,0.2);margin:4px 0;"></div>`;
              res += `<span style="color:#bbb;font-size:12px;">${params.data.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            return res;
          }
        },
        title: {
          text: '{a|' + valueSum + '}{b|\n' + this.chartTitle + '}',
          left: this.chartCenter[0],
          top: '38%',
          itemGap: 10,
          textStyle: {
            rich: {
              a: {
                color: '#2793FF',
                fontSize: 30,
                fontWeight: 600
              },
              b: {
                color: '#ffffff',
                fontSize: 18
              }
            }
          },
          textAlign: 'center'
        },

        legend: {
          show: true,
          icon: 'none',
          orient: 'horizontal',
          bottom: '10%',
          left: 'center',
          type: 'scroll',
          maxHeight: 50,
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 1,
          inactiveColor: '#666',
          pageButtonItemGap: 1,
          pageButtonGap: 1,
          pageIconColor: '#2793FF',
          pageIconInactiveColor: '#666',
          pageIconSize: 12,
          pageTextStyle: {
            color: '#FFF',
            fontSize: 12
          },
          formatter: (name) => {
            return `{iconName|}{name|${name}}`;
          },
          textStyle: {
            color: '#FFF',
            fontSize: 16,
            rich: {
              name: {
                color: 'inherit',
                fontSize: 16,
                width: 80,
                padding: [0, 5, 0, 5]
              }
            }
          },
          data: data.map((dItem, dIndex) => ({
            name: dItem.name.length > this.maxLabelLength
              ? dItem.name.substring(0, this.maxLabelLength)
              : dItem.name,
            textStyle: {
              rich: {
                iconName: {
                  width: 16,
                  height: 16,
                  borderRadius: 2,
                  backgroundColor: this.colorList[dIndex % this.colorList.length]
                }
              }
            }
          }))
        },

        series: [
          {
            // 饼图圈（内部环）
            type: 'pie',
            zlevel: 3,
            radius: this.radiusInnerRing,
            center: this.chartCenter,
            legendHoverLink: true,
            itemStyle: {
              normal: {
                color: (params) => colorList2[params.dataIndex]
              }
            },
            label: {
              show: true,
              position: 'outside',
              formatter: (params) => {
                if (params.name === '') return '';
                const displayName = params.name.length > this.maxLabelLength
                  ? params.name.substring(0, this.maxLabelLength)
                  : params.name;
                return this.labelShowValue ? `${displayName}: ${params.value}` : displayName;
              },
              color: '#FFF',
              fontSize: 14
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 20,
              lineStyle: {
                color: '#FFF',
                width: 1
              }
            },
            data: optionData.map(item => {
              if (item.name === '') {
                return {
                  ...item,
                  label: {show: false},
                  labelLine: {show: false}
                };
              }
              return item;
            })
          },
          {
            // 最外圆圈（外部环）
            type: 'pie',
            zlevel: 1,
            radius: this.radiusOuterRing,
            center: this.chartCenter,
            legendHoverLink: true,
            itemStyle: {
              normal: {
                color: (params) => colorList1[params.dataIndex]
              }
            },
            label: {
              show: false
            },
            data: optionData
          },
          {
            // 细线圈（装饰用）
            type: 'pie',
            radius: this.radiusDecoration1,
            center: this.chartCenter,
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                shadowBlur: 1,
                shadowColor: 'rgba(15, 79, 150, 0.61)',
                color: 'rgba(23,138,173,1)'
              }
            },
            label: {
              show: false
            },
            data: [0]
          },
          {
            // 最外一个圈（装饰用）
            type: 'pie',
            radius: this.radiusDecoration2,
            center: this.chartCenter,
            hoverAnimation: false,
            clockWise: false,
            color: [
              '#55c2e200',
              'rgba(23,138,173,1)',
              '#ff5a6100',
              '#ff5a6100'
            ],
            label: {
              show: false
            },
            data: valueOnlyData
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
