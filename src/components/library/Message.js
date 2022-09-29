import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// 创建容器

const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

// 定时器标识
let timer = null
export default ({ type, text }) => {
    // 渲染组件
    // 创建虚拟节点
    const vnode = createVNode(XtxMessage, { type, text })

    render(vnode, div)

    clearTimeout(timer)
    timer = setTimeout(() => {
        render(null, div)
    }, 3000)
}