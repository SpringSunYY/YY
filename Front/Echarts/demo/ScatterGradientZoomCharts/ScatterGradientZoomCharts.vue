<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'ScatterGradientZoomCharts',
  props: {
    className: { type: String, default: 'chart' },
    width: { type: String, default: '100%' },
    height: { type: String, default: '100%' },
    chartData: {
      type: Array,
      default: () => [
        {name: '重叠大项', value: 100, min: 500, max: 500, tooltipText: '核心重点项目\n需关注坐标重叠偏移'},
        {name: '重叠小项', value: 25, min: 500, max: 500, tooltipText: '我是重叠的小球\n我应该显示在大球上层'},
        {name: '系统重构', value: 85, min: 200, max: 750, tooltipText: '底层架构升级\n涉及全模块测试'},
        {name: '云端迁移', value: 66, min: 450, max: 120, tooltipText: '双活数据中心同步'},
        {name: 'AI模型', value: 92, min: 800, max: 850, tooltipText: '算力集群分配完成'},
        {name: '安全加固', value: 45, min: 150, max: 300, tooltipText: '防火墙规则策略更新'},
        {name: '前端优化', value: 38, min: 600, max: 400, tooltipText: '首屏加载耗时降低50%'},
        {name: '自动化', value: 55, min: 320, max: 580, tooltipText: '流水线覆盖率达90%'},
        {name: '数据扩容', value: 72, min: 710, max: 220, tooltipText: '扩容至50TB存储空间'},
        {name: '接口升级', value: 30, min: 100, max: 900, tooltipText: 'V3版本接口灰度切换'},
        {name: '日志监控', value: 48, min: 550, max: 680, tooltipText: '异常链路追踪实时报警'},
        {name: '组件开发', value: 22, min: 280, max: 150, tooltipText: '通用UI组件库维护'},
        {name: '离线计算', value: 88, min: 400, max: 800, tooltipText: '每日凌晨2点调度执行'},
        {name: '灰度发布', value: 41, min: 900, max: 450, tooltipText: '当前流量配比 10%'},
        {name: '容器部署', value: 59, min: 650, max: 720, tooltipText: 'K8S集群节点自动扩缩'},
        {name: '文档中心', value: 15, min: 120, max: 500, tooltipText: '开发者API手册更新'},
        {name: '压力测试', value: 77, min: 300, max: 350, tooltipText: '模拟万级并发压测'},
        {name: '缓存治理', value: 52, min: 850, max: 100, tooltipText: 'Redis热点Key失效处理'},
        {name: '支付对接', value: 63, min: 420, max: 420, tooltipText: '第三方支付通道聚合'},
        {name: '用户中心', value: 33, min: 780, max: 600, tooltipText: '单点登录协议SSO优化'}
      ]
    },
    // --- 比例控制参数 ---
    minSize: { type: Number, default: 0.06 }, // 最小气泡占容器短边的比例
    maxSize: { type: Number, default: 0.25 }, // 最大气泡占容器短边的比例
    // --- ---------------- ---
    showExtraInfo: { type: Boolean, default: true },
    chartTitle: { type: String, default: '业务数据分布统计' },
    backgroundColor: { type: String, default: 'transparent' }
  },

  data() {
    return {
      chart: null,
      total: 0,
      avg: 0
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(newData) {
        this.setOption(newData)
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
      window.addEventListener('resize', this.handleResize)
    })
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    getDynamicGradient() {
      return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(' + [Math.round(Math.random() * 150), Math.round(Math.random() * 150), 255].join(',') + ', 0.9)'
      }, {
        offset: 1,
        color: 'rgba(' + [Math.round(Math.random() * 150), 255, Math.round(Math.random() * 150)].join(',') + ', 0.9)'
      }]);
    },

    initChart() {
      if (this.chart) this.chart.dispose()
      this.chart = echarts.init(this.$refs.chartRef)
      this.setOption(this.chartData)
    },

    setOption(rawData) {
      if (!rawData || rawData.length === 0 || !this.chart) return

      // 1. 计算统计数据
      this.total = rawData.reduce((sum, item) => sum + (item.value || 0), 0)
      this.avg = (this.total / rawData.length).toFixed(2)

      // 2. 获取容器尺寸，计算像素基准
      const width = this.chart.getWidth()
      const height = this.chart.getHeight()
      const baseSize = Math.min(width, height)
      const minPixel = baseSize * this.minSize
      const maxPixel = baseSize * this.maxSize

      // 3. 获取数据值范围用于线性映射
      const values = rawData.map(d => d.value)
      const maxVal = Math.max(...values)
      const minVal = Math.min(...values)
      const valDiff = (maxVal - minVal) || 1 // 防止除以0

      // 4. 数据处理：排序以确保层级（大球在下，小球在上）
      const processedData = rawData
        .slice()
        .sort((a, b) => b.value - a.value)
        .map((item, index) => {
          // 线性映射计算当前像素大小
          const currentSymbolSize = minPixel + ((item.value - minVal) / valDiff) * (maxPixel - minPixel)

          // 重叠偏移逻辑（保持原有逻辑）
          const isOverlap = rawData.some((other, i) =>
            i !== index && other.max === item.max && other.min === item.min
          )
          const offset = isOverlap ? (index * 2) : 0

          return {
            name: item.name,
            value: [item.max + offset, item.min + offset],
            symbolSize: currentSymbolSize, // 核心优化：直接存储计算后的像素大小
            realValue: item.value,
            originMax: item.max,
            originMin: item.min,
            tooltipText: item.tooltipText || '',
            itemStyle: {
              color: this.getDynamicGradient(),
              opacity: 0.8
            },
            z: index + 1000
          }
        })

      const option = {
        backgroundColor: this.backgroundColor,
        title: {
          text: this.chartTitle,
          left: 'center',
          top: 20,
          textStyle: {color: '#fff', fontSize: 18}
        },
        // 缩放控制逻辑
        dataZoom: [
          // X 轴内置缩放
          {type: 'inside', xAxisIndex: 0, minSpan: 60},
          {type: 'inside', yAxisIndex: 0, minSpan: 60},
          // X 轴下方滚动条
          {
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'none',
            height: 20,
            bottom: '2%',
            start: 0,
            end: 100,
            handleStyle: {color: '#63bef8'},
            textStyle: {color: '#ccc'}
          },
          // Y 轴内置缩放
          {
            type: 'inside',
            yAxisIndex: [0],
            zoomOnMouseWheel: true
          },
          // Y 轴左侧滚动条
          {
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'none',
            width: 20,
            left: '2%',
            top: '12%',
            bottom: '12%',
            start: 0,
            end: 100,
            handleStyle: {color: '#63bef8'}
          }
        ],
        grid: {
          left: '10%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          confine: true,
          backgroundColor: 'rgba(0,0,0,0.85)',
          borderColor: '#63bef8',
          borderWidth: 1,
          textStyle: {color: '#fff'},
          formatter: (params) => {
            const d = params.data;
            const percentage = ((d.realValue / this.total) * 100).toFixed(2);
            let res = `<div style="padding:5px;">`;
            res += `<b style="color:#63bef8;font-size:15px;">${d.name}</b><br/>`;

            if (this.showExtraInfo) {
              res += `<div style="color:#FFD700;margin:3px 0;border-bottom:1px solid #444;">
                        总计: ${this.total} | 平均: ${this.avg}
                      </div>`;
            }

            res += `当前数值: <b>${d.realValue}</b> <small>(${percentage}%)</small><br/>`;
            res += `最大值: ${d.originMax} | 最小值: ${d.originMin}`;

            if (d.tooltipText) {
              res += `<div style="color:#aaa;font-size:12px;margin-top:8px;line-height:1.4;">${d.tooltipText.replace(/\n/g, '<br/>')}</div>`;
            }
            res += `</div>`;
            return res;
          }
        },
        xAxis: {
          type: 'value',
          scale: true,
          axisLabel: {color: '#ccc'},
          splitLine: {lineStyle: {color: 'rgba(255,255,255,0.1)'}}
        },
        yAxis: {
          type: 'value',
          scale: true,
          axisLabel: {color: '#ccc'},
          splitLine: {lineStyle: {color: 'rgba(255,255,255,0.1)'}}
        },
        series: [{
          type: 'scatter',
          data: processedData,
          // 直接从 data 项中取 symbolSize 字段
          symbolSize: (val, params) => params.data.symbolSize,
          label: {
            show: true,
            formatter: '{b}',
            position: 'inside',
            color: '#fff',
            fontSize: 10
          },
          labelLayout: { hideOverlap: true },
          emphasis: {
            focus: 'self',
            scale: 1.2,
            itemStyle: { opacity: 1, borderColor: '#fff', borderWidth: 2 }
          }
        }]
      };

      this.chart.setOption(option);
    },

    handleResize() {
      if (this.chart) {
        this.chart.resize()
        this.setOption(this.chartData)
      }
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
