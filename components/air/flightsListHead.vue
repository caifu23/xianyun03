<template>
  <div class="list-head">
      <el-row type="flex">
          <el-col :span="5">航空信息</el-col>
          <el-col :span="7">起飞时间</el-col>
          <el-col :span="7">到达时间</el-col>
          <el-col :span="5">价格</el-col>
      </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.list-head {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    font-size: 13px;
    color: #666666;
    background-color: #f6f6f6;
}
</style>