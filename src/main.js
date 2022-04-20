import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置的样式库
import 'normalize.css'

import '@/assets/styles/common.less'

// 自己的公共样式

createApp(App).use(store).use(router).mount('#app')
