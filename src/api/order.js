import request from '@/utils/request'

/**
 * 结算页面生成订单
 * @returns
 */
export const createOrder = () => {
    return request('/member/order/pre', 'get')
}
/**
 * 添加收货地址
 * @param {Object} from 参考接口文档
 */
export const addAddress = (form) => {
    return request('/member/address', 'post', form)
}

/**
 * 修改收货地址
 * @param {Object} from 参考接口文档
 */
export const editAddress = (form) => {
    return request(`/member/address/${form.id}`, 'put', form)
}

/**
 * 结算页面-提交订单
 * @param {Object} from 参考接口文档
 * @returns
 */
export const submitOrder = (params) => {
    return request('/member/order', 'post', params)
}
export const findOrderDetail = (orderId) => {
    return request('/member/order/' + orderId, 'get')
}