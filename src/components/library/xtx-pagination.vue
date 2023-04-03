<template>
  <div class="xtx-pagination" v-if="myTotal > 0">
    <a v-if="myCurrentPage <= 1" href="javascript:;" class="disabled">上一页</a>
    <a v-else href="javascript:;" @click="changePage(myCurrentPage - 1)"
      >上一页</a
    >
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      :class="{ active: i === myCurrentPage }"
      v-for="i in pager.btnArr"
      :key="i"
      @click="changePage(i)"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      v-if="myCurrentPage >= pager.pageCount"
      class="disabled"
      href="javascript:;"
      >下一页</a
    >
    <a v-else href="javascript:;" @click="changePage(myCurrentPage + 1)"
      >下一页</a
    >
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    // 总条数
    const myTotal = ref(100)
    // 每页条数
    const myPageSize = ref(10)
    // 当前第几页
    const myCurrentPage = ref(1)
    // 按钮个数
    const btnCount = 5
    watch(props, () => {
      myTotal.value = props.total
      myPageSize.value = props.pageSize
      myCurrentPage.value = props.currentPage
      console.log(myCurrentPage.value)
    }, { immediate: true })

    const pager = computed(() => {
      // 计算总数页
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      // 计算起始页码和结束页码
      // 1.根据当前页码和按钮数得到
      let start = myCurrentPage.value - Math.floor(btnCount / 2)
      let end = start + btnCount - 1
      if (start < 1) {
        start = 1
        end =
          start + btnCount - 1 > pageCount ? pageCount : start + btnCount - 1
      }
      //   如果页码大于总页数需要重新计算
      if (end > pageCount) {
        end = pageCount
        start = end - btnCount + 1 < 1 ? 1 : end - btnCount + 1
      }
      //   处理完毕start和end得到按钮数据
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return { pageCount, start, end, btnArr }
    })
    const changePage = (newPage) => {
      if (myCurrentPage.value !== newPage) {
        myCurrentPage.value = newPage
        //   通知父组件最新页码
        console.log(newPage)
        emit('current-change', newPage)
      }
    }
    return { pager, myCurrentPage, changePage, myTotal }
  },
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>