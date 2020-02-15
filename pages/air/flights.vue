<template>
  <div class="flights container">
    <el-row type="flex" justify-content="space-between">
      <!-- 机票列表 -->
      <el-col class="flights-list">
        <!-- 机票筛选条件 -->
        <FlightsFilter :flights="flightDataBack" @changeflights="changeFlightsData"></FlightsFilter>
        <!-- 机票信息列表 -->
        <div class="flights-content">
          <!-- 机票头部 -->
          <FlightsListHead></FlightsListHead>
          <!-- 机票列表项 -->
          <FlightsItem v-for="(item, index) in currentFlights" :flightsList="item" :key="index"></FlightsItem>
          <!-- 分页 -->
          <div class="divide-page" v-show="flightData.flights.length">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightData.flights.length"
            ></el-pagination>
          </div>
          <!-- 无数据时提示 -->
          <div class="nodata" v-show="flightData.flights.length === 0">
            <p>暂无航班信息!</p>
          </div>
        </div>
      </el-col>

      <!-- 侧边栏: 历史查询 -->
      <el-col class="flights-history">
        <FlightsAside></FlightsAside>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilter from "@/components/air/flightsFilter";
import FlightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      query: {}, // 查询关键字
      flightData: {
        flights: [],
        info: {},
        options: {}
      },
      //   备份数据
      flightDataBack: {
        flights: [],
        info: {},
        options: {}
      },
      currentPage: 1,
      pageSize: 5
    };
  },
  methods: {
    // 获取查询关键字
    getQuery() {
      const query = this.$route.query;
      if (query) {
        this.query = query;
      }
    },
    // 查询机票列表
    getFlightsList() {
      if (this.query) {
        this.$axios({
          method: "GET",
          url: "/airs",
          params: this.query
        }).then(res => {
          console.log(res);
          if (res.data.info) {
            this.flightDataBack = { ...res.data };
            this.flightData = { ...res.data };
          }
        });
      }
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 改变当前第几页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 监听 筛选后数据
    changeFlightsData(val) {
      this.flightData.flights = val;
    }
  },
  mounted() {
    // 获取查询关键字
    this.getQuery();
    // 获取机票列表
    this.getFlightsList();
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilter,
    FlightsAside
  },
  computed: {
    //   当前飞机列表数组
    currentFlights() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      return (
        this.flightData.flights && this.flightData.flights.slice(start, end)
      );
    }
  },
  // 当前路由改变，但是该组件被复用时调用（组件缓存，复用该组件时，没有再次渲染）
  beforeRouteUpdate(to, from, next) {
    next();
    // 路由变化，组件缓存了，
    // 所以需要手动获取新的 查询结果
    // 获取查询关键字
    this.getQuery();
    // 获取机票列表
    this.getFlightsList();
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.flights {
  .flights-list {
    width: 745px;
    margin-right: 20px;
  }
  .flights-history {
    width: 240px;
  }
}
.divide-page {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.nodata {
  padding: 15px 0;
  height: 500px;
  font-size: 16px;
  color: #666;
  text-align: center;
}
</style>
