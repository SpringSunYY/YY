// ====================================================================
// 1. 数据结构：最终对象数组形式 (Array of Objects)
// 结构: {xAxis: 职位总数, yAxis: 平均工资, tooltip: 格式化后的工资信息字符串, name: 技能名称}
// ====================================================================
const rawDataObjectArray = [
    { xAxis: 2, yAxis: 22500.00, name: '新车', tooltip: '平均工资：22500.00，最高工资：30000.00，最低工资：15000.00' },
    { xAxis: 2, yAxis: 14229.17, name: '电商产品', tooltip: '平均工资：14229.17，最高工资：15500.00，最低工资：12958.34' },
    { xAxis: 12, yAxis: 8020.30, name: '热门技能', tooltip: '平均工资：8020.30，最高工资：9955.56，最低工资：6085.04' },
    { xAxis: 1, yAxis: 9000.00, name: '安全产品', tooltip: '平均工资：9000.00，最高工资：12000.00，最低工资：6000.00' },
    { xAxis: 1, yAxis: 7000.00, name: '手绘', tooltip: '平均工资：7000.00，最高工资：8000.00，最低工资：6000.00' },
    { xAxis: 4, yAxis: 5500.00, name: '成品检验（FQC）', tooltip: '平均工资：5500.00，最高工资：6750.00，最低工资：4250.00' },
    { xAxis: 12, yAxis: 6000.00, name: '制程检验（IPQC）', tooltip: '平均工资：6000.00，最高工资：6750.00，最低工资：5250.00' },
    { xAxis: 1, yAxis: 17333.33, name: '乘用车', tooltip: '平均工资：17333.33，最高工资：21666.67，最低工资：13000.00' },
    { xAxis: 1, yAxis: 15000.00, name: '智能问答', tooltip: '平均工资：15000.00，最高工资：20000.00，最低工资：10000.00' },
    { xAxis: 1, yAxis: 30000.00, name: '软件产品', tooltip: '平均工资：30000.00，最高工资：40000.00，最低工资：20000.00' },
    { xAxis: 3, yAxis: 10666.67, name: '钣金工艺', tooltip: '平均工资：10666.67，最高工资：12666.67，最低工资：8666.67' },
    { xAxis: 1, yAxis: 27500.00, name: '发电机组设计', tooltip: '平均工资：27500.00，最高工资：35000.00，最低工资：20000.00' },
    { xAxis: 2, yAxis: 13500.00, name: '新车设计', tooltip: '平均工资：13500.00，最高工资：17500.00，最低工资：9500.00' },
];

// ====================================================================
// 2. 数据处理和 ECharts 绘制数据准备
// ====================================================================

// 1. 计算总平均工资 (用于 MarkLine)
const totalAvgSalary = rawDataObjectArray.reduce((sum, item) => sum + item.yAxis, 0) / rawDataObjectArray.length;

// 2. 抖动函数和数据格式化
// ECharts 格式：[xAxis_Jitter, yAxis_Jitter, name, tooltipStr, yAxis_Original]
function formatDataAndApplyJitter(dataPoint) {
    const { xAxis, yAxis, name, tooltip } = dataPoint;
    
    // 职位总数（X轴）的抖动
    const jitterRatioX = xAxis > 50 ? 0.05 : 0.5;
    const offsetX = (Math.random() - 0.5) * xAxis * jitterRatioX; 
    
    // 平均工资（Y轴）的抖动
    const jitterAmountY = 500; 
    const offsetY = (Math.random() - 0.5) * 2 * jitterAmountY;
    
    return [
        Math.max(1, xAxis + offsetX),   // 维度 0: 职位总数 (带抖动)
        yAxis + offsetY,                // 维度 1: 平均工资 (带抖动)
        name,                           // 维度 2: 技能名称
        tooltip,                        // 维度 3: 预生成的 Tooltip 字符串
        yAxis                           // 维度 4: 原始平均工资 (用于VisualMap)
    ];
}

// 绘制所需的数据
const seriesData = rawDataObjectArray
    .filter(data => data.name && data.name.trim() !== '') // 过滤掉无效数据
    .map(formatDataAndApplyJitter);

// 确定工资的最大和最小值，用于 VisualMap 的范围
const minSalary = Math.min(...rawDataObjectArray.map(d => d.yAxis));
const maxSalary = Math.max(...rawDataObjectArray.map(d => d.yAxis));


