<template>
  <div class="block text-center" m="t-4">
    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="item in banner" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
     name: 'XtxCarousel',
     props:{
         banner:{
             type:Array,
             default:()=>{}
         }
     }
};
</script>

<style lang="less" scoped>

</style>