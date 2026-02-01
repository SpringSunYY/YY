// 核心输入数据
const CHART_DATA = {
    names: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    values: [210.9, 260.8, 204.2, 504.9, 740.5, 600.3, 119.0]
};

// --- 动态计算 Y 轴的最大值和背景高度 (确保刻度均匀且自适应) ---

const actualMaxValue = Math.max(...CHART_DATA.values, 0);

// 1. 计算出所需的最小最大值 (740.5 * 1.2 = 888.6)
const minMaxRequired = actualMaxValue * 1.2; 

/**
 * 动态计算 Y 轴的最大值，确保它是美观且均匀的刻度间隔的倍数。
 * @param {number} value - 需要圆整的数值 (minMaxRequired)
 * @param {number} ticks - 期望的主刻度数量（不包括 0）
 * @returns {number} 经过圆整后的 Y 轴最大值
 */
function calculateRoundedMax(value, ticks = 5) {
    if (value === 0) return 1;

    // 粗略计算间隔（例如 888.6 / 5 ≈ 177.72）
    const roughInterval = value / ticks;
    
    // 找到最接近的 10 的幂次作为基数（例如 177.72 -> 100）
    const powerOfTen = Math.pow(10, Math.floor(Math.log10(roughInterval)));
    
    // 检查粗略间隔是基数的 1, 2, 5 倍中最接近且大于它的圆整数
    const rounders = [1, 2, 5, 10];
    let roundedInterval;
    
    for (const r of rounders) {
        roundedInterval = r * powerOfTen;
        // 如果圆整后的间隔大于粗略间隔，则使用它
        if (roundedInterval >= roughInterval) {
            break;
        }
    }
    
    // 用圆整后的间隔，计算最终的 max 值 (例如 888.6 / 200 = 4.443 -> ceil(4.443) = 5 -> 5 * 200 = 1000)
    return Math.ceil(value / roundedInterval) * roundedInterval;
}

const MAX_Y_VALUE = calculateRoundedMax(minMaxRequired); 
// 对于 888.6，计算出的圆整间隔是 200，MAX_Y_VALUE 结果是 1000。

// 背景柱的高度数组
const MAX_DATA = CHART_DATA.values.map(() => MAX_Y_VALUE);
const VALUE_DATA = CHART_DATA.values;

// 定义渐变色
const mainColorGradient = new echarts.graphic.LinearGradient(1, 1, 1, 0, [
    { offset: 0, color: " #0097C8" },
    { offset: 1, color: "#4CF0F9" },
]);

// --- 立方体图形定义 ---

// 绘制左侧面 (CubeLeft)
const CubeLeft = echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx, shape) {
        const xAxisPoint = shape.xAxisPoint;
        const c0 = [shape.x, shape.y];
        const c1 = [shape.x - 13, shape.y - 13];
        const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13];
        const c3 = [xAxisPoint[0], xAxisPoint[1]];
        ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
    }
});

// 绘制右侧面 (CubeRight)
const CubeRight = echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx, shape) {
        const xAxisPoint = shape.xAxisPoint;
        const c1 = [shape.x, shape.y];
        const c2 = [xAxisPoint[0], xAxisPoint[1]];
        const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
        const c4 = [shape.x + 18, shape.y - 9];
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
    }
});

// 绘制顶面 (CubeTop)
const CubeTop = echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx, shape) {
        const c1 = [shape.x, shape.y];
        const c2 = [shape.x + 18, shape.y - 9];
        const c3 = [shape.x + 5, shape.y - 22];
        const c4 = [shape.x - 13, shape.y - 13];
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
    }
});

// 注册图形
echarts.graphic.registerShape('CubeLeft', CubeLeft);
echarts.graphic.registerShape('CubeRight', CubeRight);
echarts.graphic.registerShape('CubeTop', CubeTop);

// --- ECharts 配置项 ---
const option = {
    title: {
        text: '3D 立方柱状图',
        x: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 20
        }
    },
    backgroundColor: 'rgba(17, 42, 62, 1)',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        backgroundColor: 'transparent',
        borderWidth: 0,
        textStyle: {
            color: '#FFF'
        },
        formatter: function (params) {
            const item = params.find(p => p.seriesIndex === 1); 
            if (item) {
                return item.name + ' : ' + item.value;
            }
            return '';
        }
    },
    grid: {
        left: 40,
        right: 40,
        bottom: 100,
        top: 100,
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: CHART_DATA.names,
        axisLine: {
            show: true,
            lineStyle: {
                color: 'white'
            }
        },
        offset: 25,
        axisTick: {
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
                color: '#7DFFFD'
            }
        },
        axisLabel: {
            show: true,
            fontSize: 16
        },
    },
    yAxis: {
        min: 0,
        max: MAX_Y_VALUE, // 使用自适应计算的最大值 (1000)
        type: 'value',
        // ECharts 会自动根据 max=1000 和默认设置生成均匀刻度
        axisLine: {
            show: false,
            lineStyle: {
                color: 'white'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: "dashed",
                color: "rgba(255,255,255,0.1)"
            },
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            fontSize: 16,
        },
        boundaryGap: ['20%', '20%']
    },
    series: [
        // Series 0: 背景柱 (MAX)
        {
            type: 'custom',
            renderItem: function (params, api) {
                const location = api.coord([api.value(0), api.value(1)]);
                return {
                    type: 'group',
                    children: [{
                        type: 'CubeLeft',
                        shape: { api, x: location[0], y: location[1], xAxisPoint: api.coord([api.value(0), 0]) },
                        style: { fill: '#18385A' }
                    }, {
                        type: 'CubeRight',
                        shape: { api, x: location[0], y: location[1], xAxisPoint: api.coord([api.value(0), 0]) },
                        style: { fill: '#33718E' }
                    }, {
                        type: 'CubeTop',
                        shape: { api, x: location[0], y: location[1] },
                        style: { fill: '#307E8E' }
                    }]
                };
            },
            data: MAX_DATA
        }, 
        // Series 1: 实际值柱 (VALUE)
        {
            type: 'custom',
            renderItem: (params, api) => {
                const location = api.coord([api.value(0), api.value(1)]);
                const isLastTwoBars = api.value(0) === VALUE_DATA.length - 2 || api.value(0) === VALUE_DATA.length - 1;
                
                const color = isLastTwoBars ? 'red' : mainColorGradient;

                return {
                    type: 'group',
                    children: [{
                        type: 'CubeLeft',
                        shape: { api, x: location[0], y: location[1], xAxisPoint: api.coord([api.value(0), 0]) },
                        style: { fill: color }
                    }, {
                        type: 'CubeRight',
                        shape: { api, x: location[0], y: location[1], xAxisPoint: api.coord([api.value(0), 0]) },
                        style: { fill: color }
                    }, {
                        type: 'CubeTop',
                        shape: { api, x: location[0], y: location[1] },
                        style: { fill: color }
                    }]
                };
            },
            data: VALUE_DATA
        }, 
        // Series 2: 透明柱 (Tooltip Trigger)
        {
            type: 'bar',
            itemStyle: {
                color: 'transparent',
            },
            data: MAX_DATA
        }
    ]
};