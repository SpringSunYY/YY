// 1. 模拟数据（增加了 tooltipText）
var datas = [
    { name: "形式主义", value: 20, tooltipText: "基层负担过重\n会议偏多" },
    { name: "官僚主义", value: 20, tooltipText: "办事推诿\n不作为现象" },
    { name: "享乐主义", value: 30 }, // 测试没有 tooltipText 的情况
    { name: "奢靡之风", value: 40, tooltipText: "违规吃喝\n公车私用" },
    { name: "年休假", value: 40, tooltipText: "年度法定假期\n已休天数统计" }
];

// 2. 控制变量：是否显示 Total 和 Avg
var showExtraInfo = true; 

var total = 0;
var avg = 0;

if (showExtraInfo) {
    total = datas.reduce((prev, curr) => prev + curr.value, 0);
    avg = (total / datas.length).toFixed(2);
}

var colors = ["#1879f6", "#03e0ff", "#4963ff", "#03e080"].reverse();

option = {
    backgroundColor: '#02274A',
    color: colors,
    // 5. 顶部居中标题
    title: {
        text: '风险预警分析统计',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#fff',
            fontSize: 20
        }
    },
    // 6. Legend 翻页配置
    legend: {
        type: 'scroll', // 开启翻页
        orient: 'horizontal',
        bottom: '1%',
        pageIconColor: '#03e0ff',
        pageTextStyle: { color: '#fff' },
        itemGap: 15,
        itemWidth: 16,
        itemHeight: 16,
        textStyle: {
            color: "#fff",
            fontSize: 14
        },
        data: datas.map(item => item.name)
    },
    // 3. 自定义 Tooltip
    tooltip: {
        trigger: "item",
        backgroundColor: 'rgba(0, 40, 70, 0.9)',
        borderColor: '#03e0ff',
        textStyle: { color: '#fff' },
        formatter: params => {
            let res = `<div style="line-height:24px;">`;
            // 显示基础信息
            res += `<b style="font-size:16px">${params.name}</b><br/>`;
            res += `数值: ${params.value} (${params.percent}%)<br/>`;
            
            // 如果开启了汇总，显示 Total 和 Avg
            if (showExtraInfo) {
                res += `<hr style="border:0;border-top:1px solid rgba(255,255,255,0.2);margin:5px 0;">`;
                res += `总和: ${total}<br/>`;
                res += `平均: ${avg}<br/>`;
            }
            
            // 1. 如果有 tooltipText 则添加
            if (params.data.tooltipText) {
                res += `<hr style="border:0;border-top:1px solid rgba(255,255,255,0.2);margin:5px 0;">`;
                res += `<span style="color:#03e080">详情提示：</span><br/>`;
                // 处理换行符 \n
                res += params.data.tooltipText.replace(/\n/g, '<br/>');
            }
            
            res += `</div>`;
            return res;
        }
    },
    series: [
        {
            name: "风险预警",
            type: "pie",
            // 4. 饼图圆角 (itemStyle.borderRadius)
            itemStyle: {
                borderRadius: 8
            },
            radius: ["30%", "75%"],
            center: ["50%", "50%"],
            roseType: "radius",
            label: {
                show: true,
                fontSize: 14,
                color: '#fff',
                formatter: params => {
                    return params.name + '\n' + params.percent + "%";
                }
            },
            labelLine: {
                length: 15,
                length2: 10,
                smooth: true
            },
            data: datas
        }
    ]
};