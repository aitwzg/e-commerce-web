<template>
  <XtxBread>
    <XtxBreadItem to="/"> 首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem v-if="category.sub" :key="category.sub.id">{{
        category.sub.name
      }}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup() {
    // 注意：setup中this不是当前vue实例
    // 1. 获取二级分类的ID，在地址在路由中
    // route ===> this.$route
    const route = useRoute()
    // console.log(route.params.id)
    // 2. 获取vuex中的类目数据
    // store ===> this.$store
    const store = useStore()
    // console.log(store)
    // 3. 通过计算属性得到，二级类目的名称和ID，一级类目的名称和ID
    const category = computed(() => {
      const obj = {}
      store.state.category.list.forEach((top) => {
        top.children &&
          top.children.forEach((sub) => {
            if (sub.id === route.params.id) {
              // 设置二级类目
              // 设置一级类目
              obj.sub = { id: sub.id, name: sub.name }
              obj.top = { id: top.id, name: top.name }
            }
          })
      })
      return obj
    })
    // 模版需要使用的东西需要setup返回
    return { category }
  },
}
</script>
<style scoped lang="less"></style>