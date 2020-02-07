<template>
  <el-form :model="loginForm" :rules="rules" ref="loginForm">
    <!-- 用户名/手机 输入框 -->
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" autocomplete="off" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <!-- 密码输入框 -->
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <p class="forgetPass">
        <a href="#">忘记密码</a>
      </p>
      <el-button type="primary" @click="submitForm('loginForm')" class="loginBtn">登录</el-button>
    </el-form-item>
  </el-form>
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
          callback();
        }
      };

      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
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

<style lang="less">
/deep/ .el-tabs--border-card {
  .el-tabs__content {
    padding: 22px;
  }
  .el-form-item {
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.loginBtn {
  margin-top: 12px;
  width: 100%;
}
.forgetPass {
  font-size: 12px;
  text-align: right;
  line-height: 1;
  color: #409eff;
}
</style>