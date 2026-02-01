// 示例数据 - **已将所有 'tooltip' 字段重命名为 'tooltipText'**
var chartData = [
    {
        name: 'AAA',
        tooltipText: '这个比较好\n总体表现优秀', // 饼图自定义提示文本
        barValue: [
            {name: '9.1', value: 39, tooltipText: '挺不错的\n是的挺不错'},
            {name: '9.2', value: 42, tooltipText: '表现优秀\n继续保持'},
            {name: '9.3', value: 27, tooltipText: '有所下降\n需要关注'},
            {name: '9.4', value: 29, tooltipText: '回升趋势\n正在好转'},
            {name: '9.5', value: 39, tooltipText: '稳定增长\n效果显著'},
            {name: '9.6', value: 36, tooltipText: '持续稳定\n保持良好'},
            {name: '9.7', value: 34, tooltipText: '略有波动\n整体平稳'}
        ]
    },
    {
        name: 'BBB',
        tooltipText: '这个还行\n中规中矩',
        barValue: [
            {name: '9.1', value: 45, tooltipText: '开局不错\n值得肯定'},
            {name: '9.2', value: 45, tooltipText: '保持稳定\n继续努力'},
            {name: '9.3', value: 34, tooltipText: '有所回落\n注意调整'},
            {name: '9.4', value: 25, tooltipText: '需要改进\n加强管理'},
            {name: '9.5', value: 43, tooltipText: '强势反弹\n表现出色'},
            {name: '9.6', value: 37, tooltipText: '趋于稳定\n良好态势'},
            {name: '9.7', value: 31, tooltipText: '小幅调整\n正常波动'}
        ]
    },
    {
        name: 'CCC',
        tooltipText: '波动较大\n潜力很大',
        barValue: [
            {name: '9.1', value: 45, tooltipText: '起步良好\n开门红'},
            {name: '9.2', value: 22, tooltipText: '大幅下滑\n需要重视'},
            {name: '9.3', value: 44, tooltipText: '快速恢复\n值得表扬'},
            {name: '9.4', value: 16, tooltipText: '明显下降\n查找原因'},
            {name: '9.5', value: 43, tooltipText: '显著提升\n效果明显'},
            {name: '9.6', value: 37, tooltipText: '平稳运行\n状态良好'},
            {name: '9.7', value: 31, tooltipText: '稳中有进\n继续保持'}
        ]
    }
];

var piecolor = ['#A5DEE4', '#81C7D4', '#24936E'];

// 计算饼图数据
var pieData = chartData.map(function(item, index) {
    var total = item.barValue.reduce(function(sum, bar) {
        return sum + bar.value;
    }, 0);
    return {
        name: item.name,
        value: total,
        tooltipText: item.tooltipText,
        itemStyle: {
            color: piecolor[index]
        }
    };
});

// 计算总数
var grandTotal = pieData.reduce(function(sum, item) {
    return sum + item.value;
}, 0);

// 初始聚焦索引为 0
var currentIndex = 0; 

// ----------------------------------------------------
// ECharts 配置项
// ----------------------------------------------------

