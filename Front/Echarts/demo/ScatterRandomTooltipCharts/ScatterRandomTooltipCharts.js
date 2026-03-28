// 1. 原始数据
var rawData = [
    { name: "电力热力", value: 130, tooltipText: "电力供应与热力生产" },
    { name: "水利环境", value: 150, tooltipText: "水利管理及环境治理" },
    { name: "批发零售", value: 130 },
    { name: "制造业", value: 170, tooltipText: "高端装备制造业" },
    { name: "房地产", value: 140, tooltipText: "住宅与商业地产" },
    { name: "交通运输", value: 70, tooltipText: "物流与公共交通" },
    { name: "居民服务", value: 140 },
    { name: "教育", value: 130, tooltipText: "高等教育与职业培训" },
];

// 2. 计算总计
var totalSum = rawData.reduce((sum, item) => sum + item.value, 0);
var colors = ['#20F397', '#FEF009', '#02DDDF', '#FF0000', '#00FFFF', '#FF7E00', '#601986', '#A155E1'];

// 3. 处理数据
var data = rawData.map((item, index) => {
    var percentage = ((item.value / totalSum) * 100).toFixed(2);
    var symbolSize = (item.value / totalSum) * 700; 

    return {
        name: item.name,
        // 随机坐标 10-90
        value: [
            Math.floor(Math.random() * 80) + 10, 
            Math.floor(Math.random() * 80) + 10
        ], 
        symbolSize: Math.max(symbolSize, 50),
        tooltipText: item.tooltipText,
        realValue: item.value,
        percentage: percentage,
        itemStyle: {
            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0.2, color: "rgba(27, 54, 72, 0.3)" },
                { offset: 1, color: colors[index % colors.length] }
            ]),
            borderColor: colors[index % colors.length],
            borderWidth: 2
        }
    };
});

option = {
    backgroundColor: 'rgba(36, 130, 160, 1)',
    title: {
        text: '行业分布占比图 (全向缩放版)',
        left: 'center',
        top: 20,
        textStyle: { color: '#fff', fontSize: 22 }
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            var d = params.data;
            return `<div style="padding:5px">
                        <b style="font-size:14px; border-bottom:1px solid #aaa; display:block; margin-bottom:5px;">数据详情</b>
                        总计总量: ${totalSum}<br/>
                        行业: ${d.name}<br/>
                        数值: ${d.realValue} (${d.percentage}%)
                        ${d.tooltipText ? '<br/><span style="color:#ffeb3b">说明: ' + d.tooltipText + '</span>' : ''}
                    </div>`;
        }
    },
    // --- 核心修复：开启上下左右全方位缩放 ---
    dataZoom: [
        { 
            type: 'inside', 
            xAxisIndex: 0, // 控制X轴
            filterMode: 'none'
        },
        { 
            type: 'inside', 
            yAxisIndex: 0, // 控制Y轴
            filterMode: 'none'
        }
    ],
    grid: {
        top: 100,
        bottom: 50,
        left: 50,
        right: 50
    },
    xAxis: {
        type: "value",
        show: false,
        min: -30, 
        max: 130
    },
    yAxis: {
        type: "value",
        show: false,
        min: -30,
        max: 130
    },
    series: [{
        type: "scatter",
        data: data,
        label: {
            show: true,
            formatter: "{b}",
            color: "#fff",
            fontWeight: "bold"
        },
        animationDurationUpdate: 500
    }]
};