<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script>
// 确保您已安装并引入 ECharts 库，例如: import * as echarts from 'echarts';
import * as echarts from 'echarts';

// --- ECharts 自定义图形注册 (Custom Shapes) ---

// 绘制左侧面 (Draw the left face of the cube)
const CubeLeft = echarts.graphic.extendShape({
  shape: { x: 0, y: 0 },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - 13, shape.y - 13];
    const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13];
    const c3 = [xAxisPoint[0], xAxisPoint[1]];
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
  }
});

// 绘制右侧面 (Draw the right face of the cube)
const CubeRight = echarts.graphic.extendShape({
  shape: { x: 0, y: 0 },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [xAxisPoint[0], xAxisPoint[1]];
    const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
    const c4 = [shape.x + 18, shape.y - 9];
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
  }
});

// 绘制顶面 (Draw the top face of the cube)
const CubeTop = echarts.graphic.extendShape({
  shape: { x: 0, y: 0 },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x + 18, shape.y - 9];
    const c3 = [shape.x + 5, shape.y - 22];
    const c4 = [shape.x - 13, shape.y - 13];
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
  }
});

// 全局注册三个面图形，确保组件加载时已注册
echarts.graphic.registerShape('CubeLeft', CubeLeft);
echarts.graphic.registerShape('CubeRight', CubeRight);
echarts.graphic.registerShape('CubeTop', CubeTop);

// --- 刻度计算函数 ---

/**
 * 动态计算 Y 轴的最大值，确保它是美观且均匀的刻度间隔的倍数。
 * @param {number} value - 需要圆整的数值 (minMaxRequired)
 * @param {number} ticks - 期望的主刻度数量（不包括 0）
 * @returns {number} 经过圆整后的 Y 轴最大值
 */
function calculateRoundedMax(value, ticks = 5) {
  if (value === 0) return 1;

  // 粗略计算间隔
  const roughInterval = value / ticks;

  // 找到最接近的 10 的幂次作为基数
  const powerOfTen = Math.pow(10, Math.floor(Math.log10(roughInterval)));

  // 检查圆整数：1, 2, 5, 10 倍
  const rounders = [1, 2, 5, 10];
  let roundedInterval;

  for (const r of rounders) {
    roundedInterval = r * powerOfTen;
    // 如果圆整后的间隔大于粗略间隔，则使用它
    if (roundedInterval >= roughInterval) {
      break;
    }
  }

  // 用圆整后的间隔，计算最终的 max 值
  return Math.ceil(value / roundedInterval) * roundedInterval;
}


