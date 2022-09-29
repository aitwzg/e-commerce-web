import { createVNode, render } from 'vue'

import XtxConfirm from './xtx-confirm.vue'

// 1. 导入被创建的组件

// 2. 准备一个都没容器装载组件
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

export default ({ title, text }) => {
    // 4. 使用render函数渲染组件到容器
    return new Promise((resolve, reject) => {
        const submitCallback = () => {
            render(null, div)
            resolve()
        }

        const cancelCallback = () => {
            render(null, div)
            reject(new Error('点击取消'))
        }
        // 3. 使用createVNode 创建虚拟节点
        const vnode = createVNode(XtxConfirm, { title, text, submitCallback, cancelCallback })
        render(vnode, div)
    })
}