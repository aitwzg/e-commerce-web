<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot></slot></RouterLink>
    <span v-else><slot></slot></span>
    <!-- <i class="iconfont icon-angle-right"></i> -->
  </div>
</template>

<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object],
    },
  },
}
</script>

<style>
</style>