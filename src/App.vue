<template>
  <button @click="fn">按钮</button>
  <button @click="mufn">修改token</button>
  <RouterView></RouterView>
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
        token: 'zhangs',
      })
    }
    return { fn, mufn }
  },
}
</script>

<style scoped lang="less">
</style>
