import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const Login = () => import('@/views/login/index')
// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/', component: Home
      },
      { path: '/category/:id', component: TopCategory },
      {
        path: '/category/sub/:id', component: SubCategory,
      },
      {
        path: '/product/:id', component: Goods,
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  // 哈希值路由
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router
