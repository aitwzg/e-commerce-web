<template>
  <div class="member-oder">
    <!-- <RouterLink to="/member/order/1001">订单1</RouterLink>
  <RouterLink to="/member/order/1002">订单2</RouterLink> -->
    <!-- jsx语法 -->
    <XtxTabs v-model="activeName" @click-tab="clickTab">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length == 0">暂未数据</div>
      <OrderItem
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      ></OrderItem>
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      v-if="total > 0"
      :current-page="reqParams.page"
      :page-size="reqParams.pageSize"
      :total="total"
      @current-change="reqParams.page = $event"
    >
    </XtxPagination>
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
import { ref, reactive, watch } from 'vue'
import OrderItem from './components/order-item'
import { findOrderList } from '@/api/order'
// 测试git
export default {
  name: 'MemberOrder',
  components: {
    OrderItem,
  },
  setup() {
    const activeName = ref('all')

    // 获取数据
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0,
    })
    const orderList = ref([])
    const loading = ref(false)
    const total = ref(0)
    const clickTab = ({ name, index }) => {
      reqParams.page = 1
      reqParams.orderState = index
      console.log(name, index)
    }
    // 只要筛选条件发生变化就能重新请求
    watch(
      reqParams,
      () => {
        loading.value = true
        findOrderList(reqParams).then((data) => {
          orderList.value = data.result.items
          loading.value = false
          total.value = data.result.counts
          console.log(total.value)
        })
      },
      { immediate: true }
    )
    return {
      activeName,
      clickTab,
      orderStatus,
      orderList,
      loading,
      total,
      reqParams,
    }
  },
}
</script>

<style scoped lang='less'>
.member-oder {
  height: 100%;
  background-color: #fff;
}

.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>