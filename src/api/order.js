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

/**
 * 结算页面-提交订单
 * @param {Sting} orderId 订单ID
 * @returns
 */
export const findOrderDetail = (orderId) => {
    return request('/member/order/' + orderId, 'get')
}

/**
 * 结算页面-提交订单
 * @param {Sting} page 页码
 * @param {Sting} pageSize 每页条数
 * @param {Sting} orderState 订单状态 1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @returns
 */

export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
    return request('/member/order', 'get', { page, pageSize, orderState })
}

/**
 * 取消订单
 * @param {Sting} orderId 订单ID
 * @param {Sting} cancelReason 取消原因
 * @returns
 */
export const cancelOrder = ({ orderId, cancelReason }) => {
    return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

/**
 * 删除订单
 * @param {Sting} orderId 订单ID
 * @returns
 */
export const deleteOrder = (orderId) => {
    return request('/member/order', 'delete', { ids: orderId })
}

/**
 * 确认收货
 * @param {Sting} orderId 订单ID
 * @returns
 */

export const confirmOrder = (orderId) => {
    return request(`/member/order/${orderId}/receipt`, 'put')
}

/**
 * 查询物流
 * @param {Sting} orderId 订单ID
 * @returns
 */
export const logisticsOrder = (orderId) => {
    return request(`/member/order/${orderId}/logistics`, 'get')
}