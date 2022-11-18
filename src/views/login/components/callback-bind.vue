<template>
  <Form
    :validation-schema="mySchema"
    v-slot="{ errors }"
    autocomplete="off"
    class="xtx-form"
    ref="formCom"
  >
    <div class="user-info">
      <img :src="avatar" />
      <p>Hi，{{ nickname }} 欢迎来网页严选，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          :class="{ err: errors.mobile }"
          name="mobile"
          class="input"
          type="text"
          v-model="form.mobile"
          placeholder="绑定的手机号"
        />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          :class="{ err: errors.code }"
          name="code"
          class="input"
          type="text"
          v-model="form.code"
          placeholder="短信验证码"
        />
        <span @click="send" class="code">{{
          time === 0 ? '发送验证码' : `${time}秒后发送`
        }}</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" @click="submit" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from 'qc'
import { onUnmounted, reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'CallbackBind',
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const nickname = ref('null')
    const avatar = ref('null')
    if (QC.Login.check()) {
      QC.api('get_user_info').success((res) => {
        console.log(res)
        nickname.value = res.data.nickname
        avatar.value = res.data.figureurl_1
      })
    }
    // 表单数据对象
    const form = reactive({
      mobile: null,
      code: null,
    })
    // 校验规则对象
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code,
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
          userQQBindCode(form.mobile).then((data) => {
            Message({ type: 'success', text: '发送成功' })
            time.value = 60
            resume()
          })
        }
      } else {
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
        userQQBindLogin({
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
              Message({ type: 'success', text: '绑定成功' })
            })
          })
          .catch((e) => {
            Message({ type: 'error', text: '绑定失败' })
          })
      }
    }
    return { nickname, avatar, form, mySchema, send, time, formCom, submit }
  },
}
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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