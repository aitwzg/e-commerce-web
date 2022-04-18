<template>
  <div>
    App
    <p>{{ $store.state.username }}</p>
    <p>{{ $store.getters['newName'] }}</p>
    <button @click="mutationFn">改变username</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    console.log(store.state.username)
    console.log(store.getters.newName)
    const mutationFn = () => {
      // store.commit('updateName')
      store.dispatch('updateName')
    }
    return { mutationFn }
  },
}
</script>

<style>
</style>
