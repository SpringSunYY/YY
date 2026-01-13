<template>
  <div class="ranking-table-container" :style="{ height: height, width: width }">
    <table class="ranking-table">
      <thead ref="theadRef">
      <tr>
        <th>序号</th>
        <th v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
      </tr>
      </thead>
      <tbody
        ref="tableBodyRef"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @wheel.passive="handleWheel"
        @mousemove="handleMouseMove"
      >
      <tr
        v-for="(item, index) in data"
        :key="index"
        @click="handleRowClick(item)"
        @mouseenter="(event) => handleRowMouseEnter(item, event)"
        @mouseleave="handleRowMouseLeave"
        :class="{ 'is-at-bottom': isAtBottom && index === data.length - 1 }"
      >
        <td>{{ index + 1 }}</td>
        <td v-for="(column, colIndex) in columns" :key="colIndex">
          {{ (item[column.prop] !== undefined && item[column.prop] !== null) ? item[column.prop] : '' }}
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="tooltipContent" class="tooltip" :style="tooltipStyle">
      <div v-for="col in columns" :key="col.prop">
        <strong>{{ col.label }}:</strong>
        {{ tooltipContent[col.prop] !== undefined ? tooltipContent[col.prop] : '' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableRanking',
  props: {
    // 列配置
    columns: {
      type: Array,
      default: () => [
        { label: '图片编号', prop: 'pictureId' },
        { label: '图片名称', prop: 'name' },
        { label: '浏览量', prop: 'lookCount' },
        { label: '收藏量', prop: 'collectCount' },
        { label: '点赞', prop: 'likeCount' },
        { label: '分享', prop: 'shareCount' }
      ]
    },
    // 列表数据
    data: {
      type: Array,
      default: () => [
        { pictureId: '001', name: '图片A', lookCount: 100, collectCount: 50, likeCount: 80, shareCount: 10 },
        { pictureId: '002', name: '图片B', lookCount: 200, collectCount: 70, likeCount: 120, shareCount: 20 },
        { pictureId: '003', name: '图片C', lookCount: 150, collectCount: 60, likeCount: 90, shareCount: 15 },
        { pictureId: '004', name: '图片D', lookCount: 300, collectCount: 90, likeCount: 200, shareCount: 30 },
        { pictureId: '005', name: '图片E', lookCount: 80, collectCount: 40, likeCount: 50, shareCount: 5 },
        { pictureId: '006', name: '图片F', lookCount: 90, collectCount: 45, likeCount: 60, shareCount: 8 },
        { pictureId: '007', name: '图片G', lookCount: 110, collectCount: 55, likeCount: 70, shareCount: 12 },
        { pictureId: '008', name: '图片E', lookCount: 80, collectCount: 40, likeCount: 50, shareCount: 5 },
        { pictureId: '009', name: '图片F', lookCount: 90, collectCount: 45, likeCount: 60, shareCount: 8 },
        { pictureId: '010', name: '图片G', lookCount: 110, collectCount: 55, likeCount: 70, shareCount: 12 }
      ]
    },
    height: { type: String, default: '100%' },
    width: { type: String, default: '100%' },
    // 自动滚动等待时间
    scrollInterval: { type: Number, default: 2000 },
    // 滚动速度（像素/帧）
    scrollSpeed: { type: Number, default: 0.4 }
  },
  data() {
    return {
      animationFrameId: null,
      scrollTimeout: null,
      isHovering: false,
      isAtBottom: false,
      needsScrolling: false,
      tooltipContent: null,
      tooltipStyle: {
        top: '0px',
        left: '0px',
        opacity: 0
      }
    };
  },
  computed: {
    // 动态计算 tbody 的高度（减去 thead 高度）
    tbodyHeight() {
      if (!this.$refs.theadRef || !this.$el) {
        return 'calc(100% - 44px)';
      }
      const containerHeight = this.$el.clientHeight;
      const theadHeight = this.$refs.theadRef.offsetHeight;
      return `${containerHeight - theadHeight}px`;
    }
  },
  watch: {
    // 数据更新重置滚动
    data: {
      deep: true,
      handler() {
        this.resetAndInit();
      }
    },
    height() {
      this.resetAndInit();
    }
  },
  mounted() {
    this.initializeTable();
  },
  beforeDestroy() {
    this.stopAllScrolling();
  },
  methods: {
    // 检查内容是否超出容器需要滚动
    checkIfScrollingNeeded() {
      const tableBody = this.$refs.tableBodyRef;
      if (!tableBody) return false;
      return tableBody.scrollHeight > tableBody.clientHeight;
    },
    // 停止所有滚动相关的定时器和动画
    stopAllScrolling() {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
      }
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    },
    // 开始自动滚动逻辑
    startAutoScroll() {
      if (!this.checkIfScrollingNeeded()) {
        this.needsScrolling = false;
        this.isAtBottom = true;
        this.$emit('scrolledToBottom');
        return;
      }

      this.needsScrolling = true;
      this.stopAllScrolling();

      this.scrollTimeout = setTimeout(() => {
        const scroll = () => {
          const tableBody = this.$refs.tableBodyRef;
          // 如果正在悬停或元素丢失，停止递归
          if (!tableBody || this.isHovering) {
            this.animationFrameId = null;
            return;
          }

          // 判断是否到底部
          if (tableBody.scrollTop + tableBody.clientHeight >= tableBody.scrollHeight - 1) {
            this.isAtBottom = true;
            this.$emit('scrolledToBottom');
            this.stopAllScrolling();
          } else {
            this.isAtBottom = false;
            tableBody.scrollTop += this.scrollSpeed;
            this.animationFrameId = requestAnimationFrame(scroll);
          }
        };
        this.animationFrameId = requestAnimationFrame(scroll);
      }, this.scrollInterval);
    },
    handleMouseEnter() {
      this.isHovering = true;
      this.stopAllScrolling();
    },
    handleMouseLeave() {
      this.isHovering = false;
      if (!this.isAtBottom && this.needsScrolling) {
        // 稍微延迟重启，避免频繁触发
        setTimeout(() => {
          if (!this.isHovering) this.startAutoScroll();
        }, 100);
      }
    },
    handleWheel(event) {
      this.stopAllScrolling();
      const tableBody = this.$refs.tableBodyRef;
      if (!tableBody) return;

      tableBody.scrollTop += event.deltaY;

      if (tableBody.scrollTop + tableBody.clientHeight >= tableBody.scrollHeight - 1) {
        this.isAtBottom = true;
        this.$emit('scrolledToBottom');
      } else {
        this.isAtBottom = false;
      }
    },
    handleRowMouseEnter(item, event) {
      this.tooltipContent = item;
      this.updateTooltipPosition(event);
      this.tooltipStyle.opacity = 1;
    },
    // 更新浮窗位置逻辑
    updateTooltipPosition(event) {
      const containerRect = this.$el.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const relativeX = mouseX - containerRect.left;
      const relativeY = mouseY - containerRect.top;

      const tooltipWidthEstimate = 200;
      const tooltipHeightEstimate = 120;
      const gap = 15;

      let finalLeft = relativeX - tooltipWidthEstimate / 2;
      let finalTop = relativeY - tooltipHeightEstimate - gap;

      // 边界处理
      if (finalLeft < 0) finalLeft = gap;
      if (finalLeft + tooltipWidthEstimate > containerRect.width) {
        finalLeft = containerRect.width - tooltipWidthEstimate - gap;
      }
      if (finalTop < 0) {
        finalTop = relativeY + gap; // 空间不足显示在下方
      }

      this.tooltipStyle.left = `${Math.max(0, finalLeft)}px`;
      this.tooltipStyle.top = `${Math.max(0, finalTop)}px`;
    },
    handleMouseMove(event) {
      if (this.tooltipContent) {
        this.updateTooltipPosition(event);
      }
    },
    handleRowMouseLeave() {
      this.tooltipContent = null;
      this.tooltipStyle.opacity = 0;
    },
    handleRowClick(item) {
      this.$emit('rowClicked', item);
    },
    resetAndInit() {
      this.stopAllScrolling();
      this.isAtBottom = false;
      this.initializeTable();
    },
    initializeTable() {
      this.$nextTick(() => {
        const tableBody = this.$refs.tableBodyRef;
        if (tableBody) {
          // 手动同步计算的高度
          tableBody.style.height = this.tbodyHeight;
          setTimeout(() => {
            this.startAutoScroll();
          }, 50);
        }
      });
    }
  }
};
</script>

