<template>
  <div class="orderAside">
    <!-- 机票起始地信息 -->
    <div class="ordAside-head">
      <el-row type="flex" justify="space-between">
        <el-col class="ord-left">2019-04-15</el-col>
        <el-col class="ord-right">广州 - 上海</el-col>
      </el-row>
      <el-row type="flex" class="ordHead-time">
        <el-col class="ord-left">
          <em>20:30</em>
          <span>白云机场T1</span>
        </el-col>
        <el-col style="text-align: center">
          <span style="display: block">---2时20分---</span>
          <span>东航MU5316</span>
        </el-col>
        <el-col class="ord-right">
          <em>22:30</em>
          <span>浦东机场T1</span>
        </el-col>
      </el-row>
    </div>
    <!-- 机票各项价格 -->
    <el-row type="flex" justify="space-between" class="ord-price">
      <el-col class="ord-left">订单总价</el-col>
      <el-col style="text-align: center">金额</el-col>
      <el-col class="ord-right">数量</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="ord-price">
      <el-col class="ord-left">成人机票</el-col>
      <el-col style="text-align: center">￥1620</el-col>
      <el-col class="ord-right"> X1</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="ord-price">
      <el-col class="ord-left">机建 + 燃油</el-col>
      <el-col style="text-align: center">￥50/人/单程</el-col>
      <el-col class="ord-right">X1</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="ord-price" align="middle">
      <el-col class="ord-left">应付总额</el-col>
      <el-col class="ord-right total">￥3400</el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.orderAside {
  font-size: 16px;
  color: #666;
  border: 1px solid #ccc;
  padding: 15px 15px 0;
  .ord-left {
    text-align: left;
  }
  .ord-right {
    text-align: right;
  }
  .ordAside-head {
    .ordHead-time {
      padding: 15px 0;
      border-bottom: 1px dashed #ccc;
      em {
        display: block;
        font-size: 20px;
        color: #000;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .ord-price {
      font-size: 14px;
      &:not(:last-of-type) {
        border-bottom: 1px dashed #ccc;
        padding: 10px 0;
      }
      &:last-of-type {
        padding: 15px 0;
      }
      .total {
          font-size: 32px;
          color: orange;
      }
  }
}
</style>