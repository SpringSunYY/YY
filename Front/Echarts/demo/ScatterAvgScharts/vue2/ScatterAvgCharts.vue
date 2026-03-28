<template>
  <div :class="className" :style="{ height, width }" ref="chartRef"/>
</template>

<script>
import * as echarts from 'echarts';
import {hexToRgba} from "@/utils/ruoyi";

const defaultChartData = [
  {xAxis: 2, yAxis: 22500.00, name: '新车', tooltipText: '平均工资：22500.00，最高工资：30000.00，最低工资：15000.00'},
  {xAxis: 2, yAxis: 14229.17, name: '电商产品', tooltipText: '平均工资：14229.17，最高工资：15500.00，最低工资：12958.34'},
  {xAxis: 4, yAxis: 5500.00, name: '成品检验（FQC）', tooltipText: '平均工资：5500.00，最高工资：6750.00，最低工资：4250.00'},
  {
    xAxis: 12,
    yAxis: 6000.00,
    name: '制程检验（IPQC）',
    tooltipText: '平均工资：6000.00，最高工资：6750.00，最低工资：5250.00'
  },
  {xAxis: 1, yAxis: 8000.00, name: '工艺设计', tooltipText: '平均工资：8000.00，最高工资：10000.00，最低工资：6000.00'},
  {xAxis: 2, yAxis: 10125.00, name: 'CAD', tooltipText: '平均工资：10125.00，最高工资：13500.00，最低工资：6750.00'},
  {xAxis: 1, yAxis: 12500.00, name: '工程师', tooltipText: '平均工资：12500.00，最高工资：15000.00，最低工资：10000.00'},
  {xAxis: 3, yAxis: 17222.22, name: '国内市场', tooltipText: '平均工资：17222.22，最高工资：20694.44，最低工资：13750.00'},
  {xAxis: 1, yAxis: 7500.00, name: '仿制药', tooltipText: '平均工资：7500.00，最高工资：10000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 9500.00, name: '小程序产品', tooltipText: '平均工资：9500.00，最高工资：12000.00，最低工资：7000.00'},
  {xAxis: 1, yAxis: 8000.00, name: '3D设计', tooltipText: '平均工资：8000.00，最高工资：10000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 10291.67, name: '结构设计', tooltipText: '平均工资：10291.67，最高工资：13000.00，最低工资：7583.33'},
  {xAxis: 2, yAxis: 10750.00, name: '结构设计', tooltipText: '平均工资：10750.00，最高工资：12333.34，最低工资：9166.67'},
  {xAxis: 1, yAxis: 6000.00, name: '包住', tooltipText: '平均工资：6000.00，最高工资：7000.00，最低工资：5000.00'},
  {xAxis: 27, yAxis: 6480.77, name: '来料检验（IQC）', tooltipText: '平均工资：6480.77，最高工资：7461.54，最低工资：5500.00'},
  {xAxis: 6, yAxis: 9333.33, name: '亚马逊', tooltipText: '平均工资：9333.33，最高工资：11055.56，最低工资：7611.11'},
  {xAxis: 3, yAxis: 9972.22, name: 'AutoCAD', tooltipText: '平均工资：9972.22，最高工资：11805.56，最低工资：8138.89'},
  {xAxis: 1, yAxis: 6500.00, name: '社会保险', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 2, yAxis: 3600.00, name: '产品调研', tooltipText: '平均工资：3600.00，最高工资：4800.00，最低工资：2400.00'},
  {xAxis: 1, yAxis: 7000.00, name: '电动叉车', tooltipText: '平均工资：7000.00，最高工资：8000.00，最低工资：6000.00'},
  {xAxis: 5, yAxis: 6500.00, name: '仓库', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '餐补', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6900.00, name: '非标设备', tooltipText: '平均工资：6900.00，最高工资：7800.00，最低工资：6000.00'},
  {xAxis: 5, yAxis: 5000.00, name: '无纹身无染发', tooltipText: '平均工资：5000.00，最高工资：5800.00，最低工资：4200.00'},
  {xAxis: 2, yAxis: 10500.00, name: '面部美容', tooltipText: '平均工资：10500.00，最高工资：14000.00，最低工资：7000.00'},
  {xAxis: 1, yAxis: 8500.00, name: '体检免费', tooltipText: '平均工资：8500.00，最高工资：10000.00，最低工资：7000.00'},
  {xAxis: 6, yAxis: 7583.33, name: '车床设备', tooltipText: '平均工资：7583.33，最高工资：9666.67，最低工资：5500.00'},
  {xAxis: 1, yAxis: 6000.00, name: '社会保险', tooltipText: '平均工资：6000.00，最高工资：7000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 7500.00, name: '剪发', tooltipText: '平均工资：7500.00，最高工资：10000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 7500.00, name: '电商', tooltipText: '平均工资：7500.00，最高工资：10000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 5000.00, name: '节日福利', tooltipText: '平均工资：5000.00，最高工资：6000.00，最低工资：4000.00'},
  {xAxis: 1, yAxis: 12000.00, name: '汽车维修', tooltipText: '平均工资：12000.00，最高工资：15000.00，最低工资：9000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '压塑工艺', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 2, yAxis: 5500.00, name: '售前客服', tooltipText: '平均工资：5500.00，最高工资：7000.00，最低工资：4000.00'},
  {xAxis: 2, yAxis: 7250.00, name: '三菱数控系统', tooltipText: '平均工资：7250.00，最高工资：9000.00，最低工资：5500.00'},
  {xAxis: 1, yAxis: 6500.00, name: '月休四天', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 13541.67, name: '包吃', tooltipText: '平均工资：13541.67，最高工资：16250.00，最低工资：10833.33'},
  {xAxis: 1, yAxis: 17333.33, name: '新车', tooltipText: '平均工资：17333.33，最高工资：21666.67，最低工资：13000.00'},
  {xAxis: 1, yAxis: 6500.00, name: 'ERP系统', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '五险', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '体检免费', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '包住', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 2, yAxis: 6500.00, name: '包住', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '社会保险', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '包住', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 5500.00, name: 'TEMU', tooltipText: '平均工资：5500.00，最高工资：6000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 5000.00, name: '包住', tooltipText: '平均工资：5000.00，最高工资：6000.00，最低工资：4000.00'},
  {xAxis: 2, yAxis: 7500.00, name: '抖音', tooltipText: '平均工资：7500.00，最高工资：9000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6000.00, name: '新媒体运营', tooltipText: '平均工资：6000.00，最高工资：8000.00，最低工资：4000.00'},
  {xAxis: 1, yAxis: 5500.00, name: '西餐厅', tooltipText: '平均工资：5500.00，最高工资：6000.00，最低工资：5000.00'},
  {xAxis: 3, yAxis: 9500.00, name: '财产险', tooltipText: '平均工资：9500.00，最高工资：12000.00，最低工资：7000.00'},
  {xAxis: 2, yAxis: 8500.00, name: '注塑操作', tooltipText: '平均工资：8500.00，最高工资：9000.00，最低工资：8000.00'},
  {xAxis: 1, yAxis: 7500.00, name: '五险一金', tooltipText: '平均工资：7500.00，最高工资：8000.00，最低工资：7000.00'},
  {xAxis: 9, yAxis: 6000.00, name: '超市', tooltipText: '平均工资：6000.00，最高工资：7142.86，最低工资：4857.14'},
  {xAxis: 1, yAxis: 6500.00, name: '材料检测', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {
    xAxis: 1,
    yAxis: 20000.00,
    name: '不接受居家办公',
    tooltipText: '平均工资：20000.00，最高工资：25000.00，最低工资：15000.00'
  },
  {xAxis: 3, yAxis: 6500.00, name: '包住', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '提供食堂和住宿', tooltipText: '平均工资：6500.00，最高工资：8000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 5000.00, name: '机械', tooltipText: '平均工资：5000.00，最高工资：6000.00，最低工资：4000.00'},
  {
    xAxis: 4,
    yAxis: 9625.00,
    name: '同事可爱 领导暖心',
    tooltipText: '平均工资：9625.00，最高工资：12833.33，最低工资：6416.67'
  },
  {xAxis: 1, yAxis: 8000.00, name: '现场管理', tooltipText: '平均工资：8000.00，最高工资：9000.00，最低工资：7000.00'},
  {xAxis: 1, yAxis: 6000.00, name: '医疗项目', tooltipText: '平均工资：6000.00，最高工资：8000.00，最低工资：4000.00'},
  {xAxis: 1, yAxis: 8000.00, name: '剪发', tooltipText: '平均工资：8000.00，最高工资：10000.00，最低工资：6000.00'},
  {xAxis: 3, yAxis: 8944.44, name: '现场管理', tooltipText: '平均工资：8944.44，最高工资：10333.33，最低工资：7555.56'},
  {xAxis: 1, yAxis: 6000.00, name: '成品检验（FQC）', tooltipText: '平均工资：6000.00，最高工资：7000.00，最低工资：5000.00'},
  {xAxis: 7, yAxis: 6071.43, name: '面部美容', tooltipText: '平均工资：6071.43，最高工资：7857.14，最低工资：4285.71'},
  {xAxis: 1, yAxis: 5000.00, name: '微生物检验', tooltipText: '平均工资：5000.00，最高工资：6000.00，最低工资：4000.00'},
  {xAxis: 4, yAxis: 6000.00, name: '售前客服', tooltipText: '平均工资：6000.00，最高工资：8000.00，最低工资：4000.00'},
  {xAxis: 1, yAxis: 9000.00, name: 'SPA护理', tooltipText: '平均工资：9000.00，最高工资：12000.00，最低工资：6000.00'},
  {xAxis: 2, yAxis: 7750.00, name: '包吃包住', tooltipText: '平均工资：7750.00，最高工资：9500.00，最低工资：6000.00'},
  {xAxis: 2, yAxis: 6500.00, name: '全职', tooltipText: '平均工资：6500.00，最高工资：7000.00，最低工资：6000.00'},
  {
    xAxis: 1,
    yAxis: 10833.33,
    name: '客户质量工程师',
    tooltipText: '平均工资：10833.33，最高工资：14083.33，最低工资：7583.33'
  },
  {xAxis: 16, yAxis: 8500.00, name: '全白班', tooltipText: '平均工资：8500.00，最高工资：11125.00，最低工资：5875.00'},
  {xAxis: 1, yAxis: 10500.00, name: '主管', tooltipText: '平均工资：10500.00，最高工资：14000.00，最低工资：7000.00'},
  {xAxis: 3, yAxis: 7666.67, name: '面部美容', tooltipText: '平均工资：7666.67，最高工资：10000.00，最低工资：5333.33'},
  {xAxis: 1, yAxis: 5500.00, name: '平面设计', tooltipText: '平均工资：5500.00，最高工资：6000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 9500.00, name: '模具钳工', tooltipText: '平均工资：9500.00，最高工资：12000.00，最低工资：7000.00'},
  {xAxis: 4, yAxis: 6750.00, name: '来料检验（IQC）', tooltipText: '平均工资：6750.00，最高工资：8000.00，最低工资：5500.00'},
  {xAxis: 2, yAxis: 6000.00, name: '拼多多', tooltipText: '平均工资：6000.00，最高工资：8000.00，最低工资：4000.00'},
  {xAxis: 1, yAxis: 6000.00, name: '数据统计', tooltipText: '平均工资：6000.00，最高工资：7000.00，最低工资：5000.00'},
  {xAxis: 5, yAxis: 6900.00, name: '来料检验（IQC）', tooltipText: '平均工资：6900.00，最高工资：8000.00，最低工资：5800.00'},
  {xAxis: 2, yAxis: 6000.00, name: '制程检验（IPQC）', tooltipText: '平均工资：6000.00，最高工资：6500.00，最低工资：5500.00'},
  {xAxis: 1, yAxis: 5000.00, name: '欧美风格', tooltipText: '平均工资：5000.00，最高工资：6000.00，最低工资：4000.00'},
  {xAxis: 2, yAxis: 7500.00, name: '带货主播', tooltipText: '平均工资：7500.00，最高工资：9000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 6500.00, name: '监测设备运维', tooltipText: '平均工资：6500.00，最高工资：8666.67，最低工资：4333.33'},
  {xAxis: 2, yAxis: 8250.00, name: '小学教育', tooltipText: '平均工资：8250.00，最高工资：11000.00，最低工资：5500.00'},
  {xAxis: 3, yAxis: 6166.67, name: '设计', tooltipText: '平均工资：6166.67，最高工资：7333.33，最低工资：5000.00'},
  {xAxis: 1, yAxis: 6000.00, name: '机械结构图', tooltipText: '平均工资：6000.00，最高工资：8000.00，最低工资：4000.00'},
  {xAxis: 3, yAxis: 12333.33, name: '面销/陌拜', tooltipText: '平均工资：12333.33，最高工资：15666.67，最低工资：9000.00'},
  {xAxis: 1, yAxis: 8666.67, name: '弱电设计', tooltipText: '平均工资：8666.67，最高工资：9750.00，最低工资：7583.33'},
  {xAxis: 4, yAxis: 6750.00, name: '露脸', tooltipText: '平均工资：6750.00，最高工资：9000.00，最低工资：4500.00'},
  {xAxis: 2, yAxis: 6250.00, name: '绩效奖金', tooltipText: '平均工资：6250.00，最高工资：7000.00，最低工资：5500.00'},
  {xAxis: 3, yAxis: 6833.33, name: 'AutoCAD', tooltipText: '平均工资：6833.33，最高工资：8666.67，最低工资：5000.00'},
  {xAxis: 2, yAxis: 7250.00, name: '机电设备', tooltipText: '平均工资：7250.00，最高工资：9500.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 12458.33, name: '个人客户', tooltipText: '平均工资：12458.33，最高工资：15166.67，最低工资：9750.00'},
  {xAxis: 1, yAxis: 8500.00, name: '特膳食', tooltipText: '平均工资：8500.00，最高工资：10000.00，最低工资：7000.00'},
  {
    xAxis: 1,
    yAxis: 10833.33,
    name: '过程质量工程师',
    tooltipText: '平均工资：10833.33，最高工资：14083.33，最低工资：7583.33'
  },
  {xAxis: 1, yAxis: 7500.00, name: '建材', tooltipText: '平均工资：7500.00，最高工资：10000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 7000.00, name: '机械抛光工艺', tooltipText: '平均工资：7000.00，最高工资：9000.00，最低工资：5000.00'},
  {xAxis: 1, yAxis: 11000.00, name: '线上活动', tooltipText: '平均工资：11000.00，最高工资：13000.00，最低工资：9000.00'},
  {xAxis: 3, yAxis: 10666.67, name: '钣金工艺', tooltipText: '平均工资：10666.67，最高工资：12666.67，最低工资：8666.67'},
  {xAxis: 1, yAxis: 5500.00, name: '生产计划管理', tooltipText: '平均工资：5500.00，最高工资：7000.00，最低工资：4000.00'},
  {xAxis: 1, yAxis: 7000.00, name: '宠物食品', tooltipText: '平均工资：7000.00，最高工资：8000.00，最低工资：6000.00'},
  {xAxis: 1, yAxis: 5500.00, name: 'QC七大手法', tooltipText: '平均工资：5500.00，最高工资：6000.00，最低工资：5000.00'},
  {xAxis: 10, yAxis: 8858.33, name: '企业客户', tooltipText: '平均工资：8858.33，最高工资：11566.67，最低工资：6150.00'},
  {xAxis: 14, yAxis: 7464.29, name: '个人客户', tooltipText: '平均工资：7464.29，最高工资：9500.00，最低工资：5428.57'},
  {xAxis: 1, yAxis: 5500.00, name: '存储芯片', tooltipText: '平均工资：5500.00，最高工资：7000.00，最低工资：4000.00'},
  {xAxis: 3, yAxis: 7652.78, name: '销售方向', tooltipText: '平均工资：7652.78，最高工资：9444.45，最低工资：5861.11'},
  {xAxis: 3, yAxis: 9000.00, name: '检验员', tooltipText: '平均工资：9000.00，最高工资：10000.00，最低工资：8000.00'},
  {xAxis: 1, yAxis: 7000.00, name: '来料检验（IQC）', tooltipText: '平均工资：7000.00，最高工资：8000.00，最低工资：6000.00'},
  {xAxis: 6, yAxis: 13166.67, name: '企业客户', tooltipText: '平均工资：13166.67，最高工资：16833.33，最低工资：9500.00'},
  {xAxis: 1, yAxis: 9000.00, name: '4S店', tooltipText: '平均工资：9000.00，最高工资：12000.00，最低工资：6000.00'}
]


export default {
  name: 'ScatterAvgCharts',

  props: {
    className: {type: String, default: 'chart'},
    width: {type: String, default: '100%'},
    height: {type: String, default: '100%'},
    chartName: {type: String, default: '技能职位与平均工资散点图'},
    chartData: {type: Array, default: () => defaultChartData},
    symbolScale: {type: Number, default: 2},
    colorMain: {type: String, default: 'rgb(36,207,244)'},
    unit: {type: String, default: '职位总数'}
  },

  data() {
    return {
      chart: null,
      rawDataCache: [],
      globalAvgX: 0, // 全局平均职位总数，用于总览模式下的筛选阈值
      // 放大阈值：dataZoom 范围小于 90% 时，认为是“已放大”
      zoomThreshold: 100
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart(this.chartData);
      window.addEventListener('resize', this.handleResize);
    });
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.off('datazoom');
      this.chart.off('click');
      this.chart.dispose();
      this.chart = null;
    }
    window.removeEventListener('resize', this.handleResize);
  },

  watch: {
    chartData: {
      handler(newData) {
        this.initChart(newData);
      },
      deep: true
    }
  },

  methods: {
    /**
     * @description 抖动函数
     */
    formatDataAndApplyJitter(dataPoint) {
      const {xAxis, yAxis, name, tooltipText} = dataPoint;
      const jitterRatioX = xAxis > 50 ? 0.05 : 0.5;
      const offsetX = (Math.random() - 0.5) * xAxis * jitterRatioX;
      const jitterAmountY = 500;
      const offsetY = (Math.random() - 0.5) * 2 * jitterAmountY;

      return [
        Math.max(1, xAxis + offsetX),   // 维度 0: 职位总数 (带抖动)
        yAxis + offsetY,                // 维度 1: 平均工资 (带抖动)
        name,                           // 维度 2: 技能名称
        tooltipText,                        // 维度 3: 预生成的 Tooltip 字符串
        yAxis,                          // 维度 4: 原始平均工资 (用于VisualMap)
        xAxis                           // 维度 5: 原始职位总数 (用于 Label 筛选)
      ];
    },

    /**
     * @description 根据 dataZoom 状态更新标签显示策略
     * @param {Object} event - datazoom 事件对象
     */
    updateLabelStrategy(event) {
      if (!this.chart) return;

      // 获取当前 X 轴 dataZoom 的起始和结束百分比
      // 如果没有 event，说明是初始调用，默认百分比是 0 和 100
      const start = event && event.batch ? event.batch[0].start : 0;
      const end = event && event.batch ? event.batch[0].end : 100;

      // 计算当前缩放范围的百分比
      const currentZoomPercentage = end - start;

      // 判断是否处于放大模式
      const isZoomed = currentZoomPercentage < this.zoomThreshold;
      const self = this;

      this.chart.setOption({
        series: [{
          name: '技能工资分布',
          label: {
            // 【关键切换逻辑】
            formatter: (params) => {
              const name = params.value[2];
              const originalXAxisValue = params.value[5];

              if (isZoomed) {
                // 模式 1: 已放大 (缩放范围小于阈值)
                // 此时应显示所有标签，让 ECharts 自己处理重叠
                return name;
              } else {
                // 模式 2: 总览模式 (未缩放或缩放很小)
                // 此时应用原始的“热门”筛选逻辑 (高于全局平均职位数)
                if (originalXAxisValue >= self.globalAvgX) {
                  return name;
                }
                return '';
              }
            },

            // 确保在放大模式下，标签能溢出 Grid 区域，防止边界隐藏
            bleed: isZoomed,
            // 始终启用避让
            minMargin: 3,
            overflow: 'break',
          }
        }]
      });

      // console.log(`[ECharts] Zoom %: ${currentZoomPercentage}，放大状态: ${isZoomed ? '是' : '否'}`);
    },

    /**
     * @description 初始化 ECharts 图表
     */
    initChart(rawDataObjectArray) {
      if (!rawDataObjectArray || rawDataObjectArray.length === 0) {
        if (this.chart) {
          this.chart.off('datazoom');
          this.chart.dispose();
          this.chart = null;
        }
        return;
      }

      this.rawDataCache = rawDataObjectArray;

      // --- 1. 数据处理 & 全局状态设置 ---
      const yValues = rawDataObjectArray.map(d => d.yAxis);
      const xValues = rawDataObjectArray.map(d => d.xAxis);

      const globalMaxX = Math.max(...xValues);
      const globalMinX = Math.min(...xValues);
      this.globalAvgX = xValues.reduce((sum, item) => sum + item, 0) / xValues.length;

      const totalAvgSalary = yValues.reduce((sum, item) => sum + item, 0) / yValues.length;
      const minSalary = Math.min(...yValues);
      const maxSalary = Math.max(...yValues);

      const seriesData = rawDataObjectArray
        .filter(data => data.name && data.name.trim() !== '')
        .map(this.formatDataAndApplyJitter);

      if (this.chart) {
        this.chart.off('datazoom');
        this.chart.dispose();
      }
      this.chart = echarts.init(this.$refs.chartRef);

      // --- 2. 监听 dataZoom 事件 ---
      this.chart.on('datazoom', this.updateLabelStrategy);

      // --- 3. 点击事件监听 ---
      this.chart.on('click', (params) => {
        if (params.seriesType === 'scatter' && params.value) {
          const name = params.value[2];
          const originalX = params.value[5];
          const originalY = params.value[4];
          const tooltipText = params.value[3];
          this.$emit('item-click', {
            name: name,
            xAxis: originalX,
            yAxis: originalY,
            tooltipText: tooltipText
          });
        }
      });

      // --- 3. ECharts Option 配置 ---
      const self = this;
      const option = {
        title: {text: this.chartName, left: 'center', textStyle: {color: '#fff'}},
        dataZoom: [
          // 确保 dataZoom 存在，否则 event.batch[0] 会报错
          {type: 'inside', xAxisIndex: 0, filterMode: 'none', start: 0, end: 100},
          {type: 'inside', yAxisIndex: 0, filterMode: 'none', start: 0, end: 100}
        ],
        visualMap: {
          min: minSalary, max: maxSalary, dimension: 4,
          orient: 'vertical', right: 2, top: '10%',bottom: '10%',
          text: ['最大值', '最小值'], calculable: true,
          textStyle: {color: '#fff'},
          inRange: {
            color: [
              hexToRgba(this.colorMain, 0.2),
              hexToRgba(this.colorMain, 0.4),
              hexToRgba(this.colorMain, 0.6),
              hexToRgba(this.colorMain, 0.8),
              hexToRgba(this.colorMain, 1)
            ]
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 40, 70, 0.9)',
          borderColor: '#03e0ff',
          borderWidth: 1,
          textStyle: {color: '#fff'},
          formatter: (params) => {
            if (params.seriesType === 'scatter' && params.value) {
              const name = params.value[2];
              const originalX = params.value[5];
              const tooltipTextStr = params.value[3];
              const formattedTooltipStr = tooltipTextStr.replace(/\n/g, '<br/>');

              let res = `<div style="line-height:24px;">`;
              res += `<b style="font-size:16px">${name}(${originalX.toFixed(0)})</b><br/>`;
              res += `<hr style="border:0;border-top:1px solid rgba(255,255,255,0.2);margin:5px 0;">`;
              res += formattedTooltipStr;
              res += `</div>`;
              return res;
            }
            if (params.seriesName === '所有技能平均工资') {
              return `平均: ${params.value.toFixed(2)} 元`;
            }
            return params.name;
          }
        },

        xAxis: {
          type: 'value', name: this.unit, nameLocation: 'middle', nameGap: 30,
          axisLabel: {formatter: '{value}', color: '#ffffff'}, splitLine: {show: true},
          min: globalMinX,
          max: globalMaxX
        },
        yAxis: {
          type: 'value', name: '平均', nameLocation: 'middle', nameGap: 30,
          color: 'black',
          axisLabel: {formatter: '{value} 元', color: '#ffffff'}, splitLine: {show: true}
        },
        grid: {left: '2%', right: '12%', bottom: '10%', containLabel: true},

        series: [
          {
            name: '技能工资分布',
            type: 'scatter',
            // 涟漪动画
            showEffectOn: "emphaias",// render emphaias
            rippleEffect: {
              scale: 5
            },
            data: seriesData,
            symbolSize: (data) => {
              const originalValue = data[5];
              return Math.max(12, Math.log(originalValue + 1) * self.symbolScale);
            },
            itemStyle: {opacity: 0.8, shadowBlur: 8, shadowColor: 'rgba(0, 0, 0, 0.4)'},

            // 初始标签配置 (将在 nextTick 中被 updateLabelStrategy 覆盖)
            label: {
              show: true,
              formatter: (params) => {
                const name = params.value[2];
                const originalXAxisValue = params.value[5];
                // 初始时使用总览模式的筛选逻辑
                if (originalXAxisValue >= self.globalAvgX) {
                  return name;
                }
                return '';
              },
              position: 'right',
              fontSize: 10,
              fontWeight: 'bold',
              color: '#ffffff',
              bleed: false, // 初始不溢出
              minMargin: 3,
              overflow: 'break',
              z: (data) => data[5] || 0,
            },

            emphasis: {focus: 'series', label: {show: true, fontWeight: 'bold', fontSize: 12, color: '#C0392B'}},

            markLine: {
              name: '所有技能平均工资', silent: true, symbol: 'none',
              lineStyle: {type: 'dashed', color: this.colorMain, width: 2},
              data: [{type: 'average', name: '所有技能平均工资', yAxis: totalAvgSalary}],
              label: {
                formatter: `平均: ${totalAvgSalary.toFixed(2)} 元`,
                position: 'end', color: this.colorMain, fontWeight: 'bold'
              }
            }
          }
        ]
      };

      this.chart.setOption(option, true);

      // 确保初始状态应用正确的标签策略
      this.$nextTick(() => {
        this.updateLabelStrategy({batch: [{start: 0, end: 100}]});
      });
    },

    /**
     * @description 处理窗口大小变化，调整图表尺寸
     */
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  }
};
</script>

<style scoped>
.chart {
  box-sizing: border-box;
}
</style>