var option = {
    backgroundColor: "#000",
    
    // 🚀 优化点 1：使用 title 数组实现双标题 (总标题固定，柱状图标题动态)
    title: [
        {
            // 固定的总标题
            text: 'PieBar图', 
            left: 'center', 
            top: 10,
            textStyle: {
                color: '#fff',
                fontSize: 22,
                fontWeight: 'bold'
            }
        },
        {
            // 柱状图的动态标题（右侧）
            id: 'barTitle', 
            text: chartData[currentIndex].name, // 初始值
            left: '60%', 
            top: 50, 
            textStyle: {
                color: piecolor[currentIndex],
                fontSize: 20
            }
        }
    ],
    
    // ⭐ 新增：饼图图例配置
    legend: {
        orient: 'vertical',
        left: '2%', // 靠近饼图左侧
        top: '20%',
        textStyle: {
            color: '#fff' // 图例文本颜色
        },
        data: pieData.map(function(item) {
            return item.name;
        })
    },

    // 🚀 优化点 2：Tooltip 统一使用 \n 换行，移除 HTML 标签 <br\>
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderColor: '#333',
        borderWidth: 0,
        shadowBlur: 10,
        padding: 10,
        textStyle: {color: '#fff', fontSize: 14},
        formatter: function(params) {
            
            // 1. 处理 MarkLine 逻辑 (平均值线)
            if (params.componentType === 'markLine') {
                return params.name +': '+ params.value.toFixed(2);
            }
            
            // 2. 排除其他非 Series 组件 (如 Grid, Axis)
            if (params.componentType !== 'series') {
                return;
            }
            
            // 3. 饼图 (Pie/Rose) 的 Tooltip 逻辑
            if (params.seriesType === 'pie') {
                
                var rawTooltipText = params.data.tooltipText; // 直接从数据项中获取
                var percent = (params.value / grandTotal * 100).toFixed(2);
                
                // 统一使用 <br> 换行
                return params.name + '<br/>' +
                        '数值: ' + params.value + 
                        '/' + grandTotal +
                        ' (' + percent + '%)' + '<br/>' +
                        rawTooltipText.replace(/\n/g, '<br/>'); // 将原始数据中的 \n 替换为 <br/>
            } 
            
            // 4. 柱状图 (Bar) 的 Tooltip 逻辑
            else if (params.seriesType === 'bar') {
                
                var barItem = chartData[currentIndex].barValue[params.dataIndex];
                var barTotal = chartData[currentIndex].barValue.reduce(function(sum, bar) {
                    return sum + bar.value;
                }, 0);
                
                // 直接从数据项中获取 tooltipText
                var rawTooltipText = barItem.tooltipText; 

                // 统一使用 <br> 换行
                return chartData[currentIndex].name + '<br/>' +
                        barItem.name + 
                        '：' + barItem.value + '<br/>' +
                        '总数: ' + barTotal + '<br/>' +
                        rawTooltipText.replace(/\n/g, '<br/>'); // 将原始数据中的 \n 替换为 <br/>
            }
            // 默认返回
            return params.name + ': ' + params.value;
        }
    },

    grid: {
        top: 80,
        bottom: 100,
        left: '50%',
        width: '45%'
    },
    xAxis: {
        type: 'category',
        data: chartData[currentIndex].barValue.map(function(item) {
            return item.name;
        }),
        axisLabel: {
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        // ⭐ 新增：X 轴刻度线配置
        axisTick: {
            show: true, // 显示刻度线
            lineStyle: {
                color: '#fff'
            }
        }
    },
    yAxis: {
        type: 'value',
        nameTextStyle: {
            color: '#fff'
        },
        axisLabel: {
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,0.1)'
            }
        },
        // ⭐ 新增：Y 轴刻度线配置
        axisTick: {
            show: true, // 显示刻度线
            lineStyle: {
                color: '#fff'
            }
        }
    },
    
    // ----------------------------------------------------
    // Series 配置
    // ----------------------------------------------------
    series: [
        {
            // 饼图（左侧）
            type: 'pie',
            center: ['25%', '50%'],
            radius: ['10%', '28%'],
            roseType: 'area',
            // 初始设置高亮
            data: pieData.map(function(item, index) {
                 return {
                    name: item.name,
                    value: item.value,
                    // 确保将 tooltipText 属性传递给 data item
                    tooltipText: item.tooltipText, 
                    itemStyle: {
                        color: piecolor[index],
                        borderColor: index === currentIndex ? '#fff' : 'transparent', 
                        borderWidth: index === currentIndex ? 3 : 0
                    }
                };
            }),
            label: {
                color: '#fff'
            },
            emphasis: { 
                itemStyle: {
                    borderColor: 'transparent',
                    borderWidth: 0
                }
            }
        },
        {
            // 柱状图（右侧）
            type: 'bar',
            barWidth: 15,
            data: chartData[currentIndex].barValue.map(function(item) {
                return item.value;
            }),
            itemStyle: {
                color: piecolor[currentIndex],
                barBorderRadius: 8
            },
            // 平均值线
            markLine: {
                symbol: 'none',
                data: [
                    {
                        type: 'average',
                        name: '平均值'
                    }
                ],
                lineStyle: {
                    color: '#FFD700',
                    width: 2,
                    type: 'dashed'
                },
                label: {
                    show: true,
                    position: 'end',
                    color: '#FFD700',
                    formatter: function(params) {
                        return '平均值: ' + params.value.toFixed(2);
                    }
                }
            }
        }
    ]
};

// ----------------------------------------------------
// 饼图点击事件（更新柱状图和动态标题）
// ----------------------------------------------------

// ⚠️ 实际使用时，需要先初始化 ECharts 实例，例如：
// var dom = document.getElementById('your-chart-dom');
// var myChart = echarts.init(dom);
// myChart.setOption(option); 

// 假设 myChart 是 ECharts 实例
if (typeof myChart !== 'undefined') {
    myChart.on('click', function(params) {
        if (params.seriesType === 'pie') {
            currentIndex = params.dataIndex;
            
            // 1. 更新柱状图的动态标题 (title[1])，并更新颜色
            option.title[1].text = chartData[currentIndex].name; 
            option.title[1].textStyle.color = piecolor[currentIndex];
            
            // 2. 更新柱状图数据和颜色
            option.series[1].data = chartData[currentIndex].barValue.map(function(item) {
                return item.value;
            });
            option.series[1].itemStyle.color = piecolor[currentIndex];
            
            // 3. 更新x轴数据
            option.xAxis.data = chartData[currentIndex].barValue.map(function(item) {
                return item.name;
            });
            
            // 4. 更新饼图高亮状态
            option.series[0].data = pieData.map(function(item, index) {
                return {
                    name: item.name,
                    value: item.value,
                    tooltipText: item.tooltipText,
                    itemStyle: {
                        color: piecolor[index],
                        borderColor: index === currentIndex ? '#fff' : 'transparent', 
                        borderWidth: index === currentIndex ? 3 : 0
                    }
                };
            });
            
            // 5. 刷新图表
            myChart.setOption(option, true); 
        }
    });
} else {
    console.warn("ECharts 实例 'myChart' 未定义，点击事件无法绑定。请确保在调用 setOption 之前初始化 ECharts。");
}