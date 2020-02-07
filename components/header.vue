<template>
  <header class="header">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo  -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt="闲云" />
        </nuxt-link>
      </div>
      <!-- 菜单栏  -->
      <el-row type="flex" class="navs" align="middle">
        <nuxt-link to="/"  exact-active-class="active">首页</nuxt-link>
        <nuxt-link to="/post" exact-active-class="active">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel" exact-active-class="active">酒店</nuxt-link>
        <nuxt-link to="/air" exact-active-class="active">国内机票</nuxt-link>
      </el-row>
      <!-- 登录/用户信息  -->
      <el-row type="flex" align="middle">
        <!-- 消息 -->
        <el-dropdown class="message">
          <span class="el-dropdown-link">
            <i class="el-icon-bell"></i>
            消息
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 如果用户已登录，则显示 用户信息-->
        <el-dropdown v-if="loginStatu" class="account">
          <span class="el-dropdown-link">
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
            地球发动机
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 没有登录，则显示登录/注册 -->
        <nuxt-link to="/user/login" class="login-link" v-else>登录 / 注册</nuxt-link>
      </el-row>
    </el-row>
  </header>
</template>

<script>
export default {
  data() {
    return {
      loginStatu: true
    };
  }
};
</script>

<style lang="less">
// 激活时的样式
// a {
  .active {
    color: #fff!important;
    background-color: #409eff;
  }
  
// }

.main {
  margin: 0 auto;
  width: 1000px;
  height: 60px;
  // logo
  .logo {
    margin-right: 25px;
    padding-top: 8px;
    width: 156px;
    img {
      display: block;
      width: 100%;
    }
  }
  // 菜单栏
  .navs {
    flex: 1;
    font-size: 15px;
    a {
      display: block;
      padding: 0 20px;
      box-sizing: border-box;
      height: 60px;
      line-height: 60px;
      &:hover,
      &:focus,
      &:active {
        color: #409eff;
        border-bottom: 4px solid #409eff;
      }
    }
  }
  // 登录 / 个人信息
  .message {
    margin-right: 15px;
  }
  .account {
    margin-left: 20px;
    img {
      vertical-align: middle;
      border-radius: 50%;
      width: 32px;
      height: 32px;
    }
  }
  .login-link {
    font-size: 13px;
    color: red;
  }
}
</style>