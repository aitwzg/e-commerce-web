<template>
  <div class="xtx-tabs-panel" v-show="name === activeName">
    <slot />
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'XtxTabsPanel',
  //   label 选项卡文字 name 选项卡唯一标识  $slot.default()默认插槽内容
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default: '',
    },
  },
  setup() {
    const activeName = inject('activeName')
    console.log(activeName)
    return { activeName }
  },
}
</script>

<style>
</style>