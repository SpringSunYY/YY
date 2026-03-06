// --- 1. 原始数据结构 ---
var rawData = [
    { name: "供热管理", value: 888, tooltip: "供热管理是这样的\n需要关注能源消耗和管网效率。" },
    { name: "水利环境", value: 650, tooltip: "水利环境需要对水资源进行监测和保护。" },
    { name: "批发零售", value: 420, tooltip: "批发零售关注库存周转和供应链效率。" },
    { name: "制造业", value: 300, tooltip: "制造业关注产线效率和产品质量。" },
    { name: "房地产", value: 250, tooltip: "房地产关注市场供需和土地利用。" },
    { name: "交通运输", value: 150, tooltip: "交通运输关注物流速度和路网承载力。" },
    { name: "居民服务", value: 120, tooltip: "居民服务关注社区满意度和响应速度。" },
    { name: "教育", value: 90, tooltip: "教育关注教学质量和资源分配。" },
    // 带有指定定位的数据项 (position 或 postion 字段)
    { name: "金融服务", value: 60, tooltip: "金融服务关注风险控制和资金流动。", position: [10, 10] }, 
];

// --- 2. 核心计算与辅助函数 ---

const totalValue = rawData.reduce((sum, item) => sum + item.value, 0);
const MIN_SYMBOL_SIZE = 50; 
const MAX_SYMBOL_SIZE = 200; 
const COLORS = ['#00DEFF', '#0c6491', '#8B008B', '#FFD700', '#FF4500', '#3CB371', '#4682B4', '#FA8072', '#00FFFF'];

// *** 核心修改：定义随机坐标范围 ***
const MIN_RANDOM_COORD = 5;    // 最小随机坐标
const MAX_RANDOM_COORD = 95;   // 最大随机坐标
// 随机范围大小 (95 - 5 + 1 = 91)
const RANDOM_RANGE = MAX_RANDOM_COORD - MIN_RANDOM_COORD + 1; 

// 辅助函数：生成 安全范围 [5, 95] 之间的随机整数（用于坐标）
function getRandomCoordinate() {
    // 生成 0 到 90 的随机数，然后加上 5
    return Math.floor(Math.random() * RANDOM_RANGE) + MIN_RANDOM_COORD;
}

function calculateSymbolSize(value) {
    const ratio = value / totalValue;
    return Math.max(
        MIN_SYMBOL_SIZE,
        Math.round(ratio * (MAX_SYMBOL_SIZE - MIN_SYMBOL_SIZE)) + MIN_SYMBOL_SIZE
    );
}

// 检查并返回有效的定位，否则随机生成安全范围内的坐标
function getValidPosition(item) {
    const pos = item.position || item.postion; 
    
    // 如果存在指定坐标且在 [0, 100] 范围内，则使用它 (这是用户指定优先级)
    if (
        pos && 
        Array.isArray(pos) && 
        pos.length === 2 && 
        pos[0] >= 0 && pos[0] <= 100 && 
        pos[1] >= 0 && pos[1] <= 100
    ) {
        return pos; 
    } else {
        // 否则，使用安全范围 [5, 95] 内的随机定位
        return [getRandomCoordinate(), getRandomCoordinate()]; 
    }
}

// --- 3. 数据映射和处理 ---

var data = [];
rawData.forEach((item, index) => {
    let finalPosition = getValidPosition(item);
    let calculatedSize = calculateSymbolSize(item.value);

    data.push({
        name: item.name,
        value: finalPosition,
        symbolSize: calculatedSize,
        dataValue: item.value,
        dataTooltip: item.tooltip,
        itemStyle: {
            normal: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                    { offset: 0.2, color: 'rgba(27, 54, 72, 0.3)' },
                    { offset: 1, color: COLORS[index % COLORS.length] },
                ]),
                borderWidth: 3,
                borderColor: COLORS[index % COLORS.length],
            },
        },
    });
});

// --- 4. ECharts Option 配置 ---
option = {
    backgroundColor: '#061438',
    
    title: {
        text: '行业数据气泡分布图',
        subtext: '基于价值比例和灵活定位',
        left: 'center', 
        top: 10,
        textStyle: {
            color: '#fff',
            fontSize: 24
        }
    },

    dataZoom: [
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none',
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'none',
        }
    ],

    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            const name = params.name;
            const value = params.data.dataValue;
            const customTooltip = params.data.dataTooltip.replace(/\n/g, '<br/>');
            
            return `**${name}: ${value}**<br/>${customTooltip}`;
        },
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderColor: '#fff',
        borderWidth: 1,
        padding: 10,
    },

    grid: {
        show: false,
        top: 60,
        bottom: 10,
        left: 10,
        right: 10
    },
    xAxis: [
        {
            type: 'value',
            show: false,
            min: 0,
            max: 100,
        },
    ],
    yAxis: [
        {
            min: 0,
            show: false,
            max: 100,
        },
    ],

    series: [
        {
            type: 'scatter',
            symbol: 'circle',
            label: {
                normal: {
                    show: true,
                    formatter: '{b}', 
                    color: '#fff',
                    textStyle: {
                        fontSize: '16', 
                    },
                },
            },
            animationDurationUpdate: 500,
            animationEasingUpdate: 500,
            animationDelay: function (idx) {
                return idx * 100;
            },
            data: data,
        },
    ],
};