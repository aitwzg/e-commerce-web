import XtxSkeleton from './xtx-skeleton.vue'

export default {
    install(app) {
        // 挂载全局插件
        app.component(XtxSkeleton.name, XtxSkeleton)
    }
}