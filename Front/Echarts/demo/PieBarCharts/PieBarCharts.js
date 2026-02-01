
  完整 ECharts 配置：柱状图 (Bar) + 分段环形图 (Pie)
  数据源统一为 chartData。
 

 1. 统一数据源 & 提取配置变量
 ===================================
var chartData = [
    { name '太原市民政局', value 70, tooltipText '太原市民政局在太原，n是的在太原。' },
    { name '太原市运输局', value 34, tooltipText '负责太原市的交通运输管理。' },
    { name '太原市残联', value 60, tooltipText '为残疾人提供服务和保障。' },
    { name '太原市报社', value 78, tooltipText '太原市的主要新闻出版机构。' },
    { name '太原市司法局', value 69, tooltipText '负责太原市的法律事务管理。' }
];

var chartNames = chartData.map(function(item) { return item.name; });
var chartTotalValue = chartData.reduce((sum, item) = sum + item.value, 0);

 提取配置变量
var BACKGROUND_COLOR = '#081028';  背景颜色
var MAIN_TITLE_TEXT = '太原市机构数据总览 - Bar & Pie';  总标题文本
var pieColor = ['#fd566a', '#9787ff', '#fdb36a', '#fdd56a', '#6da7ff', '#63e1f2'];  环形图颜色主题

 2. 环形图数据处理 (采用分段样式，使用 chartData)
 ===================================
var pieData = [];
var gapValue = 3;  间隔块的固定值

 构建分段环形图所需的数据结构
for (var i = 0; i  chartData.length; i++) {
    const item = chartData[i];
    
     实际数据块
    pieData.push(
        {
            value item.value,
            name item.name,
            tooltipText item.tooltipText,
             确保每个数据块有自己独特的颜色和样式
            itemStyle {
                normal {
                    borderWidth 5,
                    shadowBlur 20,
                    borderColor pieColor[i % pieColor.length],
                    shadowColor pieColor[i % pieColor.length],
                },
            },
        },
         间隔块
        {
            value gapValue,
            name '',  间隔块名称为空
            itemStyle {
                normal {
                    label { show false },
                    labelLine { show false }, 
                    color 'rgba(0, 0, 0, 0)',  透明颜色
                    borderColor 'rgba(0, 0, 0, 0)',
                    borderWidth 0,
                },
            },
             用于在 series level 禁用 labelLine
            labelLine { show false } 
        }
    );
}

 3. ECharts 配置对象
 ===================================
option = {
    backgroundColor BACKGROUND_COLOR,  使用变量
    color pieColor,  使用变量
    
     添加总标题和环形图中心的总计文本
    title [
        {
            text MAIN_TITLE_TEXT,  使用变量
            left 'center',
            top '0%',
            textStyle {
                color '#fff',
                fontSize 20
            }
        },
         环形图中心的总计文本
        { 
            text '总计' + chartTotalValue,  使用 chartTotalValue
            top '78%', 
            textAlign 'center', 
            left '40%', 
            textStyle { 
                color '#fff', 
                fontSize 16, 
                fontWeight '400' 
            } 
        },
    ],
    
     Legend 移至右下角
    legend {
        data chartNames,  使用 chartNames
        orient 'vertical',
        right '5%',
        bottom '10%',
        textStyle { color '#fff' }
    },
    
     统一 Tooltip (根据 seriesType 定制内容)
    tooltip {
        trigger 'item',
        axisPointer { type 'shadow' },
                  backgroundColor 'rgba(50,50,50,0.7)',
          borderColor '#333',
          borderWidth 0,
          shadowBlur 10,
          padding 10,
          textStyle {color '#fff', fontSize 14},
        formatter function (params) {
             忽略环形图的间隔块
            if (params.name === '' && params.seriesType === 'pie') {
                return '';
            }
            var tooltipHtml=''
            if (params.seriesType === 'bar') {
                const originalItem = chartData[params.dataIndex];
                var name = originalItem.name;
                var value = originalItem.value
                 柱形图：name value (百分比) + tooltipText
                tooltipHtml = name + '：' + value + 'br';
                 找到对应的 tooltipText
            
                if (originalItem && originalItem.tooltipText) {
                     使用 br 替换换行符 n
                    tooltipHtml += originalItem.tooltipText.replace(ng, 'br');
                }
            } else if (params.seriesType === 'pie') {
            var value = params.value;
             var customData = params.data;  理论上可以拿到，但为保险起见，下面通过 find 查找
            var percent = ((value  chartTotalValue)  100).toFixed(2);  使用 chartTotalValue
            var percentText = ' (' + percent + '%)';
            var tooltipText = params.data.tooltipText;
            var name = params.name;
             环形图：name value (百分比)
             tooltipHtml = name + '：' + value + '' + chartTotalValue + percentText;
             if(tooltipText&&tooltipText!=''){
                 tooltipHtml+='br'+tooltipText.replace(ng, 'br')
             }   
            }
            
            return tooltipHtml;
        }
    },
    
     布局 grid (柱状图区域)
    grid {
        left '3%',
        right '3%',
        bottom '45%',
        top '5%',
        containLabel true
    },
    
    xAxis {
        show true,
        axisLabel { show true, color '#a2a2a2' },
        axisLine { show false, lineStyle { color 'red', type 'dotted' } },
        splitLine { show true, lineStyle { color ['rgba(160, 192, 252, 0.2)'], width 1, type [5, 8], dashOffset 2 } },
    },
    
    yAxis [
         柱形图 Y 轴
        {
            data chartNames,  使用 chartNames
            show true, inverse false,
            axisLine { show true, lineStyle { color ['rgba(160, 192, 252, 0.2)'], width 1, type [5, 8], dashOffset 2 } },
            splitLine { show false }, axisTick { show false },
            axisLabel { color '#fff' },
        },
         柱形图背景框 Y 轴
        { show false, inverse false, data [] }, 
    ],
    
    series [
         1. 柱形图系列 (上部 - 实际值)
        {
            name '太原市各局值',
            type 'bar',
            yAxisIndex 0,
            data chartData,  使用 chartData
            barWidth '50%', barGap '10%',
            itemStyle {
                normal {
                    barBorderRadius 30,
                    color new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset 0, color '#28b1ff' },
                        { offset 1, color '#00fcff' },
                    ]),
                },
            },
            label { normal { show false } },
        },
         2. 柱形图背景框系列
        {
            name '框',
            type 'bar',
            yAxisIndex 1,
            barGap '-100%',
             使用 chartData 的长度来动态生成背景数据
            data new Array(chartData.length).fill(100), 
            barWidth '50%',
            itemStyle { normal { color 'rgba(160, 192, 252, 0.1)', barBorderRadius 15 } },
        },
         3. 分段环形图系列 (下部)
        {
            name '机构数值比例',
            type 'pie',
            clockWise false,
            radius [90, 100],  环形图的内外半径
            center ['40%', '80%'],  环形图的中心位置
            hoverAnimation true,
            data pieData,  使用预处理的 pieData
            itemStyle { normal {} },
            label {
                show true,
                position 'outside',
                color '#fff',
                 Label 仅对非间隔块显示
                formatter function (params) {
                    if (params.name !== '') {
                        var percent = ((params.value  chartTotalValue)  100).toFixed(0);  使用 chartTotalValue
                        return params.name + 't' + percent + '%';
                    } else {
                        return '';
                    }
                },
            },
            labelLine {
                length 15,
                length2 15,
                show true,
                lineStyle { color '#00ffff' },
            },
        },
    ],
};