// 定义校验规则给vee-validate组件使用
import { userAccountCheck } from '@/api/user'
export default {
    // 校验account
    account(value) {
        // value 是将来使用该规则的表单元素的值
        // 1.必填
        // 2. 6-20个字符，需要以字母开头
        // 如何反馈校验成功还是失败
        if (!value) return '请输入用户名'
        if (!/\w{6,20}$/.test(value)) return '用户名是6-20个字符'
        return true
    },
    // qq绑定账号
    async accountApi(value) {
        if (!value) return '请输入用户名'
        if (!/\w{6,20}$/.test(value)) return '用户名是6-20个字符'
        // 服务器校验
        const data = await userAccountCheck(value)
        console.log(data)
        if (data.result.valid) return '用户名已存在'
        return true
    },
    // 密码校验
    password(value) {
        if (!value) return '请输入密码'
        if (!/^\w{6,20}$/.test(value)) return '密码是6-20个字符'
        return true
    },
    // 密码校验
    repassword(value, { form }) {
        if (!value) return '请输入密码'
        if (!/^\w{6,20}$/.test(value)) return '密码是6-20个字符'
        if (value !== form.password) return '两次密码应该保持一致'
        return true
    },
    // 手机号校验
    mobile(value) {
        if (!value) return '请输入手机号'
        if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
        return true
    },
    // 验证码校验
    code(value) {
        if (!value) return '请输入验证码'
        if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
        return true
    },
    isAgree(value) {
        if (!value) return '请勾选同意用户协议'
        return true
    }

}