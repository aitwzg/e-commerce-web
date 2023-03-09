<template>
  <XtxDialog
    :title="`${formData.id ? '修改' : '添加'}收货地址`"
    v-model:visible="visibleDialog"
  >
    <!-- 表单 -->
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity
              :fullLocation="formData.fullLocation"
              @change="changeCity"
              placeholder="请选择所在地区"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <template #footer>
      <XtxButton
        @click="visibleDialog = false"
        type="gray"
        style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="submit()" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref, reactive } from 'vue'
import Message from '@/components/library/Message'
import { addAddress, editAddress } from '@/api/order'
export default {
  name: 'AddressEdit',
  setup(props, { emit }) {
    const visibleDialog = ref(false)
    // 打开对话框函数
    const open = (address) => {
      visibleDialog.value = true
      //   如果修改填充表单
      if (address.id) {
        for (const key in address) {
          formData[key] = address[key]
        }
      } else {
        //   如果添加
        for (const key in formData) {
          if (key === 'isDefault') {
            formData[key] = 1
          } else {
            formData[key] = null
          }
          formData[key] = null
        }
      }
    }
    // 表单数据
    const formData = reactive({
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 1,
      //   完整行政区
      fullLocation: '',
    })
    // 城市选中
    const changeCity = (result) => {
      formData.provinceCode = result.provinceCode
      formData.cityCode = result.cityCode
      formData.countyCode = result.countyCode
      formData.fullLocation = result.fullLocation
    }
    // 添加时修改
    const submit = () => {
      // 省略校验
      // 发送请求
      //   console.log('发送请求')
      if (formData.id) {
        // 修改请求

        editAddress(formData).then((data) => {
          console.log(data)
          // 提示
          Message({ type: 'success', text: '添加收货地址成功' })
          // 关闭
          visibleDialog.value = false
          // 需要给结算组件地址列表中加一条
          emit('on-success', formData)
        })
      } else {
        addAddress(formData).then((data) => {
          // 需要设置id
          formData.id = data.result.id
          // 提示
          Message({ type: 'success', text: '添加收货地址成功' })
          // 关闭
          visibleDialog.value = false
          // 需要给结算组件地址列表中加一条
          emit('on-success', formData)
        })
      }
    }
    return { visibleDialog, open, formData, changeCity, submit }
  },
}
</script>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>