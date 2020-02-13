<template>
  <div class="filter">
    <el-row class="filter-options">
      <el-col :span="8"
        >单程: {{ flights.info.departCity }} - {{ flights.info.destCity }} /
        {{ flights.info.departDate }}</el-col
      >
      <el-col :span="4">
        <el-select v-model="org_airport" placeholder="起飞机场">
          <el-option
            v-for="(item, index) in org_airport_options"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="org_time" placeholder="起飞时间">
          <el-option
            v-for="(item, index) in org_time_options"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item, index) in company_options"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="plane_size" placeholder="机型">
          <el-option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :value="item.size"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    flights: {
      type: Object,
      default: {
        info: {}
      }
    }
  },
  data() {
    return {
      org_airport: "", // 起飞机场
      org_time: "", // 起飞时间
      company: "", // 航空公司
      plane_size: "", //机型
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  computed: {
    org_airport_options() {
      return this.flights.options.airport || [];
    },
    org_time_options() {
      return this.flights.options.flightTimes || [];
    },
    company_options() {
      return this.flights.options.company || [];
    }
  }
};
</script>

<style lang="less" scoped>
.filter {
  padding: 15px 0;
}
</style>
