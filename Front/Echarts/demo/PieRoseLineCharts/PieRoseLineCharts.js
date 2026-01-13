// 基础颜色配置
var colorArr = ["#218de0", "#01cbb3", "#85e647", "#5d5cda", "#05c5b0", "#c29927"];
var colorAlpha = ['rgba(60,170,211,0.05)', 'rgba(1,203,179,0.05)', 'rgba(133,230,71,0.05)', 'rgba(93,92,218,0.05)', 'rgba(5,197,176,0.05)', 'rgba(194,153,39,0.05)'];

// 1. 原始数据
var rawData = [
    { value: 63, name: '容量小设备老旧', tooltipText: '设备服役年限>15年\n需近期更换' },
    { value: 27, name: '季节性企业用电', tooltipText: '夏季用电高峰期' },
    { value: 7, name: '企业用电高峰' },
    { value: 13, name: '节假日', tooltipText: '法定节假日补偿' },
    { value: 10, name: '临时用电' },
    { value: 6, name: '三相用电不平衡', tooltipText: '负载分配不均' }
];

// 2. 逻辑处理
var showExtraInfo = false; 
var total = rawData.reduce((sum, item) => sum + item.value, 0);
var avg = (total / rawData.length).toFixed(2);

var seriesData = rawData.map((item, index) => {
    return {
        ...item,
        itemStyle: {
            borderColor: colorArr[index % colorArr.length],
            borderWidth: 2,
            shadowBlur: 20,
            shadowColor: colorArr[index % colorArr.length],
            color: colorAlpha[index % colorAlpha.length]
        }
    };
});

option = {
    backgroundColor: "#090e36",
    
    // 3. 增加标题：顶部居中
    title: {
        text: '用电异常原因分析',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#3bd2fe',
            fontSize: 18,
            fontWeight: 'bold'
        }
    },

    grid: { left: '10%', top: 60, bottom: '15%', right: '10%', containLabel: true },
    
    // 4. 图例配置：底部居中，可翻页
    legend: {
        type: 'scroll', // 开启滚动翻页
        orient: 'horizontal',
        bottom: 10,
        left: 'center',
        pageIconColor: '#3bd2fe', // 翻页箭头颜色
        pageTextStyle: { color: '#fff' },
        textStyle: {
            color: '#d0fffc',
            fontSize: 12
        },
        data: rawData.map(item => item.name)
    },

    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderColor: '#3bd2fe',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        formatter: function(params) {
            let res = '';
            if (showExtraInfo) {
                res += `总数: ${total} | 平均值: ${avg}<br/>`;
                res += `<hr style="border:0.3px solid #555;margin:5px 0;"/>`;
            }
            res += `${params.marker} ${params.name} : ${params.value} (${params.percent}%)`;
            if (params.data.tooltipText) {
                res += `<br/><span style="color:#3bd2fe; font-size:12px;">说明：${params.data.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            return res;
        }
    },
    
    // 1. 移除刻度和辅助线 (隐藏 polar 相关坐标轴)
    polar: { radius: ['10%', '80%'] },
    angleAxis: {
        type: 'category',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false }
    },
    radiusAxis: {
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false }
    },
    
    series: [{
        type: 'pie',
        radius: ['10%', '70%'], // 中心空心 10%
        roseType: 'radius',
        center: ['50%', '50%'],
        startAngle: 100,
        avoidLabelOverlap: true,
        data: seriesData,
        label: {
            formatter: ['{b|{b}}', '{d|{d}%}'].join('\n'),
            rich: {
                b: { color: '#3bd2fe', fontSize: 13, lineHeight: 20 },
                d: { color: '#d0fffc', fontSize: 14, fontWeight: 'bold' },
            }
        },
        labelLine: {
            lineStyle: { color: '#0096b1' },
            length: 15,
            length2: 30
        }
    }]
};