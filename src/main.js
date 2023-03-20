import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// UI组件库
import UI from '@/components/library'
// 重置的样式库
import 'normalize.css'

import '@/assets/styles/common.less'
// mockjs
import '@/mock'

// 自己的公共样式
// 全局使用
createApp(App).use(store).use(router).use(UI).mount('#app')
