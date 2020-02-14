<template>
  <div class="filter">
    <el-row class="filter-options">
      <el-col :span="8"
        >单程: {{ flights.info.departCity }} - {{ flights.info.destCity }} /
        {{ flights.info.departDate }}</el-col
      >
      <!-- 起飞机场 -->
      <el-col :span="4">
        <el-select v-model="org_airport" placeholder="起飞机场">
          <el-option
            v-for="(item, index) in org_airport_options"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 起飞时间 -->
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
      <!-- 航空公司 -->
      <el-col :span="4">
        <el-select v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item, index) in company_options"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <!-- 机型 -->
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
    <el-row class="filter-reset">
      <el-col :span="8"
        >筛选:
        <el-button type="primary" plain @click="resetFlightsData"
          >撤销</el-button
        ></el-col
      >
    </el-row>
    <span> {{ filterArr }} </span>
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
    },
    // 监听筛选条件的变化,触发筛选函数
    filterArr() {
      this.filterFlights();
      return "";
    }
  },
  methods: {
    //   筛选后的数组
    filterFlights() {
      //   筛选条件(数据)
      let airport = this.org_airport;
      let company = this.company;
      let planeSize = this.plane_size;
      let startTime = this.org_time && Number(this.org_time.split(",")[0]);
      let endTime = this.org_time && Number(this.org_time.split(",")[1]);

      //   遍历数组,过滤
      let newFlights = this.flights.flights.filter(item => {
        let flags = true;
        // 当前飞机的起飞时间
        let depTime = Number(item.dep_time.split(":")[0]);
        // 判断飞机名
        if (airport && airport !== item.org_airport_name) {
          flags = false;
        }
        // 判断公司名
        if (company && company !== item.airline_name) {
          flags = false;
        }
        // 判断飞机机型
        if (planeSize && planeSize !== item.plane_size) {
          flags = false;
        }
        // 判断飞机起飞时间
        if (this.org_time && (depTime < startTime || depTime >= endTime)) {
          flags = false;
        }
        return flags;
      });
      //   console.log(this.flights.flights);
      //   console.log(newFlights);
      //   告诉父组件, 筛选后的数据
      this.$emit("changeflights", newFlights);
    },
    // 清空筛选条件
    resetFlightsData() {
      this.org_airport = "";
      this.org_time = "";
      this.company = "";
      this.plane_size = "";
      this.sizeOptions = [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
.filter {
  padding: 15px 0;

  .filter-options {
    /deep/ input {
      height: 28px;
      line-height: 28px;
    }
    /deep/ .el-input__icon {
      line-height: 28px;
    }
  }
  .filter-reset {
    button {
      margin-left: 15px;
      padding: 8px 15px;
      font-size: 12px;
      border-radius: 12px;
    }
  }
}
</style>
