<template>
  <div class="flights container">
    <el-row type="flex" justify-content="space-between">
      <!-- 机票列表 -->
      <el-col class="flights-list">
        <!-- 机票筛选条件 -->
        <!-- 机票信息列表 -->
        <div class="flights-content">
            <!-- 机票头部 -->
            <FlightsListHead></FlightsListHead>
            <!-- 机票列表项 -->
            <FlightsItem></FlightsItem>
        </div>
        列去
      </el-col>

      <!-- 侧边栏: 历史查询 -->
      <el-col class="flights-history">列2</el-col>
    </el-row>
  </div>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'

export default {
  data() {
    return {};
  },
  methods: {
    // 获取查询关键字
    getQuery() {
      const query = this.$route.query;
      console.log(query);
    }
  },
  mounted() {
    // 获取查询关键字
    this.getQuery();
  },
  components: {
    FlightsListHead,
    FlightsItem
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
</style>