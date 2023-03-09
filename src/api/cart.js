import request from '@/utils/request'

/**
 * 获取新的商品信息,和库存是否有效
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品的sku数据
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 * @param {Array<object>} cartList - 购物车信息列表
 * @param {String>} object.skuId - SKUID
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count - 数量
 * @returns Promise
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 获取购物车列表
 * @returns Promise
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入购物车
 * @param {String>} object.skuId - SKUID
 * @param {Integer} object.count - 数量
 * @returns Promise
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除购物车商品，支持批量
 * @param {Array<String>} ids - SKUID
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}
/**
 * 修改购物车商品（状态，数量）
 * @param {String>} object.skuId - SKUID
 * @param {Boolean} selected - 选中状态
 * @param {Integer} count - 数量
 * @returns
 */

export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

/**
 * 全选反选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - 有效商品skuId集合
 * @returns Promise
 */
export const checkAllCart = ({ selected, ids }) => {
  return request('member/cart/selected', 'put', { selected, ids })
}