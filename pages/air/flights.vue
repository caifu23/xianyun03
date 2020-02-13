<template>
  <div class="flights container">
    <el-row type="flex" justify-content="space-between">
      <!-- 机票列表 -->
      <el-col class="flights-list">
        <!-- 机票筛选条件 -->
        <FlightsFilter :flights="flightData"></FlightsFilter>
        <!-- 机票信息列表 -->
        <div class="flights-content">
          <!-- 机票头部 -->
          <FlightsListHead></FlightsListHead>
          <!-- 机票列表项 -->
          <FlightsItem
            v-for="(item, index) in currentFlights"
            :flightsList="item"
            :key="index"
          ></FlightsItem>
          <!-- 分页 -->
          <div class="divide-page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightData.total"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>

      <!-- 侧边栏: 历史查询 -->
      <el-col class="flights-history">列2</el-col>
    </el-row>
  </div>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilter from "@/components/air/flightsFilter";

export default {
  data() {
    return {
      query: {}, // 查询关键字
      flightData: {
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
            this.flightData = res.data;
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
    FlightsFilter
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
</style>
