<template>
  <!-- 顶部通栏 -->
  <AppNavbar></AppNavbar>
  <!-- 吸顶头部 -->
  <AppHeaderSticky></AppHeaderSticky>
  <!-- 头部组件 -->
  <AppHeader></AppHeader>
  <!-- 内容容器 -->
  <div class="app-body">
    <RouterView></RouterView>
  </div>
  <!-- 底部组件 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppNavbar from '@/components/app-navbar'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'
import { useStore } from 'vuex' //  只能在钩子函数setup里面使用
// import store from '@/store' 全部都能使用
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderSticky,
  },
  setup() {
    const store = useStore()
    // 获取数据
    store.dispatch('category/getList')
  },
}
</script>

<style scoped lang="less">
.app-body {
}
</style>