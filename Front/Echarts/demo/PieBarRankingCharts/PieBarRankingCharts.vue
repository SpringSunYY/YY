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
  name: 'PieBarRankingCharts',
  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    chartTitle: {
      type: String,
      default: '签约项目分类'
    },
    chartData: {
      type: Array,
      default: () => [
        {
          name: "医养健康",
          value: 12,
          tooltipText: "关注老年人医疗与康复服务",
          values: [
            {"name": "沈河区", "value": 3143, "tooltipText": "沈阳市的政治中心"},
            {"name": "皇姑区", "value": 2889, "tooltipText": "教育资源丰富"},
            {"name": "新民市", "value": 2844, "tooltipText": "农产品基地"},
            {"name": "于洪区", "value": 2736, "tooltipText": "物流集散地"},
            {"name": "铁西区", "value": 4000, "tooltipText": "测试排序：原本在后现在应排第一"},
            {"name": "大东区", "value": 2229, "tooltipText": "汽车产业"},
            {"name": "沈北新区", "value": 2168, "tooltipText": "大学城"}
          ]
        },
        {
          name: "文化创意",
          value: 8,
          tooltipText: "涵盖动漫、游戏、设计等领域",
          values: [
            {"name": "和平区", "value": 1500, "tooltipText": "文创园区集中"},
            {"name": "沈河区", "value": 1200, "tooltipText": "文化底蕴深厚"},
            {"name": "大东区", "value": 1900, "tooltipText": "排序测试：应排第一"}
          ]
        }
      ]
    },
    showCount: {type: Number, default: 8},
    intervalTime: {type: Number, default: 2500},
    backgroundColor: {type: String, default: 'transparent'},
    showLabelSize: {type: Number, default: 6},
  },

  data() {
    return {
      chart: null,
      timer: null,
      currentIndex: 0, // 轮播起始索引
      activeIndustry: '', // 当前选中的分类名
      currentBarData: [], // 当前分类下完整排序后的数据
      colors: ['#2ca1ff', '#0adbfa', '#febe13', '#65e5dd', '#7b2cff', '#fd5151', '#f071ff', '#85f67a']
    };
  },

  watch: {
    chartData: {
      deep: true,
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.initActiveData();
          if (this.activeIndustry) {
            const activeItem = newVal.find(item => item.name === this.activeIndustry);
            if (activeItem) {
              this.currentBarData = [...activeItem.values].sort((a, b) => b.value - a.value);
            }
          }
          this.currentIndex = 0;
          this.renderChart();
          this.resetRotation();
        }
      }
    }
  },

  mounted() {
    if (this.chartData && this.chartData.length > 0) {
      this.initActiveData();
    }
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
    // 初始化选中的数据
    initActiveData() {
      if (!this.activeIndustry && this.chartData.length > 0) {
        const first = this.chartData[0];
        this.activeIndustry = first.name;
        this.currentBarData = [...first.values].sort((a, b) => b.value - a.value);
      }
    },

    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = echarts.init(this.$refs.chartRef);
      this.renderChart();
      this.startRotation();
      this.initChartEvents();
    },

    // 处理饼图数据
    getPieSeriesData() {
      const pieData = [];
      let total = 0;
      this.chartData.forEach(item => {
        if (!item.value) {
          item.value = item.values.reduce((sum, bar) => sum + bar.value, 0);
        }
        total += item.value;
      });

      this.chartData.forEach((item, i) => {
        pieData.push({
          value: item.value,
          name: item.name,
          originData: item,
          itemStyle: {
            borderWidth: 2,
            borderRadius: 5,
            borderColor: this.colors[i % this.colors.length],
            shadowBlur: 5,
            shadowColor: this.colors[i % this.colors.length]
          },
          select: {
            itemStyle: {borderWidth: 4, borderColor: '#fff', shadowBlur: 10}
          }
        }, {
          value: total * 0.02,
          name: '',
          itemStyle: {color: 'transparent'},
          tooltip: {show: false}
        });
      });
      return pieData;
    },

    renderChart() {
      if (!this.chart) return;
      const totalValue = this.chartData.reduce((sum, item) => sum + item.value, 0).toFixed(2);

      // --- 关键轮播逻辑：计算当前切片数据 ---
      const len = this.currentBarData.length;
      const displayCount = Math.min(this.showCount, len);
      const slicedData = [];
      for (let i = 0; i < displayCount; i++) {
        const dataIndex = (this.currentIndex + i) % len;
        slicedData.push(this.currentBarData[dataIndex]);
      }

      const option = {
        backgroundColor: this.backgroundColor,
        title: [
          {
            text: this.chartTitle,
            left: '21%',
            top: '40%',
            textStyle: {color: '#fff', fontSize: 18, fontWeight: 'bold'}
          },
          {
            text: `【${this.activeIndustry}】排行`,
            left: '65%',
            top: 20,
            textStyle: {color: '#fff', fontSize: 20, fontWeight: 'bold'}
          }
        ],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          formatter: (params) => {
            if (params.seriesName === '行业分布') {
              if (!params.name) return '';
              const item = params.data.originData;
              const percent = totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(2) : 0;
              let res = `<div style="font-weight:bold; border-bottom:1px solid #666; margin-bottom:5px; padding-bottom:5px;">总计:${totalValue}</div>`;
              res += `${item.name}: ${item.value} (${percent}%)`;
              if (item.tooltipText) res += `<br/><span style="color:#aaa; font-size:12px;">${item.tooltipText}</span>`;
              return res;
            } else {
              const item = slicedData[params.dataIndex];
              // 找到该条数据在完整列表中的排名
              const rank = this.currentBarData.findIndex(d => d.name === item.name) + 1;
              let html = `<div style="padding:10px; color:#fff;">
                            <b style="font-size:16px; color:#56fb93">NO.${rank} - ${item.name}</b><br/>
                            <span style="opacity:0.8">数值：</span>${item.value}<br/>`;
              if (item.tooltipText) html += `<span style="opacity:0.8">描述：</span><span style="color:#347CDD">${item.tooltipText}</span>`;
              html += `</div>`;
              return html;
            }
          }
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          bottom: '5%',
          left: '5%',
          width: '40%',
          data: this.chartData.map(i => i.name),
          textStyle: {color: '#24adfe'},
          pageTextStyle: {color: '#fff'}
        },
        grid: {left: '50%', right: '5%', top: '15%', bottom: '10%', containLabel: true},
        xAxis: {type: 'value', show: false},
        yAxis: {
          type: 'category',
          data: slicedData.map(i => i.name),
          inverse: true,
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
        series: [
          {
            name: '行业分布',
            type: 'pie',
            radius: ['65%', '80%'],
            center: ['25%', '45%'],
            selectedMode: 'single',
            data: this.getPieSeriesData(),
            label: {show: false},
            emphasis: {scale: true}
          },
          {
            name: '排行',
            type: 'bar',
            barWidth: 18,
            showBackground: true,
            backgroundStyle: {color: 'rgba(255, 255, 255, 0.05)', borderRadius: 10},
            itemStyle: {
              borderRadius: 10,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {offset: 0, color: '#347CDD'},
                {offset: 1, color: '#56fb93'}
              ])
            },
            label: {show: true, position: 'right', color: '#fff'},
            data: slicedData.map(i => i.value)
          }
        ],
        animationDurationUpdate: 500 // 切换时的平滑动画
      };

      this.chart.setOption(option, true);

      // 饼图高亮逻辑
      const activeIdx = this.chartData.findIndex(i => i.name === this.activeIndustry);
      if (activeIdx !== -1) {
        this.chart.dispatchAction({type: 'pieSelect', dataIndex: activeIdx * 2});
      }
    },

    initChartEvents() {
      this.chart.on('click', (params) => {
        if (params.seriesName === '行业分布' && params.name !== '') {
          const selected = this.chartData.find(item => item.name === params.name);
          if (selected) {
            this.activeIndustry = selected.name;
            this.currentBarData = [...selected.values].sort((a, b) => b.value - a.value);
            this.currentIndex = 0; // 切换分类重置索引
            this.renderChart();
            this.$emit('pie-click', selected);
          }
        } else if (params.seriesName === '排行') {
          // 这里需要从 slicedData 获取，因为 index 是相对于当前显示的
          const len = this.currentBarData.length;
          const displayIndex = (this.currentIndex + params.dataIndex) % len;
          const itemData = this.currentBarData[displayIndex];
          this.$emit('bar-click', itemData);
        }
      });
    },

    // 轮播逻辑控制
    startRotation() {
      this.stopRotation();
      if (this.intervalTime <= 0 || this.currentBarData.length <= this.showCount) return;

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
      const len = this.currentBarData.length;
      if (len === 0) return;
      this.currentIndex = (this.currentIndex + 1) % len;
      this.renderChart();
    },

    prevPage() {
      const len = this.currentBarData.length;
      if (len === 0) return;
      this.currentIndex = (this.currentIndex - 1 + len) % len;
      this.renderChart();
    },

    // 鼠标交互
    handleMouseEnter() {
      this.stopRotation();
    },
    handleMouseLeave() {
      this.startRotation();
    },
    handleWheel(event) {
      if (this.currentBarData.length <= this.showCount) return;
      event.preventDefault();
      if (event.deltaY > 0) {
        this.nextPage();
      } else {
        this.prevPage();
      }
    },
    handleResize() {
      this.chart?.resize();
    }
  }
};
</script>
