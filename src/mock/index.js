import Mock from 'mockjs'
import qs from 'qs'

// 基本配置
Mock.setup({
    // 随机延迟 200-800毫秒
    timeout: '200-800'
})
// 拦截接口 /my/test
// 1.接口地址路径规则，需要匹配到它
// 2.请求方式
// 3.返回数据，（函数返回数据）
// Mock.mock(/\/member\/collect/, 'get', () => {
//     // 随机数据逻辑
//     const arr = []

//     for (let i = 0; i < 5; i++) {
//         arr.push(Mock.mock({
//             id: '@id',
//             name: '@cname',
//             image: '@image(200x100)' // Mock.Random.image('200x100')
//         }))
//     }
//     return { msg: '获取数据成功', result: arr }
// })

// 模拟我的收藏
Mock.mock(/\/member\/collect/, 'get', (config) => {
    // 随机数据逻辑
    const items = []
    console.log(config)
    const queryString = config.url.split('?')[1]
    const queryObject = qs.parse(queryString)
    console.log(queryObject)

    for (let i = 0; i < queryObject.pageSize; i++) {
        items.push(Mock.mock({
            id: '@id',
            name: '@ctitle(10,20)',
            desc: '@ctitle(4,20)',
            price: '@float(100,200,2,2)',
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg` // Mock.Random.image('200x100')
        }))
    }
    return {
        msg: '获取数据成功',
        result: { counts: 35, pageSize: +queryObject.pageSize, page: +queryObject.page, items }
    }
})
