<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><router-link :to="`/`">居家</router-link></el-breadcrumb-item>
      <el-breadcrumb-item>居家生活</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { onMounted } from 'vue';
export default {
  name: "SubCategory",
  setup(){
    onMounted(() => {
      const id = Proxy.$router
      console.log('id',id);
    })
    return {  }
  }
};
</script>

<style lang="less" scoped>
</style>