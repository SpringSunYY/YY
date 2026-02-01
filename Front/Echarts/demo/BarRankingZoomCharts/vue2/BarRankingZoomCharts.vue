<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {generateRandomColor} from "@/utils/ruoyi";

export default {
  name: 'BarRankingZoomCharts',
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
        {name: '年休假', value: 683, tooltipText: '核心指标\n已使用：400\n剩余：283'},
        {name: '加班调休', value: 523, tooltipText: '近期加班产生'},
        {name: '病假', value: 345},
        {name: '事假', value: 234},
        {name: '婚假', value: 234},
        {name: '产假', value: 450},
        {name: '工伤假', value: 120},
        {name: '探亲假', value: 80},
        {name: '年休假YY', value: 683, tooltipText: '核心指标\n已使用：400\n剩余：283'},
        {name: '加班调休YY', value: 523, tooltipText: '近期加班产生'},
        {name: '病假YY', value: 345},
        {name: '事假YY', value: 234},
        {name: '婚假YY', value: 234},
        {name: '产假YY', value: 450},
        {name: '工伤假YY', value: 120},
        {name: '探亲假YY', value: 80}
      ]
    },
    chartTitle: {
      type: String,
      default: '排行榜高级轮播'
    },
    showExtraInfo: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    // 显示的数据条数
    displayCount: {
      type: Number,
      default: 6
    },
    // 轮播间隔（毫秒）
    playInterval: {
      type: Number,
      default: 2000
    },
    // 方向：'left' 或 'right'
    direction: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value)
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 颜色配置
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
      timer: null,
      startIndex: 0,
      sortedData: []
    };
  },
  computed: {
    isRight() {
      return this.direction === 'right';
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(newData) {
        this.sortedData = this.sortData(newData);
        this.setOption(this.sortedData);
        this.resetRotation();
      }
    },
    chartTitle() {
      this.setOption(this.sortedData);
    },
    backgroundColor() {
      this.setOption(this.sortedData);
    },
    autoPlay(val) {
      if (val) {
        this.startRotation();
      } else {
        this.stopRotation();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.sortedData = this.sortData(this.chartData);
      this.initChart();
      window.addEventListener('resize', this.handleResize);
    });
  },
  beforeDestroy() {
    this.stopRotation();
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // 数据排序
    sortData(data) {
      return [...data].sort((a, b) => b.value - a.value);
    },

    // 获取渐变颜色
    getGradientColor(index) {
      const pair = this.defaultColor[index % this.defaultColor.length];
      return new echarts.graphic.LinearGradient(
        this.isRight ? 0 : 1, 0,
        this.isRight ? 1 : 0, 0,
        [
          {offset: 0, color: generateRandomColor(this.defaultColor)},
          {offset: 1, color: generateRandomColor(this.defaultColor)}
        ]
      );
    },

    initChart() {
      if (this.chart) this.chart.dispose();
      this.chart = echarts.init(this.$refs.chartRef);

      // 点击事件监听
      this.chart.on('click', (params) => {
        if (params.componentType === 'series' && params.seriesName === '主数据柱') {
          const item = this.sortedData[params.dataIndex];
          if (item) {
            this.$emit('item-click', {
              ...item,
              rank: params.dataIndex + 1
            });
          }
        }
      });

      // 鼠标事件控制轮播
      if (this.autoPlay) {
        this.chart.getZr().on('mousemove', this.stopRotation);
        this.chart.getZr().on('mousedown', this.stopRotation);
        this.chart.getZr().on('globalout', this.startRotation);
      }

      // dataZoom 事件
      this.chart.on('dataZoom', (params) => {
        const value = params.batch ? params.batch[0].startValue : params.startValue;
        if (typeof value === 'number') {
          this.startIndex = Math.ceil(value);
        }
      });

      this.setOption(this.sortedData);

      if (this.autoPlay) {
        this.startRotation();
      }
    },

    setOption(data) {
      if (!data || !data.length) return;

      // 统计计算
      const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);
      const avg = (total / data.length).toFixed(2);

      const titlename = data.map(item => item.name);
      const valdata = data.map(item => item.value);

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
          left: 'center',
          top: '2%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(14, 33, 71, 0.9)',
          borderColor: '#56A7FF',
          borderWidth: 1,
          borderRadius: 8,
          padding: [12, 18],
          textStyle: {
            color: '#fff',
            fontSize: 13
          },
          extraCssText: 'box-shadow: 0 0 10px rgba(0,0,0,0.5); backdrop-filter: blur(4px);',
          formatter: (params) => {
            const i = params[0].dataIndex;
            const item = data[i];
            const rank = i + 1;
            const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;

            let res = `<div style="line-height:26px;">
                <span style="color:#FFD700; font-weight:bold; font-size:16px;">Top ${rank}</span>
                <span style="margin-left:10px; font-size:15px; font-weight:bold;">${item.name}</span><br/>
                <div style="border-top:1px dashed rgba(255,255,255,0.3); margin:6px 0;"></div>
                数值: <span style="color:#56A7FF; font-weight:bold;">${item.value}</span>
                <span style="color:rgba(255,255,255,0.6); margin-left:10px;">(占比: ${percent}%)</span><br/>`;

            if (this.showExtraInfo) {
              res += `当前总额: <span style="color:#00E08B;">${total}</span><br/>`;
              res += `平均数值: <span style="color:#00E08B;">${avg}</span><br/>`;
            }

            if (item.tooltipText) {
              res += `<div style="background:rgba(255,255,255,0.05); padding:5px 8px; border-radius:4px; margin-top:8px; color:#F8B448; font-size:12px; line-height:18px;">
                            ${item.tooltipText.replace(/\n/g, '<br/>')}
                        </div>`;
            }
            return res + '</div>';
          }
        },
        grid: {
          left: this.isRight ? '8%' : '6%',
          right: this.isRight ? '6%' : '8%',
          bottom: '1%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          show: false,
          inverse: !this.isRight
        },
        yAxis: [
          {
            show: true,
            data: titlename,
            inverse: true,
            position: this.isRight ? 'left' : 'right',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
              color: '#fff',
              fontSize: 14,
              margin: 10,
              formatter: (value) => {
                return value.length > 4 ? value.substring(0, 4) : value;
              }
            }
          },
          {
            show: true,
            inverse: true,
            data: valdata,
            position: this.isRight ? 'right' : 'left',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
              color: '#56D0E3',
              fontSize: 14,
              fontWeight: 'bold',
              formatter: (value) => value
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0, 1],
            startValue: this.startIndex,
            endValue: this.startIndex + this.displayCount - 1,
            width: 8,
            right: this.isRight ? '2%' : 'auto',
            left: this.isRight ? 'auto' : '2%',
            zoomLock: true,
            fillerColor: '#56A7FF',
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderColor: 'transparent',
            handleSize: 0,
            showDetail: false
          },
          {
            type: 'inside',
            yAxisIndex: [0, 1],
            zoomLock: true
          }
        ],
        series: [
          {
            name: '背景底色',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: valdata.map(() => 100),
            barWidth: 28,
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,0.05)',
                barBorderRadius: 14
              }
            },
            silent: true
          },
          {
            name: '主数据柱',
            type: 'bar',
            yAxisIndex: 0,
            data: valdata.map((v, idx) => {
              return {
                value: v,
                itemStyle: {
                  color: this.getGradientColor(idx)
                }
              };
            }),
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: 14
              }
            },
            label: {
              show: true,
              position: this.isRight ? 'insideLeft' : 'insideRight',
              offset: [this.isRight ? -5 : 5, -22],
              formatter: (params) => `{rank|NO.${params.dataIndex + 1}}`,
              rich: {
                rank: {
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 'bold',
                  padding: [3, 8],
                  borderRadius: 10,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  textShadowBlur: 2,
                  textShadowColor: '#000'
                }
              }
            }
          }
        ]
      };

      this.chart.setOption(option, true);
    },

    // 开始轮播
    startRotation() {
      if (!this.autoPlay || this.sortedData.length <= this.displayCount) return;

      this.stopRotation();

      this.timer = setInterval(() => {
        if (this.startIndex > this.sortedData.length - this.displayCount) {
          this.startIndex = 0;
        }

        if (this.chart) {
          this.chart.setOption({
            dataZoom: [{
              startValue: this.startIndex,
              endValue: this.startIndex + this.displayCount - 1
            }]
          });
        }

        this.startIndex++;
      }, this.playInterval);
    },

    // 停止轮播
    stopRotation() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    // 重置轮播
    resetRotation() {
      this.startIndex = 0;
      this.stopRotation();
      if (this.autoPlay) {
        this.$nextTick(() => {
          this.startRotation();
        });
      }
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
