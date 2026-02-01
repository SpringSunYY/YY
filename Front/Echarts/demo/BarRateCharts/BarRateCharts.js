// 1. 数据和名称提取
const data = {
    names: ["故障", "批量", "警戒"],
    // 待确认（外层，通常是总量或背景）
    outerValues: [65, 58, 26],
    // 已确认（内层，通常是实际值）
    innerValues: [24, 38, 15]
};

// 2. 名称和标题提取
const outerName = "已确认"; // 对应 series[1]
const innerName = "待确认"; // 对应 series[0]
const chartTitle = "单位:个";

// 柱子的圆角设置
const borderRadius = [10, 10, 0, 0]; // 顶部圆角，底部直角

option = {
    // 你的代码
    backgroundColor: "#2b2b2b",
    title: {
        text: chartTitle,
        top: 50,
        left: 0,
        textStyle: {
            color: "#C5E5F9",
            fontSize: 18
        },
    },
    grid: {
        top: 100,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true,
    },
    legend: {
        icon: "rect",
        itemWidth: 15,
        itemHeight: 10,
        right: 0,
        top: 50,
        itemGap: 20,
        data: [innerName, outerName], // 使用提取的名称
        textStyle: {
            color: "#BCE6FF",
            fontSize: 18
        },
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
        backgroundColor: "rgba(9, 24, 48, 0.8)",
        borderColor: "rgba(75, 253, 238, 0.6)",
        textStyle: {
            color: "#C5E5F9",
            fontSize: 18
        },
        // 4. 添加显示内层占比外层的逻辑
        formatter: function (params) {
            let tooltip = `<div>${params[0].name}</div>`;
            let outerValue = 0; // 对应已确认
            let innerValue = 0; // 对应待确认
            
            // 找出 innerName (待确认) 和 outerName (已确认) 对应的数据
            params.forEach(function (item) {
                if (item.seriesName === innerName) {
                    innerValue = item.value;
                } else if (item.seriesName === outerName) {
                    outerValue = item.value;
                }
                
                // 默认的 tooltip 内容
                tooltip += `<div style="display:flex; justify-content: space-between; align-items: center;">
                                <span style="display:inline-block; margin-right:5px; border-radius:10px; width:10px; height:10px; background-color:${item.color};"></span>
                                ${item.seriesName}: 
                                <span style="font-weight: bold; margin-left: 20px;">${item.value}</span>
                            </div>`;
            });
            
            // 计算占比
            let ratio = 0;
            if (outerValue > 0) {
                // 计算内层 (innerValue) 占外层 (outerValue) 的百分比
                ratio = (innerValue / outerValue) * 100;
            }
            
            // 只有当两个数据都存在时才显示占比
            if (outerValue > 0 || innerValue > 0) {
                 tooltip += `<div style="margin-top: 5px; padding-top: 5px; border-top: 1px dashed rgba(255,255,255,0.3);">
                                **${innerName}** 占比 **${outerName}**: 
                                <span style="color: #41EDFF; font-weight: bold;">${ratio.toFixed(2)}%</span>
                            </div>`;
            }

            return tooltip;
        }
    },
    xAxis: {
        type: "category",
        data: data.names, // 使用提取的 xdata
        axisLine: {
            lineStyle: {
                color: "rgba(118, 169, 250, .8)",
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            interval: 0,
            color: "#C5E5F9",
            fontSize: 18,
            margin: 20
        },
    },
    yAxis: {
        type: "value",
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            color: "#C5E5F9",
            fontSize: 18,
            margin: 40,
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: "dashed",
                color: "rgba(118, 169, 250, .5)",
            },
        },
    },
    series: [
        {
            name: innerName, // 待确认 (内层)
            type: "bar",
            // 3. 外层（已确认）添加圆角，但由于这是内层，它应该在内侧，所以不加圆角
            // 保持原样，或者如果希望它也显示圆角，可以在此添加
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#41EDFF' },
                    { offset: 1, color: 'rgba(65,237,255,0)' },
                ]),
                // barBorderRadius: borderRadius // 如果需要内层也加圆角
            },
            data: data.innerValues, // 使用提取的 innerValues
            label: {
                show: true,
                position: 'top',
                color: '#fff',
                fontSize: 24,
            },
            z: 10, // 确保内层在上面
        },
        {
            name: outerName, // 已确认 (外层)
            type: "bar",
            barGap: '-100%', // 实现重叠效果
            // 3. 外层添加圆角
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#62E9C1' },
                    { offset: 1, color: 'rgba(98,233,193,0)' },
                ]),
                barBorderRadius: borderRadius, // **在这里添加圆角**
            },
            data: data.outerValues, // 使用提取的 outerValues
            label: {
                show: true,
                position: 'top',
                color: '#fff',
                fontSize: 24,
            },
            z: 5, // 确保外层在下面
        },
    ]
};