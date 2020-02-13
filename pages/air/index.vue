<template>
  <div class="air container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>国内机票
    </h2>
    <!-- 机票 搜索+广告 -->
    <el-row>
      <!-- 机票搜索 -->
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <SearchForm></SearchForm>
        </div>
      </el-col>
      <!-- 机票广告 -->
      <el-col :span="15" :push="1">
        <div class="grid-content sale-banner">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
        </div>
      </el-col>
    </el-row>
    <!-- 服务 -->
    <el-row class="air-service">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>
    <h2 class="air-title primaryColor">
      <span class="iconfont icontejiajipiao"></span>特价机票
    </h2>
    <!-- 特价机票 -->
    <!-- :gutter="20" 指定col之间的间隔 -->
    <el-row class="air-sale" type="flex" justify="space-between" v-if="sales.length">
      <el-col :span="6" v-for="(item,index) in sales" :key="index">
        <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`" class="air-sale-link">
          <img :src="item.cover" alt="">
          <div class="air-sale-bar">
            <span> {{item.departCity}} -{{item.destCity}} </span>
            <span> ￥{{ item.price }} </span>
          </div>
        </nuxt-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchForm from "@/components/air/searchForm";

export default {
  data () {
    return {
      sales: []
    }
  },
  components: {
    SearchForm
  },
  mounted () {
    // 获取特价机票
    this.getSales()
  },
  methods: {
    // 获取特价机票
    getSales() {
      this.$axios({
        url: '/airs/sale'
      }).then(res => {
        console.log(res)
        const { data } = res.data
        if(data) {
          this.sales = data
          console.log(this.sales)
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.primaryColor {
  color: #409eff!important;
}
.container {
  margin: 0 auto;
  width: 1000px;
}
.air-title {
  margin: 15px 0;
  font-size: 20px;
  color: #ffa500;
}
.air {
  .sale-banner {
    img {
      width: 100%;
    }
  }
}
.air-service {
  margin: 20px 0;
  border: 1px solid #ccc;
  padding: 15px 0;
  background-color: #eee;
  .el-col {
    height: 38px;
    text-align: center;
    line-height: 38px;
    &:not(:last-of-type) {
      border-right: 1px solid #ccc;
    }
    i {
      font-size: 32px;
    }
  }
}
.air-sale {
  margin-bottom: 60px;
  border: 1px solid #ccc;
  padding: 20px;
  .el-col {
    width: calc((100% - 3 * 20px)/4);
    height: 140px;
    box-sizing: border-box;
    border: 1px solid #eee;
    background-color: pink;
    a.air-sale-link {
      position: relative;
      display: block;
      width: 100%;
      height: 140px;
      overflow: hidden;
      // height: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
    .air-sale-bar {
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      background-color: rgba(0, 0, 0, .3);
      color: #fff;
    }
  }
}
</style>
