<template>
  <div class="order container">
      <el-row>
          <!-- 订单-表单 -->
          <el-col :span="15">
            <OrderForm />
          </el-col>
          <!-- 侧边栏 订单结算 -->
          <el-col :span="9"></el-col>
      </el-row>
   
    
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
export default {
    components: {
        OrderForm
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