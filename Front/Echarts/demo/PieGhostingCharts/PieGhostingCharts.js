// 1. 数据准备
const chartData = [
    { value: 12, name: '重大危险源企业', tooltipText: '需要重点监管\n包含一级和二级' },
    { value: 121, name: '危险化学品生产经营单位' },
    { value: 20, name: '加油站', tooltipText: '全市范围内的\n在营加油站' },
    { value: 41, name: '规上企业' },
    { value: 328, name: '粉尘涉爆企业', tooltipText: '重点排查行业' },
    { value: 142, name: '易制毒企业' },
    { value: 95, name: '锂电池企业' },
    { value: 50, name: '其他类型企业A' }, // 测试分页
    { value: 30, name: '其他类型企业B' }  // 测试分页
]

const colorList = ['#115FEA', '#10EBE3', '#10A9EB', '#EB9C10', '#2E10EB', '#9B10EB', '#F2E110', '#C1232B', '#27727B']

// 2. 计算指标
const sum = chartData.reduce((per, cur) => per + cur.value, 0)
const avg = (sum / chartData.length).toFixed(2)

const gap = (1 * sum) / 100
const pieData1 = []
const pieData2 = []
const gapData = {
    name: '',
    value: gap,
    itemStyle: { color: 'transparent' },
    tooltip: { show: false } // 间隔不触发提示
}

chartData.forEach((item, i) => {
    pieData1.push({
        ...item,
        itemStyle: { borderRadius: 10 }
    }, gapData)

    pieData2.push({
        ...item,
        itemStyle: {
            color: colorList[i % colorList.length],
            opacity: 0.21
        }
    }, gapData)
})

const chartCenter = ['40%', '50%']; // 统一图表中心点，留出右侧给图例

option = {
    backgroundColor: '#0F141B',
    // 1. 增加中心标题
    title: {
        text: '企业总数',
        subtext: sum ,
        left: chartCenter[0],
        top: '45%',
        textAlign: 'center',
        textStyle: {
            color: '#D8DDE3',
            fontSize: 24,
            fontWeight: 'normal'
        },
        subtextStyle: {
            color: '#10EBE3',
            fontSize: 24,
            fontWeight: 'bold',
            padding: [10, 0]
        }
    },
    tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, .8)',
        textStyle: { color: '#fff' },
        formatter: (params) => {
            if (params.name === '') return null;
            const item = params.data;
            const percent = ((item.value / sum) * 100).toFixed(1);
            let res = '';
            res += `${params.marker}${params.name}: ${params.value} (${percent}%)<br/>`;
           res+= `总数: ${sum}<br/>平均值: ${avg}`
            if (item.tooltipText) {
                res += `<br/><span style="color: #aaa; font-size: 12px;">${item.tooltipText.replace(/\n/g, '<br/>')}</span>`;
            }
            return res;
        }
    },
    // 2. 优化 Legend：竖向、分页
    legend: {
        type: 'scroll',      // 开启分页
        orient: 'vertical',  // 竖向排列
        right: '2%',
        top: 'center',
        itemGap: 15,
        itemWidth: 10,
        itemHeight: 10,
        pageIconColor: '#10EBE3',    // 分页按钮颜色
        pageTextStyle: { color: '#fff' },
        textStyle: {
            color: '#D8DDE3',
            fontSize: 14
        },
        formatter: name => name
    },
    series: [
        {
            type: 'pie',
            radius: ['60%', '65%'], // 调整半径，给中间标题留空间
            center: chartCenter,
            label: { show: true },
            data: pieData1
        },
        {
            type: 'pie',
            radius: ['45%', '58%'],
            center: chartCenter,
            silent: true,
            label: { show: false },
            data: pieData2
        },
        {
            type: 'pie',
            center: chartCenter,
            radius: [0, '40%'],
            silent: true,
            label: { show: false },
            itemStyle: {
                color: 'rgba(75, 126, 203,.05)'
            },
            data: [{ value: 100, name: '' }]
        }
    ]
};