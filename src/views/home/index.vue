<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
    <div class="new_hot_product">
      <!-- 新鲜好物 -->
      <HomeNew />
      <!-- 人气推荐 -->
      <HomeHot />
    </div>
    <div class="container">
      <!-- 热门品牌 -->
      <HomeBrand />
    </div>
    <div class="new_hot_product">
      <!-- 商品区块 -->
      <HomeProduct />
    </div>
    <div class="container">
      <!-- 最新专题 -->
      <HomeSpecial />
    </div>
  </div>
</template>

<script>
import HomeCategory from "./components/home-category.vue";
import HomeBanner from "./components/home-banner.vue";
import HomeNew from "./components/home-new.vue";
import HomeHot from "./components/home-hot.vue";
import HomeBrand from "./components/home-brand.vue"
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
export default {
  name: "HomePage",
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  },
};
</script>

<style lang="less" scoped>
.new_hot_product {
  background-color: #fff;
  width: 100%;
}
</style>