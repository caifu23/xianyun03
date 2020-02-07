<template>
  <div>
    <Header></Header>
    <!-- 内容占位组件 -->
    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

ul, ol, dl {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

// a:hover {

// }

em, i {
  font-style: normal;
}
</style>
