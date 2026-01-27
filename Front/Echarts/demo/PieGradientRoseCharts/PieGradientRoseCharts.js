// --- 1. 基础字段提取 (平铺结构) ---
const titleText = '访问来源分析';
const backgroundColor = '#01091B';
const showStatistics = true; // 是否计算并显示总数和平均值
const borderRadius = 8;      // 饼图圆角
const chartPadding = '50%';   // 中心位置

// --- 2. 原始数据 (包含自定义 tooltipText) ---
const rawData = [
    { value: 1048, name: 'Search Engine', tooltipText: '来自各大搜索引擎的流量\n包含百度、谷歌等' },
    { value: 735, name: 'Direct', tooltipText: '用户直接输入网址访问' },
    { value: 580, name: 'Email', tooltipText: '邮件营销点击跳转' },
    { value: 484, name: 'Union Ads', tooltipText: '联盟广告投放' },
    { value: 300, name: 'Video Ads', tooltipText: '视频贴片广告' },
    { value: 40, name: '年休假', tooltipText: '员工年休假统计描述' }
];

// --- 3. 逻辑计算 ---
let totalValue = 0;
let avgValue = 0;

if (showStatistics) {
    totalValue = rawData.reduce((sum, item) => sum + item.value, 0);
    avgValue = (totalValue / rawData.length).toFixed(2);
}

// --- 4. ECharts Option 配置 ---
const option = {
    backgroundColor: backgroundColor,
    title: {
        text: titleText,
        left: 'center',
        top: '2%',
        textStyle: { color: '#fff', fontSize: 18 }
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderColor: '#00E3FF',
        borderWidth: 1,
        padding: [10, 15],
        textStyle: { color: '#fff', lineHeight: 22 },
        formatter: (params) => {
            const item = rawData.find(d => d.name === params.name);
            let res = `<b style="color:#00E3FF;font-size:16px;">${params.name}</b><br/>`;
            res += `数值：${params.value} (${params.percent}%)<br/>`;
            
            if (showStatistics) {
                res += `<div style="border-top:1px solid rgba(255,255,255,0.2);margin:5px 0;"></div>`;
                res += `总计：${totalValue}<br/>平均：${avgValue}<br/>`;
            }
            
            if (item && item.tooltipText) {
                res += `<div style="border-top:1px solid rgba(255,255,255,0.2);margin:5px 0;"></div>`;
                res += `<span style="color:#bbb;font-size:12px;">${item.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            return res;
        }
    },
    legend: {
        type: 'scroll', // 数据多时可翻页
        orient: 'horizontal',
        bottom: '5%',
        left: 'center',
        textStyle: { color: '#fff' },
        pageIconColor: '#00E3FF', // 翻页箭头颜色
        pageTextStyle: { color: '#fff' },
        data: rawData.map(item => item.name)
    },
    series: [
        // 【主系列】 饼图
        {
            name: '数据统计',
            type: 'pie',
            radius: ['25%', '65%'], // 整体放大
            center: [chartPadding, '50%'],
            avoidLabelOverlap: true,
            roseType: 'area', // 玫瑰图模式
            itemStyle: {
                borderRadius: borderRadius,
            },
            label: {
                show: true,
                color: '#fff'
            },
            labelLine: {
                show: true,
                length: 25,
                length2: 15,
            },
            data: rawData,
        },
        // 【装饰系列 1】 中间内发光环
        {
            name: 'innerRing',
            type: 'pie',
            radius: ['18%', '20%'],
            center: [chartPadding, '50%'],
            silent: true,            // 不响应鼠标
            label: { show: false },  // ！！！强制关闭标签显示
            labelLine: { show: false },
            itemStyle: {
                color: '#00E3FF',
                shadowBlur: 15,
                shadowColor: '#00E3FF',
            },
            data: [{ value: 1 }]
        },
        // 【装饰系列 2】 外部装饰细线 (三层)
        ...[70, 80, 90].map((r, index) => ({
            name: 'outerLine' + index,
            type: 'pie',
            radius: [`${r}%`, `${r + 0.3}%`],
            center: [chartPadding, '50%'],
            silent: true,
            label: { show: false },  // ！！！强制关闭标签显示
            labelLine: { show: false },
            itemStyle: {
                color: '#073A48',
                opacity: 1 - index * 0.2 // 线条透明度递减
            },
            data: [{ value: 1 }]
        }))
    ],
};