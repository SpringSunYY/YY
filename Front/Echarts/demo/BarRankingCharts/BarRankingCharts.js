// 1. 模拟数据
var data = [
  { "name": "沈河区", "value": 3143, "tooltipText": "沈阳市的政治、经济、文化中心" },
  { "name": "皇姑区", "value": 2889, "tooltipText": "教育资源丰富，学区密集" },
  { "name": "新民市", "value": 2844, "tooltipText": "重要的农产品基地" },
  { "name": "于洪区", "value": 2736, "tooltipText": "物流仓储集散地" },
  { "name": "铁西区", "value": 2367, "tooltipText": "老工业基地转型典范" },
  { "name": "大东区", "value": 2229, "tooltipText": "汽车产业集群所在地" },
  { "name": "沈北新区", "value": 2168, "tooltipText": "大学城及新兴产业区" },
  { "name": "苏家屯区", "value": 1941, "tooltipText": "沈阳南大门" },
  { "name": "康平县", "value": 1918, "tooltipText": "风能发电重点县" },
  { "name": "和平区", "value": 1827, "tooltipText": "商业步行街太原街所在地" },
  { "name": "辽中区", "value": 1593, "tooltipText": "国家级近海经济区" },
  { "name": "浑南区", "value": 1337, "tooltipText": "高新技术开发区" },
  { "name": "法库县", "value": 954, "tooltipText": "陶瓷产业基地" },
];

// 按数值降序排列
data.sort((a, b) => b.value - a.value);

var names = data.map(item => item.name);
var values = data.map(item => item.value);

// --- 轮播逻辑变量 ---
let startIndex = 0;      // 当前轮播起始位置
const showCount = 6;     // 每次显示的数量（0-6共7个）
let timer = null;        // 定时器容器
let isInteracting = false; // 标记用户是否正在交互（悬停/滚动）

option = {
  backgroundColor: "#041139",
  title: {
    text: '沈阳市各区县数据排行榜',
    left: 'center',
    top: 20,
    textStyle: { color: '#fff', fontSize: 22, fontWeight: 'bold' }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderWidth: 0,
    formatter: function(params) {
      const index = params[0].dataIndex;
      const item = data[index];
      const rank = index + 1;
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
  grid: { left: '5%', right: '10%', top: '15%', bottom: '5%', containLabel: true },
  dataZoom: [
    {
      type: 'inside',      // 内置型，支持鼠标滚轮和拖拽
      yAxisIndex: 0,
      startValue: 0,
      endValue: showCount,
      zoomLock: false,     // 不锁定，允许自由平移
      zoomOnMouseWheel: false, // 【关键】禁用缩放，使滚轮仅用于上下滚动查看
      moveOnMouseMove: true,   // 鼠标移动即可触发
      moveOnMouseWheel: true   // 允许滚轮控制移动
    }
  ],
  xAxis: { type: 'value', show: false },
  yAxis: {
    type: 'category',
    data: names,
    inverse: true, // 倒置，让 NO.1 在最上方
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: "#fff",
      fontSize: 14,
      formatter: function(value, index) {
        if (index === 0) return '{a|' + value + '}';
        if (index === 1) return '{b|' + value + '}';
        if (index === 2) return '{c|' + value + '}';
        return value;
      },
      rich: {
        a: { color: '#ffde00', fontSize: 16, fontWeight: 'bold' },
        b: { color: '#cfcfcf', fontSize: 15 },
        c: { color: '#d39050', fontSize: 14 }
      }
    }
  },
  series: [{
    type: 'bar',
    barWidth: 18,
    showBackground: true,
    backgroundStyle: { color: 'rgba(255, 255, 255, 0.05)', borderRadius: 10 },
    itemStyle: {
      borderRadius: [10, 10, 10, 10],
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#347CDD' },
        { offset: 1, color: '#56fb93' }
      ])
    },
    label: { show: true, position: 'right', color: '#fff', distance: 10 },
    data: values
  }]
};

// --- 增强交互逻辑 ---

// 启动轮播
function startRotation() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    // 仅在用户没有悬停或操作时自动滚动
    if (!isInteracting) {
      if (startIndex >= data.length - showCount - 1) {
        startIndex = 0; // 回到顶部
      } else {
        startIndex++;
      }
      myChart.dispatchAction({
        type: 'dataZoom',
        startValue: startIndex,
        endValue: startIndex + showCount
      });
    }
  }, 2500);
}

// 1. 鼠标悬停在图表上时：停止自动轮播
myChart.on('mousemove', () => {
  isInteracting = true;
});

// 2. 鼠标移出图表时：恢复自动轮播
myChart.on('globalout', () => {
  isInteracting = false;
});

// 3. 【核心修复】监听手动控制（滚动/拖拽）
// 当用户手动控制 dataZoom 时，更新 startIndex，确保轮播衔接手动的位置
myChart.on('dataZoom', (params) => {
  let start;
  if (params.batch && params.batch[0]) {
    start = params.batch[0].startValue;
  } else {
    start = params.startValue;
  }

  if (start !== undefined) {
    // 将手动滚动的位置同步给轮播变量
    startIndex = Math.ceil(start); 
  }
});

// 执行启动
startRotation();