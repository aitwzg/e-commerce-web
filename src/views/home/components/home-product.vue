<template>
  <Transition ref="target" name="fade">
    <div class="home-product" v-if="list.length">
      <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
        <template #right>
          <div class="sub">
            <RouterLink v-for="sub in cate.children" :key="sub.id" to="/">{{
              sub.name
            }}</RouterLink>
          </div>
          <XtxMore></XtxMore>
        </template>
        <div class="box">
          <RouterLink class="cover" to="/">
            <img v-lazy="cate.picture" alt="" />
            <strong class="label">
              <span>{{ cate.name }}馆</span>
              <span>{{ cate.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="item in cate.goods" :key="item.id">
              <HomeGoods :goods="item" />
            </li>
          </ul>
        </div>
      </HomePanel>
    </div>
    <ProductSkeleton v-else></ProductSkeleton>
  </Transition>
  <!-- <ProductSkeleton></ProductSkeleton> -->
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { findGoods } from '@/api/home'
import { useLazyData } from '@/hooks'
import ProductSkeleton from './product-skeleton.vue'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods, ProductSkeleton },
  setup() {
    const { target, result } = useLazyData(findGoods)
    return { target, list: result }
  },
}
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        // 裁切填充图片
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}

.goods-item {
  width: 240px;
  height: 300px;
  padding: 10px 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  transition: all 0.5s;
  .image {
    display: block;
    width: 160px;
    height: 160px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    margin-top: 6px;
    font-size: 16px;
    &.name {
      height: 44px;
    }
    &.desc {
      color: #666;
      height: 22px;
    }
    &.price {
      margin-top: 10px;
      font-size: 20px;
      color: @priceColor;
    }
  }
}
</style>