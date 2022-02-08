<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch="true">
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>账号登录
          </span>
        </template>

        <login-account></login-account>
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><comment /></el-icon>手机登录
          </span>
        </template>

        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    return {}
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
</style>
