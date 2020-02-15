<template>
  <div class="orderForm">
    <el-form ref="orderForm" :model="orderForm">
      <!-- 乘机 -->
      <div class="air-man">
        <h3>乘机人</h3>
        <div v-for="(item, index) in orderForm.users" :key="index" class="air-add">
          <!-- 乘机人 -->
          <el-form-item>
            <p>乘机人类型</p>
            <el-input placeholder="姓名" v-model="item.username">
              <el-select v-model="select" slot="prepend" placeholder="成人">
                <el-option label="成人" value="1" class="airman-input"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 证件号码 -->
          <el-form-item>
            <p>证件类型</p>
            <el-input placeholder="证件号码" v-model="item.id">
              <el-select v-model="select2" slot="prepend" placeholder="身份证">
                <el-option label="身份证" value="11" class="airman-input"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <span class="del-airman" @click="delAir(index)" v-if="index!==0">-</span>
        </div>
        <!-- 添加乘机人 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="addAirman">添加乘机人</el-button>
        </el-form-item>
      </div>
      <!-- 保险 -->
      <div class="air-insurance">
        <h3>保险</h3>
        <el-form-item>
          <el-checkbox-group v-model="orderForm.insurances">
            <el-checkbox label="1" border>航空意外险：￥30/份×1 最高赔付260万</el-checkbox>
            <el-checkbox label="2" border>航空延误险：￥30/份×1 最高赔付300元</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <!-- 联系人 -->
      <div class="air-contact">
        <h3>联系人</h3>
        <el-form-item label="姓名">
          <el-input v-model="orderForm.contactName" class="contact-input"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="orderForm.contactPhone" class="contact-input">
            <el-button slot="append">发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="orderForm.captcha" class="contact-input"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="submit">
      <el-button type="primary" @click="submitFilght">提交订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderForm: {
        users: [
          {
            username: "",
            id: ""
          }
        ],
        insurances: [],
        contactName: "",
        contactPhone: "",
        captcha: ""
      },
      select: "",
      select2: "",
      rules: {
        //   验证用户
        users: {
          message: "乘机人信息不能为空！",
          validator() {
            let validFlag = true;
            this.orderForm.users.forEach(val => {
              if (!val.username || !val.id) {
                validFlag = false;
                return;
              }
            });
            if (!validFlag) {
            }
            return validFlag;
          }
        },
        contactName: {
          message: "联系人不能为空！",
          validator() {
            return !!this.orderForm.contactName;
          }
        },
        contactPhone: {
          message: "手机号不能为空！",
          validator() {
            return !!this.orderForm.contactPhone;
          }
        },
        captcha: {
          message: "验证码不能为空！",
          validator() {
            return !!this.orderForm.captcha;
          }
        }
      }
    };
  },
  methods: {
    //   添加乘机人
    addAirman() {
      this.orderForm.users.push({});
    },
    // 提交订单
    submitFilght() {
      console.log(this.orderForm);
      //   验证表单数据
      this.validForm();
    },
    // 删除乘机人
    delAir(index) {
      this.orderForm.users.splice(index, 1);
    },
    // 非空验证
    validForm() {
      let flag = true;
      Object.keys(this.rules).forEach(val => {
        if (!flag) {
          return;
        }
        // 为空时
        if (!this.rules[val].validator.call(this)) {
          this.$message.error(this.rules[val].message);
          flag = false;
          return;
        }
      });
      if (flag) {
        console.log("提交订单");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.orderForm {
  p {
    line-height: 32px;
  }
  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: normal;
  }
  form > div:not(:last-of-type) {
    margin-bottom: 25px;
    border-bottom: 1px solid #eee;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .air-man {
    .el-select /deep/input.el-input__inner {
      width: 100px;
    }
    /deep/.el-input-group__prepend {
      background-color: #fff;
    }
    button {
      margin-top: 30px;
      margin-bottom: 15px;
    }
    .air-add {
      position: relative;
      .del-airman {
        position: absolute;
        top: 50%;
        right: -30px;
        display: block;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        font-size: 18px;
        text-align: center;
        line-height: 15px;
        color: #fff;
        background-color: #ccc;
        cursor: pointer;
        &:hover {
          background-color: gray;
        }
      }
    }
  }
  .air-insurance {
    /deep/.el-checkbox.is-bordered + .el-checkbox.is-bordered {
      margin: 15px auto 25px 0;
    }
  }
  .air-contact {
    /deep/.el-form-item__label {
      width: 70px;
    }
    .contact-input {
      width: 280px;
    }
  }
  .submit {
    margin: 30px auto 70px;
    text-align: center;
    button {
      width: 50%;
      border-color: transparent;
      background-color: #e6a23c;
    }
  }
}
</style>