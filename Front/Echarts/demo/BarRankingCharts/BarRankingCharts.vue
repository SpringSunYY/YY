<template>
  <div
    :class="className"
    :style="{ height, width }"
    ref="chartRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @wheel="handleWheel"
  ></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarRankingCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    // 基础数据
    chartData: {
      type: Array,
      default: () => [
        {"name": "沈河区", "value": 3143, "tooltipText": "沈阳市中心"},
        {"name": "皇姑区", "value": 2889, "tooltipText": "教育资源"},
        {"name": "新民市", "value": 2844, "tooltipText": "农产品基地"},
        {"name": "于洪区", "value": 2736, "tooltipText": "物流仓储"},
        {"name": "铁西区", "value": 2367, "tooltipText": "老工业基地"},
        {"name": "大东区", "value": 2229, "tooltipText": "汽车产业"},
        {"name": "沈北新区", "value": 2168, "tooltipText": "大学城"},
        {"name": "苏家屯区", "value": 1941, "tooltipText": "沈阳南大门"},
        {"name": "康平县", "value": 1918, "tooltipText": "风能发电"},
        {"name": "和平区", "value": 1827, "tooltipText": "商业街"}
      ]
    },
    chartTitle: {type: String, default: '沈阳市各区县数据排行榜'},
    showCount: {type: Number, default: 8}, // 每屏显示数量
    intervalTime: {type: Number, default: 2500}, // 轮播间隔
    direction: {
      type: String,
      default: 'right',
      validator: (v) => ['left', 'right'].includes(v)
    },
    showLabelSize: {type: Number, default: 6},// 显示的标签字符长度
  },

  data() {
    return {
      chart: null,
      timer: null,
      currentIndex: 0, // 控制当前从第几个数据开始渲染
      sortedData: []   // 排序后的完整数据
    };
  },

  watch: {
    // 数据变化重置图表
    chartData: {
      deep: true,
      handler() {
        this.initData();
        this.currentIndex = 0;
        this.renderChart();
        this.resetRotation();
      }
    }
  },

  mounted() {
    this.initData();
    this.initChart();
    window.addEventListener('resize', this.handleResize);
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
    // 1. 数据预处理
    initData() {
      this.sortedData = [...this.chartData].sort((a, b) => b.value - a.value);
    },

    // 2. 初始化图表
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = echarts.init(this.$refs.chartRef);
      this.renderChart();
      this.startRotation();
      this.initChartEvents();
    },

    // 3. 核心渲染函数：根据 currentIndex 切片数据
    renderChart() {
      if (!this.chart || this.sortedData.length === 0) return;

      const len = this.sortedData.length;
      const isRight = this.direction === 'right';

      // 计算当前这一屏要显示的数据（处理循环逻辑）
      const currentViewData = [];
      const displayCount = Math.min(this.showCount, len);

      for (let i = 0; i < displayCount; i++) {
        const dataIndex = (this.currentIndex + i) % len;
        currentViewData.push(this.sortedData[dataIndex]);
      }

      const names = currentViewData.map(item => item.name);
      const values = currentViewData.map(item => item.value);

      const option = {
        backgroundColor: 'transparent',
        title: {
          text: this.chartTitle,
          left: 'center',
          top: 10,
          textStyle: {color: '#fff', fontSize: 18}
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'shadow'},
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderWidth: 0,
          formatter: (params) => {
            // 1. 获取当前鼠标指向的柱子在当前视图中的索引
            const viewIndex = params[0].dataIndex;

            // 2. 根据偏移量 currentIndex 计算出在全量数据 sortedData 中的真实索引
            const len = this.sortedData.length;
            const realIndex = (this.currentIndex + viewIndex) % len;

            // 3. 获取正确的数据项
            const item = this.sortedData[realIndex];
            const rank = realIndex + 1; // 排名即为真实索引 + 1

            let html = `<div style="padding:10px; color:#fff;">
                  <b style="font-size:16px; color:#56fb93">NO.${rank} - ${item.name}</b><br/>
                  <span style="opacity:0.8">数值：</span>${item.value}<br/>`;
            if (item.tooltipText) {
              html += `<span style="opacity:0.8">描述：</span><span style="color:#347CDD">${item.tooltipText}</span>`;
            }
            html += `</div>`;
            return html;
          }
        },
        xAxis: {
          type: 'value',
          show: false,
          inverse: !isRight // 配合 direction 处理
        },
        yAxis: {
          type: 'category',
          data: names,
          inverse: true,
          position: !isRight ? 'right' : 'left', // Y轴左右切换
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {
            color: "#fff",
            fontSize: 14,
            formatter: (value, index) => {
              let displayValue = value;
              if (value.length > this.showLabelSize) {
                displayValue = value.substring(0, this.showLabelSize);
              }

              if (index === 0) return '{a|' + displayValue + '}';
              if (index === 1) return '{b|' + displayValue + '}';
              if (index === 2) return '{c|' + displayValue + '}';
              return displayValue;
            },
            rich: {
              a: {color: '#ffde00', fontSize: 16, fontWeight: 'bold'},
              b: {color: '#cfcfcf', fontSize: 15},
              c: {color: '#d39050', fontSize: 14}
            }
          }
        },
        series: [{
          type: 'bar',
          barWidth: 18,
          data: values,
          showBackground: true,
          backgroundStyle: {color: 'rgba(255, 255, 255, 0.05)', borderRadius: 10},
          itemStyle: {
            borderRadius: 10,
            color: new echarts.graphic.LinearGradient(isRight ? 0 : 1, 0, isRight ? 1 : 0, 0, [
              {offset: 0, color: '#347CDD'},
              {offset: 1, color: '#56fb93'}
            ])
          },
          label: {
            show: true,
            position: isRight ? 'right' : 'left',
            color: '#fff',
            formatter: '{c}'
          }
        }],
        // 开启数据更新动画，让切换更平滑
        animationDurationUpdate: 500
      };

      this.chart.setOption(option, true);
    },

    // 4. 轮播控制
    startRotation() {
      this.stopRotation();
      if (this.intervalTime <= 0 || this.sortedData.length <= this.showCount) return;

      this.timer = setInterval(() => {
        this.nextPage();
      }, this.intervalTime);
    },

    stopRotation() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    resetRotation() {
      this.startRotation();
    },

    nextPage() {
      const len = this.sortedData.length;
      this.currentIndex = (this.currentIndex + 1) % len;
      this.renderChart();
    },

    prevPage() {
      const len = this.sortedData.length;
      this.currentIndex = (this.currentIndex - 1 + len) % len;
      this.renderChart();
    },

    // 5. 交互事件
    handleMouseEnter() {
      this.stopRotation();
    },

    handleMouseLeave() {
      this.startRotation();
    },

    handleWheel(event) {
      if (this.sortedData.length <= this.showCount) return;
      // 阻止外部页面滚动
      event.preventDefault();

      if (event.deltaY > 0) {
        this.nextPage();
      } else {
        this.prevPage();
      }
    },
    // 添加到 点击事件 中
    initChartEvents() {
      this.chart.on('click', (params) => {
        if (params.componentType === 'series') {
          // 计算真实数据索引（考虑轮播偏移）
          const len = this.sortedData.length;
          const realIndex = (this.currentIndex + params.dataIndex) % len;
          const itemData = this.sortedData[realIndex];

          // 触发自定义事件传递数据给父组件
          this.$emit('item-click', itemData);
        }
      });
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
/* 容器必须有高度，否则图表不显示 */
.chart {
  min-height: 300px;
  width: 100%;
}
</style>
