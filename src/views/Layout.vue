<template>
  <!-- 顶部通栏 -->
  <AppNavbar></AppNavbar>
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
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
  },
}
</script>

<style scoped lang="less">
.app-body{
  height:600px
}
</style>