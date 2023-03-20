import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category/index')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods/index')
const Cart = () => import('@/views/cart/index')
const Login = () => import('@/views/login/index')
const LoginCallback = () => import('@/views/login/callback')
const Checkout = () => import('@/views/member/pay/checkout')
const Pay = () => import('@/views/member/pay/index')
const PayResult = () => import('@/views/member/pay/result')
const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')
const MemberOrder = () => import('@/views/member/order')
const MemberOrderDetail = () => import('@/views/member/order/detail')
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
      },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout },
      { path: '/member/pay', component: Pay },
      { path: '/pay/callback', component: PayResult },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: 'home', component: MemberHome },
          {
            path: 'order',
            component: { render: () => h(RouterView) },
            children: [{ path: ':id', component: MemberOrderDetail },
            { path: '', component: MemberOrder }]
          }
        ]
      },

    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/login/callback',
    component: LoginCallback
  },
]

const router = createRouter({
  // 哈希值路由
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候回到顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由都是由member开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
