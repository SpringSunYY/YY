// --- 外部 Props 模拟 ---
const showExtraInfo = true; // 控制是否计算并显示总计/平均值

// 1. 原始数据定义
let rawData = [
    { name: '重叠大项', value: 100, min: 500, max: 500, tooltipText: '我是大球的详细描述' },
    { name: '重叠小项', value: 20, min: 500, max: 500, tooltipText: '我是小球，我必须显示' },
    ...Array.from({ length: 25 }).map((_, i) => ({
        name: `数据项-${i}`,
        value: Math.floor(Math.random() * 80) + 10,
        min: Math.floor(Math.random() * 800) + 100,
        max: Math.floor(Math.random() * 800) + 100,
        tooltipText: `这是第${i}项的自定义业务描述文本`
    }))
];

// 2. 按需计算统计数据 (优化点：如果 showExtraInfo 为 false 则不执行计算)
let total = 0;
let avg = 0;
if (showExtraInfo) {
    total = rawData.reduce((sum, item) => sum + item.value, 0);
    avg = (total / rawData.length).toFixed(2);
}

// 3. 随机渐变函数
function getDynamicGradient() {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(' + [Math.round(Math.random() * 150), Math.round(Math.random() * 150), 255].join(',') + ', 0.9)'
    }, {
        offset: 1,
        color: 'rgba(' + [Math.round(Math.random() * 150), 255, Math.round(Math.random() * 150)].join(',') + ', 0.9)'
    }]);
}

// 4. ECharts 配置
option = {
    backgroundColor: "#071435",
    title: {
        text: '业务数据分布统计',
        left: 'center',
        top: 20,
        textStyle: { color: '#fff', fontSize: 18 }
    },
dataZoom: [
    // --- X 轴控制 (水平方向) ---
    {
        type: 'inside',
        xAxisIndex: [0],
        zoomOnMouseWheel: true, // 滚轮控制 X 轴缩放
        moveOnMouseWheel: false, 
        preventDefaultMouseMove: true
    },
    {
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'none',
        height: 24,
        bottom: '2%',
        left: '10%',
        right: '10%',
        start: 0,
        end: 100,
        backgroundColor: 'rgba(255,255,255,0.05)',
        fillerColor: 'rgba(99, 190, 248, 0.3)',
        borderColor: 'transparent',
        handleIcon: 'roundRect',
        handleSize: '120%',
        handleStyle: { color: '#63bef8' },
        showDetail: false,
        realtime: true // 拖动时实时更新位置
    },

    // --- Y 轴控制 (垂直方向) ---
    {
        type: 'inside',
        yAxisIndex: [0],
        // 如果你希望滚轮只缩放 X 轴，可以将下面设为 false
        // 或者配合 Shift 键使用，这里设为 true 是为了支持在 Y 轴区域独立缩放
        zoomOnMouseWheel: true, 
        moveOnMouseWheel: false,
        preventDefaultMouseMove: true
    },
    {
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'none',
        width: 24,
        left: 10,
        top: '15%',
        bottom: '15%',
        start: 0,
        end: 100,
        backgroundColor: 'rgba(255,255,255,0.05)',
        fillerColor: 'rgba(99, 190, 248, 0.3)',
        borderColor: 'transparent',
        handleIcon: 'roundRect',
        handleSize: '120%',
        handleStyle: { color: '#63bef8' },
        showDetail: false,
        realtime: true
    }
],

grid: {
    left: '8%',
    right: '50px', // 给右侧 Y 轴缩放条留位置
    bottom: '60px', // 给下方 X 轴缩放条留位置
    containLabel: true
},
    tooltip: {
        trigger: 'item',
        confine: true,
        backgroundColor: 'rgba(0,0,0,0.85)',
        borderColor: '#63bef8',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        formatter: function (params) {
            let d = params.data;
            let res = `<b style="color:#63bef8;font-size:15px;">${d.name}</b><br/>`;
            res += `最大: ${d.originMax}<br/>`;
            res += `最小: ${d.originMin}<br/>`;
            res += `当前数值: ${d.realValue}<br/>`;
            
            // 只有开启时才显示统计信息
            if (showExtraInfo) {
                res += `<hr style="border:none;border-top:1px solid #444;margin:5px 0;" />`;
                res += `总计: ${total} | 平均: ${avg}<br/>`;
            }
            
            if (d.tooltipText) {
                res += `<div style="color:#aaa;font-size:12px;margin-top:5px;">${d.tooltipText.replace(/\n/g, '<br/>')}</div>`;
            }
            return res;
        }
    },
    xAxis: { type: 'value', scale: true, axisLabel: { color: '#ccc' }, splitLine: { show: false } },
    yAxis: { type: 'value', scale: true, axisLabel: { color: '#ccc' }, splitLine: { show: false } },
    series: [{
        type: 'scatter',
        // 排序确保小球在大球上层，并对重叠坐标进行微调
        data: rawData.sort((a, b) => b.value - a.value).map((item, index) => {
            const isOverlap = rawData.some((other, i) => i !== index && other.max === item.max && other.min === item.min);
            const offset = isOverlap ? (index * 2) : 0; // 微量偏移

            return {
                value: [item.max + offset, item.min + offset], 
                realValue: item.value,
                originMax: item.max,
                originMin: item.min,
                name: item.name,
                tooltipText: item.tooltipText,
                itemStyle: {
                    color: getDynamicGradient(),
                    opacity: 0.8
                },
                z: index + 1000 
            };
        }),
        symbolSize: function (val, params) {
            // 如果不计算 total，则使用默认比例或 rawData 的总和
            let currentTotal = showExtraInfo ? total : rawData.reduce((s, i) => s + i.value, 0);
            let ratio = params.data.realValue / currentTotal;
            return Math.sqrt(ratio) * 400 + 15;
        },
        label: {
            show: true,
            formatter: '{b}',
            position: 'inside',
            color: '#fff',
            fontSize: 10
        },
        labelLayout: { hideOverlap: true },
        emphasis: {
            focus: 'self',
            scale: 1.4,
            itemStyle: {
                opacity: 1,
                borderColor: '#fff',
                borderWidth: 2
            }
        }
    }]
};