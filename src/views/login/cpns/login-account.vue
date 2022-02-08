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
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/login-config'

export default defineComponent({
  components: {},
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const handleAccountLogin = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('真正的登录逻辑')
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
