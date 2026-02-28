<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { computed, onMounted, ref, watch } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

// 定义 Props 类型
interface ChartDataItem {
  name: string;
  value: number;
  tooltipText?: string;
}

interface Props {
  className?: string;
  width?: string;
  height?: string;
  chartData?: ChartDataItem[];
  chartTitle?: string;
  colorMain?: string;
  backgroundColor?: string;
  showStatistics?: boolean;
  unit?: string;
  displayCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  className: 'chart',
  width: '100%',
  height: '100%',
  chartData: () => [
    { name: '2012年', value: 451, tooltipText: '年初推广活动\n效果显著' },
    { name: '2013年', value: 352, tooltipText: '政策调整期间' },
    { name: '2014年', value: 303 },
    { name: '2015年', value: 534 },
    { name: '2016年', value: 95 },
    { name: '2017年', value: 236 },
    { name: '2018年', value: 217 },
  ],
  chartTitle: '用户变动统计图',
  colorMain: 'rgb(255,81,141)',
  backgroundColor: 'transparent',
  showStatistics: true,
  unit: '数量',
  displayCount: 5,
});

// 定义 Emit
const emit = defineEmits(['item-click']);

const chartRef = ref<EchartsUIType>();
const { renderEcharts, getChartInstance } = useEcharts(chartRef);

// 辅助函数：颜色转换
const hexToRgba = (opacity: number): string => {
  const color = props.colorMain || 'rgb(255,81,141)';

  // 处理不完整的 rgba(r, g, b) 格式（缺少透明度值）
  const incompleteRgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (incompleteRgbaMatch) {
    const r = incompleteRgbaMatch[1];
    const g = incompleteRgbaMatch[2];
    const b = incompleteRgbaMatch[3];
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // 处理标准 rgb(r, g, b) 格式
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const r = rgbMatch[1];
    const g = rgbMatch[2];
    const b = rgbMatch[3];
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // 处理标准 rgba(r, g, b, a) 格式
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (rgbaMatch) {
    const r = rgbaMatch[1];
    const g = rgbaMatch[2];
    const b = rgbaMatch[3];
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // 如果都不匹配，返回默认值
  return `rgba(23, 255, 243, ${opacity})`;
};

// 计算统计数据
const stats = computed(() => {
  const rawValues = props.chartData.map((item) => Number(item.value) || 0);
  const total = rawValues.reduce((a, b) => a + b, 0);
  const avg = total > 0 ? Number((total / rawValues.length).toFixed(2)) : 0;
  return { total, avg };
});

// 核心配置逻辑
const getOptions = () => {
  const data = props.chartData;
  const xLabels = data.map((item) => item.name);
  const rawValues = data.map((item) => item.value);
  const { total, avg } = stats.value;

  return {
    backgroundColor: props.backgroundColor,
    title: {
      text: props.chartTitle,
      textStyle: { color: hexToRgba(0.8), fontSize: 18 },
      left: 'center',
      top: '1%',
    },
    legend: {
      data: ['折线图', '柱形图', '平均线'],
      textStyle: { color: hexToRgba(0.6) },
      right: '4%',
      top: '6%',
    },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: hexToRgba(0.8),
      borderWidth: 1,
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        const idx = params[0].dataIndex;
        const item = data[idx];
        if (!item) return '';

        const color = hexToRgba(0.8);
        let res = `<div style="font-weight:bold; color:${color}; border-bottom:1px solid #555; padding-bottom:5px;">${item.name}</div>`;

        if (props.showStatistics) {
          res += `<div style="font-size:12px; color:#aaa; margin: 5px 0;">总计: ${total} | 平均: ${avg}</div>`;
        }

        const val = item.value;
        let ratioHtml = '';
        if (idx > 0) {
          const prevVal = data[idx - 1]?.value ?? 0;
          const diff = val - prevVal;
          const percent =
            prevVal === 0 ? '0' : ((diff / prevVal) * 100).toFixed(1);
          const statusColor = diff >= 0 ? '#ff4d4f' : '#52c41a';
          ratioHtml = `<span style="color:${statusColor}; margin-left:8px;">${diff >= 0 ? '+' : ''}${diff} (${percent}%)</span>`;
        }

        const percentOfTotal =
          total > 0 ? ((val / total) * 100).toFixed(1) : '0';
        res += `数值: <b style="font-size:16px;">${val}</b> <small>(${percentOfTotal}%)</small>${ratioHtml}<br/>`;

        if (item.tooltipText) {
          res += `<div style="margin-top:8px; padding:8px; background:rgba(23, 255, 243, 0.1); border-left: 3px solid ${color}; font-size:12px; line-height:1.5;">
                    ${item.tooltipText.replaceAll('\n', '<br/>')}
                  </div>`;
        }
        return res;
      },
    },
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true,
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        left: '10%',
        right: '10%',
        bottom: '2%',
        height: 20,
        borderColor: 'transparent',
        fillerColor: hexToRgba(0.2),
        handleStyle: { color: hexToRgba(0.8) },
        textStyle: { color: hexToRgba(0.8) },
      },
      {
        type: 'inside',
        xAxisIndex: [0],
      },
    ],
    xAxis: {
      type: 'category' as const,
      data: xLabels,
      axisLabel: { color: hexToRgba(0.6) },
    },
    yAxis: {
      name: props.unit,
      type: 'value' as const,
      splitLine: { lineStyle: { color: hexToRgba(0.2) } },
      axisLabel: { color: hexToRgba(0.6) },
    },
    series: [
      {
        name: '折线图',
        type: 'line' as const,
        smooth: true,
        symbolSize: 10,
        color: props.colorMain,
        areaStyle: {
          color: hexToRgba(0.3),
        },
        data: rawValues,
      },
      {
        name: '柱形图',
        type: 'bar' as const,
        barWidth: '20%',
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          barBorderRadius: [10, 10, 0, 0],
          color: hexToRgba(0.8),
        },
        data: rawValues,
      },
      {
        name: '平均线',
        type: 'line' as const,
        color: hexToRgba(0.5),
        data: Array.from({ length: rawValues.length }).fill(avg), // 用平均值填充数据形成水平线
        lineStyle: { opacity: 1, color: hexToRgba(0.8) }, // 隐藏实际线条，只显示 markLine
        markLine: {
          symbol: 'none' as const,
          data: [
            {
              yAxis: avg,
              lineStyle: {
                color: hexToRgba(1),
                type: 'dashed' as const,
                width: 2,
              },
              label: {
                show: true,
                position: 'end' as const,
                formatter: `平均: ${avg}`,
                color: hexToRgba(0.9),
                fontSize: 12,
                fontWeight: 'bold' as const,
              },
            },
          ],
        },
      },
    ],
  };
};

// 渲染函数
function init() {
  renderEcharts(getOptions());
}

// 监听数据变化
watch(
  () => props.chartData,
  async (newVal, oldVal) => {
    init();
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  init();

  // 绑定点击事件
  const chartInstance = getChartInstance();
  if (chartInstance) {
    chartInstance.on('click', (params: any) => {
      if (params.componentType === 'series') {
        const dataIndex = params.dataIndex;
        const item = props.chartData[dataIndex];
        if (!item) return;

        emit('item-click', {
          ...item,
          dataIndex,
          seriesName: params.seriesName,
          percent:
            stats.value.total > 0
              ? ((item.value / stats.value.total) * 100).toFixed(2)
              : '0',
          total: stats.value.total,
          avg: stats.value.avg,
        });
      }
    });
  }
});
</script>

<template>
  <EchartsUI ref="chartRef" :style="{ height, width }" />
</template>
