<template>
  <div class="air container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>国内机票
    </h2>
    <!-- 机票 -->
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
  </div>
</template>

<script>
import SearchForm from '@/components/air/searchForm'
export default {
  components: {
    SearchForm
  }
}
</script>

<style lang="less" scoped>
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
</style>
