// 用户相关的接口

import request from '@/utils/request'

/**
 * 账号密码登录
 * @param {string} account -手机号或账号
 * @param {string} password - 密码
 * @return Promise
*/

export const userAccountLogin = ({ account, password }) => {
    return request('/login', 'post', { account, password })
}

/**
 * @param {string} mobile -手机号
 * @return Promise
*/

export const userMobileLoginMsg = (mobile) => {
    return request('/login/code', 'get', { mobile })
}

/**
 * 手机验证码登录
 * @param {string} mobile -手机号
 * @param {string} code - 短信验证码，默认123456
 * @return Promise
*/

export const userMobileLogin = ({ mobile, code }) => {
    return request('/login/code', 'post', { mobile, code })
}

/**
 * QQ登录
 * @param {string} unionId -QQ唯一标识openId
 * @param {string} source - 客户端类型 1 是 PC
 * @return Promise
*/

export const userQQLogin = (unionId, source = 1) => {
    return request('/login/social', 'post', { unionId, source })
}

/**
 * QQ绑定的手机验证码
 * @param {string} mobile -手机号
 * @return Promise
*/

export const userQQBindCode = (mobile) => {
    return request('/login/social/code', 'get', { mobile })
}

/**
 * QQ登录-绑定账号
 * @param {string} unionId -QQ唯一标识openId
 * @param {string} mobile - 手机号
 * @param {string} code - 验证码
 * @return Promise
*/

export const userQQBindLogin = ({ unionId, mobile, code }) => {
    return request('/login/social/bind', 'post', { unionId, mobile, code })
}

/**
 * 账号密码登录
 * @param {string} account -手机
 * @return Promise
*/
export const userAccountCheck = (account) => {
    return request('/register/check', 'get', { account })
}

/**
 * QQ注册账号绑定的手机验证码
 * @param {string} mobile -手机号
 * @return Promise
*/

export const userQQPatchCode = (mobile) => {
    return request('/register/code', 'get', { mobile })
}

/**
 * QQ登录-完善信息
 * @param {string} unionId -QQ唯一标识openId
 * @param {string} mobile - 手机号
 * @param {string} code - 验证码
 * @param {string} account - 账号
 * @param {string} password - 密码
 * @return Promise
*/

export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
    return request(`/login/social/${unionId}/complement`, 'post', { unionId, mobile, code, account, password })
}