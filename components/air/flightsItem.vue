<template>
  <div class="flights-items" >
    <!-- 飞机简要信息 -->
    <el-row class="flights-item" align="middle" type="flex" @click.native="detailShow = !detailShow">
      <el-col :span="6" class="flights-number"
        >{{ flightsList.airline_name }} {{ flightsList.flight_no }}</el-col
      >
      <el-col :span="12">
        <el-row align="top" type="flex">
          <el-col :span="8">
            <span class="flights-time">{{ flightsList.dep_time }}</span>
            <span class="flights-airport">
              {{ flightsList.org_airport_name
              }}{{ flightsList.org_airport_quay }}
            </span>
          </el-col>
          <el-col :span="8" class="flights-duration">
            <span>{{ intervalTime }}</span>
          </el-col>
          <el-col :span="8">
            <span class="flights-time">{{ flightsList.arr_time }}</span>
            <span class="flights-airport">
              {{ flightsList.dst_airport_name
              }}{{ flightsList.dst_airport_quay }}
            </span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        ￥
        <i class="flights-price">
          {{
            flightsList.seat_infos[0].org_settle_price_child ||
              flightsList.seat_infos[0].org_settle_price
          }} </i
        >起
      </el-col>
    </el-row>
    <el-row class="flights-detail" align="middle" type="flex" v-if="detailShow">
      <el-col :span="4">低价推荐</el-col>
      <el-col :span="12" class="flights-company">
        <span class="seat-level"> {{ flightsList.seat_infos[0].name }} </span> | {{ flightsList.seat_infos[0].supplierName }}
      </el-col>
      <el-col :span="4" class="seat-price">￥ {{ flightsList.seat_infos[0].org_settle_price }} </el-col>
      <el-col :span="4">
        <el-button type="warning" class="flights-btn" @click="orderFlights">选定</el-button>
        <span class="flights-standby">剩余： {{ flightsList.seat_infos[0].discount }} </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
      return {
          detailShow: false
      }
  },
  props: {
    flightsList: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 飞机时长
    intervalTime() {
      // 达到时间 出发时间
      const arr_time = new Date(this.flightsList.arr_datetime).getTime();
      const dep_time = new Date(this.flightsList.dep_datetime).getTime();
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
  },
  methods: {
      //   选定按钮
      orderFlights() {
        this.$router.push({
            path: '/air/order',
            query: {
                id: this.flightsList.id,
                seat_xid: this.flightsList.seat_infos[0].seat_xid
            }
        })
      }
  }
};
</script>

<style lang="less" scoped>
.flights-items {
  margin-bottom: 10px;
  border: 1px solid #ccc;
}
.flights-item {
  padding: 15px 0;
  font-size: 14px;
  text-align: center;
  cursor: pointer;

  .flights-time,
  .flights-airport {
    display: block;
  }
  .flights-time {
    font-size: 24px;
  }
  .flights-airport,
  .flights-duration {
    font-size: 12px;
    color: #999;
  }
  .flights-duration {
    padding-top: 10px;
    > span {
      border-bottom: 1px solid #999;
      padding-bottom: 10px;
    }
  }
  .flights-price {
    font-size: 24px;
    color: orange;
  }
}
.flights-detail {
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
  background-color: #f6f6f6;
  .flights-company {
    font-size: 12px;
    .seat-level {
      color: green;
    }
  }
  .seat-price {
    font-size: 15px;
    color: orange;
  }
  .flights-btn {
      display: block;
      margin: 5px auto;
      padding-top: 5px; 
      padding-bottom: 5px; 
      font-size: 12px;
  }
  .flights-standby {
      font-size: 13px;
      color: #666;
  }
}
</style>
