<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="changeBrand(item.id)"
          href="javascript:;"
          :class="{ active: filterData.selectedBrand === item.id }"
          v-for="item in filterData.brands"
          :key="item.id"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}:</div>
      <div class="body">
        <a
          @click="changeProp(item, prop.id)"
          :class="{ active: item.selectedProp === prop.id }"
          href="javascript:;"
          v-for="prop in item.properties"
          :key="prop.id"
          >{{ prop.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup(props, { emit }) {
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)
    watch(
      () => route.params.id,
      (newVal, oldVal) => {
        if (newVal && route.path === '/category/sub/' + newVal) {
          filterLoading.value = true
          newVal &&
            findSubCategoryFilter(route.params.id).then(({ result }) => {
              //   console.log(result)

              result.selectedBrand = null
              result.brands.unshift({ id: null, name: '全部' })
              result.saleProperties.forEach((p) => {
                p.selectedProp = null
                p.properties.unshift({ id: null, name: '全部' })
              })
              filterData.value = result
              filterLoading.value = false
            })
        }
      },
      { immediate: true }
    )
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] }
      // 品牌
      obj.brandId = filterData.value.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach((item) => {
        if (item.selectedProp) {
          const prop = item.properties.find(
            (prop) => prop.id === item.selectedProp
          )
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }

    // 记录当前选择的品牌
    const changeBrand = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 记录选择销售属性
    const changeProp = (item, propId) => {
      if (item.selectedProp === propId) return
      item.selectedProp = propId
      emit('filter-change', getFilterParams())
    }
    return { filterData, filterLoading, changeBrand, changeProp }
  },
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>