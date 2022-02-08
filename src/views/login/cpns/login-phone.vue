<template>
  <div class="login-phone">
    <el-form label-width="60px" :rules="phoneRules" :model="phoneLogin">
      <el-form-item label="手机" prop="phoneNum">
        <el-input v-model="phoneLogin.phoneNum" />
      </el-form-item>

      <el-form-item label="验证" prop="verifyCode">
        <div class="get-verify-code">
          <el-input v-model="phoneLogin.verifyCode" />
          <el-button class="get-verify-code-button" type="primary"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { phoneRules } from '../config/login-config'

export default defineComponent({
  components: {},
  setup() {
    const phoneLogin = reactive({
      phoneNum: '',
      verifyCode: ''
    })
    return {
      phoneLogin,
      phoneRules
    }
  }
})
</script>

<style scoped lang="less">
.get-verify-code {
  display: flex;
}
.get-verify-code-button {
  margin-left: 8px;
}
</style>
