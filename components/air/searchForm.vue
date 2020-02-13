<template>
  <div class="serchAir">
    <el-tabs type="border-card" :stretch="true" :before-leave="bfLeave">
      <el-tab-pane>
        <span slot="label">
          <i class="iconfont icondancheng"></i> 单程
        </span>
        <!-- 出发城市搜索框 -->
        <div class="searchDepart searchBox">
          <span>出发城市</span>
          <el-autocomplete
            v-model="ticketKey.departCity"
            :fetch-suggestions="searchDepart"
            placeholder="请搜索出发城市"
            @select="selectDepart"
            @blur="blurDepart"
          ></el-autocomplete>
        </div>
        <!-- 到达城市搜索框 -->
        <div class="searchDest searchBox">
          <span>到达城市</span>
          <el-autocomplete
            v-model="ticketKey.destCity"
            :fetch-suggestions="searchDest"
            placeholder="请搜索到达城市"
            @select="selectDest"
            @blur="blurDest"
          ></el-autocomplete>
        </div>
        <!-- 出发时间选择 -->
        <div class="dateDepart searchBox">
          <span>出发时间</span>
          <el-date-picker
            v-model="ticketKey.departDate"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="`${new Date()}`"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <!-- 搜索按钮 -->
        <div class="searchBtn">
          <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜索</el-button>
        </div>
        <div class="changeCity">
          <a href="#" class="changeText" @click="exchangeCity">换</a>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="iconfont iconshuangxiang"></i> 往返
        </span>
        我的行程
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   搜索结果
      searchDepartRes: [],
      searchDestRes: [],
      //   机票搜索词
      ticketKey: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市码
        destCity: "", // 到达城市
        destCode: "", // 到达城市码
        departDate: "" // 出发时间
      },
      //   日期配置
      pickerOptions: {
        disabledDate(time) {
          //   return 后的值为true则禁用
          return time.getTime() + 3600 * 24 * 1000 < Date.now();
        }
      }
    };
  },
  methods: {
    // 切换标签之前的钩子，
    // 若返回 false 或者返回 Promise 且被 reject，则阻止切换
    bfLeave(activeName, oldActiveName) {
      console.log(activeName);
      if (+activeName === 1) {
        this.$alert("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定"
        });
        return false;
      }
    },
    // 查询出发地
    searchDepart(queryString, cb) {
      if (!queryString) {
        // 非空判断
        cb([]);
        return;
      }
      this.$axios({
        method: "GET",
        url: "/airs/city",
        params: {
          name: queryString
        }
      }).then(res => {
        console.log(res);
        let { data } = res.data;
        //   如果搜索结果为零
        if (data.length === 0) {
          cb([]);
          return;
        }
        this.searchDepartRes = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        console.log(data);
        cb(this.searchDepartRes);
      });
    },
    // 出发地选择
    selectDepart(item) {
      console.log(item);
      this.ticketKey.departCity = item.value;
      this.ticketKey.departCode = item.sort;
    },
    // 查询到达地
    searchDest(queryString, cb) {
      if (!queryString) {
        // 非空判断
        cb([]);
        return;
      }
      this.$axios({
        method: "GET",
        url: "/airs/city",
        params: {
          name: queryString
        }
      }).then(res => {
        console.log(res);
        let { data } = res.data;
        //   如果搜索结果为零
        if (data.length === 0) {
          cb([]);
          return;
        }
        this.searchDestRes = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        console.log(data);
        cb(this.searchDestRes);
      });
    },
    // 出发地输入框失焦
    blurDepart() {
      //   如果输入框值为空则清空
      if (!this.ticketKey.departCity) {
        //   也可以不清空,默认 城市值和城市码同存,
        //   也就说 城市值非空会覆盖本次,所以城市码也会被覆盖
        this.ticketKey.departCity = "";
        this.ticketKey.departCode = "";
        return;
      }
      // 若用户没有选择下拉项,则默认第一个(前提是出发城市输入非空)
      if (this.searchDepartRes[0] && this.ticketKey.departCity) {
        this.ticketKey.departCity = this.searchDepartRes[0].value;
        this.ticketKey.departCode = this.searchDepartRes[0].sort;
      }
      console.log(this.ticketKey);
    },
    // 到达地选择
    selectDest(item) {
      this.ticketKey.destCity = item.value;
      this.ticketKey.destCode = item.sort;
    },
    // 到达地输入框失焦
    blurDest() {
      if (this.searchDestRes[0] && this.ticketKey.destCity) {
        this.ticketKey.destCity = this.searchDestRes[0].value;
        this.ticketKey.destCode = this.searchDestRes[0].sort;
      }
      this.searchDestRes[0] = [];
    },
    // 互换起始城市
    exchangeCity() {
      let tmpCity = this.ticketKey.departCity;
      let tmpCode = this.ticketKey.departCode;
      this.ticketKey.departCity = this.ticketKey.destCity;
      this.ticketKey.departCode = this.ticketKey.destCode;
      this.ticketKey.destCity = tmpCity;
      this.ticketKey.destCode = tmpCode;
    },
    // 点击搜索按钮
    searchBtn() {
      console.log(this.ticketKey);
      //   非空判断
      if (!this.ticketKey.departCity) {
        this.$alert("请选择出发城市", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (!this.ticketKey.destCity) {
        this.$alert("请选择到达城市", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (!this.ticketKey.departDate) {
        this.$alert("请选择出发时间", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (!this.ticketKey.destCode || !this.ticketKey.departCode) {
        this.$alert("出发或者到达城市不存在，请在下拉框中选择城市", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      //   跳转搜索结果页
      this.$router.push({
        path: "/air/flights",
        query: this.ticketKey
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-tabs__nav {
  width: 100%;
  color: #000;
}
/deep/.el-tabs__item {
  //   width: 50%;
  text-align: center;
}
/deep/.el-tabs--border-card {
  height: 100%;
  & > .el-tabs__header {
    .el-tabs__item {
      &.is-active {
        border-top: 3px solid #ffa500;
      }
    }
  }
}
/deep/ .el-tabs__content {
  .el-tab-pane {
    position: relative;
    // background-color: pink;
  }
}

.serchAir {
  height: 350px;
  .searchBox {
    margin-bottom: 15px;
    & > span {
      margin: 0 5px;
      font-size: 12px;
    }
  }
  .dateDepart {
    /deep/.el-input__inner {
      width: 206px;
    }
    /deep/ .el-input__suffix {
      right: 15px;
    }
  }
  .searchBtn {
    text-align: center;
    button {
      width: 206px;
      margin: 0 auto;
    }
  }
  .changeCity {
    position: absolute;
    top: 40px;
    right: -9px;
    background-color: #999999;
    &::before {
      content: " ";
      display: block;
      position: absolute;
      top: -18px;
      left: -23px;
      height: 1px;
      width: 160%;
      background-color: rgb(200, 200, 200);
    }
    &::after {
      content: " ";
      display: block;
      position: absolute;
      top: 38px;
      left: -23px;
      height: 1px;
      width: 160%;
      background-color: rgb(200, 200, 200);
    }
    a {
      display: block;
      width: 20px;
      height: 20px;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      &::before {
        content: " ";
        display: block;
        position: absolute;
        top: -18px;
        left: 10px;
        width: 1px;
        height: 16px;
        background-color: rgb(200, 200, 200);
      }
      &::after {
        content: " ";
        display: block;
        position: absolute;
        top: 20px;
        left: 10px;
        width: 1px;
        height: 18px;
        background-color: rgb(200, 200, 200);
      }
    }
  }
}
</style>