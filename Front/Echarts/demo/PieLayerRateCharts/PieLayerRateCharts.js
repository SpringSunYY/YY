// 基础颜色配置（循环使用）
var colorList = ['#018CFF', 'FCAF03', '#1DBB67', '#FF586C'];

var data = [
    { "name": "场馆运行", "value": 5 },
    { "name": "场馆安全", "value": 5 },
    { "name": "医疗服务安全", "value": 6 },
    { "name": "技术故障1", "value": 3 },
    { "name": "场馆运行1", "value": 5 },
    { "name": "场馆安全1", "value": 5 },
    { "name": "医疗服务安全1", "value": 6 },
    { "name": "技术故障2", "value": 3 },
     { "name": "场馆运行321", "value": 5 },
];

// 动态生成颜色数组（根据数据量自动循环）
function generateColorList(baseColors, dataLength) {
    let result = [];
    for (let i = 0; i < dataLength; i++) {
        result.push(baseColors[i % baseColors.length]);
        result.push(''); // 间隔
    }
    return result;
}

function generateColorList2(baseColors, dataLength) {
    let result = [];
    for (let i = 0; i < dataLength; i++) {
        const color = baseColors[i % baseColors.length];
        const hex = color.startsWith('#') ? color.slice(1) : color;
        const rgba = hex.match(/.{2}/g).map(x => parseInt(x, 16));
        result.push(`rgba(${rgba[0]},${rgba[1]},${rgba[2]}, 0.4)`);
        result.push(''); // 间隔
    }
    return result;
}

const colorList1 = generateColorList(colorList, data.length);
const colorList2 = generateColorList2(colorList, data.length);

let valueSum = 0;
let optionData = []
data.forEach(item => {
    valueSum += item.value; 
    // 构建 optionData（与上一次保持一致）
    optionData.push({ value: item.value, name: item.name }); 
    optionData.push({ name: '', value: valueSum / 100, itemStyle: { color: 'transparent' } });
})

const valueOnlyData = data.map(item => item.value);

// 【优化 1】定义饼图中心，实现水平和垂直居中（为底部图例留出空间）
const PIE_CENTER = ['50%', '45%']; 

// 【优化 2】整体尺寸增加约 10%
const RADIUS_INNER_RING = ['28%', '39%'];   // 原 ['25%', '35%']
const RADIUS_OUTER_RING = ['42%', '44%'];   // 原 ['38%', '40%']
const RADIUS_DECORATION_1 = ['48.5%', '48.7%']; // 原 ['44%', '44.2%']
const RADIUS_DECORATION_2 = ['48.5%', '49.1%']; // 原 ['44%', '44.6%']


var option = {
    backgroundColor: '#243c54',
    tooltip: {
        trigger: 'item',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textStyle: {
            color: '#fff'
        },
        formatter: function (params) {
            if (params.name === '') {
                return '';
            }
            
            const value = params.value;
            const percent = ((value / valueSum) * 100).toFixed(2); 
            
            return `${params.name}<br/>
                    数值：${value} (${percent}%)`;
        }
    },
    title: {
        text: '{a|' + valueSum + '}{b|\n事件总数}',
        // 【优化 1】标题居中，并对齐新的饼图中心
        left: '49%', 
        top: '42%', 
        itemGap: 10,
        textStyle: {
            rich: {
                a: {
                    color: '#2793FF',
                    fontSize: 30,
                    fontWeight: 600
                },
                b: {
                    color: '#485373',
                    fontSize: 14,
                }
            },
        },
        textAlign: 'center',
    },

   legend: {
    show: true,
    icon: 'none',

    orient: 'horizontal', 
    
    // 【调整】图例位置
    bottom: '10%', 
    left: 'center', 
    type: 'scroll',
    // 【关键】设置最大高度，使其能容纳两行文字
    // 40 应该是足够的，但如果字体较大，可能需要微调到 45 或 50
    maxHeight: 50, 
    
    itemWidth: 12,
    itemHeight: 12,
    // 增加间距，让 ECharts 更倾向于换行
    itemGap: 1, 
    
    inactiveColor: '#666',
    // 分页配置保持不变
    pageButtonItemGap: 1,
    pageButtonGap: 1,
    pageIconColor: '#2793FF',
    pageIconInactiveColor: '#666',
    pageIconSize: 12,
    pageTextStyle: {
        color: '#FFF',
        fontSize: 12
    },
    formatter: (name) => {
        let obj = data.find(item => item.name === name)
        const arr = [
            // 使用富文本的 padding 来控制项目间距
            `{iconName|}{name|${name}}` 
        ];
        return arr.join('')
    },
    textStyle: {
        color: '#FFF',
        fontSize: 16, 
        rich: {
            name: {
                color: 'inherit', 
                fontSize: 16,
                width: 80,
                padding: [0, 5, 0, 5],
            },
        }
    },
        data: data.map((dItem, dIndex) => {
            return {
                name: dItem.name,
                textStyle: {
                    rich: {
                        iconName: {
                            width: 16,
                            height: 16,
                            borderRadius: 2,
                            backgroundColor: colorList[dIndex % colorList.length], 
                        },
                    }
                },
            }
        }),
    },

    series: [
        {
            // 饼图圈 (内部环)
            type: 'pie',
            zlevel: 3,
            // 【优化 2】尺寸放大 10%
            radius: RADIUS_INNER_RING,
            // 【优化 1】居中
            center: PIE_CENTER, 
            legendHoverLink: true, 
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList2[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: function(params) {
                    if (params.name === '') {
                        return '';
                    }
                    return params.name;
                },
                color: '#FFF',
                fontSize: 14,
            },
            labelLine: {
                show: true,
                length: 10,
                length2: 20,
                lineStyle: {
                    color: '#FFF',
                    width: 1
                }
            },
            data: optionData.map(item => {
                if (item.name === '') {
                    return {
                        ...item,
                        label: { show: false },
                        labelLine: { show: false }
                    };
                }
                return item;
            }), 
        },
        {
            // 最外圆圈 (外部环)
            type: 'pie',
            zlevel: 1,
            // 【优化 2】尺寸放大 10%
            radius: RADIUS_OUTER_RING,
            // 【优化 1】居中
            center: PIE_CENTER, 
            legendHoverLink: true, 
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colorList1[params.dataIndex]
                    }
                }
            },
            label: {
                show: false
            },
            data: optionData, 
        },
        {
            // 细线圈 (装饰用)
            type: "pie",
            // 【优化 2】尺寸放大 10%
            radius: RADIUS_DECORATION_1,
            // 【优化 1】居中
            center: PIE_CENTER,
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
                normal: {
                    shadowBlur: 1,
                    shadowColor: "rgba(15, 79, 150,0.61)",
                    color: "rgba(23,138,173,1)",
                },
            },
            label: {
                show: false,
            },
            data: [0],
        },
        {
            // 最后一个圈 (装饰用)
            type: "pie",
            // 【优化 2】尺寸放大 10%
            radius: RADIUS_DECORATION_2,
            // 【优化 1】居中
            center: PIE_CENTER, 
            hoverAnimation: false,
            clockWise: false,
            color: [
                "#55c2e200",
                "rgba(23,138,173,1)",
                "#ff5a6100",
                "ff5a6100",
            ],
            label: {
                show: false,
            },
            data: valueOnlyData, 
        },
    ]
};