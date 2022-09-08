<template>
  <el-card class="box-card container" shadow="never">
    <template #header>
      <div class="card-header">
        <div class="txt">
          <span>人气推荐</span>
          <span>人气爆款，不容错过</span>
          <!-- <span>新鲜好物</span>
          <span>新鲜出炉，品质靠谱</span> -->
        </div>
        <!-- <el-button class="button" text>全部 ></el-button> -->
      </div>
    </template>
    <ul ref="pannel" class="goods-list">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </el-card>
</template>

<script>
import { ref } from "vue";
import { findHot } from "../../../api/home";
export default {
  name: "HomeNew",
  setup() {
    const goods = ref([]);
    findHot().then((data) => {
      goods.value = data.result;
    });
    return { goods };
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/mixins.less";
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
    height: 426px;
    li {
      width: 306px;
      height: 406px;
      .hoverShadow();
      img {
        width: 306px;
        height: 306px;
      }
      p {
        font-size: 22px;
        padding-top: 12px;
        text-align: center;
      }
      .desc {
        color: #999;
        font-size: 18px;
      }
    }
  }
}
</style>