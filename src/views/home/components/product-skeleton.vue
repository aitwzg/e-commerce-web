<template>
<div class="home-product">
      <template v-for="i in 4" :key="i">
        <div style="height: 115px; width: 1240px"></div>
        <div class="box">
          <RouterLink class="cover" to="/">
            <XtxSkeleton width="240px" height="610px" animated />
          </RouterLink>
          <ul class="goods-list">
            <li v-for="i in 8" :key="i">
              <div class="goods-item">
                <RouterLink to="/" class="image">
                  <XtxSkeleton width="160px" height="160px" animated />
                </RouterLink>
                <XtxSkeleton
                  style="margin-top: 6px"
                  width="175px"
                  height="44px"
                  animated
                />

                <p class="desc"></p>
                <XtxSkeleton
                  style="margin-top: 6px"
                  width="60px"
                  height="22px"
                  animated
                />
              </div>
            </li>
          </ul>
        </div>
      </template>
    </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      overflow: hidden;
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
  }
  p {
    margin-top: 6px;
    font-size: 16px;
    &.price {
      margin-top: 10px;
      font-size: 20px;
      color: @priceColor;
    }
  }
}
</style>