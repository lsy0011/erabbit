<template>
  <el-card
    class="box-card container"
    shadow="never"
    v-for="item in goods"
    :key="item.id"
  >
    <template #header>
      <div class="card-header">
        <div class="txt">
          <span>{{ item.name }}</span>
        </div>
        <ul class="category">
          <li v-for="val in item.children" :key="val.id">{{ val.name }}</li>
        </ul>
        <el-button class="button" text>查看全部 ></el-button>
      </div>
    </template>
    <div class="box">
      <RouterLink class="cover" to="/">
        <img :src="item.picture" alt="" />
        <strong class="label">
          <span>{{ item.name }}馆</span>
          <span>{{ item.saleInfo }}</span>
        </strong>
      </RouterLink>
      <ul class="goods-list">
        <li v-for="res in item.goods" :key="res.id">
          <HomeGoods :goods="res" />
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
import { ref } from "vue";
import HomeGoods from "./home-goods.vue";
import { findGoods } from "../../../api/home";
export default {
  name: "HomeProduct",
  components: { HomeGoods },
  setup() {
    const goods = ref([]);
    findGoods().then((data) => {
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
    }
    .category {
      display: flex;
      justify-content: space-between;
      li {
        padding: 5px 10px 5px 10px;
        margin: 0 5px 0 5px;
        font-size: 16px;
        &:hover {
          background-color: @xtxColor;
          color: #fff;
          border-radius: 10px;
        }
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

  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>