<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
    <div class="new_hot">
      <!-- 新鲜好物 -->
      <HomeNew />
      <!-- 人气推荐 -->
      <HomeHot />
    </div>
    <div class="container">
      
    </div>
  </div>
</template>

<script>
import HomeCategory from "./components/home-category.vue";
import HomeBanner from "./components/home-banner.vue";
import HomeNew from './components/home-pannel.vue'
import HomeHot from "./components/home-hot.vue";
export default {
  name: "HomePage",
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
  },
};
</script>

<style lang="less" scoped>
.new_hot{
  background-color: #fff;
  width: 100%;
}
</style>