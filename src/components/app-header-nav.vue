<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li
      v-for="item in list"
      :key="item.id"
      @mousemove="show(item)"
      @mouseleave="hide(item)"
    >
      <RouterLink @click="hide(item)" :to="`/category/${item.id}`">{{
        item.name
      }}</RouterLink>
      <div class="layer" :class="{open:item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink @click="hide(item)" :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup() {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    const show = (item) => {
      store.commit('category/show', item.id)
    }
    const hide = (item) => {
      store.commit('category/hide', item.id)
    }
    return { list, show, hide }
  },
}
</script>

<style scoped lang='less'>
.app-header-nav {
  position: relative;
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  z-index: 100;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
  }
}

.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>