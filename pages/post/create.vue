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
          <span>选择城市</span>
          <el-autocomplete
            v-model="cityKey"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择游玩城市"
            @select="handleSelect"
            @blur="handleBlur"
          ></el-autocomplete>
        </div>
        <!-- 操作区 -->
        <div class="create-operate">
          <el-button type="primary" size="mini" @click="publish">发布</el-button>
          <span>或者</span>
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
      cityKey: "",
      city: "", // 城市id/城市名称
      cityList: [] //测试数据[{ "value": "广州市"}]
    };
  },
  methods: {
    // 输入框 根据搜索词,返回提示
    querySearchAsync(queryString, cb) {
      // console.log(queryString);
      // 非空判断 搜索词
      if (!queryString.trim()) {
        cb([]);
        return;
      }
      // 发起 查询城市请求
      this.getCitys(queryString).then(res => {
        // console.log(res)
        if (!res.length) {
          cb([]);
          return;
        }
        // 改造数据
        res.map(item => {
          item.value = item.name;
        });
        this.cityList = res;
        // 返回提示结果
        cb(res);
      });
    },
    // 选择提示项时
    handleSelect(item) {
      this.city = item.id;
    },
    // 城市输入框失焦
    handleBlur() {
      // 没有城市列表 或 搜索词小于2个字
      if (!this.cityList.length || this.cityKey.length < 2) {
        this.city = "";
        return;
      }
      // 搜索词不匹配 返回城市列表第一项
      if (this.cityList[0].name.indexOf(this.cityKey) === -1) {
        this.city = "";
        return;
      }
      this.city = this.cityList[0].id;
    },
    // 查询城市 请求
    getCitys(cityKey) {
      // console.log(cityKey);
      return this.$axios({
        url: "/airs/city",
        params: {
          name: cityKey
        }
      })
        .then(({ data: { data } }) => {
          // 没有返回数据时
          if (!data) {
            return [];
          }
          return data;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    },
    // 发布按钮
    publish() {
      let token = this.$store.state.user.userInfo.token;
      // console.log(token);
      if (!token) {
        this.$message.warning("请先登录");
        this.$router.push({
          path: "/user/login",
          query: {
            returnUrl: "/post/create"
          }
        });
        return;
      }
      // 非空判断
      if (!this.validAll()) {
        return;
      }
      // 发起 发布攻略 请求
      this.$axios({
        method: "POST",
        url: "/posts",
        data: {
          title: this.title,
          content: this.content,
          city: this.city
        },
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(res => {
        // console.log(res);
        if(res.data.message === '新增成功') {
          this.$message.success('新增成功')
          // 并且清空数据
          this.reset()
        }
      });
    },
    // 非空判断
    validAll() {
      if (!this.title && this.title.length <= 0) {
        this.$message.error("标题不能为空!");
        return false;
      }
      if (!this.content) {
        this.$message.error("内容不能为空!");
        return false;
      }
      if (!this.city && !this.cityKey) {
        this.$message.error("请选择城市!");
        return false;
      } else if (!this.city && this.cityKey) {
        this.$message.error("请输入正确的城市!");
        return false;
      }
      return true;
    },
    // 清空歌输入框数据
    reset() {
      this.title = "", //文章标题
      this.content = "", //文章内容
      this.cityKey = "",
      this.city = "", // 城市id/城市名称
      this.cityList = []
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