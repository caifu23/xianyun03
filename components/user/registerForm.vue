<template>
  <el-form :model="registerForm" :rules="rules" ref="registerForm">
    <!-- 用户名/手机 输入框 -->
    <el-form-item prop="username">
      <el-input
        v-model.trim="registerForm.username"
        autocomplete="off"
        placeholder="用户名/手机"
        ref="phone"
      ></el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item prop="captcha">
      <el-input placeholder="验证码" v-model.trim="registerForm.captcha" class="input-with-select" ref="captcha">
        <el-button slot="append" @click="sendCaptcha">发送验证码</el-button>
      </el-input>
    </el-form-item>
    <!-- 昵称 -->
    <el-form-item prop="nickname">
      <el-input v-model.trim="registerForm.nickname" autocomplete="off" placeholder="你的名字"></el-input>
    </el-form-item>
    <!-- 密码输入框 -->
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model.trim="registerForm.password"
        autocomplete="off"
        placeholder="密码"
      ></el-input>
    </el-form-item>
    <!-- 确认密码框 -->
    <el-form-item prop="checkPass">
      <el-input
        type="password"
        v-model.trim="registerForm.checkPass"
        autocomplete="off"
        placeholder="确认密码"
      ></el-input>
    </el-form-item>
    <!-- 注册按钮 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm('registerForm')" class="registerBtn">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    // 验证手机
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    // 验证昵称
    var validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 验证 确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证  验证码
    var validateCaptcha = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        username: "", // 用户名
        password: "", // 密码
        captcha: "", // 验证码
        nickname: "", // 昵称
        checkPass: "" // 确认密码
      },
      rules: {
        username: [{ validator: validatePhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }],
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击登录按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击发送 验证码按钮
    sendCaptcha() {
      // 非空验证 手机号
      let phone = this.registerForm.username;
      if (phone) {
        // 手机号 合法性
        if (!/^1[35789]\d{9}$/.test(phone)) {
          this.$alert("手机号码格式错误", "提示", {
            type: "error",
            confirmButtonText: "确定",
            callback: action => {
              // 聚焦手机号输入框
              this.$refs.phone.focus();
            }
          })
          return;
        }
        // 发起验证码
        this.sendCode()
      } else {
        this.$alert("手机号码不能为空", "提示", {
          type: "error",
          confirmButtonText: "确定",
          callback: action => {
            // 让手机号输入框失焦
            this.$refs.phone.focus();
            this.$refs.phone.blur();
          }
        });
      }
    },
    // 发送验证码
    sendCode() {
      this.$axios({
        method: 'POST',
        url: '/captchas',
        data: {
          tel: this.registerForm.username
        }
      }).then(({ data }) => {
        console.log(data)
        if(data.isValid === 1) {
          this.$alert(`模拟手机验证码为：${data.code}`, "提示", {
            type: "success",
            confirmButtonText: "确定",
            callback: action => {
              // 聚焦验证码输入框
              this.$refs.captcha.focus();
            }
          })
        }
      })
    }
  }
};
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

.registerBtn {
  margin-top: 12px;
  width: 100%;
}
</style>