// ====================================================================
// 3. ECharts 配置 (Option)
// ====================================================================
const option = {
    title: {
        text: '技能职位总数与平均工资散点分布图 (Tooltip 字符串嵌入)',
        subtext: '颜色深浅和右侧滑块控制平均工资范围。红色虚线为所有数据平均工资。',
        left: 'center'
    },

    dataZoom: [
        { type: 'inside', xAxisIndex: 0 }, // X轴内部缩放
        { type: 'inside', yAxisIndex: 0 }  // Y轴内部缩放
    ],
    
    // --- VisualMap 组件：不同工资范围颜色不一样，可以滑动范围显示 ---
    visualMap: {
        min: minSalary,
        max: maxSalary,
        dimension: 4, // 使用 seriesData 中的第 5 个维度 (索引 4)，即原始平均工资
        orient: 'vertical',
        right: 10,
        top: 'center',
        text: ['高工资', '低工资'],
        calculable: true,
        inRange: {
            color: ['#A3E4D7', '#117A65'] // 颜色范围：低工资 -> 高工资
        }
    },
    
    // --- Tooltip 配置：自定义格式（使用预生成的字符串）---
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            
            // 检查是否是散点图的点
            if (params.seriesType === 'scatter' && params.value) {
                // params.value 结构: [X_j, Y_j, name, tooltipStr, yAxis_Original]
                const name = params.value[2];       // 技能名称
                const value = params.value[0];      // 职位总数 (带抖动)
                const tooltipStr = params.value[3]; // 预生成的 Tooltip 字符串
                
                // 返回拼接后的 Tooltip
                // 将预生成字符串中的逗号替换为换行符
                const formattedTooltipStr = tooltipStr.replace(/，/g, '<br/>');

                return `
                    <div style="text-align: left; line-height: 1.5;">
                        **技能**: ${name}<br/>
                        **职位总数**: ${value.toFixed(0)}<br/>
                        ---<br/>
                        ${formattedTooltipStr}
                    </div>
                `;
            } 
            
            // MarkLine 的 Tooltip (平均工资线)
            // 注意：MarkLine 的 Tooltip 响应默认是通过 series 上的 tooltip 配置，
            // 但 MarkLine 的数据格式与散点图不同，这里使用 MarkLine 的 label 来显示信息
            if (params.seriesName === '所有技能平均工资') {
                 // 实际上，我们通过 markLine.label 来显示，这里是备用逻辑
                 return `**${params.name}**: ${params.value.toFixed(2)} 元`;
            }
            
            return params.name;
        }
    },

    // --- 轴配置 ---
    xAxis: {
        type: 'value',
        name: '职位总数 (Value)',
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: { formatter: '{value}' },
        splitLine: { show: true }
    },

    yAxis: {
        type: 'value',
        name: '平均工资 (元)',
        nameLocation: 'middle',
        nameGap: 40,
        axisLabel: { formatter: '{value} 元' },
        splitLine: { show: true }
    },

    grid: {
        left: '10%',
        right: '15%', 
        bottom: '10%',
        containLabel: true
    },

    series: [
        {
            name: '技能工资分布',
            type: 'scatter',
            data: seriesData,
            
            // --- 增大每个点的大小 ---
            symbolSize: function (data) {
                const originalValue = data[0]; // 职位总数
                return Math.max(12, Math.log(originalValue + 1) * 8); 
            },
            
            itemStyle: {
                opacity: 0.8, 
                shadowBlur: 8,
                shadowColor: 'rgba(0, 0, 0, 0.4)'
            },
            
            // 标签配置
            label: {
                show: true,
                formatter: function (params) {
                    const name = params.value[2];
                    const originalValue = params.value[0]; 
                    if (originalValue >= 50) { 
                        return name; 
                    }
                    return '';
                },
                position: 'right', 
                fontSize: 10,
                fontWeight: 'bold',
                color: '#333'
            },
            
            emphasis: {
                focus: 'series',
                label: {
                    show: true,
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: '#C0392B'
                }
            },

            // --- 添加平均工资线 (MarkLine) ---
            markLine: {
                name: '所有技能平均工资', // 给 MarkLine 命名，可以用于 Tooltip 区分
                silent: true, 
                symbol: 'none',
                lineStyle: {
                    type: 'dashed',
                    color: '#E74C3C',
                    width: 2
                },
                data: [
                    { 
                        type: 'average', 
                        name: '所有技能平均工资',
                        yAxis: totalAvgSalary // 将线固定在计算出的平均值
                    }
                ],
                // MarkLine的标签：直接显示平均工资信息
                label: {
                    formatter: `平均工资: ${totalAvgSalary.toFixed(2)} 元`,
                    position: 'end',
                    color: '#E74C3C',
                    fontWeight: 'bold'
                }
            }
        }
    ]
};