<style scoped>
.ranking-table-container {
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent; /* 可根据需求调整背景色 */
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-family: 'PingFang SC', sans-serif;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
}

thead {
  background-color: #0a1f44;
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
}

th {
  padding: 12px 8px;
  font-size: 14px;
  font-weight: normal;
  color: #fff;
}

tbody {
  flex: 1;
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
}

/* Chrome/Safari 滚动条 */
tbody::-webkit-scrollbar {
  width: 6px;
}

tbody::-webkit-scrollbar-track {
  background: rgba(4, 16, 34, 0.3);
}

tbody::-webkit-scrollbar-thumb {
  background-color: #1a3a6d;
  border-radius: 3px;
}

tr {
  display: table;
  width: 100%;
  table-layout: fixed;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

tr.is-at-bottom {
  background-color: rgba(255, 255, 255, 0.05);
}

td {
  padding: 10px 8px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Tooltip 样式 */
.tooltip {
  position: absolute;
  background-color: rgba(10, 31, 68, 0.95);
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 9999;
  pointer-events: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s;
  border: 1px solid #1e4b8d;
  min-width: 150px;
}

.tooltip div {
  line-height: 1.8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tooltip div:last-child {
  border-bottom: none;
}

.tooltip strong {
  color: #00d2ff;
  margin-right: 8px;
}
</style>
