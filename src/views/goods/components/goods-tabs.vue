<template>
  <div class="goods-tabs">
    <nav>
      <a
        :class="{ active: activeName === 'detail' }"
        @click="clickTab('detail')"
        href="javascript:;"
        >商品详情</a
      >
      <a
        :class="{ active: activeName === 'comment' }"
        @click="clickTab('comment')"
        href="javascript:;"
        >商品评价<span v-if="commentInfo">{{ commentInfo.evaluateCount }}</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="'goods-' + activeName" />
  </div>
</template>

<script>
import { ref, inject, provide } from 'vue'
import GoodsDetail from './goods-detail.vue'
import GoodsComment from './goods-comment.vue'
import { findCommentInfoByGoods } from '@/api/goods'

const getCommentInfo = (goods) => {
  const commentInfo = ref(null)
  findCommentInfoByGoods(goods.value.id).then((data) => {
    // type 的目的是将来点击可以区分点的是不是标签
    data.result.tags.unshift({
      type: 'img',
      title: '有图',
      tagCount: data.result.hasPictureCount,
    })
    data.result.tags.unshift({
      type: 'all',
      title: '全部评价',
      tagCount: data.result.evaluateCount,
    })
    commentInfo.value = data.result
    console.log(commentInfo.value)
  })
  return commentInfo
}
export default {
  name: 'GoodsTabs',
  components: {
    GoodsDetail,
    GoodsComment,
  },
  setup() {
    const goods = inject('goods')
    const commentInfo = getCommentInfo(goods)
    provide('commentInfo', commentInfo)
    const activeName = ref('detail')
    const clickTab = (name) => {
      activeName.value = name
    }
    return { activeName, clickTab, goods, commentInfo }
  },
}
</script>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>