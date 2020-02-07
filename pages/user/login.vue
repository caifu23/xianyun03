<template>
  <div class="login">
    <el-tabs type="border-card" class="login-tab" :stretch="true">
      <el-tab-pane label="登录">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm">
          <!-- 用户名/手机 输入框 -->
          <el-form-item prop="phone">
            <el-input v-model="loginForm.phone" autocomplete="off" placeholder="用户名/手机"></el-input>
          </el-form-item>
          <!-- 密码输入框 -->
          <el-form-item prop="pass">
            <el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="forgetPass"> <a href="#">忘记密码</a> </p>
            <el-button type="primary" @click="submitForm('loginForm')" class="loginBtn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册">注册页面</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
    data() {
      // 验证手机
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      // 验证密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          // if (this.loginForm.checkPass !== '') {
          //   this.$refs.loginForm.validateField('checkPass');
          // }
          callback();
        }
      };

      return {
        loginForm: {
          phone: '',
          pass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
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
  .el-tabs__content {
    padding: 25px;
  }
}
.el-form-item {
  &:last-child {
    margin-bottom: 0;
  }
}
.login {
  position: relative;
  width: 100%;
  height: 700px;
  background: url(http://157.122.54.189:9093/images/bar1.jpg) center 0;
  .loginBtn {
    margin-top: 15px;
    width: 100%;
  }
  .forgetPass {
    font-size: 12px;
    text-align: right;
    line-height: 1;
    color: #409eff;
  }

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