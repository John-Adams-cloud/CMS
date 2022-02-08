<template>
  <div class="login-phone">
    <el-from label-width="60px">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>

      <el-form-item label="验证码">
        <el-input />
      </el-form-item>
    </el-from>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
