<template>
  <el-row class="flights-item" align="middle" type="flex">
      <el-col :span="6" class="flights-number">
          {{ flightsList.airline_name }} {{ flightsList.flight_no }}
      </el-col>
      <el-col :span="12">
          <el-row align="top" type="flex">
              <el-col :span="8">
                  <span class="flights-time"> {{flightsList.dep_time}} </span>
                  <span class="flights-airport"> {{flightsList.org_airport_name}}{{flightsList.org_airport_quay}} </span>
              </el-col>
              <el-col :span="8" class="flights-duration">
                  <span > {{ intervalTime }} </span>
              </el-col>
              <el-col :span="8">
                  <span class="flights-time"> {{flightsList.arr_time}} </span>
                  <span class="flights-airport"> {{flightsList.dst_airport_name}}{{flightsList.dst_airport_quay}} </span>
              </el-col>
          </el-row>
      </el-col>
      <el-col :span="6">
          ￥<i class="flights-price"> {{flightsList.seat_infos[0].org_settle_price_child || flightsList.seat_infos[0].org_settle_price }} </i>起
      </el-col>
  </el-row>
</template>

<script>
export default {
    props: {
        flightsList: {
            type: Object,
            default: () => ({}),
        }
    },
    computed: {
        intervalTime() {
            // 达到时间 出发时间
            const arr_time = new Date(this.flightsList.arr_datetime).getTime()
            const dep_time = new Date(this.flightsList.dep_datetime).getTime()
            // 时间间隔(毫秒)
            let interval = arr_time - dep_time
            if(interval<0) {
                // 此处原本不需要,不会出现这种负数情况,由于后台数据出错
                interval = interval + 3600 * 24 * 1000
            }
            // 小时 分钟
            // 3600 * 24 * 1000  (毫秒单位) = 1天
            let hours = Math.floor(interval / 1000 / 3600)
            let minutes = Math.floor(interval / 1000 / 60 % 60)
            return `${hours}时${minutes}分`
        }
    }
}
</script>

<style lang="less" scoped>
.flights-item {
    margin-bottom: 10px;
    padding: 15px 0;
    border: 1px solid #ccc;
    font-size: 14px;
    text-align: center;

    .flights-time, .flights-airport {
        display: block;
    }
    .flights-time {
        font-size: 24px;
    }
    .flights-airport, .flights-duration {
        font-size: 12px;
        color: #999;
    }
    .flights-duration {
        padding-top: 10px;
        >span {
            border-bottom: 1px solid #999;
            padding-bottom: 10px;
        }
    }
    .flights-price {
        font-size: 24px;
        color: orange;
    }
}
</style>