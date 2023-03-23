<template>
  <div class="member-oder">MemberOrder</div>
  <!-- <RouterLink to="/member/order/1001">订单1</RouterLink>
  <RouterLink to="/member/order/1002">订单2</RouterLink> -->
  <!-- jsx语法 -->
  <XtxTabs v-model="activeName" @click-tab="clickTab">
    <XtxTabsPanel label="首页" name="first">首页</XtxTabsPanel>
    <XtxTabsPanel
      v-for="i in 4"
      :key="i"
      :label="`选项卡${i}`"
      :name="`name${i}`"
      >内容{{ i }}</XtxTabsPanel
    >
  </XtxTabs>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'MemberOrder',
  setup() {
    const activeName = ref('name1')
    const clickTab = ({ name, index }) => {
      console.log(name, index)
    }
    return { activeName, clickTab }
  },
}
</script>

<style lang='less'>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>