<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付订单</XtxBreadItem>
      </XtxBread>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="order">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p v-if="order.countdown > -1">
            支付还剩 <span>{{ timeText }}</span
            >, 超时后将取消订单
          </p>
          <p v-else>订单已超时</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ order.payMoney }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a
            class="btn alipay"
            @click="visibleDialog = true"
            :href="payUrl"
            target="_blank"
          ></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">{{ visibleDialog }}招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
    <!-- 支付提示对话框 -->
    <XtxDialog title="正在支付..." v-model:visible="visibleDialog">
      <div class="pay-wait">
        <img src="@/assets/images/load.gif" alt="" />
        <div v-if="order">
          <p>如果支付成功：</p>
          <RouterLink :to="`/member/order/${id}`">查看订单详情></RouterLink>
          <p>如果支付失败：</p>
          <RouterLink to="/">查看相关疑问></RouterLink>
        </div>
      </div>
    </XtxDialog>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findOrderDetail } from '@/api/order'
import { usePayTime } from '@/hooks'
import { baseURL } from '@/utils/request'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
export default {
  name: 'XtxPayPage',
  setup() {
    const store = useStore()
    // 购物车更新
    store.dispatch('cart/findCart').then(() => {
      Message({ type: 'success', text: '更新本地购物车成功' })
    })
    // 根据地址栏ID发送请求获取订单数据
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.query.orderId).then((data) => {
      order.value = data.result
      // 后端提供倒计时countdown 倒计时到了之后不开启倒计时
      if (data.result.countdown > -1) {
        start(data.result.countdown)
      }
    })
    // 倒计时工具函数
    const { start, timeText } = usePayTime()

    // 支付地址
    // const payUrl ='后台基准地址+支付页面地址+订单ID+回跳地址'
    const redirect = encodeURIComponent(
      'http://www.corho.com:8080/#/pay/callback'
    )
    const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.orderId}&redirect=${redirect}`
    // 先加载出route再设置id，不能直接在标签上设置route.query.orderId
    const id = ref(route.query.orderId)

    const visibleDialog = ref(false)
    return { order, timeText, payUrl, visibleDialog, id }
  },
}
</script>
<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
.pay-wait {
  display: flex;
  justify-content: space-around;
  p {
    margin-top: 30px;
    font-size: 14px;
  }
  a {
    color: @xtxColor;
  }
}
</style>