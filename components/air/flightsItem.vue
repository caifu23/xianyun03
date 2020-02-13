<template>
  <el-row class="flights-item" align="middle" type="flex">
      <el-col :span="6" class="flights-number">
          国航 CA1858
      </el-col>
      <el-col :span="12">
          <el-row align="top" type="flex">
              <el-col :span="8">
                  <span class="flights-time">07:55</span>
                  <span class="flights-airport">虹桥机场T2</span>
              </el-col>
              <el-col :span="8" class="flights-duration">
                  <span >2时15分</span>
              </el-col>
              <el-col :span="8">
                  <span class="flights-time">10:10</span>
                  <span class="flights-airport">首都机场T3</span>
              </el-col>
          </el-row>
      </el-col>
      <el-col :span="6">
          ￥<i class="flights-price">750</i>起
      </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.flights-item {
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