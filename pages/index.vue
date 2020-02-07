<template>
  <div class="container">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-img"
          :style="`background: url(${$axios.defaults.baseURL + item.url}) center center no-repeat`"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: []
    }
  },
  mounted() {
    // console.log(this.$axios.defaults.baseURL)
    // 获取轮播图数据
    this.getBanners()
  },
  methods: {
    // 获取轮播图
    async getBanners() {
      let resBanner = await this.$axios({
        url: "/scenics/banners"
      })
      // console.log(resBanner)
      if (resBanner.data.data) {
        let { data } = resBanner.data
        this.banners = data
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-carousel__container {
  height: 700px;
  // 轮播图
  .banner-img {
    width: 100%;
    height: 100%;
    background-size: contain contain;
  }
}
</style>
