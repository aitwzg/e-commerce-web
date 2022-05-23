<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeHot></HomeHot>
  <!-- 使用transition组件 -->
  <button @click="show = true">显示|创建</button>
  <button @click="show = false">隐藏|创建</button>
  <Transition>
    <div
      v-show="show"
      style="width: 100px; height: 100px; background: red"
    ></div>
  </Transition>
  <Transition name="h">
    <div v-show="show" style="width: 100px; background: red"></div>
  </Transition>
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import { ref } from 'vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
  },
  setup() {
    const show = ref(true)
    return { show }
  },
}
</script>

<style scoped lang="less">
.container {
  // .hoverShadow();
  color: @xtxColor;
}
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 2s;
}
.v-enter-to {
  opacity: 1;
}
.h-enter-from {
  height: 0px;
}
.h-enter-active {
  transition: all 2s;
}
.h-enter-to {
  height: 100px;
}
</style>