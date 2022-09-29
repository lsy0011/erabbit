<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <el-carousel height="330px">
      <el-carousel-item v-for="item in sliders" :key="item.id">
        <div class="slider">
          <RouterLink
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { findRelGoods } from "../../../api/goods";
import GoodsItem from "../../category/components/goods-item.vue";
import { ref } from "vue";
export default {
  name: "GoodsRelevant",
  props: {
    goodsId: {
      type: String,
      default: undefined,
    },
    goods: {
      type: Number,
    },
  },
  components: { GoodsItem },
  setup(props) {
    const useRelGoodsData = (id) => {
      const sliders = ref([]);
      findRelGoods(id, 16).then((data) => {
        // 每页4条
        const size = 4;
        // Math.ceil(x) -- 返回大于等于数字参数的最小整数(取整函数)，对数字进行上舍入
        const total = Math.ceil(data.result.length / size);
        for (let i = 0; i < total; i++) {
          sliders.value.push(data.result.slice(i * size, (i + 1) * size));
        }
      });
      return sliders;
    };

    const sliders = useRelGoodsData(props.goodsId);
    return { sliders };
  },
};
</script>

<style scoped lang='less'>
@import "../../../assets/style/variables.less";
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
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
  :deep(.el-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>