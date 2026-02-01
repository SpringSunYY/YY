<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarAvgCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    autoResize: {type: Boolean, default: true},
    autoPlay: {type: Boolean, default: true}, // 开启自动轮播
    chartName: {type: String, default: '实际完工数统计'},
    chartTitle: {type: Array, default: () => ['每日新增', '趋势']},
    chartData: {
      type: Object,
      default: () => ({
        names: [
          '2021/09/01', '2021/09/02', '2021/09/03', '2021/09/04', '2021/09/05',
          '2021/09/06', '2021/09/07', '2021/09/08', '2021/09/09', '2021/09/10',
          '2021/09/11', '2021/09/12'
        ],
        values: [67, 97, 80, 76, 52, 63, 24, 97, 56, 78, 84, 45]
      })
    }
  },

  data() {
    return {
      chart: null,
      timer: null,
      currentIndex: 0
    };
  },

  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setOptions();
      }
    },
    autoPlay(newVal) {
      newVal ? this.startAnimation() : this.stopAnimation();
    },
    // 监听宽高变化并重绘
    width: 'handleResize',
    height: 'handleResize'
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart();
      if (this.autoPlay) {
        this.startAnimation();
      }
    });
  },

  beforeDestroy() {
    this.stopAnimation();
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
    // 移除事件监听
    window.removeEventListener('resize', this.handleResize);
    const chartEl = this.$refs.chartRef;
    if (chartEl) {
      chartEl.removeEventListener('mouseover', this.handleMouseOver);
      chartEl.removeEventListener('mouseout', this.handleMouseOut);
    }
  },

  methods: {
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = echarts.init(this.$refs.chartRef);

      // 绑定 Resize 和 鼠标悬停事件
      if (this.autoResize) {
        window.addEventListener('resize', this.handleResize);
      }
      this.$refs.chartRef.addEventListener('mouseover', this.handleMouseOver);
      this.$refs.chartRef.addEventListener('mouseout', this.handleMouseOut);

      this.setOptions();
    },

    setOptions() {
      if (!this.chart || !this.chartData.names) return;

      const xData = this.chartData.names;
      const yData = this.chartData.values;

      // 逻辑计算：总和 & 平均值
      const totalSum = yData.reduce((a, b) => Number(a) + Number(b), 0);
      const averageValue = (totalSum / yData.length).toFixed(2);

      const option = {
        title: {
          text: this.chartName,
          left: "2%",
          top: "2%",
          textStyle: {color: "#fff", fontSize: 18}
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'shadow'},
          backgroundColor: 'rgba(6,37,68,0.9)',
          borderColor: '#45D0E3',
          textStyle: {color: '#45D0E3'},
          formatter: (params) => {
            const xAxisCategory = params[0].axisValue;
            const currentValue = params[0].value;
            const idx = params[0].dataIndex;

            let diffText = '0';
            if (idx > 0) {
              const prev = yData[idx - 1];
              const diff = currentValue - prev;
              const symbol = diff > 0 ? '↑' : (diff < 0 ? '↓' : '');
              diffText = `${symbol} ${Math.abs(diff)}`;
            }

            return `
              <div style="font-weight:bold;margin-bottom:5px;">${xAxisCategory}</div>
              数值: ${currentValue} <span style="font-size:12px;">(${diffText})</span><br/>
              <hr style="border:none;border-top:1px dashed #45D0E3;margin:5px 0;">
              总计: ${totalSum}<br/>
              平均: ${averageValue}
            `;
          }
        },
        grid: {left: '20px', right: '20px', bottom: '60px', top: '16%', containLabel: true},
        legend: {
          data: this.chartTitle,
          left: 'center',
          top: '5%',
          textStyle: {color: '#45D0E3'}
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
            height: 15,
            bottom: 10,
            backgroundColor: '#0A2D4F',
            fillerColor: '#45D0E380',
            borderColor: '#45D0E3',
            handleStyle: {color: '#45D0E3'},
            textStyle: {color: '#45D0E3'}
          },
          {type: 'inside', xAxisIndex: [0]}
        ],
        xAxis: {
          type: 'category',
          data: xData,
          axisLine: {lineStyle: {color: '#45D0E3'}},
          axisLabel: {color: '#45D0E3', fontSize: 12}
        },
        yAxis: {
          type: 'value',
          axisLabel: {color: '#45D0E3'},
          splitLine: {lineStyle: {type: 'dashed', color: 'rgba(69, 208, 227, 0.3)'}}
        },
        series: [
          {
            name: this.chartTitle[0],
            type: 'bar',
            data: yData,
            barWidth: 12,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#45D0E3'},
                {offset: 1, color: '#083885'}
              ]),
              borderRadius: [5, 5, 0, 0]
            },
            label: {show: true, position: 'top', color: '#45D0E3', fontSize: 10},
            markLine: {
              symbol: 'none',
              label: {show: false},
              lineStyle: {color: '#FFD700', type: 'dashed', width: 2},
              data: [{type: 'average', name: '平均值'}]
            }
          },
          {
            name: this.chartTitle[1],
            type: 'line',
            data: yData,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {color: '#FFD700'},
            lineStyle: {color: '#45D0E3', width: 2}
          }
        ]
      };

      this.chart.setOption(option, true);
    },

    startAnimation() {
      this.stopAnimation();
      const dataLen = this.chartData.names?.length || 0;
      if (dataLen === 0) return;

      this.timer = setInterval(() => {
        if (!this.chart) return;

        // 取消之前的高亮
        this.chart.dispatchAction({type: 'downplay', seriesIndex: 0});

        const index = this.currentIndex % dataLen;
        // 显示当前索引的提示框和高亮
        this.chart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: index});
        this.chart.dispatchAction({type: 'showTip', seriesIndex: 0, dataIndex: index});

        this.currentIndex++;
      }, 3000);
    },

    stopAnimation() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    handleResize() {
      this.chart && this.chart.resize();
    },

    handleMouseOver() {
      this.stopAnimation();
    },

    handleMouseOut() {
      if (this.autoPlay) this.startAnimation();
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
