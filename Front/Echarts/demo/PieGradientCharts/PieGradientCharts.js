// --- 1. 基础配置字段 ---
const titleName = '年休假统计'; 
const backgroundColor = '#ffffff'; 
const showTotalAvg = true; 

const trafficWay = [
  { name: '年休假', value: 40, tooltipText: '法定年度休息时间\n包含带薪假期' },
  { name: '病假', value: 20, tooltipText: '医疗期内休假' },
  { name: '事假', value: 10 }, 
  { name: '调休', value: 30, tooltipText: '加班补偿性休息' }
];

const color = ['#00A1A3', '#42BEEC', '#8EC21F', '#F0932B'];

// --- 2. 逻辑计算 ---
let total = 0;
let avg = 0;
if (showTotalAvg) {
  total = trafficWay.reduce((sum, item) => sum + Number(item.value || 0), 0);
  avg = (total / trafficWay.length).toFixed(2);
}

// --- 3. 构造 Data ---
const data = [];
for (let i = 0; i < trafficWay.length; i++) {
  data.push(
    {
      value: trafficWay[i].value,
      name: trafficWay[i].name,
      tooltipText: trafficWay[i].tooltipText, 
      itemStyle: {
        normal: {
          borderWidth: 15,
          borderRadius: 25, 
          borderColor: color[i % color.length],
          shadowBlur: 10,
          shadowColor: color[i % color.length]
        }
      },
      label: {
        show: true,
        formatter: '{b}: {c}',
        textStyle: { fontSize: 16, color: '#444', fontWeight: 'bold' }
      },
      labelLine: {
        show: true,
        length: 25,
        length2: 35
      }
    },
    {
      value: 4, 
      name: '',
      itemStyle: {
        normal: {
          color: 'transparent',
          borderColor: 'transparent'
        }
      },
      label: { show: false },
      labelLine: { show: false },
      tooltip: { show: false }
    }
  );
}

// --- 4. 组装 Option ---
option = {
  backgroundColor: backgroundColor,
  color: color,
  title: {
    text: total,       
    subtext: titleName, 
    x: 'center',
    y: '43%', 
    textStyle: {
      fontSize: 50,
      fontWeight: 'bold',
      color: '#00A1A3'
    },
    subtextStyle: {
      color: '#5F687B',
      fontSize: 28
    }
  },
  tooltip: {
    show: true,
    trigger: 'item',
    padding: 0,
    backgroundColor: 'transparent', 
    borderWidth: 0,
    formatter: function(params) {
      if (!params.name) return '';
      
      // 采用灰色透明背景，利用 backdrop-filter 增加磨砂感（浏览器支持的情况下）
      let res = `<div style="background: rgba(50, 50, 50, 0.85); padding: 15px; border-radius: 10px; color: #fff; box-shadow: 0 8px 20px rgba(0,0,0,0.3); min-width: 150px;">`;
      
      // 标题仍然使用该项对应的颜色来区分
      res += `<div style="color: ${params.color}; font-weight: bold; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; margin-bottom: 8px;">${params.name}</div>`;
      
      if (showTotalAvg) {
        res += `<div style="font-size: 12px; color: #ccc; margin-bottom: 5px;">总计: ${total} &nbsp;&nbsp; 平均: ${avg}</div>`;
      }
      
      res += `<div style="margin-top: 5px;">数值: <span style="font-size: 16px; font-weight: bold;">${params.value}</span> <span style="color: #bbb; font-size: 13px;">(${params.percent}%)</span></div>`;
      
      if (params.data.tooltipText) {
        // 内部描述块使用稍微深一点的黑色背景作为区分
        const text = params.data.tooltipText.replace(/\n/g, '<br/>');
        res += `<div style="margin-top: 10px; padding: 10px; background: rgba(0, 0, 0, 0.3); border-radius: 6px; color: #ddd; font-size: 12px; line-height: 1.6;">${text}</div>`;
      }
      
      res += `</div>`;
      return res;
    }
  },
  legend: {
    type: 'scroll',
    bottom: '2%',
    left: 'center',
    icon: 'circle',
    itemGap: 30,
    textStyle: { fontSize: 16 },
    data: trafficWay.map(item => item.name)
  },
  series: [
    // 1. 内层白色实心圆 (60%)
    {
      type: 'pie',
      zlevel: -1,
      radius: ['0%', '60%'],
      center: ['50%', '50%'],
      silent: true,
      itemStyle: {
        normal: {
          shadowBlur: 20,
          shadowColor: 'rgba(0,161,163,0.1)',
          color: '#fff'
        }
      },
      data: [100]
    },
    // 2. 中间主环 (半径放大)
    {
      name: '统计',
      type: 'pie',
      clockWise: false,
      radius: [220, 265], 
      center: ['50%', '50%'],
      hoverAnimation: true,
      hoverOffset: 15, 
      data: data 
    },
    // 3. 最外层装饰浅色环 (92%)
    {
      type: 'pie',
      radius: ['0%', '92%'],
      center: ['50%', '50%'],
      silent: true,
      itemStyle: {
        normal: {
          color: 'rgba(0,161,163,0.03)'
        }
      },
      data: [100]
    }
  ]
};