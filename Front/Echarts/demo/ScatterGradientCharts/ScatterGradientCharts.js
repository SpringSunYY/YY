// 1. 原始数据
var plantCap = [
    { name: '具有相关企业资质证书', value: 22342, tooltipText: '企业需具备一级\n或二级资质' },
    { name: '三年内无违法违规记录', value: 29821, tooltipText: '由工商部门开具\n无违规证明' },
    { name: '企业注册资产超过300w', value: 12919 },
    { name: '不接受联合投标', value: 22314, tooltipText: '仅限独立法人' },
    { name: '本项目不得转包、分包给其他任何单位', value: 22903 }, // 测试长字符
    { name: '具有独立承担民事责任能力', value: 22391 },
    { name: '投标人财产没有处于被接管、冻结或破产状态', value: 15781 }
];

// --- 新增：指定字符截断长度 ---
var LABEL_MAX_LENGTH = 6; 

// 2. 计算 Total 和 Avg
var total = plantCap.reduce((sum, item) => sum + item.value, 0);
var avg = (total / plantCap.length).toFixed(2);

function getRandomColor() {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(' + [Math.round(Math.random() * 150), Math.round(Math.random() * 150), 255].join(',') + ', 0.9)'
    }, {
        offset: 1,
        color: 'rgba(' + [Math.round(Math.random() * 150), 255, Math.round(Math.random() * 150)].join(',') + ', 0.9)'
    }]);
}

var offsets = [[50, 50], [35, 75], [20, 45], [75, 50], [40, 20], [60, 20], [75, 80]];

// 3. 处理数据
var datas = plantCap.map((item, i) => {
    var percentage = ((item.value / total) * 100).toFixed(2) + '%';
    return {
        name: item.name, // 这里保留完整名称
        value: offsets[i] || [Math.random() * 100, Math.random() * 100],
        symbolSize: 70 + (item.value / total) * 250, 
        rawVal: item.value,
        percentage: percentage,
        tooltipText: item.tooltipText || '',
        itemStyle: {
            normal: {
                color: getRandomColor(),
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.3)'
            }
        }
    };
});

// 4. ECharts 配置
option = {
    backgroundColor: '#20203e',
    title: {
        text: '数据分布概览',
        left: 'center',
        top: 20,
        textStyle: { color: '#fff' }
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            var res = `<div style="line-height:24px;padding:5px;">
                <b style="font-size:14px;color:#ffeb3b;">汇总：总数 ${total} / 平均 ${avg}</b><br/>
                <hr style="border:0;border-top:1px solid #666;">
                <b>项目：</b>${params.data.name}<br/> <b>数值：</b>${params.data.rawVal}<br/>
                <b>占比：</b>${params.data.percentage}`;
            if (params.data.tooltipText) {
                res += `<br/><b>描述：</b>${params.data.tooltipText.replace(/\n/g, '<br/>')}`;
            }
            res += '</div>';
            return res;
        }
    },
    dataZoom: [
        { type: 'inside', xAxisIndex: 0 },
        { type: 'inside', yAxisIndex: 0 }
    ],
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: { show: false, min: 0, max: 100 },
    series: [{
        type: 'scatter',
        symbol: 'circle',
        label: {
            show: true,
            // --- 6. 核心修改：Label 截取逻辑 ---
            formatter: function(params) {
                var name = params.name;
                if (name.length > LABEL_MAX_LENGTH) {
                    return name.substring(0, LABEL_MAX_LENGTH) + '...';
                }
                return name;
            },
            color: '#fff',
            position: 'inside',
            fontSize: 12,
            lineHeight: 16
        },
        data: datas
    }]
};