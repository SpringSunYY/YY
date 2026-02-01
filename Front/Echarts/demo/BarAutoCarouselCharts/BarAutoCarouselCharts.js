/* 数据 */
let names = ['2018', '2019', '2020', '2021', '2022'];
let values = [273, 372, 160, 255, 180];

// 调整图例数据
const legendData = ['项目数'];

// 计算总数和平均值
const total = values.reduce((sum, current) => sum + current, 0);
const average = (total / values.length).toFixed(2);

// 计算与上一年的对比数据
const diffData = values.map((value, index) => {
    if (index === 0) {
        return '-';
    }
    const prevValue = values[index - 1];
    const diff = value - prevValue;
    const isIncrease = diff > 0;
    return {
        value: diff,
        isIncrease: isIncrease,
        percent: ((Math.abs(diff) / prevValue) * 100).toFixed(2) + '%'
    };
});

// 假设 myChart 对象已初始化
// var chartDom = document.getElementById('HHH40');
// var myChart = echarts.init(chartDom);

/* ECharts 配置 */
var option = {
    backgroundColor: "#040a11",
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: 'none'
        },
        position: function (point, params, dom, rect, size) {
            let x = 0;
            let y = 0;
            if (point[0] + size.contentSize[0] < size.viewSize[0]) {
                x = point[0]
            } else if (point[0] > size.contentSize[0]) {
                x = point[0] - size.contentSize[0]
            } else {
                x = "30%"
            }
            if (point[1] > size.contentSize[1]) {
                y = point[1] - size.contentSize[1]
            } else if (point[1] + size.contentSize[1] < size.viewSize[1]) {
                y = point[1]
            } else {
                y = "30%"
            }
            return [x, y];
        },
        formatter: params => {
            const year = params[0].name;
            const projectData = params.find(p => p.seriesName === '项目数');
            if (!projectData) {
                return '';
            }
            const currentYearIndex = names.indexOf(year);
            const diffInfo = diffData[currentYearIndex];
            const diffText = diffInfo === '-' ? `上一年：-` : `上一年：${diffInfo.isIncrease ? '↑' : '↓'}${Math.abs(diffInfo.value)}个 (${diffInfo.percent})`;

            let tooltipContent = `
                <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:12px;">${year}年</div>
                <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">${projectData.seriesName}：${projectData.value}个</div>
                <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">${diffText}</div>
                <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">平均值：${average}个</div>
            `;
            tooltipContent += `
                ---
                <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-top:12px;">总计：${total}个 | 平均：${average}个</div>
            `;
            return tooltipContent;
        },
        extraCssText: 'opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;filter: blur(undefinedpx);border:none;'
    },
    legend: {
        data: legendData,
        top: "12",
        left: '0',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 25,
        textStyle: {
            fontSize: 13,
            color: "#82AFC6",
            fontFamily: 'Source Han Sans CN-Normal',
            padding: [0, 0, 0, 2],
        }
    },
    dataZoom: [{
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
    }, {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        height: 20,
        bottom: 10,
        textStyle: {
            color: '#82AFC6'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,21.5H6.7V20.1h6.6V21.5z',
        handleSize: '80%',
        showDetail: false
    }],
    grid: {
        top: '10%',
        right: '16',
        left: '16',
        bottom: '20%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        data: names,
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "#1a6d84"
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#82AFC6',
                fontSize: 13,
                fontFamily: 'Source Han Sans CN-Normal',
            }
        },
    },
    yAxis: [{
        type: 'value',
        name: legendData[0],
        boundaryGap: ['0%', '20%'],
        alignTicks: true,
        splitNumber: 5,
        nameTextStyle: {
            color: '#82AFC6',
            fontSize: 13,
            fontFamily: 'Source Han Sans CN-Normal',
            align: "left",
            verticalAlign: "center",
        },
        axisLabel: {
            color: '#82AFC6',
            fontSize: 13,
            fontFamily: 'Source Han Sans CN-Normal',
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(49, 218, 255, 0.5)',
                type: "dashed",
            }
        }
    }],
    series: [{
        type: 'bar',
        name: '项目数',
        data: values,
        itemStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: 'rgba(49, 218, 255, 1)'
                }, {
                    offset: 1,
                    color: 'rgba(3, 21, 50, 1)'
                }],
                global: false
            },
            borderRadius: [4, 4, 0, 0]
        },
        barWidth: 26,
        markLine: {
            data: [{
                name: '平均值',
                yAxis: average,
            }],
            symbol: 'none',
            lineStyle: {
                type: 'dashed',
                color: '#FFD700',
                width: 2
            },
            label: {
                show: false
            }
        }
    }, {
        // 主折线图，用于展示数据和曲线
        type: 'line',
        name: '项目数',
        data: values,
        yAxisIndex: 0,
        symbolSize: 8,
        emphasis: {
            scale: 1.5,
            itemStyle: {
                // 确保高亮时点的颜色和大小符合预期
                color: "rgba(6, 201, 112, 1)",
                borderColor: 'rgba(6, 201, 112, 1)',
                borderWidth: 2,
            }
        },
        areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: 'rgba(6, 201, 112, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(47,145,255,0)'
                }],
                global: false
            },
        },
        lineStyle: {
            color: "rgba(6, 201, 112, 1)",
            width: 2,
        },
        itemStyle: {
            color: "rgba(6, 201, 112, 1)",
            borderColor: 'rgba(6, 201, 112, 1)',
            borderWidth: 2,
        },
        smooth: true,
    }]
};

// 确保 myChart 对象已初始化
// myChart.setOption(option); 

var count = 0;
var timer = null;
var dataLength = values.length;
timer && clearInterval(timer);

timer = setInterval(() => {
    // 每次更新前先取消所有高亮，以确保只高亮当前点
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 1
    });

    const dataIndex = count % dataLength;

    // 高亮主折线图上的点
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 1, // 目标系列索引
        dataIndex: dataIndex,
    });
    
    // 显示 tooltip
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 1, // 目标系列索引
        dataIndex: dataIndex,
    });
    
    count++;
}, 2000);