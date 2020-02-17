<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{ orderDetail.price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      // orderDetail: {}
      timer: 0 //定时器id
    };
  },
  computed: {
    orderDetail() {
      return this.$store.state.air.orderDetail || {};
    }
  },
  methods: {
    // toCanvas(canvas, text, [options], [cb(error)])
    // 付款链接 生成二维码
    toCavans() {
      let canvas = document.getElementById("qrcode-stage");
      QRCode.toCanvas(canvas, this.orderDetail.payInfo.code_url, {
        width: 200
      });
    },
    // 查询是否支付
    async isPay() {
      let id = this.orderDetail.id;
      let nonce_str = this.orderDetail.payInfo.nonce_str;
      let out_trade_no = this.orderDetail.payInfo.order_no;
      return this.$axios({
        method: "POST",
        url: "/airorders/checkpay",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: {
          id,
          nonce_str,
          out_trade_no
        }
      });
    }
  },
  mounted() {
    // 确保页面加载完毕后，可以拿到数据
    setTimeout(() => {
      //   生成付款二维码
      this.toCavans();
      //   轮询是否付款
      this.timer = setInterval(() => {
        this.isPay().then(res => {
          console.log(res);
          if (res.data.statusTxt === "支付完成") {
            // 支付成功，则不用继续查询订单状态，清除定时器
            clearInterval(this.timer);
            // 给用户提示
            this.$confirm("订单支付成功", "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "success"
            });
          }
        });
      }, 3000);
    }, 0);
  },
  destroyed () {
      clearInterval(this.timer)
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    height: 700px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>