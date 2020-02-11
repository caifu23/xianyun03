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
        <nuxt-link v-for="(item, index) in navsList" :to="item.links"  exact-active-class="active" :key="index"> {{ item.name }} </nuxt-link>
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
            <img :src="$axios.defaults.baseURL+userInfo.defaultAvatar" alt />
            {{ userInfo.nickname }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 链接 -->
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item >
              <div class="logout" @click="handlerLogout">退出</div>
            </el-dropdown-item>
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
      // 登录状态
      // loginStatu: true,
      // 菜单栏 数据
      navsList: [
        {
          name: '首页',
          links: '/'
        },
        {
          name: '旅游攻略',
          links: '/post'
        },
        {
          name: '酒店',
          links: '/hotel'
        },
        {
          name: '国内机票',
          links: '/air'
        }
      ],
      // 用户数据
      userInfo: {}
    };
  },
  methods: {
    // 退出登录
    handlerLogout() {
      // 删除登录信息,变更到store
      this.$store.commit('user/setUserInfo', {})
      // this.$store.commit('user/cleanUserInfo')

      this.$message.success('退出成功')
    }
  },
  computed: {
    // 登录状态
    loginStatu() {
      if(this.$store.state.user.userInfo.token) {
        this.userInfo = this.$store.state.user.userInfo.user
        return true
      }else {
        return false
      }
      // return this.$store.state.user.userInfo.token 
    }
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
.header {
  box-shadow: 1px 1px 1px #ccc;
}

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
    &:hover {
      color: #409eff;
      text-decoration: underline; 
    }
  }
}
</style>