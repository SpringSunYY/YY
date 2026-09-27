<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"></div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, watch, nextTick} from 'vue';
import * as echarts from 'echarts';

// 定义组件的属性 (Props)
const props = defineProps({
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
  // ECharts 颜色列表
  defaultColor: {
    type: Array,
    default: () => [
      '#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86A92',
      '#7262FD', '#269A29', '#8E36BE', '#41A7E2', '#7747A3',
      '#FF7F50', '#FFDAB9', '#ADFF2F', '#00CED1', '#9370DB',
      '#3CB371', '#FF69B4', '#FFB6C1', '#DA70D6', '#98FB98',
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ]
  },
  // 核心数据
  chartData: {
    type: Array,
    default: () => [
      {name: "加工成本", value: 920},
      {name: "实验成本", value: 458},
      {name: "能源成本", value: 653},
      {name: "研发成本", value: 372}
    ]
  },
  // 标题
  chartTitle: {
    type: String,
    default: 'pieRose'
  }
});

const chart = ref(null); // ECharts 图表实例
const chartRef = ref(null); // DOM 元素引用
const pieCenter = ['35%', '50%']; // 饼图中心点

/**
 * 处理窗口大小变化，重绘图表
 */
const handleResize = () => {
  chart.value?.resize();
};

/**
 * 设置 ECharts 配置项
 * @param {Array} data - 从 props.chartData 传入的数据
 */
const setOptions = (data) => {
  if (!chart.value) return;

  const option = {
    title: {
      text: props.chartTitle,
      textStyle: {
        color: '#ccc'
      },
      left: 'center'
    },
    color: props.defaultColor,
    tooltip: {
      show: true,
      trigger: 'item',
      backgroundColor: 'transparent', // 完全透明
      borderWidth: 0,
      textStyle: {
        color: '#FFF'
      },
      formatter: "{b} <br/> 值: {c} ({d}%)",
    },

    legend: {
      show: true,
      orient: 'vertical',
      textStyle: {
        color: '#FFF',
      },
      right: '5%',
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
      formatter(name) {
        return name; // 只显示名称
      },
    },

    series: [
      // 背景装饰0 实心白圆 zlevel: 4
      {
        type: 'pie',
        zlevel: 4,
        radius: ['0%', '7%'],
        center: pieCenter,
        silent: true,
        label: {show: false},
        data: [{value: 0, itemStyle: {color: '#FFF'}}],
      },
      // 背景装饰1 半透明圆 zlevel: 3
      {
        type: 'pie',
        radius: ['0%', '15%'],
        center: pieCenter,
        zlevel: 3,
        silent: true,
        label: {show: false},
        data: [{value: 0, itemStyle: {color: 'rgba(255,255,255, 0.1)'}}],
      },
      // 背景装饰3 半透明底盘 zlevel: 1
      {
        type: 'pie',
        zlevel: 1,
        radius: ['0%', '65%'], // 匹配缩小后的外圈大小
        center: pieCenter,
        silent: true,
        label: {show: false},
        data: [{value: 0, itemStyle: {color: 'rgba(255,255,255, 0.1)'}}],
      },

      // 数据源 (主玫瑰图, 已缩小, 百分比修正)
      {
        type: 'pie',
        roseType: 'area', // 玫瑰图类型
        clockwise: false,
        center: pieCenter,
        zlevel: 2,
        radius: ['15%', '60%'], // 缩小尺寸
        itemStyle: {
          borderRadius: 4,
        },
        data: data, // 使用传入的数据
        label: {
          normal: {
            formatter: params => {
              const percentage = params.percent.toFixed(1);
              // 注意：这里使用 {value|...} 时，ECharts 会根据 data 中的 value 自动计算百分比，
              // 但您的原始代码中 `params.percent` 已经提供，因此保留原始逻辑。
              return (
                  '{icon|●}{name|' + params.name + '}\n{value|' +
                  params.value + ' (' + percentage + '%)}' // 显示 值 (百分比%)
              );
            },
            rich: {
              icon: {fontSize: 16, color: 'inherit'},
              name: {fontSize: 18, padding: [0, 0, 0, 10], color: '#fff'},
              value: {fontSize: 14, padding: [10, 0, 0, 20], color: '#fff'}
            }
          }
        },
        labelLine: {
          length: 10,
          length2: 10,
          lineStyle: {color: '#fff'}
        }
      },
    ],
  };

  // 使用 setOption 更新图表，第二个参数 true 表示不合并配置
  chart.value.setOption(option, true);
};

/**
 * 初始化图表实例
 * @param {Array} data - 从 props.chartData 传入的数据
 */
const initChart = (data) => {
  if (!chartRef.value) return;

  // 销毁旧的图表实例
  if (chart.value) {
    chart.value.dispose();
    chart.value = null;
  }

  // 初始化 ECharts 实例
  chart.value = echarts.init(chartRef.value);
  setOptions(data);
};

// 监听数据变化，重新渲染图表
watch(
    () => props.chartData,
    (newData) => {
      // 确保在数据变化后更新图表配置
      setOptions(newData);
    },
    {deep: true} // 深度侦听数组内容变化
);

watch([() => props.width, () => props.height], () => {
  nextTick(() => handleResize());
});


onMounted(() => {
  // $nextTick 在 setup/onMounted 中不再是强制必需的，但为了安全起见（确保 DOM 已渲染），可以保留
  nextTick(() => {
    initChart(props.chartData);
    // 注册窗口大小变化事件监听
    window.addEventListener('resize', handleResize);
  });
});

onBeforeUnmount(() => {
  // 移除窗口大小变化事件监听
  window.removeEventListener('resize', handleResize);
  if (chart.value) {
    // 销毁 ECharts 实例
    chart.value.dispose();
    chart.value = null;
  }
});

defineExpose({
  resizeChart: handleResize // 暴露重设图表大小的方法
});
</script>

<style scoped>
/* 确保图表容器有正确的布局 */
.chart {
  overflow: hidden;
}
</style>