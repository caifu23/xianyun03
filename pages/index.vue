<template>
  <div class="container">
    <!-- 轮播图（走马灯） -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-img"
          :style="`background: url(${$axios.defaults.baseURL + item.url}) center center no-repeat`"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- tab栏：搜索框 -->
    <div class="banner-content">
      <div class="search-bar" >
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span v-for="(item, index) in searchList" :key="index" :class="{ active: index === current}" @click="tabClick(index)" >
            <i> {{ item.text }} </i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="searchList[current].placeholder" v-model.trim="searchKey" @keydown.enter="toSearch"/>
          <i class="el-icon-search" @click="toSearch" ></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,  // 当前tab的索引
      banners: [],  // 轮播图
      // tab栏数据
      searchList: [
        {
          text: '攻略',
          placeholder: '搜索城市',
          pageUrl: '/post?city='
        },
        {
          text: '酒店',
          placeholder: '请输入城市搜索酒店',
          pageUrl: '/hotel?city='
        },
        {
          text: '机票',
          placeholder: '',
          pageUrl: '/air'
        }
      ],
      searchKey: ''  // 搜索关键词
    };
  },
  mounted() {
    // console.log(this.$axios.defaults.baseURL)
    // 获取轮播图数据
    this.getBanners();
  },
  methods: {
    // 获取轮播图
    async getBanners() {
      let resBanner = await this.$axios({
        url: "/scenics/banners"
      });
      // console.log(resBanner)
      if (resBanner.data.data) {
        let { data } = resBanner.data;
        this.banners = data;
      }
    },
    // 切换tab
    tabClick(index) {
      this.current = index
      // 如果点击的是 机票，则跳转
      if(index === 2) {
        this.$router.push(this.searchList[index].pageUrl)
      }
    },
    // 点击搜索图标
    toSearch() {
      console.log(this.searchKey)
      if(!this.searchKey) {
        // 非空提示
        this.$message.error('没有输入关键词')
        return;
      }
      // 跳转相应的 搜索结果页面
      this.$router.push(this.searchList[this.current].pageUrl + this.searchKey)
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

.banner-content {
  z-index: 9;
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -500px;
  border-top: 1px transparent solid;

  .search-bar {
    width: 552px;
    margin: 0 auto;
  }

  .search-tab {
    .active {
      i {
        color: #333;
      }
      &::after {
        background: #eee;
      }
    }

    span {
      width: 82px;
      height: 36px;
      display: block;
      position: relative;
      margin-right: 8px;
      cursor: pointer;

      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }
  }

  .search-input {
    width: 550px;
    height: 46px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    border-top: none;
    box-sizing: unset;

    input {
      flex: 1;
      height: 20px;
      padding: 13px 15px;
      outline: none;
      border: 0;
      font-size: 16px;
    }

    .el-icon-search {
      cursor: pointer;
      font-size: 22px;
      padding: 0 10px;
      font-weight: bold;
    }
  }
}
</style>
