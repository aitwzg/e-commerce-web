<template>
  <div class="member-home">
    <!-- 展览 -->
    <HomeOverview></HomeOverview>
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem
        v-for="item in collectGoods"
        :key="item.id"
        :goods="item"
      ></GoodsItem>
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <GoodsItem
        v-for="item in collectGoods"
        :key="item.id"
        :goods="item"
      ></GoodsItem>
    </HomePanel>

    <!-- 猜你 -->
    <GoodsRelevant></GoodsRelevant>
  </div>
</template>
<script>
import HomeOverview from './components/home-overview.vue'
import HomePanel from './components/home-panel.vue'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import GoodsItem from '@/views/category/components/goods-item'
// import request from '@/utils/request'
import { findCollect } from '@/api/member'
import { ref } from 'vue'
export default {
  name: 'MemberHome',
  components: {
    HomeOverview,
    HomePanel,
    GoodsRelevant,
    GoodsItem,
  },
  setup() {
    // const goods = {
    //   id: '1',
    //   name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
    //   picture:
    //     'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
    //   desc: '清汤鲜香 红汤劲爽',
    //   price: '159.00',
    // }
    // // 调用模拟接口
    // request('/my/test', 'get').then((data) => {
    //   console.log(data)
    // })
    const collectGoods = ref([])
    findCollect({
      page: 1,
      pageSize: 4,
    }).then((data) => {
      collectGoods.value = data.result.items
      console.log(collectGoods.value)
    })
    return { collectGoods }
  },
}
</script>
<style scoped lang="less">
:deep(.xtx-carousel) {
  .carousel-btn.prev {
    left: 10px;
  }
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 10px;
}
</style>