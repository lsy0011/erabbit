<template>
  <div class="goods-detail">
    <ul class="attrs">
      <li v-for="val in goods.details.properties" :key="val.value">
        <span class="dt">{{ val.name }} </span>
        <span class="dd">{{ val.value }}</span>
      </li>
    </ul>
    <img v-for="val in goods.details.pictures" :key="val" :src="val" alt="">
  </div>
</template>

<script>
import {inject, ref} from 'vue'
export default {
  name: "GoodsDetail",
  setup(){
    const goods = inject('goods')
    return {goods}
  }
};
</script>

<style lang="less" scoped>
.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>