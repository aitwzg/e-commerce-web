<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="TopCategory.id">{{
            TopCategory.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" autoPlay style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in TopCategory.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { findBanner } from '@/api/home'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodsItem from './components/goods-item'
import { findTopCategory } from '@/api/category.js'
export default {
  name: 'TopCategory',
  components: {
    GoodsItem,
  },
  setup() {
    const sliders = ref([])
    findBanner().then((data) => {
      sliders.value = data.result
    })
    const store = useStore()
    const route = useRoute()
    const TopCategory = computed(() => {
      let cate = {}
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id
      })
      if (item) cate = item
      return cate
    })
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children
      })
    }
    watch(
      // 监听某个对象中的属性变化要写作函数形式才能监听
      () => route.params.id,
      (newVal) => {
        // 监听顶级分类改变才发请求
        if (newVal && `/category/${newVal}` === route.path) {
          getSubList()
        }
      },
      { immediate: true }
    )
    return { sliders, TopCategory, subList }
  },
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>