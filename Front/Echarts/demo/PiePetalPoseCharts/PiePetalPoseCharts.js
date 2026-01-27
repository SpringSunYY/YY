
/** ---- 配置区域 ---- **/
const titleText = '假期统计'; // 5. 标题
const bgColor = '#000'; // 5. 背景颜色
const showStats = true; // 2. 是否显示总数和平均值统计

const rawData = [
    { name: '年休假', value: 40, tooltipText: '法定额度\n今年已休10天' },
    { name: '事假', value: 15, tooltipText: '个人私事处理' },
    { name: '病假', value: 25, tooltipText: '医生证明\n全薪' },
    { name: '调休', value: 60, tooltipText: '加班补偿' },
    { name: '婚假', value: 10 },
];

// 2. 统计计算
let total = 0;
let avg = 0;
if (showStats) {
    total = rawData.reduce((sum, item) => sum + item.value, 0);
    avg = (total / rawData.length).toFixed(2);
}

// 7. 图表位置和大小调整
const pieCenter = ['40%', '55%']; // 稍微向右下移动
const radiusSize = ['16%', '80%']; // 8. 内部环放大，整体也放大

/** ---- ECharts 配置 ---- **/
option = {
    backgroundColor: bgColor,
    title: {
        text: titleText,
        textStyle: { color: '#FFF', fontSize: 20 },
        top: 20,
        left: 20
    },
    // 3. 优化 Tooltip
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(50, 50, 50, 0.8)',
        borderColor: '#777',
        borderWidth: 1,
        padding: [10, 15],
        textStyle: { color: '#fff' },
        formatter: function(params) {
            const data = params.data;
            const percent = params.percent + '%';
            
            let res = `<div style="font-weight:bold;margin-bottom:5px;border-bottom:1px solid #777">${params.name}</div>`;
            res += `数值：${data.value} (${percent})<br/>`;
            
            if (showStats) {
                res += `总计：${total} | 平均：${avg}<br/>`;
            }
            
            // 1. 添加额外的 tooltipText
            if (data.tooltipText) {
                res += `<span style="color: #FFEF00">说明：${data.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            return res;
        }
    },
    // 6. Legend 优化
    legend: {
        type: 'scroll', // 开启翻页
        orient: 'vertical',
        right: '5%',
        top: 'middle',
        textStyle: { color: '#FFF' },
        itemGap: 15,
        // 只显示 name
        formatter: (name) => name,
        // 8. 过滤掉装饰环的图例
        data: rawData.map(item => item.name) 
    },
    color: ['#FFEF00', '#00E899', '#006FFF', '#73d0fd', '#E062AE', '#FF5722'],
    series: [
        // 4. 背景装饰（多层圆环增强层次感）
        {
            type: 'pie',
            zlevel: 1,
            radius: ['0%', '85%'],
            center: pieCenter,
            silent: true,
            label: { show: false },
            data: [{ value: 0, itemStyle: { color: 'rgba(255,255,255,0.05)' } }]
        },
        // 8. 内部装饰环放大
        {
            type: 'pie',
            zlevel: 4,
            radius: ['0%', '10%'],
            center: pieCenter,
            silent: true,
            label: { show: false },
            data: [{ value: 0, itemStyle: { color: '#FFF' } }]
        },
        {
            type: 'pie',
            zlevel: 3,
            radius: ['0%', '22%'],
            center: pieCenter,
            silent: true,
            label: { show: false },
            data: [{ value: 0, itemStyle: { color: 'rgba(255,255,255, 0.4)' } }]
        },
        // 数据层
        {
            name: '数据主体',
            type: 'pie',
            roseType: 'area', // 面积模式玫瑰图
            zlevel: 2,
            clockwise: false,
            center: pieCenter,
            radius: radiusSize,
            itemStyle: {
                borderRadius: 8, // 4. 更加圆润
                borderColor: bgColor,
                borderWidth: 2
            },
            label: {
                show: true,
                color: '#ddd',
                formatter: '{b}: {c}'
            },
            data: rawData
        }
    ]
};