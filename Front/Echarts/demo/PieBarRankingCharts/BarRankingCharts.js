// 1. 模拟整合后的数据 (保持你的结构)
const sourceData = [
    {
        name: "医养健康",
        value: 12,
        tooltipText: "关注老年人医疗与康复服务",
        barValue: [
            { "name": "沈河区", "value": 3143, "tooltipText": "沈阳市的政治中心" },
            { "name": "皇姑区", "value": 2889, "tooltipText": "教育资源丰富" },
            { "name": "新民市", "value": 2844, "tooltipText": "农产品基地" },
            { "name": "于洪区", "value": 2736, "tooltipText": "物流集散地" },
            { "name": "铁西区", "value": 4000, "tooltipText": "测试排序：原本在后现在应排第一" },
            { "name": "大东区", "value": 2229, "tooltipText": "汽车产业" },
            { "name": "沈北新区", "value": 2168, "tooltipText": "大学城" },
                { "name": "沈河区", "value": 3143, "tooltipText": "沈阳市的政治中心" },
            { "name": "皇姑区", "value": 2889, "tooltipText": "教育资源丰富" },
            { "name": "新民市", "value": 2844, "tooltipText": "农产品基地" },
            { "name": "于洪区", "value": 2736, "tooltipText": "物流集散地" },
            { "name": "铁西区", "value": 4000, "tooltipText": "测试排序：原本在后现在应排第一" },
            { "name": "大东区", "value": 2229, "tooltipText": "汽车产业" },
            { "name": "沈北新区", "value": 2168, "tooltipText": "大学城" }
        ]
    },
    {
        name: "文化创意",
        value: 8,
        tooltipText: "涵盖动漫、游戏、设计等领域",
        barValue: [
            { "name": "和平区", "value": 1500, "tooltipText": "文创园区集中" },
            { "name": "沈河区", "value": 1200, "tooltipText": "文化底蕴深厚" },
            { "name": "大东区", "value": 1900, "tooltipText": "排序测试：应排第一" }
        ]
    },
    {
        name: "新一代信息技术",
        value: 15,
        tooltipText: "包含 5G、人工智能、大数据",
        barValue: [
            { "name": "浑南区", "value": 4500, "tooltipText": "高新企业聚集" },
            { "name": "沈北新区", "value": 3200, "tooltipText": "数字产业园" }
        ]
    }
];

// 2. 公共配置与状态
const colors = ['#2ca1ff', '#0adbfa', '#febe13', '#65e5dd', '#7b2cff', '#fd5151', '#f071ff', '#85f67a'];
let currentIndustry = sourceData[0].name; 

// --- 【关键优化：排序函数】 ---
function getSortedBarData(dataArray) {
    return [...dataArray].sort((a, b) => b.value - a.value);
}

let barData = getSortedBarData(sourceData[0].barValue); // 初始数据排序
let startIndex = 0;
const showCount = 6;
let timer = null;
let isInteracting = false;

// 3. 饼图数据处理（带间隙）
function getPieData() {
    let chartData = [];
    const total = sourceData.reduce((sum, item) => sum + item.value, 0);
    sourceData.forEach((item, i) => {
        chartData.push({
            value: item.value,
            name: item.name,
            originData: item,
            itemStyle: {
                borderWidth: 2,
                borderRadius: 5,
                borderColor: colors[i % colors.length],
                shadowBlur: 5,
                shadowColor: colors[i % colors.length]
            },
            // 选中样式
            select: {
                itemStyle: {
                    borderWidth: 4,
                    borderColor: '#fff',
                    shadowBlur: 10
                }
            }
        }, {
            value: total * 0.02,
            name: '',
            itemStyle: { color: 'transparent' },
            tooltip: { show: false }
        });
    });
    return chartData;
}

// 4. 生成配置项
function getOption() {
    return {
        backgroundColor: "#041139",
        title: [
            {
                text: '签约项目分类',
                left: '22%',
                top: '40%',
                textStyle: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
            },
            {
                text: '【' + currentIndustry + '】区县排行',
                left: '65%',
                top: 20,
                textStyle: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
            }
        ],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.8)',
            formatter: function (params) {
                if (params.seriesType === 'pie') {
                    if (!params.name) return '';
                    const item = params.data.originData;
                    return `<b style="color:${params.color}">${item.name}</b><br/>数值：${item.value}<br/>说明：${item.tooltipText || '无'}`;
                } else {
                    const item = barData[params.dataIndex];
                    return `<b>NO.${params.dataIndex + 1} - ${item.name}</b><br/>数值：${item.value}<br/>${item.tooltipText}`;
                }
            }
        },
        legend: {
            type: 'scroll',
            orient: 'horizontal',
            bottom: '5%',
            left: '5%',
            width: '40%',
            data: sourceData.map(i => i.name),
            textStyle: { color: '#24adfe' },
            pageTextStyle: { color: '#fff' }
        },
        grid: { left: '55%', right: '10%', top: '15%', bottom: '10%', containLabel: true },
        xAxis: { type: 'value', show: false },
        yAxis: {
            type: 'category',
            inverse: true,
            data: barData.map(i => i.name),
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                color: "#fff",
                fontSize: 14,
                formatter: (value, index) => {
                    // 由于数据已排序，index 0/1/2 必然是前三名
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
        dataZoom: [{
            type: 'inside',
            yAxisIndex: 0,
            startValue: 0,
            endValue: showCount,
            zoomOnMouseWheel: false,
            moveOnMouseWheel: true
        }],
        series: [
            {
                name: '行业分布',
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['25%', '45%'],
                selectedMode: 'single', 
                data: getPieData(),
                label: { show: false },
                emphasis: { scale: true }
            },
            {
                name: '区县排行',
                type: 'bar',
                barWidth: 18,
                showBackground: true,
                backgroundStyle: { color: 'rgba(255, 255, 255, 0.05)', borderRadius: 10 },
                itemStyle: {
                    borderRadius: 10,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#347CDD' },
                        { offset: 1, color: '#56fb93' }
                    ])
                },
                label: { show: true, position: 'right', color: '#fff' },
                data: barData.map(i => i.value)
            }
        ]
    };
}

// 5. 初始化
myChart.setOption(getOption());

// 默认选中第一个饼图块（使其高亮）
myChart.dispatchAction({
    type: 'pieSelect',
    dataIndex: 0
});

// 6. 点击饼图切换逻辑
myChart.on('click', (params) => {
    if (params.seriesType === 'pie' && params.name !== '') {
        const selectedItem = sourceData.find(item => item.name === params.name);
        if (selectedItem) {
            currentIndustry = selectedItem.name;
            // 【执行排序】
            barData = getSortedBarData(selectedItem.barValue); 
            startIndex = 0;

            myChart.setOption({
                title: [{}, { text: '【' + currentIndustry + '】区县排行' }],
                yAxis: { data: barData.map(i => i.name) },
                series: [{}, { data: barData.map(i => i.value) }],
                dataZoom: [{ startValue: 0, endValue: showCount }]
            });
        }
    }
});

// 7. 轮播逻辑
function startRotation() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        if (!isInteracting && barData.length > showCount) {
            if (startIndex >= barData.length - showCount - 1) {
                startIndex = 0;
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

myChart.on('mousemove', () => isInteracting = true);
myChart.on('globalout', () => isInteracting = false);
myChart.on('dataZoom', (params) => {
    let start = params.batch ? params.batch[0].startValue : params.startValue;
    if (start !== undefined) startIndex = Math.ceil(start);
});

startRotation();