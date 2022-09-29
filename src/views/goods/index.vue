<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          ><router-link :to="`/category/${goods.categories[0].id}`">{{
            goods.categories[0].name
          }}</router-link></el-breadcrumb-item
        >
        <el-breadcrumb-item
          ><router-link :to="`/category/${goods.categories[1].id}`">{{
            goods.categories[1].name
          }}</router-link></el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImg :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodName :goods="goods" />
          <GoodsSku :goods="goods" @change="changeSku" />
          <div class="num">
            数量：<el-input-number
              v-model="num"
              :max="goods.inventory"
              class="input-number"
            />
          </div>
          <el-button type="primary" size="large" class="button"
            >加入购物车</el-button
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane class="tabs" label="商品详情" name="first"
                ><GoodsDetail
              /></el-tab-pane>
              <el-tab-pane
                class="tabs"
                :label="`商品评价(${goods.commentCount})`"
                name="second"
                ><GoodsComment :goods="goods"/></el-tab-pane
              >
            </el-tabs>
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
          <GoodsHot :goodsId="goods.id" :type="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from "./components/goods-relevant.vue";
import { findGoods } from "../../api/product";
import { nextTick, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import GoodsImg from "./components/goods-image.vue";
import GoodsSales from "./components/goods-sales.vue";
import GoodName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsHot from "./components/goods-hot.vue";
import GoodsDetail from "./components/goods-detail.vue";
import GoodsWarn from "./components/goods-warn.vue";
import GoodsComment from './components/goods-comment.vue'
export default {
  name: "XtxGoodsPage",
  components: {
    GoodsRelevant,
    GoodsImg,
    GoodsSales,
    GoodName,
    GoodsSku,
    GoodsHot,
    GoodsDetail,
    GoodsWarn,
    GoodsComment
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const activeName = ref("first");
    const num = ref(1);
    const useGoods = () => {
      // 出现路由地址商品ID发生变化，但是不会重新初始化组件
      const goods = ref(null);
      provide("goods", goods);
      const route = useRoute();
      watch(
        () => route.params.id,
        (newVal) => {
          if (newVal && `/product/${newVal}` === route.path) {
            findGoods(route.params.id).then((data) => {
              // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
              goods.value = null;
              nextTick(() => {
                goods.value = data.result;
              });
            });
          }
        },
        { immediate: true }
      );
      return goods;
    };
    const goods = useGoods();

    findGoods("1369155859933827074").then(({ result }) => {
      result.skus.forEach((sku) => {
        const sortSpecs = [];
        result.specs.forEach((spec) => {
          sortSpecs.push(sku.specs.find((item) => item.name === spec.name));
        });
        sku.specs = sortSpecs;
      });
      goods.value = result;
    });

    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price;
        goods.value.oldPrice = sku.oldPrice;
        goods.value.inventory = sku.inventory;
      }
    };

    return { goods, changeSku, num, activeName };
  },
};
// 获取商品详情
</script>

<style scoped lang='less'>
@import "../../assets/style/variables.less";
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
    color: #999;

    .num {
      margin-left: 10px;
      .input-number {
        margin-left: 10px;
      }
    }

    .button {
      width: 200px;
      height: 65px;
      font-size: 16px;
      margin-left: 60px;
      margin-top: 30px;
      background-color: @xtxColor;
    }
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
  .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 34px;
    font-weight: 600;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
