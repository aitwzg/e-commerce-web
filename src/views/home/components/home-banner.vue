<template>
  <div class="home-banner">
    <XtxCarousel autoPlay :sliders="sliders"></XtxCarousel>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'HomeBanner',
  setup() {
    //   获取轮播图数组
    const sliders = ref([])
    findBanner().then((data) => {
      sliders.value = data.result
    })
    // console.log('sliders.value')
    // console.log(sliders)

    return { sliders }
  },
}
</script>

<style  scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}

.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>