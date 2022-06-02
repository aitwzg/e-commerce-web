// 导入分类模块
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
    namespaced: true,
    state() {
        return {
            // 分类信息 依赖topCategory 重新设置
            list: topCategory.map(item => ({ name: item }))
        }
    },
    mutations: {
        setList(state, payload) {
            state.list = payload
        },
        show(state, id) {
            // 找到操作id对应的元素
            const currCategory = state.list.find(item => item.id === id)
            // console.log(currCategory)
            currCategory.open = true
        },
        hide(state, id) {
            // 找到操作id对应的元素
            const currCategory = state.list.find(item => item.id === id)
            currCategory.open = false
        }
    },
    // 获取分类函数
    actions: {
        async getList(context) {
            // 获取分类数据
            const data = await findAllCategory()
            // console.log(data)
            data.result.forEach(top => {
                top.open = false
            })
            // console.log(data)

            // 添加数据
            context.commit('setList', data.result)
        }
    }
}