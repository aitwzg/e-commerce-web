import { getNewCartGoods } from '@/api/cart'

export default {
    namespaced: true,
    state() {
        return {
            // 购物车商品列表
            list: []
        }
    },
    getters: {
        // 有效商品列表
        validList(state) {
            return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
        },
        // 有效商品总件数
        validTotal(state, getters) {
            return getters.validList.reduce((p, c) => p + c.count, 0)
        },
        // 有效商品总金额
        validAmount(state, getters) {
            return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100 * c.count / 100), 0)
        },
        // 无效商品列表
        invalidList(state) {
            return state.list.filter(goods => !(goods.stock > 0 && goods.isEffective))
        },
        // 选中商品列表
        selectedList(state, getters) {
            return getters.validList.filter(goods => goods.selected)
        },
        // 选中商品数
        selectedTotal(state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.count, 0)
        },
        // 选中商品总金额
        selectedAmount(state, getters) {
            return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100 * c.count) / 100, 0)
        },
        // 是否全选
        isCheckAll(state, getters) {
            return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
        }
    },
    mutations: {
        // 加入购物车
        insertCart(state, payload) {
            // 约定加入购物车字段必须和后端保持一致
            // 包括 id skuId name attrsText picture price nowPrice selected stock count isEffective
            // 先找是否有相同商品
            // 如果有相同的商品查询它的数量累加到payload上，再保持最新位置，原来商品需要删除
            // 如果没有相同商品保存在最新位置即可
            const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
            if (sameIndex > -1) {
                const count = state.list[sameIndex].count
                payload.count += count
                // 删除原来
                state.list.splice(sameIndex, 1)
            }
            // 追加新的
            state.list.unshift(payload)
        },
        // 修改购物车商品
        updateCart(state, goods) {
            // goods中字段有可能不完整，goods有的信息才去修改。
            // 1. goods中必需又skuId，才能找到对应的商品信息
            console.log(goods)
            const updateGoods = state.list.find(item => item.skuId === goods.skuId)
            console.log(updateGoods)
            for (const key in goods) {
                if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
                    updateGoods[key] = goods[key]
                }
            }
        },
        // 删除购物车商品
        deleteCart(state, skuId) {
            const index = state.list.findIndex(item => item.skuId === skuId)
            state.list.splice(index, 1)
        }
    },
    actions: {
        insertCart(ctx, payload) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    // 已登录
                } else {
                    // 未登录
                    ctx.commit('insertCart', payload)
                    resolve()
                }
            })
        },
        // 获取购物车列表
        findCartList(ctx) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    // 登录 TODO
                } else {
                    // 本地
                    // Promise.all() 可以并列发送多个请求，等所有请求成功，调用then
                    // Promise.race() 可以并列发送多个请求，等最快的请求成功，调用then
                    // 传参事promise数组
                    console.log('执行更新')
                    const promiseArr = ctx.state.list.map(item => {
                        // 返回接口函数的调用
                        return getNewCartGoods(item.skuId)
                    })
                    Promise.all(promiseArr).then(dataArr => {
                        // console.log(dataArr)
                        dataArr.forEach((data, i) => {
                            ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
                        })
                        resolve()
                    }).catch(e => {
                        reject(e)
                    })
                }
            })
        },
        // 全选与取消全选
        checkAllCart(ctx, selected) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    // 登录 TODO
                } else {
                    ctx.getters.validList.forEach(goods => {
                        ctx.commit('updateCart', { skuId: goods.skuId, selected })
                    })
                    resolve()
                }
            })
        },
        // 修改购物车商品
        updateCart(ctx, goods) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    // 登录 TODO
                } else {
                    ctx.commit('updateCart', goods)
                    resolve()
                }
            })
        },
        // 删除购物车
        deleteCart(ctx, skuId) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    // 登录 TODO
                } else {
                    ctx.commit('deleteCart', skuId)
                    resolve()
                }
            })
        }
    }
}
