<template>
  <el-card class="box-card container" shadow="never">
    <template #header>
      <div class="card-header">
        <div class="txt">
          <span>新鲜好物</span>
          <span>新鲜出炉，品质靠谱</span>
        </div>
        <el-button class="button" text>全部 ></el-button>
      </div>
    </template>
    <div style="position: relative; height: 406px">
      <Transition name="fade">
        <ul class="goods-list" ref="pannel" v-if="goods.length">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton bg="#f0f9f4" v-else />
      </Transition>
    </div>
  </el-card>
</template>

<script>
import { ref } from "vue";
import HomeSkeleton from "./home-skeleton.vue";
import { findNew } from "../../../api/home";
export default {
  name: "HomeNew",
  components: { HomeSkeleton },
  setup() {
    const goods = ref([]);
    findNew().then((data) => {
      goods.value = data.result;
    });
    return { goods };
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/mixins.less";
@import "../../../assets/style/variables.less";
.box-card {
  width: 70%;
  border: none;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .txt {
      display: flex;
      justify-content: space-between;
      :first-child {
        margin-left: 30px;
        font-size: 30px;
        color: #333333;
      }
      :last-child {
        margin-left: 20px;
        color: #999999;
        font-size: 16px;
        line-height: 47px;
      }
    }
    .button {
      font-size: 16px;
      color: #999999;
      line-height: 47px;
    }
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;
    li {
      width: 306px;
      height: 406px;
      background: #f0f9f4;
      .hoverShadow();
      img {
        width: 306px;
        height: 306px;
      }
      p {
        font-size: 22px;
        padding: 12px 30px 0 30px;
        text-align: center;
      }
      .price {
        color: @priceColor;
      }
    }
  }
}
</style>