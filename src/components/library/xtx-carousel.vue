<template>
  <div class="block text-center" m="t-4">
    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="item in banner" :key="item.id">
        <router-link v-if="item.hreUrl" :to="item.hreUrl">
          <img :src="item.imgUrl" alt="" />
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

export default {
  name: "XtxCarousel",
  props: {
    banner: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/variables.less";
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>