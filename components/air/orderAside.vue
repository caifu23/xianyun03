<template>
  <div class="orderAside">
    <!-- 机票起始地信息 -->
    <div class="ordAside-head">
      <el-row type="flex" justify="space-between">
        <el-col class="ord-left">{{infoData.dep_date}}</el-col>
        <el-col class="ord-right">{{infoData.org_city_name}} - {{infoData.dst_city_name}}</el-col>
      </el-row>
      <el-row type="flex" class="ordHead-time">
        <el-col class="ord-left">
          <em>{{infoData.dep_time}}</em>
          <span>{{infoData.org_airport_name+infoData.org_airport_quay}}</span>
        </el-col>
        <el-col style="text-align: center">
          <span style="display: block">--- {{intervalTime}} ---</span>
          <span>{{infoData.airline_name+infoData.flight_no}}</span>
        </el-col>
        <el-col class="ord-right">
          <em>{{infoData.arr_time}}</em>
          <span>{{infoData.dst_airport_name+infoData.dst_airport_quay}}</span>
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
      <el-col style="text-align: center">￥{{infoData.base_price}}</el-col>
      <el-col class="ord-right">x1</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="ord-price">
      <el-col class="ord-left">机建 + 燃油</el-col>
      <el-col style="text-align: center">￥{{infoData.airport_tax_audlet}} /人/单程</el-col>
      <el-col class="ord-right">x1</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="ord-price" align="middle">
      <el-col class="ord-left">应付总额</el-col>
      <el-col class="ord-right total">￥--</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    infoData() {
      return this.$store.state.air.infoData;
    },
    // 飞机时长
    intervalTime() {
      // 达到时间 出发时间
      const arr_time = new Date(this.infoData.arr_datetime).getTime();
      const dep_time = new Date(this.infoData.dep_datetime).getTime();
      // 时间间隔(毫秒)
      let interval = arr_time - dep_time;
      if (interval < 0) {
        // 此处原本不需要,不会出现这种负数情况,由于后台数据出错
        interval = interval + 3600 * 24 * 1000;
      }
      // 小时 分钟
      // 3600 * 24 * 1000  (毫秒单位) = 1天
      let hours = Math.floor(interval / 1000 / 3600);
      let minutes = Math.floor((interval / 1000 / 60) % 60);
      return `${hours}时${minutes}分`;
    }
  }
};
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