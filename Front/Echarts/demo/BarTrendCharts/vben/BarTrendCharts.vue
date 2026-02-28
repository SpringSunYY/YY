<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { computed, onMounted, ref, watch } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

/**
 * 定义数据项接口
 */
interface ChartDataItem {
  name: string;
  value: number;
  tooltipText?: string;
  max?: number;
  min?: number;
}

/**
 * 定义组件 Props
 */
interface Props {
  className?: string;
  width?: string;
  height?: string;
  chartData?: ChartDataItem[];
  chartTitle?: string;
  colorMain?: string; // 主题色
  backgroundColor?: string;
  showExtraInfo?: boolean; // 是否显示总量/平均值统计
  unit?: string;
}

const props = withDefaults(defineProps<Props>(), {
  className: 'chart',
  width: '100%',
  height: '100%',
  chartData: () => [
    {
      name: '1月',
      value: 393,
      tooltipText: '年初启动阶段\n人员变动较大',
      max: 500,
      min: 300,
    },
    { name: '2月', value: 438, tooltipText: '稳步上升', max: 500, min: 350 },
    { name: '3月', value: 485, max: 600, min: 400 },
    { name: '4月', value: 631, tooltipText: '季度末冲刺', max: 700, min: 500 },
    { name: '5月', value: 500, max: 800, min: 600 },
    { name: '6月', value: 824, tooltipText: '年中总结', max: 900, min: 700 },
    { name: '7月', value: 987, tooltipText: '达到新高', max: 1100, min: 800 },
  ],
  chartTitle: '数据统计分析',
  colorMain: 'rgb(23,116,255)', // 默认科技蓝
  backgroundColor: 'transparent',
  showExtraInfo: true,
  unit: '数值',
});

const emit = defineEmits(['item-click']);

const chartRef = ref<EchartsUIType>();
const { renderEcharts, getChartInstance } = useEcharts(chartRef);

/**
 * 颜色转换辅助函数
 */
const hexToRgba = (opacity: number): string => {
  const color = props.colorMain;
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);

  const extract = rgbMatch || rgbaMatch;
  if (extract) {
    return `rgba(${extract[1]}, ${extract[2]}, ${extract[3]}, ${opacity})`;
  }
  return `rgba(23, 248, 255, ${opacity})`;
};

/**
 * 计算统计数据
 */
const stats = computed(() => {
  const total = props.chartData.reduce(
    (sum, item) => sum + (item.value || 0),
    0,
  );
  const avg =
    props.chartData.length > 0
      ? (total / props.chartData.length).toFixed(2)
      : '0';
  return { total, avg };
});

/**
 * 获取 Echarts 配置
 */
const getOptions = () => {
  const { total, avg } = stats.value;
  const themeColor = props.colorMain;

  return {
    backgroundColor: props.backgroundColor,
    title: {
      text: props.chartTitle,
      left: 'center',
      top: '2%',
      textStyle: { color: hexToRgba(1), fontSize: 18, fontWeight: 'bold' },
    },
    legend: {
      show: true,
      right: '2%',
      top: '2.5%',
      textStyle: { color: hexToRgba(0.7) },
      data: ['趋势', '数据'],
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(5, 34, 77, 0.9)',
      borderColor: themeColor,
      borderWidth: 1,
      padding: [10, 15],
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        const index = params[0].dataIndex;
        const item = props.chartData[index];
        const prevItem = props.chartData[index - 1];

        let trendHtml = '';
        const currValue = Number(item.value) || 0;
        const prevValue = prevItem ? Number(prevItem.value) || 0 : 0;
        if (prevValue !== 0) {
          const diff = currValue - prevValue;
          const percent = ((diff / prevValue) * 100).toFixed(1);
          const color = diff >= 0 ? '#ff4d4f' : '#73d13d';
          const icon = diff >= 0 ? '▲' : '▼';
          trendHtml = `<span style="color:${color}; margin-left:10px;">${icon} ${Math.abs(diff)} (${percent}%)</span>`;
        }

        let html = `
          <div style="min-width:180px;">
            <div style="border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:5px; margin-bottom:8px; font-weight:bold; color:${themeColor};">
              ${item.name} 数据详情
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span>数值:</span>
              <span style="font-weight:bold;">${item.value} ${trendHtml}</span>
            </div>
        `;

        if (item.max !== undefined) {
          html += `
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:12px; color:#aaa;">
              <span>范围:</span>
              <span>Min: ${item.min} / Max: ${item.max}</span>
            </div>`;
        }

        if (props.showExtraInfo) {
          html += `
            <div style="margin-top:8px; padding-top:5px; border-top:1px dashed rgba(255,255,255,0.2); font-size:12px; color:#d1e6eb;">
              总量: ${total} | 平均: ${avg}
            </div>`;
        }

        if (item.tooltipText) {
          html += `
            <div style="margin-top:8px; padding:6px; background:${hexToRgba(0.1)}; border-left:3px solid ${themeColor}; color:${themeColor}; font-size:12px; line-height:1.5;">
              ${item.tooltipText.replaceAll('\n', '<br/>')}
            </div>`;
        }

        html += `</div>`;
        return html;
      },
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '3%',
      bottom: '12%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: props.chartData.map((i) => i.name),
      axisLine: { lineStyle: { color: hexToRgba(0.8) } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: props.unit,
      splitLine: { lineStyle: { color: hexToRgba(0.6), type: 'dashed' } },
      axisLabel: { color: hexToRgba(0.8) },
    },
    dataZoom: [
      {
        type: 'slider',
        height: 15,
        bottom: '2%',
        textStyle: { color: '#fff' },
        fillerColor: hexToRgba(0.3),
      },
      { type: 'inside' },
    ],
    series: [
      {
        name: '趋势',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        z: 10,
        lineStyle: { width: 3, color: hexToRgba(0.9) },
        itemStyle: {
          color: hexToRgba(0.9),
          borderColor: '#fff',
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(40,255,179,0.3)' },
              { offset: 1, color: 'rgba(40,255,179,0)' },
            ],
          },
        },
        data: props.chartData.map((i) => i.value),
      },
      {
        name: '数据',
        type: 'bar',
        barWidth: 22,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: themeColor },
              { offset: 1, color: hexToRgba(0.5) },
            ],
          },
        },
        data: props.chartData.map((i) => i.value),
      },
    ],
  };
};

function init() {
  renderEcharts(getOptions());
}

watch(
  () => props.chartData,
  () => init(),
  { deep: true },
);

onMounted(() => {
  init();
  const chartInstance = getChartInstance();
  if (chartInstance) {
    chartInstance.on('click', (params: any) => {
      emit('item-click', params.data);
    });
  }
});
</script>

<template>
  <EchartsUI ref="chartRef" :style="{ height, width }" />
</template>
