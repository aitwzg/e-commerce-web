<template>
  <Form
    :validation-schema="mySchema"
    class="xtx-form"
    autocomplete="off"
    v-slot="{ errors }"
    ref="formCom"
  >
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          :class="{ err: errors.account }"
          v-model="form.account"
          name="account"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div v-if="errors.account" class="error">
        <i class="iconfont icon-warning" />{{ errors.account }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          v-model="form.mobile"
          :class="{ err: errors.mobile }"
          name="mobile"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div v-if="errors.mobile" class="error">
        <i class="iconfont icon-warning" />{{ errors.mobile }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          :class="{ err: errors.code }"
          v-model="form.code"
          name="code"
          class="input"
          type="text"
          placeholder="请输入验证码"
        />
        <span @click="send" class="code">{{
          time === 0 ? '发送验证码' : `${time}秒后发送`
        }}</span>
      </div>
      <div v-if="errors.code" class="error">
        <i class="iconfont icon-warning" />{{ errors.code }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          :class="{ err: errors.password }"
          v-model="form.password"
          name="password"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div v-if="errors.password" class="error">
        <i class="iconfont icon-warning" />{{ errors.password }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          :class="{ err: errors.rePassword }"
          v-model="form.rePassword"
          name="rePassword"
          class="input"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div v-if="errors.rePassword" class="error">
        <i class="iconfont icon-warning" />{{ errors.rePassword }}
      </div>
    </div>
    <a @click="submit" href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import Message from '@/components/library/Message'

export default {
  name: 'CallbackPatch',
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // 表单校验 用户名是否存在，再次输入密码是否一致
    // 表单数据对象
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null,
    })
    // 表单校验规则
    const mySchema = {
      account: schema.accountApi,
      mobile: schema.mobile,
      code: schema.code,
      password: schema.password,
      rePassword: schema.repassword,
    }

    // 发送短信验证码
    const time = ref(0)
    const formCom = ref(null)
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--
        console.log(time.value)
        if (time.value <= 0) {
          pause()
        }
      },
      1000,
      { immediate: false }
    )
    onUnmounted(() => {
      pause()
    })

    const send = () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        if (time.value === 0) {
          console.log(form.mobile)
          userQQPatchCode(form.mobile)
            .then((data) => {
              Message({ type: 'success', text: '发送成功' })
              time.value = 60
              resume()
            })
            .catch((e) => {
              Message({ type: 'error', text: '用户已存在' })
            })
        }
      } else {
        // 在mobile的输入框后显示mobile的错误信息valid
        formCom.value.setFieldError('mobile', valid)
        console.log('b')
      }
    }

    // 立即绑定
    const store = useStore()
    const router = useRouter()
    const submit = () => {
      const valid = formCom.value.validate()
      if (valid) {
        userQQPatchLogin({
          unionId: props.unionId,
          ...form,
        })
          .then((data) => {
            const { id, account, avatar, mobile, nickname, token } = data.result
            store.commit('user/setUser', {
              id,
              account,
              avatar,
              mobile,
              nickname,
              token,
            })
            store.dispatch('cart/mergeCart').then(() => {
              router.push(store.state.user.redirectUrl || '/')
              Message({ type: 'success', text: 'QQ信息完善成功' })
            })
          })
          .catch((e) => {
            Message({ type: 'error', text: '信息完善成功' })
          })
      }
    }
    return { form, mySchema, send, time, formCom, submit }
  },
}
</script>

<style scoped lang='less'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
