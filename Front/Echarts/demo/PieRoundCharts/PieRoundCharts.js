const chartData = [
  { value: 38, name: "刑满释放人员", tooltipText: "近期释放人员\n需重点关注" },
  { value: 145, name: "社区矫正人员", tooltipText: "在册矫正人员" },
  { value: 45, name: "吸毒人员", tooltipText: "定期尿检人员" },
  { value: 21, name: "邪教人员" },
  { value: 51, name: "艾滋病", tooltipText: "医疗帮扶对象" },
  { value: 9, name: "重点青少年", tooltipText: "帮教对象" },
];

const colorList = ['#88D9FF', '#0092FF', '#81EDD2', '#B0FA93', '#63F2FF', '#9999FE'];

// 计算总数和平均值
const total = chartData.reduce((per, cur) => per + cur.value, 0);
const avg = (total / chartData.length).toFixed(2);

// 计算间隙
const gap = (1 * total) / 100;

// 1. 优化 gapData：彻底禁用 label 和引导线
const gapData = {
  name: "",
  value: gap,
  itemStyle: { color: "transparent" },
  label: { show: false },      // 隐藏间隔的文字
  labelLine: { show: false },  // 隐藏间隔的引导线
  tooltip: { show: false }     // 间隔不触发弹窗
};
const center=['50%', '50%']
const pieData1 = [];
const pieData2 = [];

chartData.forEach((item, i) => {
  pieData1.push({
    ...item,
    itemStyle: { borderRadius: 10 }
  }, gapData);

  pieData2.push({
    ...item,
    itemStyle: {
      color: colorList[i],
      opacity: 0.21,
    },
  }, gapData);
});

const option = {
  backgroundColor: '#0F141B',
  title: {
    text: "重点人员",
    subtext: total.toString(),
    left: "center",
    top: "40%",
    itemGap: 15,
    textStyle: { color: "#f5f5f6", fontSize: 15, fontWeight: "bold" },
    subtextStyle: { color: "#f5f5f6", fontSize: 50, fontWeight: "bold" },
  },
  tooltip: {
    show: true,
    trigger: 'item',
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderWidth: 0,
    textStyle: { color: "#fff" },
    formatter: function(params) {
      if (!params.name) return null;
      const dataItem = chartData.find(item => item.name === params.name);
      const ratio = ((params.value / total) * 100).toFixed(2) + '%';
      
      let str = `<div style="line-height:24px;">
        <span style="font-weight:bold;">统计概览</span><br/>
        总数：${total} | 平均值：${avg}<br/>
        <hr style="border-color:rgba(255,255,255,0.2)"/>
        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>
        ${params.name}：${params.value} (${ratio})`;
      
      if (dataItem && dataItem.tooltipText) {
        str += `<br/><span style="color:#aaa;font-size:12px;">说明：${dataItem.tooltipText.replace(/\n/g, '<br/>')}</span>`;
      }
      str += `</div>`;
      return str;
    }
  },
  legend: {
    type: 'scroll',
    orient: 'horizontal',
    bottom: '2%', // 调低一点，给 Label 留出空间
    left: 'center',
    icon: 'circle',
    itemGap: 20,
    textStyle: { color: '#ffffff', fontSize: 16 },
    pageTextStyle: { color: '#fff' },
    data: chartData.map(item => item.name)
  },
  series: [
    {
      name: '数据层',
      type: 'pie',
      radius: ['81%', '85%'],
      center: center,
      color: colorList,
      // 这里的 label 会应用于所有数据项，除非数据项内部有覆盖设置
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}: {d}%',
        color: '#fff'
      },
      labelLine: {
        show: true,
        lineStyle: { color: 'rgba(255,255,255,0.3)' }
      },
      data: pieData1
    },
    {
      name: '修饰背景层',
      type: 'pie',
      radius: ['65%', '82%'],
      center: center,
      silent: true,
      label: { show: false },
      data: pieData2
    },
    {
      type: 'gauge',
      radius: '60%',
      center: center,
      startAngle: 90,
      endAngle: -269.9999,
      splitNumber: 60,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: {
        show: true,
        length: 5,
        lineStyle: { width: 2, color: 'rgb(33,85,130)' },
      },
      pointer: { show: false },
      detail: { show: false },
    },
    {
      type: 'pie',
      center: center,
      radius: [0, '50%'],
      silent: true,
      itemStyle: { color: 'rgba(75, 126, 203,.1)' },
      data: [{ value: 100 }]
    }
  ],
};