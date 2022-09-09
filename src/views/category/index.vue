<template>
  <div class="top-category container">
    <!-- 面包屑 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ topCatetory.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 轮播图 -->
    <el-carousel trigger="click" height="450px">
      <el-carousel-item v-for="item in carousel" :key="item.id">
        <img :src="item.imgUrl" alt="" style="width: 100%" />
      </el-carousel-item>
    </el-carousel>
    <!-- 二级分类 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="val in topCatetory.children" :key="val.id">
          <a href="javascript:;">
            <img :src="val.picture" />
            <p>{{ val.name }}</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 分类关联商品 -->
    <div class="ref-goods" v-for="val in subList" :key="val.id">
      <div class="head">
        <h3>-{{ val.name }}-</h3>
        <p class="tag">{{ val.desc }}</p>
      </div>
      <el-button class="button" text>查看更多 ></el-button>
      <div class="body">
        <GoodsItem v-for="item in val.goods" :key="item.id" :goods="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { findBanner } from "../../api/home";
import GoodsItem from "./components/goods-item.vue";
import { findTopCategory } from "../../api/category";
export default {
  name: "TopCategory",
  components: { GoodsItem },
  setup() {
    // 轮播图
    const carousel = ref([]);
    findBanner().then((data) => {
      carousel.value = data.result;
    });

    const store = useStore();
    const route = useRoute();
    // 二级分类
    const topCatetory = computed(() => {
      let cate = {};
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id;
      });
      if (item) cate = item;
      return cate;
    });

    // 推荐商品

    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children;
      });
    };
    watch(
      () => route.params.id,
      (newVal) => {
        newVal && getSubList();
      },
      { immediate: true }
    );
    return { carousel, topCatetory, subList };
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/mixins.less";
@import "../../assets/style/variables.less";
.top-category {
  .el-breadcrumb {
    margin-top: 10px;
  }
  .el-carousel {
    margin-top: 30px;
  }
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .button {
      font-size: 16px;
      color: #999999;
      line-height: 47px;
      position: absolute;
      right: 20px;
      top: 50px;
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>