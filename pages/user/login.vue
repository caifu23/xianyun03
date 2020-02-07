<template>
  <div class="login">
    <el-tabs type="border-card" class="login-tab" :stretch="true">
      <el-tab-pane label="登录">
        <!-- 登录表单 -->
        <Loginform></Loginform>
      </el-tab-pane>
      <el-tab-pane label="注册">注册页面</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Loginform from '@/components/user/loginForm'
export default {
    components: {
      Loginform,
    }
  }
</script>

<style lang="less" scoped>
/deep/ .el-tabs--border-card {
  & > .el-tabs__header {
    background-color: #eeeeee;

    .el-tabs__item {
      height: 50px;
      color: #666;
      &.is-active {
        border-top: 2px solid #ffa500;
        font-weight: bold;
        color: #ffa500;
      }
    }
  }
}
.login {
  position: relative;
  width: 100%;
  height: 700px;
  background: url(http://157.122.54.189:9093/images/bar1.jpg) center 0;

  .login-tab {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: #fff;
  }
}
</style>