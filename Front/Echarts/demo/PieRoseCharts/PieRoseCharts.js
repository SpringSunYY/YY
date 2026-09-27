// =========================================================
// 核心数据
// =========================================================
const pieData = [{
    name: "加工成本",
    value: 920,
},
{
    name: "实验成本",
    value: 458,
},
{
    name: "能源成本",
    value: 653,
},
{
    name: "研发成本",
    value: 372,
}
];

// 饼图位置
const pieCenter = ['35%', '50%']

const option = {
    backgroundColor: '#000',
    color: [
        '#FF6600',
        '#28F2E6',
        '#FFCC00',
        '#00A1FF',
        '#FF1F48',
        '#FFEF00',
        '#00E899',
        '#006FFF',
        '#73d0fd',
        '#25C1F1',
        '#C4F9F3',
        '#E062AE',
        '#8378EA',
        '#C4F926',
        '#FF5722',
        '#ffd32a',
        '#3c40c6',
        '#ffa801',
    ],
    // === 修正 Tooltip: 背景改为完全透明 ===
    tooltip: {
        show: true,
        trigger: 'item',
        // 背景设置为完全透明
        backgroundColor: 'transparent', 
        borderWidth: 0, // 确保没有边框
        textStyle: {
            color: '#FFF' // 文本颜色仍然是白色，以保证可见性
        },
        formatter: "{b} <br/> 值: {c} ({d}%)", 
    },
    // ======================================
    legend: {
        show: true,
        orient: 'vertical',
        textStyle: {
            color: '#FFF',
        },
        right: '5%', 
        top: 'center', 
        itemWidth: 10, 
        itemHeight: 10, 
        itemGap: 10,
        formatter(name) {
            return name; 
        },
    },
    series: [
        // 背景装饰0 实心白圆 层级最高zlevel: 4
        {
            type: 'pie',
            zlevel: 4,
            radius: ['0%', '7%'],
            center: pieCenter,
            silent: true,
            clockwise: false,
            label: {
                show: false,
            },
            data: [{
                name: null,
                value: 0,
                itemStyle: {
                    color: '#FFF',
                },
            }],
        },
        // 背景装饰1 半透明圆 层级第二 zlevel: 3
        {
            type: 'pie',
            radius: ['0%', '15%'],
            center: pieCenter,
            zlevel: 3,
            silent: true,
            clockwise: false,
            label: {
                show: false,
            },
            data: [{
                name: null,
                value: 0,
                itemStyle: {
                    color: 'rgba(255,255,255, 0.3)',
                },
            }],
        },
        // 背景装饰3 半透明圆 层级最低 作为底盘 zlevel: 1
        {
            type: 'pie',
            zlevel: 1,
            radius: ['0%', '65%'], 
            center: pieCenter,
            silent: true,
            clockwise: false,
            label: {
                show: false,
            },
            data: [{
                name: null,
                value: 0,
                itemStyle: {
                    color: 'rgba(255,255,255, 0.1)',
                },
            }],
        },
        // 数据源
        {
            type: 'pie',
            roseType: 'area', 
            clockwise: false,
            center: pieCenter,
            zlevel: 2,
            radius: ['15%', '60%'], 
            itemStyle: {
                borderRadius: 4,
            },
            data: pieData,
            label: {
                normal: {
                    formatter: params => {
                        const percentage = params.percent.toFixed(1);
                        return (
                            '{icon|●}{name|' + params.name + '}\n{value|' +
                            params.value + ' (' + percentage + '%)}' 
                        );
                    },
                    rich: {
                        icon: {
                            fontSize: 16,
                            color: 'inherit'
                        },
                        name: {
                            fontSize: 18,
                            padding: [0, 0, 0, 10],
                            color: '#fff'
                        },
                        value: {
                            fontSize: 14,
                            padding: [10, 0, 0, 20],
                            color: '#fff'
                        }
                    }
                }
            },
            labelLine: { 
                length: 10,
                length2: 10,
                lineStyle: {
                    color: '#fff'
                }
            }
        },
    ],
}