<template>
  <div class="order container">
      <el-row>
          <!-- 订单-表单 -->
          <el-col :span="15">
            <OrderForm :infoData="infoData" />
          </el-col>
          <!-- 侧边栏 订单结算 -->
          <el-col :span="9">
              <OrderAside />
          </el-col>
      </el-row>
   
    
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    data () {
        return {
            infoData: {}
        }
    },
    components: {
        OrderForm,
        OrderAside
    },
    mounted () {
        // 获取订单数据
        this.getOrder()
    },
    methods: {
        // 请求订单数据
        getOrder() {
            let { query } = this.$route
            this.$axios({
                url: `/airs/${query.id}`,
                params: {
                    seat_xid: query.seat_xid
                }
            }).then(res => {
                // console.log(res)
                let { data } = res
                if(data.id) {
                    this.infoData = data
                    // 存储订单数据
                    this.$store.commit('air/setInfoData', data)
                }
            })
        }
    }
};
</script>

<style lnag="less" scoped>
.container {
  margin: 0 auto;
  width: 1000px;
}
.order {
  margin-top: 15px;
}
</style>