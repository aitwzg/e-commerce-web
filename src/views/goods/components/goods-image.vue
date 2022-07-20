<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div
      v-show="show"
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩色块 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    //   当前预览图的索引
    const currIndex = ref(0)
    // 是否显示遮罩和大图
    const show = ref(false)
    // 遮罩坐标
    const layerPosition = reactive({
      left: 0,
      top: 0,
    })
    // 大图背景定位（样式）
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0,
    })
    // 得到鼠标在元素内相对位置
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    // ref数据可以直接监听

    watch([elementX, elementY, isOutside], () => {
      show.value = !isOutside.value
      // 减去遮罩的1/2宽度让鼠标居中
      layerPosition.left = elementX.value - 100
      layerPosition.top = elementY.value - 100

      if (layerPosition.left <= 0) {
        layerPosition.left = 0
      } else if (layerPosition.left >= 200) {
        layerPosition.left = 200
      }
      if (layerPosition.top <= 0) {
        layerPosition.top = 0
      } else if (layerPosition.top >= 200) {
        layerPosition.top = 200
      }
      //   先修改背景的值，避免layerPosition的数据变成string
      largePosition.backgroundPositionX = -layerPosition.left * 2 + 'px'
      largePosition.backgroundPositionY = -layerPosition.top * 2 + 'px'
      layerPosition.left = layerPosition.left + 'px'
      layerPosition.top = layerPosition.top + 'px'
    })

    return {
      currIndex,
      show,
      layerPosition,
      largePosition,
      elementX,
      elementY,
      isOutside,
      target,
    }
  },
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 91;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>