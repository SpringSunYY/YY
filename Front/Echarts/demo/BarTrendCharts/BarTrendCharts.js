// 模拟数据源
const rawData = [
    { name: '1月', value: 393, tooltipText: '年初启动阶段\n人员变动较大', max: 500, min: 300 },
    { name: '2月', value: 438, tooltipText: '稳步上升', max: 500, min: 350 },
    { name: '3月', value: 485, max: 600, min: 400 },
    { name: '4月', value: 631, tooltipText: '季度末冲刺', max: 700, min: 500 },
    { name: '5月', value: 500, max: 800, min: 600 },
    { name: '6月', value: 824, tooltipText: '年中总结', max: 900, min: 700 },
    { name: '7月', value: 987, tooltipText: '达到新高', max: 1100, min: 800 }
];

const showExtraInfo = false;
const total = showExtraInfo ? rawData.reduce((sum, item) => sum + item.value, 0) : 0;
const avg = showExtraInfo ? (total / rawData.length).toFixed(2) : 0;

const option = {
    backgroundColor: "#05224d",
    title: {
        text: '注册数据统计分析',
        left: 'center',
        top: '2%',
        textStyle: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
    },
    legend: {
        show: true,
        right: '2%', // 靠右
        top: '2.5%', // 与标题对齐
        itemWidth: 12,
        itemHeight: 12,
        textStyle: { color: '#d1e6eb' },
        data: ['趋势线', '注册量']
    },
    grid: {
        top: '15%',
        left: '3%',
        right: '3%',
        bottom: '5%',
        containLabel: true,
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(5, 34, 77, 0.9)', // 背景色与大背景一致但微透
        borderColor: '#17f8ff',
        borderWidth: 1,
        padding: [10, 15],
        textStyle: { color: '#fff' },
        // 自定义 HTML 结构让其更美观
        formatter: function (params) {
            const index = params[0].dataIndex;
            const item = rawData[index];
            const prevItem = rawData[index - 1];
            
            
            // 趋势计算
            let trendHtml = '';
            if (prevItem) {
                const diff = item.value - prevItem.value;
                const percent = ((diff / prevItem.value) * 100).toFixed(1);
                const color = diff >= 0 ? '#ff4d4f' : '#73d13d';
                const icon = diff >= 0 ? '▲' : '▼';
                trendHtml = `<span style="color:${color}; margin-left:10px;">${icon} ${Math.abs(diff)} (${percent}%)</span>`;
            }

            let html = `
                <div style="min-width:180px;">
                    <div style="border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:5px; margin-bottom:8px; font-weight:bold; color:#17f8ff;">
                        ${item.name} 数据详情
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span>数值:</span>
                        <span style="font-weight:bold;">${item.value} ${trendHtml}</span>
                    </div>
            `;

            if (item.max !== undefined) {
                html += `
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:12px; color:#aaa;">
                        <span>范围:</span>
                        <span>Min: ${item.min} / Max: ${item.max}</span>
                    </div>`;
            }

            if (showExtraInfo) {
                html += `
                    <div style="margin-top:8px; padding-top:5px; border-top:1px dashed rgba(255,255,255,0.2); font-size:12px; color:#d1e6eb;">
                        周期总量: ${total} | 平均: ${avg}
                    </div>`;
            }

            if (item.tooltipText) {
                html += `
                    <div style="margin-top:8px; padding:6px; background:rgba(255,235,59,0.1); border-left:3px solid #ffeb3b; color:#ffeb3b; font-size:12px; line-height:1.5;">
                        ${item.tooltipText.replace(/\n/g, '<br/>')}
                    </div>`;
            }

            html += `</div>`;
            return html;
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data: rawData.map(item => item.name),
        axisLine: { lineStyle: { color: '#f9f9f9' } },
        axisTick: { show: false }
    },
    yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#0a3256', type: 'dashed' } },
        axisLine: { show: false },
        axisLabel: { color: '#d1e6eb' }
    },
    series: [
        {
            name: '趋势线',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            z: 10, // 确保线在柱子上面
            lineStyle: { width: 3, color: '#28ffb3' },
            itemStyle: { color: '#28ffb3', borderColor: '#fff', borderWidth: 2 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(40,255,179,0.3)' },
                    { offset: 1, color: 'rgba(40,255,179,0)' }
                ])
            },
            data: rawData.map(item => item.value)
        },
        {
            name: '注册量',
            type: 'bar',
            barWidth: 22,
            itemStyle: {
                borderRadius: [4, 4, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#17f8ff' },
                    { offset: 1, color: '#0ec1ff' }
                ])
            },
            data: rawData
        }
    ]
};