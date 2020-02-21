<template>
  <div class="post-create container">
    <!-- 攻略发布页 -->
    <el-row type="flex" justify="space-between">
      <!-- 左侧-发布攻略编辑 -->
      <el-col :span="17" class="left-create">
        <div class="create-info">
          <h2>发表新攻略</h2>
          <p>分享你的个人游记,让更多人看到哦!</p>
        </div>
        <!-- 标题输入框 -->
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <!-- 富文本编辑框 开启 仅在客户端模式-->
        <client-only>
          <vue-editor v-model="content" class="create-editor"></vue-editor>
        </client-only>
        <!-- 选择城市 -->
        <div class="create-city">
          <span> 选择城市 </span>
          <el-autocomplete
            v-model="city"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择游玩城市"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <!-- 操作区 -->
        <div class="create-operate">
            <el-button type="primary" size="mini">发布</el-button>
            <span> 或者 </span>
            <a href="javascript:;">保存到草稿</a>
        </div>
      </el-col>
      <!-- 右侧- 草稿箱 -->
      <el-col :span="6" class="right-draft">草稿区</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "", //文章标题
      content: "", //文章内容
      city: "",// 城市id/城市名称
      cityList: [{ "value": "三全鲜食（北新泾店）"}] 
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
        console.log(queryString)
        cb(this.cityList)
    },
    createStateFilter(queryString) {
        return (city) => {
            return (city === '广州')
        }
    },
    handleSelect(item) {
         console.log(item)
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  margin: 15px auto;
  width: 1000px;
}
.post-create {
  
  .left-create {
      .create-info {
          h2 {
              font-size: 22px;
              font-weight: normal;
          }
          p {
              margin: 10px 0;
              font-size: 12px;
              color: #999;
          }
      }
      .create-editor {
          margin: 25px 0;
      }
      .create-city {
          span {
              font-size: 14px;
              margin-right: 15px;
          }
      }
      .create-operate {
          margin: 20px 0;
          font-size: 14px;
          span {
              margin: 0 3px 0 15px;
          }
          a {
              color: orange;
              &:hover {
                  text-decoration: underline;
              }
          }
      }
  }
}
</style>