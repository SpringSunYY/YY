// --- 1. 配置字段提取 (已改为独立字段) ---
const titleText = '人员状态分布统计';
const backgroundColor = '#000d20'; // 背景颜色
const showStatistics = true;       // 是否显示总数和平均值
const showLegend = true;           // 是否显示底部图例

// 颜色列表
const colorList = ['rgb(21, 70, 187)', 'rgb(12, 139, 229)', 'rgb(211, 120, 126)', 'rgb(225, 168, 37)', 'rgb(231, 201, 27)', 'rgb(60, 185, 180)', 'rgb(17, 187, 215)'];

// 2. 数据定义
let data = [
    { name: "退休", value: 61, tooltipText: "已办理退休手续\n享受社保待遇" },
    { name: "下岗", value: 30, tooltipText: "企业编制内\n协议离岗人员" },
    { name: "无业", value: 40 },
    { name: "在职", value: 55, tooltipText: "正常缴纳公积金\n在岗人员" },
    { name: "待业", value: 24 },
    { name: "其他", value: 36, tooltipText: "包含兼职、自由职业\n等特殊情况" },
];

// 3. 统计逻辑
let total = 0;
let avg = 0;
if (showStatistics) {
    total = data.reduce((sum, item) => sum + item.value, 0);
    avg = (total / data.length).toFixed(2);
}

// 数据排序与样式处理
data = data.sort((a, b) => a.value - b.value);
data.forEach((item, index) => {
    const baseColor = colorList[index % colorList.length];
    const transparentColor = baseColor.replace('rgb', 'rgba').replace(')', ', 0.5)');
    item.itemStyle = {
        color: transparentColor,
        borderColor: baseColor,
    };
});

// --- 4. ECharts 配置项 ---
option = {
    backgroundColor: backgroundColor,
    
    title: {
        text: titleText,
        top: '3%', // 稍微下移一点点
        left: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 20 // 标题稍微放大
        }
    },

    legend: {
        show: showLegend,
        type: 'scroll',
        orient: 'horizontal',
        bottom: '2%', // 离底部更近，腾出空间给饼图
        left: 'center',
        pageIconColor: '#0be5ff',
        pageTextStyle: { color: '#fff' },
        textStyle: { color: '#8E99B3', fontSize: 14 },
        data: data.map(item => item.name)
    },

    tooltip: {
        trigger: 'item',
        padding: 10,
        backgroundColor: 'rgba(0, 30, 60, 0.8)',
        borderColor: '#0be5ff',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        formatter: function (params) {
            let str = `<div style="line-height:24px;">`;
            str += `<b style="font-size:16px; color:${params.color}">${params.name}</b><br/>`;
            if (showStatistics) {
                str += `总数：<span style="color:#0be5ff">${total}</span><br/>`;
                str += `平均：<span style="color:#0be5ff">${avg}</span><br/>`;
            }
            str += `当前数值：${params.value}<br/>`;
            str += `占比：${params.percent}%<br/>`;
            if (params.data.tooltipText) {
                const formattedText = params.data.tooltipText.replace(/\n/g, '<br/>');
                str += `<hr style="border:none; border-top:1px solid rgba(255,255,255,0.2); margin:5px 0;" />`;
                str += `<span style="font-size:12px; color:#aaa">${formattedText}</span>`;
            }
            str += `</div>`;
            return str;
        }
    },

    // 调整布局范围
    grid: {
        top: "10%",
        bottom: "10%",
        left: "2%",
        right: "2%",
        containLabel: true
    },

    series: [
        // 中心装饰小圆点 (略微放大)
        {
            type: "pie",
            silent: true,
            radius: ["0%", "12%"],
            center: ["50%", "50%"],
            label: { show: false },
            data: [{ value: 0, itemStyle: { color: '#8E99B3' } }],
        },
        // 装饰内圈环 (略微放大)
        {
            type: "pie",
            silent: true,
            radius: ["18%", "19%"],
            center: ["50%", "50%"],
            label: { show: false },
            data: [{ value: 0, itemStyle: { color: '#8E99B3' } }],
        },
        // 主饼图 (半径从原先的 68% 放大到 75%)
        {
            name: "人员状态",
            type: "pie",
            radius: ["30%", "75%"], 
            center: ["50%", "50%"],
            roseType: "area",
            zlevel: 10,
            itemStyle: {
                borderWidth: 3,
                borderRadius: 10, // 圆角随之稍微调大
            },
            label: {
                show: true,
                color: '#fff',
                fontSize: 14,
                // 引导线稍微拉长一点，避免文字拥挤
                edgeDistance: '10%',
                formatter: '{percent|{d}%}\n{name|{b}}',
                rich: {
                    percent: {
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#0be5ff',
                    },
                    name: {
                        color: '#fff',
                        padding: [5, 0],
                        fontSize: 14
                    }
                }
            },
            labelLine: {
                length: 15,
                length2: 20,
                lineStyle: { color: '#8E99B3' }
            },
            data: data
        }
    ]
};