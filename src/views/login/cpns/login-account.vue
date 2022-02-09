<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="accountRules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/login-config'
import localCache from '@/utils/cache'

export default defineComponent({
  components: {},
  setup() {
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 真正的登录逻辑
    const handleAccountLogin = (isKeepCheckBox: boolean) => {
      // 实现真正的登录逻辑前需要做好表单验证
      formRef.value?.validate((valid) => {
        if (valid) {
          // 记住密码的逻辑
          if (isKeepCheckBox) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          }
          // 这里不成功
          else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
        } else {
          console.log('fail')
        }
      })
    }

    return {
      account,
      accountRules,
      handleAccountLogin,
      formRef
    }
  }
})
</script>

<style scoped lang="less"></style>