// --- Vue 组件定义 ---
export default {
  name: 'Bar3DStereoscopicCharts', // 组件名称

  // 定义 Props
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
    // 自定义标题
    chartTitle: {
      type: String,
      default: 'bar-horizontal-charts'
    },
    // 核心图表数据，包含 names (x轴) 和 values (y轴)
    chartData: {
      type: Object,
      default: () => ({
        names: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        values: [210.9, 260.8, 204.2, 504.9, 740.5, 600.3, 119.0]
      })
    }
  },

  data() {
    return {
      chart: null, // ECharts 实例
    };
  },

  watch: {
    // 深度侦听 chartData 的变化，如果数据更新，则重绘图表
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    },
    // 侦听标题变化
    chartTitle: {
      handler() {
        this.setOptions(this.chartData);
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart();
      // 监听窗口大小变化以适应图表
      window.addEventListener('resize', this.handleResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },

  methods: {
    /**
     * 初始化图表实例
     */
    initChart() {
      if (!this.$refs.chartRef) return;

      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }

      this.chart = echarts.init(this.$refs.chartRef);
      this.setOptions(this.chartData);
    },

    /**
     * 设置 ECharts 配置项并渲染图表
     * @param {Object} data - 从 this.chartData 传入的数据 { names: [], values: [] }
     */
    setOptions(data) {
      if (!this.chart || !data || !data.values || data.values.length === 0) return;

      // --- 动态数据计算 ---
      const actualMaxValue = Math.max(...data.values, 0);

      // 1. 计算出所需的最小最大值 (Max * 1.2)
      const minMaxRequired = actualMaxValue * 1.2;

      // 2. 使用动态函数计算美观的 MAX_Y_VALUE (例如 888.6 -> 1000)
      const MAX_Y_VALUE = calculateRoundedMax(minMaxRequired);

      // 背景（最大高度）数组
      const MAX_DATA = data.values.map(() => MAX_Y_VALUE);
      const VALUE_DATA = data.values;

      // 定义渐变色
      const mainColorGradient = new echarts.graphic.LinearGradient(1, 1, 1, 0, [
        { offset: 0, color: " #0097C8" }, // 底部
        { offset: 1, color: "#4CF0F9" }, // 顶部
      ]);

      // --- ECharts Option ---
      const option = {
        // === 标题，使用 chartTitle prop ===
        title: {
          text: this.chartTitle,
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 20
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'transparent',
          borderWidth: 0,
          textStyle: { color: '#FFF' },
          formatter: function (params) {
            const item = params.find(p => p.seriesIndex === 1);
            if (item) {
              return item.name + ' : ' + item.value;
            }
            return '';
          }
        },
        grid: {
          left: 40,
          right: 40,
          bottom: 40,
          top: 100,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data.names, // 使用传入的 names
          axisLine: {
            show: true,
            lineStyle: { color: 'white' }
          },
          offset: 25,
          axisTick: {
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: { color: '#7DFFFD' }
          },
          axisLabel: {
            show: true,
            fontSize: 16
          },
        },
        yAxis: {
          min: 0,
          max: MAX_Y_VALUE, // 动态设置美观的最大值
          type: 'value',
          axisLine: { show: false, lineStyle: { color: 'white' } },
          splitLine: {
            show: true,
            lineStyle: { type: "dashed", color: "rgba(255,255,255,0.1)" },
          },
          axisTick: { show: false },
          axisLabel: { show: true, fontSize: 16 },
          boundaryGap: ['20%', '20%']
        },
        series: [
          // 0. 背景柱 (MAX) - 灰色
          {
            type: 'custom',
            renderItem: function (params, api) {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: 'group',
                children: [{
                  type: 'CubeLeft',
                  shape: { api, x: location[0], y: location[1], xAxisPoint: api.coord([api.value(0), 0]) },
                  style: { fill: '#18385A' }
                }, {
                  type: 'CubeRight',
                  shape: { api, x: location[0], y: location[1], xAxisPoint: api.coord([api.value(0), 0]) },
                  style: { fill: '#33718E' }
                }, {
                  type: 'CubeTop',
                  shape: { api, x: location[0], y: location[1] },
                  style: { fill: '#307E8E' }
                }]
              };
            },
            data: MAX_DATA
          },
          // 1. 实际值柱 (VALUE) - 渐变色或红色
          {
            type: 'custom',
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              // 根据当前索引判断是否是最后两项
              const isLastTwoBars = api.value(0) === VALUE_DATA.length - 2 || api.value(0) === VALUE_DATA.length - 1;

              const color = isLastTwoBars ? 'red' : mainColorGradient;

              return {
                type: 'group',
                children: [{
                  type: 'CubeLeft',
                  shape: { api, x: location[0], y: location[1], xAxisPoint: api.coord([api.value(0), 0]) },
                  style: { fill: color }
                }, {
                  type: 'CubeRight',
                  shape: { api, x: location[0], y: location[1], xAxisPoint: api.coord([api.value(0), 0]) },
                  style: { fill: color }
                }, {
                  type: 'CubeTop',
                  shape: { api, x: location[0], y: location[1] },
                  style: { fill: color }
                }]
              };
            },
            data: VALUE_DATA
          },
          // 2. 透明柱 (MAX) - 用于触发 tooltip
          {
            type: 'bar',
            itemStyle: {
              color: 'transparent',
            },
            data: MAX_DATA
          }
        ]
      };

      this.chart.setOption(option, true);
    },

    /**
     * 处理窗口大小变化，重绘图表
     */
    handleResize() {
      this.chart?.resize();
    }
  }
};
</script>

<style scoped>
.chart {
  /* 确保容器有高度才能显示图表 */
  overflow: hidden;
}
</style>
