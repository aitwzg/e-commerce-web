
<script>
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props, { emit }) {
    const activeName = useVModel(props, 'modelValue', emit)
    provide('activeName', activeName)
    const clickTab = (name, index) => {
      activeName.value = name
      console.log('成功')
      emit('click-tab', { name, index })
    }
    return { activeName, clickTab }
  },
  render() {
    // 获取插槽内容
    const panels = this.$slots.default()
    console.log(panels)
    // 动态panels组件集合
    const dynamicPanels = []
    panels.forEach((item) => {
      // 静态
      if (item.type.name === 'XtxTabsPanel') {
        dynamicPanels.push(item)
      } else {
        item.children.forEach((item) => {
          dynamicPanels.push(item)
        })
      }
    })
    console.log(dynamicPanels)
    // 需要在这里进行组织
    // 1.tabs组件大容器
    // 2.选项卡的导航菜单结构
    // 3.内容容器
    const nav = (
      <nav>
        {dynamicPanels.map((item, i) => {
          return (
            <a
              onClick={() => this.clickTab(item.props.name, i)}
              class={{ active: item.props.name === this.activeName }}
              href="javascript:;"
            >
              {item.props.label}
            </a>
          )
        })}
      </nav>
    )
    return <div class="xtx-tabs">{[nav, dynamicPanels]}</div>
  },
}
</script>

<style scoped lang='less'>
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