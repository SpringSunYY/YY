// ==========================================
// 1. 数据与基础配置
// ==========================================
var rawData = [
    { name: '年休假', value: 683, tooltipText: '核心指标\n已使用：400\n剩余：283' },
    { name: '加班调休', value: 523, tooltipText: '近期加班产生' },
    { name: '病假', value: 345 },
    { name: '事假', value: 234 },
    { name: '婚假', value: 234 },
    { name: '产假', value: 450 },
    { name: '工伤假', value: 120 },
    { name: '探亲假', value: 80 }
];

var config = {
    title: '排行榜高级轮播',
    backgroundColor: '#0e2147',
    displayCount: 10,
    playInterval: 2000,
    direction: 'left', // 'left' 或 'right'
    // --- 统计开关 ---
    showStats: true   // 是否计算并显示总数和平均值
};

// --- 统计计算逻辑 ---
var total = 0;
var avg = 0;
if (config.showStats) {
    total = rawData.reduce((sum, item) => sum + item.value, 0);
    avg = (total / rawData.length).toFixed(2);
}

// 数据排序
rawData.sort((a, b) => b.value - a.value);

// --- 随机颜色生成器 (RGB 渐变) ---
var getGradientColor = (index) => {
    // 预设几组高级配色，也可以纯随机
    var colors = [
        ['#1089E7', '#10E7D6'], // 蓝翠
        ['#F57474', '#F8B448'], // 橙红
        ['#56D0E3', '#1089E7'], // 深蓝
        ['#8B78F6', '#E710E7'], // 紫粉
        ['#00E08B', '#10D1E7']  // 绿蓝
    ];
    var pair = colors[index % colors.length];
    return new echarts.graphic.LinearGradient(
        config.direction === 'right' ? 0 : 1, 0, 
        config.direction === 'right' ? 1 : 0, 0, 
        [
            { offset: 0, color: pair[0] },
            { offset: 1, color: pair[1] }
        ]
    );
};

var titlename = rawData.map(item => item.name);
var valdata = rawData.map(item => item.value);

// ==========================================
// 2. ECharts Option 配置
// ==========================================
var isRight = config.direction === 'right';

var option = {
    backgroundColor: config.backgroundColor,
    title: {
        text: config.title,
        textStyle: { color: '#fff', fontSize: 20, fontWeight: 'lighter' },
        left: 'center', top: '2%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(14, 33, 71, 0.9)', // 强化透明度
        borderColor: '#56A7FF',
        borderWidth: 1,
        borderRadius: 8,
        padding: [12, 18],
        textStyle: { color: '#fff', fontSize: 13 },
        extraCssText: 'box-shadow: 0 0 10px rgba(0,0,0,0.5); backdrop-filter: blur(4px);',
        formatter: function (params) {
            var i = params[0].dataIndex;
            var item = rawData[i];
            var rank = i + 1;
            var percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
            
            var res = `<div style="line-height:26px;">
                <span style="color:#FFD700; font-weight:bold; font-size:16px;">Top ${rank}</span>
                <span style="margin-left:10px; font-size:15px; font-weight:bold;">${item.name}</span><br/>
                <div style="border-top:1px dashed rgba(255,255,255,0.3); margin:6px 0;"></div>
                数值: <span style="color:#56A7FF; font-weight:bold;">${item.value}</span> 
                <span style="color:rgba(255,255,255,0.6); margin-left:10px;">(占比: ${percent}%)</span><br/>`;
            
            if (config.showStats) {
                res += `当前总额: <span style="color:#00E08B;">${total}</span><br/>`;
                res += `平均数值: <span style="color:#00E08B;">${avg}</span><br/>`;
            }
            
            if (item.tooltipText) {
                res += `<div style="background:rgba(255,255,255,0.05); padding:5px 8px; border-radius:4px; margin-top:8px; color:#F8B448; font-size:12px; line-height:18px;">
                            ${item.tooltipText.replace(/\n/g, '<br/>')}
                        </div>`;
            }
            return res + '</div>';
        }
    },
    grid: { 
        left: isRight ? '12%' : '8%', 
        right: isRight ? '8%' : '12%', 
        bottom: '8%', top: '15%', 
        containLabel: true 
    },
    xAxis: { show: false, inverse: !isRight },
    yAxis: [
        { 
            show: true, data: titlename, inverse: true, 
            position: isRight ? 'left' : 'right',
            axisLine: { show: false }, axisTick: { show: false },
            axisLabel: { color: '#fff', fontSize: 14, margin: 25 }
        },
        { 
            show: true, inverse: true, data: valdata, 
            position: isRight ? 'right' : 'left',
            axisLine: { show: false }, axisTick: { show: false },
            axisLabel: { 
                color: '#56D0E3', 
                fontSize: 14, 
                fontWeight: 'bold',
                formatter: (value) => value 
            }
        }
    ],
    dataZoom: [
        {
            type: 'slider', show: true, yAxisIndex: [0, 1],
            startValue: 0, endValue: config.displayCount - 1,
            width: 8, right: isRight ? '2%' : 'auto', left: isRight ? 'auto' : '2%',
            zoomLock: true, fillerColor: '#56A7FF',
            backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'transparent',
            handleSize: 0, showDetail: false
        },
        { type: 'inside', yAxisIndex: [0, 1], zoomLock: true }
    ],
    series: [
        {
            name: '背景底色',
            type: 'bar', yAxisIndex: 1, barGap: '-100%',
            data: valdata.map(() => 100),
            barWidth: 28,
            itemStyle: { 
                normal: { color: 'rgba(255,255,255,0.05)', barBorderRadius: 14 } 
            },
            silent: true
        },
        {
            name: '主数据柱',
            type: 'bar', yAxisIndex: 0,
            data: valdata.map((v, idx) => {
                return {
                    value: v,
                    itemStyle: { color: getGradientColor(idx) } // 每一个柱子颜色都不同
                };
            }),
            barWidth: 28,
            itemStyle: { normal: { barBorderRadius: 14 } },
            label: {
                show: true,
                position: isRight ? 'insideLeft' : 'insideRight',
                offset: [isRight ? -5 : 5, -22],
                formatter: (params) => `{rank|NO.${params.dataIndex + 1}}`,
                rich: {
                    rank: {
                        color: '#fff', fontSize: 10, fontWeight: 'bold',
                        padding: [3, 8], borderRadius: 10,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        textShadowBlur: 2, textShadowColor: '#000'
                    }
                }
            }
        }
    ]
};

// ==========================================
// 3. 核心轮播控制器
// ==========================================
(function initRotation() {
    var startIndex = 0;
    var timer = null;
    var checkChart = setInterval(function() {
        if (typeof myChart !== 'undefined' && myChart !== null) {
            clearInterval(checkChart);
            myChart.setOption(option);
            start();
        }
    }, 100);

    function start() {
        if (rawData.length <= config.displayCount) return;
        function play() {
            if (timer) clearInterval(timer);
            timer = setInterval(function() {
                if (startIndex > rawData.length - config.displayCount) startIndex = 0;
                myChart.setOption({
                    dataZoom: [{ startValue: startIndex, endValue: startIndex + config.displayCount - 1 }]
                });
                startIndex++;
            }, config.playInterval);
        }
        function stop() { if (timer) { clearInterval(timer); timer = null; } }
        myChart.getZr().on('mousemove', stop);
        myChart.getZr().on('mousedown', stop);
        myChart.getZr().on('globalout', play);
        myChart.on('dataZoom', (p) => {
            var v = p.batch ? p.batch[0].startValue : p.startValue;
            if (typeof v === 'number') startIndex = Math.ceil(v);
        });
        play();
    }
})();