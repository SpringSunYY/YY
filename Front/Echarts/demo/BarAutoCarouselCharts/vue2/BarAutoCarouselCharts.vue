<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarAutoCarouselCharts',
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
    autoPlay: {type: Boolean, default: true} // 默认开启自动轮播
  },

  data() {
    return {
      chart: null,
      timer: null,
      count: 0
    };
  },

  watch: {
    // 监听数据变化更新图表
    chartData: {
      deep: true,
      handler() {
        this.setOptions();
      }
    },
    // 监听自动播放开关
    autoPlay(newVal) {
      if (newVal) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    },
    // 监听宽高变化
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
     * 计算图表指标
     */
    calculateChartMetrics(names, values) {
      const total = values.reduce((sum, current) => Number(sum) + Number(current), 0);
      const average = (total / values.length).toFixed(2);
      const diffData = values.map((value, index) => {
        if (index === 0) return '-';
        const prevValue = values[index - 1];
        const diff = value - prevValue;
        const isIncrease = diff > 0;
        return {
          value: diff,
          isIncrease: isIncrease,
          percent: ((Math.abs(diff) / (prevValue || 1)) * 100).toFixed(2) + '%'
        };
      });
      return {total, average, diffData};
    },

    /**
     * 配置项设置
     */
    setOptions() {
      if (!this.chart || !this.chartData || !this.chartData?.length) return;

      let names = []
      const values = []
      this.chartData.forEach(item => {
        names.push(item.name)
        values.push(item.value)
      });
      const {total, average, diffData} = this.calculateChartMetrics(names, values);
      const chartName = this.chartName;

      const option = {
        title: {
          text: chartName,
          left: "2%",
          top: "8%",
          textStyle: {color: "#fff", fontSize: 18}
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
            const currentIndex = names.indexOf(name);
            const diffInfo = diffData[currentIndex];
            const diffText = diffInfo === '-' ? `上一期：-` : `上一期：${diffInfo.isIncrease ? '↑' : '↓'} ${Math.abs(diffInfo.value)}个 (${diffInfo.percent})`;

            return `
              <div style="font-size: 14px;color: #FFFFFF;margin-bottom:12px;">${name}</div>
              <div style="font-size: 14px;color: #FFFFFF;margin-bottom:4px;">${projectData.seriesName}：${projectData.value}</div>
              <div style="font-size: 14px;color: #FFFFFF;margin-bottom:4px;">${diffText}</div>
              <div style="font-size: 14px;color: #FFFFFF;margin-top:12px;">总计：${total} | 平均：${average}</div>
            `;
          },
          extraCssText: 'opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;border:none;'
        },
        legend: {
          data: [chartName],
          top: "20",
          left: 'center',
          textStyle: {color: "#82AFC6"}
        },
        dataZoom: [
          {type: 'inside', xAxisIndex: 0},
          {
            type: 'slider',
            xAxisIndex: 0,
            height: 20,
            bottom: '5%',
            textStyle: {color: '#82AFC6'},
            showDetail: false
          }
        ],
        grid: {top: '20%', right: '20', left: '10', bottom: '12%', containLabel: true},
        xAxis: {
          type: 'category',
          data: names,
          axisLine: {lineStyle: {color: "#1a6d84"}},
          axisLabel: {color: '#82AFC6'}
        },
        yAxis: [{
          type: 'value',
          axisLabel: {color: '#82AFC6'},
          splitLine: {lineStyle: {color: 'rgba(49, 218, 255, 0.5)', type: "dashed"}}
        }],
        series: [
          {
            type: 'bar',
            name: chartName,
            data: values,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(49, 218, 255, 1)'},
                {offset: 1, color: 'rgb(8,56,133)'}
              ]),
              borderRadius: [10, 10, 0, 0]
            },
            barWidth: 12,
            markLine: {
              data: [{name: '平均值', yAxis: average}],
              symbol: 'none',
              lineStyle: {type: 'dashed', color: '#FFD700', width: 2},
              label: {show: false}
            }
          },
          {
            type: 'line',
            name: chartName,
            data: values,
            symbolSize: 8,
            smooth: true,
            lineStyle: {color: "rgba(6, 201, 112, 1)", width: 2},
            itemStyle: {color: "rgba(6, 201, 112, 1)"},
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(6, 201, 112, 0.3)'},
                {offset: 1, color: 'rgba(47,145,255,0)'}
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
