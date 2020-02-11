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
          ></el-autocomplete>
        </div>
        <!-- 出发时间选择 -->
        <div class="dateDepart searchBox">
          <span> 出发时间 </span>
          <el-date-picker v-model="ticketKey.departDate" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="searchBtn">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
      searchRes: [{ value: "广州" }, { value: "深圳" }, { value: "北京" }],
      //   机票搜索词
      ticketKey: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市码
        destCity: "", // 到达城市
        destCode: "", // 到达城市码
        departDate: "" // 出发时间
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
        return;
      }
      console.log(queryString);
      cb(this.searchRes);
    },
    // 出发地选择
    selectDepart(item) {
      console.log(item);
    },
    // 查询到达地
    searchDest(queryString, cb) {
      if (!queryString) {
        // 非空判断
        return;
      }
      console.log(queryString);
      cb(this.searchRes);
    },
    // 到达地选择
    selectDest(item) {
      console.log(item);
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

.serchAir {
    height: 350px;
    .searchBox {
        margin-bottom: 15px;
        &>span {
            margin: 0 5px;
            font-size: 12px;
        }
    }
    .dateDepart {
        /deep/.el-input__inner {
            width: 206px;
        }
    }
    .searchBtn {
        text-align: center;
        button {
            width: 206px;
            margin: 0 auto;
        }
    }
}
</style>