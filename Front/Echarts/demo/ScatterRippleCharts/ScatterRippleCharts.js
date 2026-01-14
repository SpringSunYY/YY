// 1. 数据定义
var Data = [
    { name: "电力热力", value: 130, tooltipText: "电力供应与热力生产" },
    { name: "管理员", value: 80, tooltipText: "系统后台管理" },
    { name: "医生", value: 110, tooltipText: "医疗诊断专家" },
    { name: "护工", value: 600, tooltipText: "专业生活护理" },
    { name: "护士", value: 95, tooltipText: "医疗护理服务" },
    { name: "技师", value: 70, tooltipText: "技术支持" },
    { name: "志愿者", value: 50, tooltipText: "社区服务" }
];

var colorList = ['#37D287', '#2CC2DE', '#E96750', '#43A3EC', '#E2AD7B'];

// 2. 核心逻辑：带碰撞检测的随机位置生成
var datas = [];
var maxVal = Math.max(...Data.map(d => d.value));

Data.forEach((item, index) => {
    var minS = 70; // 气泡最小半径
    var maxS = 130; // 气泡最大半径
    var currentSize = minS + (item.value / maxVal) * (maxS - minS);
    
    var x, y, isOverlap;
    var attempts = 0; // 防止死循环

    // 为每个气泡寻找一个不重叠的随机位置
    do {
        isOverlap = false;
        // 随机坐标 (20% - 80% 之间，留出边缘避免切边)
        x = Math.floor(Math.random() * 60) + 20;
        y = Math.floor(Math.random() * 60) + 20;
        attempts++;

        // 碰撞检测：遍历已生成的点，确保圆心距离 > 两圆半径之和
        for (let i = 0; i < datas.length; i++) {
            var prev = datas[i];
            var dx = x - prev.value[0];
            var dy = y - prev.value[1];
            var distance = Math.sqrt(dx * dx + dy * dy);
            
            // 映射到坐标系（假设100单位对应图表宽度），这里给一个安全间距系数 0.8
            var minDistance = (currentSize + prev.symbolSize) / 10; 
            if (distance < minDistance) {
                isOverlap = true;
                break;
            }
        }
        // 如果尝试次数过多还没找到，强行放置，防止卡死
    } while (isOverlap && attempts < 100);

    datas.push({
        name: item.name,
        value: [x, y],
        symbolSize: currentSize,
        tooltipText: item.tooltipText || item.name,
        rawValue: item.value,
        itemStyle: {
            normal: {
                color: colorList[index % colorList.length],
                opacity: 0.9,
                shadowBlur: 15,
                shadowColor: 'rgba(0,0,0,0.2)'
            }
        }
    });
});

// 3. 配置项
option = {
    backgroundColor: '#fff',
    title: {
        text: '人员构成分布',
        left: 'center',
        top: 20,
        textStyle: { color: '#333', fontSize: 24 }
    },
    // 优化 2：增强缩放交互
    dataZoom: [
        {
            type: 'inside',
            xAxisIndex: [0],
            yAxisIndex: [0],
            filterMode: 'none',
            zoomOnMouseWheel: true, // 滚轮缩放
            moveOnMouseMove: true   // 鼠标移动平移
        }
    ],
    tooltip: {
        show: true,
        backgroundColor: 'rgba(255,255,255,0.9)',
        formatter: function(params) {
            return `名称：${params.name}<br/>说明：${params.data.tooltipText}<br/>数值：${params.data.rawValue}`;
        }
    },
    grid: { left: 0, right: 0, top: 0, bottom: 0 },
    xAxis: { type: 'value', show: false, min: 0, max: 100 },
    yAxis: { type: 'value', show: false, min: 0, max: 100 },
      series: [{
        type: 'effectScatter',
        symbol: 'circle',
        symbolSize: 120,
        label: {
            normal: {
                show: true,
                formatter: '{b}',
                color: '#fff',
                textStyle: {
                    fontSize: '20'
                }
            },
        },
        data: datas
    }]
};