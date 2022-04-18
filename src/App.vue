<template>
  <div>
    <p>{{ $store.state.moduleA.username }}</p>
    <p>{{ $store.state.moduleB.username }}</p>
    <p>{{ $store.getters.newName }}</p>
    <p>{{ $store.getters['moduleB/newName'] }}</p>
    <button @click="mutationsFn">mutationsFn</button>
    <button @click="actionsFn">actions</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    const mutationsFn = () => {
      store.commit('moduleB/updateName')
    }
    const actionsFn = () => {
      store.dispatch('moduleB/updateName')
    }
    return {
      mutationsFn,
      actionsFn,
    }
  },
}
</script>

<style>
</style>
