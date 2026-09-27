<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarRateAutoCarouselCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    chartData: {
      type: Array,
      default: () => ([
          {name: '2012年', value: 451, tooltipText: '年初推广活动\n效果显著'},
          {name: '2013年', value: 352, tooltipText: '政策调整期间'},
          {name: '2014年', value: 303},
          {name: '2015年', value: 534},
          {name: '2016年', value: 95},
          {name: '2017年', value: 236},
          {name: '2018年', value: 217}
        ]
      )
    },
    chartName: {type: String, default: '项目数'},
    autoPlay: {type: Boolean, default: true}, // 默认开启自动轮播
    colorMain: {type: String, default: 'rgb(255,81,141)'}
  },

  data() {
    return {
      chart: null,
      timer: null,
      count: 0
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
      if (newVal) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    },
    width() {
      this.handleResize();
    },
    height() {
      this.handleResize();
    }
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
    window.removeEventListener('resize', this.handleResize);
    const chartEl = this.$refs.chartRef;
    if (chartEl) {
      chartEl.removeEventListener('mouseover', this.handleMouseOver);
      chartEl.removeEventListener('mouseout', this.handleMouseOut);
    }
  },

  methods: {
    hexToRgba(opacity) {
      const incompleteRgbaMatch = this.colorMain.match(/rgba\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (incompleteRgbaMatch) {
        const r = parseInt(incompleteRgbaMatch[1]);
        const g = parseInt(incompleteRgbaMatch[2]);
        const b = parseInt(incompleteRgbaMatch[3]);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      const rgbMatch = this.colorMain.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      const rgbaMatch = this.colorMain.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1]);
        const g = parseInt(rgbaMatch[2]);
        const b = parseInt(rgbaMatch[3]);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return `rgba(255, 81, 141, ${opacity})`;
    },

    /**
     * 初始化图表
     */
    initChart() {
      if (!this.$refs.chartRef) return;

      this.chart = echarts.init(this.$refs.chartRef);

      // 绑定事件
      window.addEventListener('resize', this.handleResize);
      this.$refs.chartRef.addEventListener('mouseover', this.handleMouseOver);
      this.$refs.chartRef.addEventListener('mouseout', this.handleMouseOut);

      this.setOptions();
    },

    /**
     * 配置项设置
     */
    setOptions() {
      if (!this.chart || !this.chartData || !this.chartData?.length) return;

      const names = []
      const values = []
      this.chartData.forEach(item => {
        names.push(item.name)
        values.push(item.value)
      });
      const total = values.reduce((sum, current) => Number(sum) + Number(current), 0);
      const chartName = this.chartName;

      const option = {
        title: {
          text: chartName,
          left: "2%",
          top: "8%",
          textStyle: {color: this.hexToRgba(1), fontSize: 18}
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {type: 'none'},
          position: (point, params, dom, rect, size) => {
            let x = point[0];
            let y = point[1];
            if (x + size.contentSize[0] > size.viewSize[0]) x -= size.contentSize[0];
            if (y + size.contentSize[1] > size.viewSize[1]) y -= size.contentSize[1];
            return [x, y];
          },
          formatter: params => {
            const name = params[0].name;
            const projectData = params.find(p => p.seriesName === chartName);
            if (!projectData) return '';
            const percent = total > 0 ? ((projectData.value / total) * 100).toFixed(1) : 0;
            return `
              <div style="font-size: 14px;color: #FFFFFF;margin-bottom:8px;">${projectData.seriesName}</div>
              <div style="font-size: 14px;color: #FFFFFF;">${name}：${projectData.value} (${percent}%)</div>
            `;
          },
          extraCssText: 'opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;border:none;'
        },
        legend: {
          data: [chartName],
          top: "20",
          left: 'center',
          textStyle: {color: this.hexToRgba(0.6)}
        },
        dataZoom: [
          {type: 'inside', xAxisIndex: 0},
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: '5%',
            textStyle: {color: this.hexToRgba(0.6)},
            showDetail: false,
            fillerColor: this.hexToRgba(0.2),
            handleStyle: {color: this.hexToRgba(0.8)},
            borderColor: 'transparent'
          }
        ],
        grid: {top: '20%', right: '20', left: '10', bottom: '15%', containLabel: true},
        xAxis: {
          type: 'category',
          data: names,
          axisLine: {lineStyle: {color: this.hexToRgba(0.4)}},
          axisLabel: {color: this.hexToRgba(0.6)}
        },
        yAxis: [{
          type: 'value',
          axisLabel: {color: this.hexToRgba(0.6)},
          splitLine: {lineStyle: {color: this.hexToRgba(0.1), type: "dashed"}}
        }],
        series: [
          {
            type: 'bar',
            name: chartName,
            data: values.map(v => {
              const percent = total > 0 ? ((v / total) * 100).toFixed(1) : 0;
              return {value: v, percent};
            }),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: this.colorMain},
                {offset: 1, color: this.hexToRgba(0.1)}
              ]),
              borderRadius: [10, 10, 0, 0]
            },
            barWidth: 12,
            label: {
              show: true,
              position: 'top',
              formatter: params => params.data.percent + '%',
              color: this.hexToRgba(1),
              fontSize: 11
            }
          },
          {
            type: 'line',
            name: chartName,
            data: values,
            symbolSize: 8,
            smooth: true,
            lineStyle: {color: this.colorMain, width: 2},
            itemStyle: {color: this.colorMain},
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: this.hexToRgba(0.3)},
                {offset: 1, color: this.hexToRgba(0)}
              ])
            }
          }
        ]
      };
      this.chart.setOption(option, true);
    },

    /**
     * 自动轮播动画
     */
    startAnimation() {
      this.stopAnimation();
      if (!this.chart || !this.chartData.length) return;

      const dataLength = this.chartData.length;
      this.timer = setInterval(() => {
        // 取消之前的高亮
        this.chart.dispatchAction({type: 'downplay', seriesIndex: 1});
        const dataIndex = this.count % dataLength;
        // 高亮当前点并显示 Tooltip
        this.chart.dispatchAction({type: 'highlight', seriesIndex: 1, dataIndex});
        this.chart.dispatchAction({type: 'showTip', seriesIndex: 1, dataIndex});
        this.count++;
      }, 2000);
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
      if (this.autoPlay) this.stopAnimation();
    },

    handleMouseOut() {
      if (this.autoPlay) this.startAnimation();
    }
  }
};
</script>

<style scoped>
.chart {
  overflow: hidden;
}
</style>
