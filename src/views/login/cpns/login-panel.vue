<template>
  <div class="login-panel">
    <!-- 登录面板标题 -->
    <h1 class="title">后台管理系统</h1>
    <!-- 登录主体面板 -->
    <el-tabs type="border-card" class="demo-tabs" :stretch="true">
      <!-- tab栏 -->
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>账号登录
          </span>
        </template>
        <!-- 账号密码登录面板内容 -->
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <!-- tab栏 -->
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><comment /></el-icon>手机登录
          </span>
        </template>
        <!-- 手机登录面板内容 -->
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <!-- 记住密码复选框和忘记密码 -->
    <div class="account-control">
      <el-checkbox v-model="isKeepCheckBox">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Avatar, Comment } from '@element-plus/icons-vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    Avatar,
    Comment,
    loginAccount,
    loginPhone
  },
  setup() {
    const isKeepCheckBox = ref(true)

    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const handleLoginClick = () => {
      accountRef.value?.handleAccountLogin()
    }
    return {
      isKeepCheckBox,
      accountRef,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
}
.title {
  text-align: center;
}
.account-control {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}
.login-btn {
  margin-top: 10px;
  width: 100%;
}
</style>
