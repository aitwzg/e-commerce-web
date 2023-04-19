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
      <XtxCheckbox
        v-if="orderList.length > 0"
        :modelValue="selectedAll"
        @change="checkAll"
      >
        全选</XtxCheckbox
      >
      <a
        v-if="orderList.length > 0"
        @click="deleteSelectedCheck"
        href="javascript:;"
        class="del"
        >删除</a
      >
      <OrderItem
        @on-cancel="handlerCancel"
        @on-delete="handlerDelete"
        @checkOne="handlercheckOne"
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
    <!-- 取消原因组件 -->
    <OrderCancel ref="OrderCancelCom"></OrderCancel>
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
import { ref, reactive, watch } from 'vue'
import OrderItem from './components/order-item'
import { findOrderList, deleteOrder } from '@/api/order'
import OrderCancel from './components/order-cancel'
import Confirm from '@/components/library/confirm'
import Message from '@/components/library/Message'
// import { useStore } from 'vuex'
export default {
  name: 'MemberOrder',
  components: {
    OrderItem,
    OrderCancel,
  },
  setup() {
    const activeName = ref('all')
    // 全选的数据
    const selectedAll = ref(false)
    // const store = useStore()
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
    const getOrderList = () => {
      loading.value = true
      findOrderList(reqParams).then((data) => {
        orderList.value = data.result.items
        loading.value = false
        total.value = data.result.counts
        // console.log(total.value)
      })
    }
    // 只要筛选条件发生变化就能重新请求
    watch(
      reqParams,
      () => {
        getOrderList()
      },
      { immediate: true }
    )

    // 删除订单
    const handlerDelete = (order) => {
      Confirm({ text: '亲，您确认删除该订单吗？' })
        .then(() => {
          deleteOrder([order.id]).then(() => {
            // console.log('删除成功')
            Message({ type: 'success', text: '删除成功' })
            getOrderList()
          })
        })
        .catch(() => {})
    }
    // 删除选中订单
    const deleteSelectedCheck = () => {
      let selectedCheck = orderList.value
        .filter((item) => item.selected === true)
        .map((item) => item.id)
      Confirm({ text: '亲，您确认删除选中订单吗？' })
        .then(() => {
          deleteOrder(selectedCheck).then(() => {
            // console.log('删除成功')
            Message({ type: 'success', text: '删除成功' })
            getOrderList()
          })
        })
        .catch(() => {})
    }
    // 选中订单
    const handlercheckOne = (event, id) => {
      // console.log(orderList.value.find((item) => item.id === id))
      orderList.value.find((item) => item.id === id).selected = event
      if (orderList.value.find((item) => item.selected !== true)) {
        selectedAll.value = false
      } else {
        selectedAll.value = true
      }
    }
    // 全选订单
    const checkAll = (event) => {
      selectedAll.value = event
      orderList.value.map((item) => {
        item.selected = event
        return item
      })
    }
    return {
      activeName,
      clickTab,
      orderStatus,
      orderList,
      loading,
      total,
      reqParams,
      handlerDelete,
      handlercheckOne,
      selectedAll,
      checkAll,
      deleteSelectedCheck,
      ...useCancel(), // 必须加括号
    }
  },
}

// 取消订单逻辑
const useCancel = () => {
  // 组件实例
  const OrderCancelCom = ref(null)
  const handlerCancel = (order) => {
    OrderCancelCom.value.open(order)
  }
  return { handlerCancel, OrderCancelCom }
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
  .del {
    float: right;
  }
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