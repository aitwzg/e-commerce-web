import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 其他地方不用axios需要用基准地址
// export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
const instance = axios.create({
    baseURL,
    timeout: 5000
})

instance.interceptors.request.use(config => {
    // config 是默认参数
    // 解构写法
    const { profile } = store.state.user
    // 判断是否有token
    if (profile.token) {
        // 设置token
        config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
}, err => {
    return Promise.reject(err)
})
// 剥离无效数据
// 处理token失效
instance.interceptors.response.use(res => res.data, err => {
    if (err.response && err.response.status === 401) {
        // 跳转需要传参当前登录信息
        // 清空无效信息
        store.commit('user/setUser', {})
        // 跳转登录信息 $route.path === /user $route.fullPath ===/user?a=10
        // router.currentRoute 是响应式ref数据要加value,router.currentRoute.value.fullPath
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
})

export default (url, method, submitData) => {
    return instance({
        url,
        method,
        // 判断是否是get请求
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}