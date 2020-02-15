<template>
  <div class="aside">
    <div class="aside-service">
      <el-row type="flex" align="middle" justify="space-between" class="aside-slogan">
          <el-col :span="8">
              <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
              <span>航协认证</span>
          </el-col>
          <el-col :span="8">
              <i class="iconfont iconbaozheng" style="color:green;"></i>
              <span>出行保证</span>
          </el-col>
          <el-col :span="8">
              <i class="iconfont icondianhua" style="color:#409EFF;"></i>
              <span>7X24</span>
          </el-col>
      </el-row>
      <p> 免费客服电话：4006345678转2 </p>
    </div>
    <div class="aside-history">
        <div class="history-head">历史查询</div>
        <el-row type="flex" justify="space-between" class="history-list" align="middle">
            <el-col :span="19">
                <span>广州 - 北京</span>
                <em>2020-02-11</em>
            </el-col>
            <el-col :span="5">
                <el-button class="history-sel">选择</el-button>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.aside {
  margin-top: 15px;

  .aside-service {
      border: 1px solid #eee;
      text-align: center;
      .aside-slogan {
          padding: 10px 0 5px;
      }
      i {
          display: block;
          font-size: 36px;
      }
      span {
          font-size: 13px;
      }
      p {
          padding: 10px 0;
          font-size: 14px;
          background-color: #f6f6f6;
      }
  }
  .aside-history {
      margin-top: 15px;
      border: 1px solid #eee;
      padding: 0 15px;
      .history-head {
          border-bottom: 1px solid #eee;
          padding: 10px 0;
      }
      .history-list {
          padding: 8px 0;
          span {
              display: block;
              font-size: 14px;
          }
          em {
              font-size: 11px;
              color: #666;
          }
          button {
              padding: 5px 10px;
              font-size: 11px;
              color: #fff;
              background-color: orange;
          }
      }
  }
}
</style>