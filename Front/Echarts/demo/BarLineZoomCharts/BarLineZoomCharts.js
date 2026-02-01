// --- 1. 基础配置 ---
var chartConfig = {
    title: '用户变动统计图',
    backgroundColor: '#0d235e',
    showStatistics: true, 
    unit: '数量'
};

// --- 2. 原始数据 ---
var chartData = [
    { name: '2012年', value: 451, tooltipText: '年初推广活动\n效果显著' },
    { name: '2013年', value: 352, tooltipText: '政策调整期间' },
    { name: '2014年', value: 303, tooltipText: '' },
    { name: '2015年', value: 534, tooltipText: '二季度暴涨' },
    { name: '2016年', value: 95,  tooltipText: '系统维护数据缺失' },
    { name: '2017年', value: 236, tooltipText: '稳步回升' },
    { name: '2018年', value: 217, tooltipText: '年底冲刺' }
];

var xLabels = chartData.map(item => item.name);
var rawValues = chartData.map(item => item.value);

// --- 3. 计算统计值 ---
var total = 0, avg = 0;
if (chartConfig.showStatistics) {
    total = rawValues.reduce((a, b) => a + b, 0);
    avg = parseFloat((total / rawValues.length).toFixed(2));
}

var colorMain = 'rgba(23, 255, 243'; 

var option = {
    backgroundColor: chartConfig.backgroundColor,
    title: {
        text: chartConfig.title,
        textStyle: { color: '#fff', fontSize: 16 },
        left: 'center',
        top: '2%'
    },
    // --- 需求优化：添加 DataZoom ---
    dataZoom: [
        {
            type: 'slider', // 下方滑动条
            show: true,
            xAxisIndex: [0],
            left: '10%',
            right: '10%',
            bottom: '2%',
            height: 20,
            borderColor: 'transparent',
            fillerColor: colorMain + ', 0.2)',
            handleStyle: { color: colorMain + ', 0.8)' },
            textStyle: { color: 'rgb(0,253,255,0.6)' }
        },
        {
            type: 'inside', // 允许鼠标滚轮缩放
            xAxisIndex: [0]
        }
    ],
    legend: {
        data: ['折线图', '柱形图', '平均线'],
        textStyle: { color: 'rgb(0,253,255,0.6)' },
        right: '4%',
        top: '5%'
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#17fff3',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        formatter: function(params) {
            let idx = params[0].dataIndex;
            let currentItem = chartData[idx];
            let res = `<div style="font-weight:bold; color:#17fff3; border-bottom:1px solid #555; padding-bottom:5px;">${currentItem.name}</div>`;
            
            if (chartConfig.showStatistics) {
                res += `<div style="font-size:12px; color:#aaa; margin: 5px 0;">总计: ${total} | 平均: ${avg}</div>`;
            }

            let val = currentItem.value;
            let ratioHtml = '';
            if (idx > 0) {
                let prevVal = chartData[idx - 1].value;
                let diff = val - prevVal;
                let percent = ((diff / prevVal) * 100).toFixed(1);
                let color = diff >= 0 ? '#ff4d4f' : '#52c41a';
                ratioHtml = `<span style="color:${color}; margin-left:8px;">${diff >= 0 ? '+' : ''}${diff} (${percent}%)</span>`;
            }

            let percentOfTotal = chartConfig.showStatistics ? ((val / total) * 100).toFixed(1) : 0;
            res += `数值: <b style="font-size:16px;">${val}</b> <small>(${percentOfTotal}%)</small>${ratioHtml}<br/>`;
            
            if (currentItem.tooltipText) {
                res += `<div style="margin-top:8px; padding:8px; background:rgba(23, 255, 243, 0.1); border-left: 3px solid #17fff3; font-size:12px; line-height:1.5;">
                            ${currentItem.tooltipText.replace(/\n/g, '<br/>')}
                        </div>`;
            }
            return res;
        }
    },
    grid: {
        bottom: '15%', // 给 dataZoom 留出空间
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: xLabels,
        axisLabel: { color: 'rgb(0,253,255,0.6)' }
    },
    yAxis: {
        name: chartConfig.unit,
        type: 'value',
        splitLine: { lineStyle: { color: 'rgba(23,255,243,0.1)' } },
        axisLabel: { color: 'rgb(0,253,255,0.6)' }
    },
    series: [
        {
            name: '折线图',
            type: 'line',
            smooth: true,
            symbolSize: 8,
            color: colorMain + ')',
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: colorMain + ', 0.3)' },
                        { offset: 0.8, color: colorMain + ', 0)' }
                    ])
                }
            },
            data: rawValues
        },
        {
            name: '柱形图',
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
                // 确保圆角生效：同时写 borderRadius 和 barBorderRadius (兼容低版本)
                borderRadius: [10, 10, 0, 0],
                barBorderRadius: [10, 10, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorMain + ', 0.8)' },
                    { offset: 1, color: colorMain + ', 0.1)' }
                ])
            },
            data: rawValues
        },
        {
            name: '平均线',
            type: 'line',
            markLine: {
                symbol: 'none',
                data: [{ 
                    yAxis: avg, 
                    lineStyle: { color: '#ffea00', type: 'dashed', width: 2 },
                    label: { show: true, position: 'end', formatter: '平均线' }
                }]
            },
            data: [] 
        }
    ]
};