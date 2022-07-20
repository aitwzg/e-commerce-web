<template>
  <button @click="fn">按钮</button>
  <button @click="mufn">修改token</button>
  <RouterView></RouterView>
    <!-- 测试 -->
    <XtxMessage type='success'/>
</template>

<script>
import request from '@/utils/request'
import store from '@/store'

export default {
  name: 'App',
  setup() {
    const fn = () => {
      request('/member/profile', 'get', { a: 10 })
    }
    const mufn = () => {
      store.commit('user/setUser', {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCJhMWV4XCIsXCJpZFwiOlwiMTM2OTU5NDk1NDczOTg1OTQ1OFwiLFwidXNlcm5hbWVcIjpcInhpYW90dXhpYW4wMDFcIn0iLCJpYXQiOjE2NTUxOTkyMzEsImV4cCI6MTY1NTQ1ODQzMX0.JwrGVchfoDuPRPecX3pX0P9TvfyDvgD0Pcn3Ui6gF48',
      })
    }
    return { fn, mufn }
  },
}
</script>

<style scoped lang="less">
</style>
