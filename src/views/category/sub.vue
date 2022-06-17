<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange" />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods"></GoodsItem>
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        ></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category.js'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodsList = ref([])
    let reqParams = {
      page: 1,
      pageSize: 20,
    }

    const getData = () => {
      loading.value = true
      // 设置二级分类的ID
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }
    // 在更改了二级分类后应该从新加载数据
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          finished.value = false
          goodsList.value = []
          reqParams = {
            page: 1,
            pageSize: 20,
          }
        }
      }
    )
    const sortChange = (sortParams) => {
      finished.value = false
      // 合并请求参数 保留之前的参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      // console.log(reqParams)
      goodsList.value = []
    }
    const filterChange = (filterParams) => {
      finished.value = false
      // 合并请求参数 保留之前的参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      console.log(reqParams)
      // console.log(reqParams)
      goodsList.value = []
    }
    return { getData, loading, finished, goodsList, sortChange, filterChange }
  },
}
</script>
<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>