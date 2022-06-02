// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread'
// import XtxBreadItem from './xtx-bread-item'
import defaultImg from '@/assets/images/200.png'

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('/', false, /\.vue/)
export default {
    install(app) {
        // 挂载全局插件
        // app.component(XtxSkeleton.name, XtxSkeleton)
        // app.component(XtxCarousel.name, XtxCarousel)
        // app.component(XtxMore.name, XtxMore)
        // app.component(XtxBread.name, XtxBread)
        // app.component(XtxBreadItem.name, XtxBreadItem)
        importFn.keys().forEach(key => {
            const component = importFn(key).default
            app.component(component.name, component)
        })
        defineDirective(app)
    }

}
// 定义指令
const defineDirective = (app) => {
    app.directive('lazy', {
        mounted(el, binding) {
            const observe = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) {
                    // 停止观察
                    observe.unobserve(el)
                    el.src = binding.value
                    el.onerror = () => {
                        el.src = defaultImg
                    }
                }
            }, { threshold: 0 })
            observe.observe(el)
        }
    })
}