<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

interface ChartDataItem {
  name: string;
  value: number;
  tooltipText?: string;
}

interface Props {
  width?: string;
  height?: string;
  chartData?: ChartDataItem[];
  chartTitle?: string;
  autoPlay?: boolean;
  colorMain?: string;
}

const props = withDefaults(defineProps<Props>(), {
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
  chartTitle: '项目数',
  autoPlay: true,
  colorMain: 'rgb(0,210,255)',
});

const chartRef = ref<EchartsUIType>();
const { renderEcharts, getChartInstance } = useEcharts(chartRef);

// 动画相关变量
let timer: null | ReturnType<typeof setInterval> = null;
let currentIndex = 0;

/**
 * 核心指标计算
 */
const getMetrics = () => {
  const values = props.chartData.map((item) => item.value);
  const total = values.reduce((sum, cur) => sum + cur, 0);
  const average = values.length > 0 ? (total / values.length).toFixed(2) : '0';

  const diffData = props.chartData.map((item, index) => {
    if (index === 0) return null;
    const prevValue = props.chartData[index - 1]?.value ?? 0;
    const diff = item.value - prevValue;
    // 避免除以0的情况
    const baseValue = prevValue === 0 ? (item.value || 1) : prevValue;
    const percent = ((diff / baseValue) * 100).toFixed(2);
    return {
      value: diff,
      isIncrease: diff > 0,
      percent,
      // 区分零增长和无法计算的情况
      isZero: diff === 0,
      isNA: prevValue === 0 && item.value === 0,
    };
  });

  return { total, average, diffData };
};

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

/**
 * ECharts 配置项
 */
const getOptions = () => {
  const { total, average, diffData } = getMetrics();
  const names = props.chartData.map((i) => i.name);
  const values = props.chartData.map((i) => i.value);

  return {
    title: {
      text: props.chartTitle,
      left: '2%',
      top: '5%',
      textStyle: { color: hexToRgba(1), fontSize: 16 },
    },
    legend: {
      data: [props.chartTitle],
      top: '20',
      left: 'center',
      textStyle: { color: hexToRgba(0.8) },
    },
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: { type: 'none' as const },
      backgroundColor: '#050F1B',
      borderColor: hexToRgba(0.5),
      borderWidth: 1,
      padding: 16,
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        const idx = params[0].dataIndex;
        const item = props.chartData[idx];
        if (!item) return '';

        const diffInfo = diffData[idx];

        let diffText = '';
        if (idx === 0) {
          diffText = '<span style="color:#666;">环比：-</span>';
        } else if (diffInfo?.isNA) {
          diffText = '<span style="color:#666;">环比：无变化</span>';
        } else if (diffInfo?.isZero) {
          diffText = '<span style="color:#666;">环比：持平</span>';
        } else if (diffInfo) {
          const arrow = diffInfo.isIncrease ? '↑' : '↓';
          const color = diffInfo.isIncrease ? '#52c41a' : '#ff4d4f';
          const sign = diffInfo.isIncrease ? '+' : '-';
          diffText = `<span style="color:${color};">环比：${arrow} ${sign}${Math.abs(diffInfo.value)} (${sign}${diffInfo.percent}%)</span>`;
        }

        let res = `
          <div style="font-weight:bold; color:${hexToRgba(1)}; margin-bottom:8px;">${item.name}</div>
          <div>${props.chartTitle}：${item.value}</div>
          <div style="font-size:12px; color:#82AFC6;">${diffText}</div>
          <div style="margin-top:8px; border-top:1px solid #333; padding-top:4px; font-size:12px;">
            <span style="color:#82AFC6;">累计：${total}</span>
            <span style="margin:0 8px;">|</span>
            <span style="color:#82AFC6;">均值：${average}</span>
          </div>
        `;

        // 添加 tooltipText 显示
        if (item.tooltipText) {
          res += `<div style="margin-top:8px; padding:8px; background:${hexToRgba(0.1)}; border-left: 3px solid ${hexToRgba(1)}; font-size:12px; line-height:1.5;">
                    ${item.tooltipText.replaceAll('\n', '<br/>')}
                  </div>`;
        }

        return res;
      },
    },
    grid: {
      top: '15%',
      right: '5%',
      left: '5%',
      bottom: '12%',
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
      data: names,
      axisLine: { lineStyle: { color: hexToRgba(0.6) } },
      axisLabel: { color: hexToRgba(0.6) },
    },
    yAxis: {
      type: 'value' as const,
      axisLabel: { color: hexToRgba(0.6) },
      splitLine: {
        lineStyle: {
          color: hexToRgba(0.2),
          type: 'dashed' as const,
        },
      },
    },
    series: [
      {
        name: props.chartTitle,
        type: 'bar' as const,
        barWidth: 15,
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: hexToRgba(1) },
              { offset: 1, color: hexToRgba(0.3) },
            ],
          },
        },
        data: values,
      },
      {
        name: props.chartTitle,
        type: 'line' as const,
        smooth: true,
        symbolSize: 8,
        lineStyle: { color: hexToRgba(1), width: 2 },
        itemStyle: { color: hexToRgba(1) },
        areaStyle: {
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: hexToRgba(0.3) },
              { offset: 1, color: 'transparent' },
            ],
          },
        },
        data: values,
      },
    ],
  };
};

/**
 * 动画控制逻辑
 */
const startPlay = () => {
  stopPlay();
  if (!props.autoPlay || props.chartData.length === 0) return;

  const chartInstance = getChartInstance();
  if (!chartInstance) {
    // 图表实例未准备好，稍后重试
    setTimeout(() => startPlay(), 200);
    return;
  }

  timer = setInterval(() => {
    const dataLen = props.chartData.length;
    if (dataLen === 0) return;

    // 取消之前的高亮
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });

    // 计算下一个索引
    currentIndex = (currentIndex + 1) % dataLen;

    // 激活当前项
    chartInstance.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    chartInstance.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
  }, 3000);
};

const stopPlay = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

/**
 * 监听处理
 */
watch(
  () => props.chartData,
  () => {
    renderEcharts(getOptions());
    nextTick(() => {
      startPlay();
    });
  },
  { deep: true },
);

watch(
  () => props.autoPlay,
  (val) => {
    val ? startPlay() : stopPlay();
  },
);

onMounted(() => {
  renderEcharts(getOptions());

  // 使用 setInterval 尝试获取图表实例并绑定事件
  const initInterval = setInterval(() => {
    const chartInstance = getChartInstance();
    if (chartInstance) {
      clearInterval(initInterval);

      // 绑定鼠标事件
      const zr = chartInstance.getZr();
      zr.on('mousemove', () => {
        stopPlay();
      });
      zr.on('globalout', () => {
        startPlay();
      });

      // 启动轮播
      startPlay();
    }
  }, 100);
});

onUnmounted(() => {
  stopPlay();
});
</script>

<template>
  <EchartsUI ref="chartRef" :style="{ height, width }" />
</template>
