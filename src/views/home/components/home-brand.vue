<template>
  <div class="home-brand">
    <el-card class="box-card container" shadow="never">
      <template #header>
        <div class="card-header">
          <div class="txt">
            <span>热门品牌</span>
            <span>国际经典 品质保证</span>
          </div>
          <div>
            <a
              href="javascript:;"
              class="iconfont icon-angle-left prev"
              @click="toggle(-1)"
              :class="{ disabled: index === 0 }"
            ></a>
            <a
              href="javascript:;"
              class="iconfont icon-angle-right next"
              @click="toggle(1)"
              :class="{ disabled: index === 1 }"
            ></a>
          </div>
        </div>
      </template>

      <div class="box" ref="box">
        <ul
          class="list"
          v-if="brand.length"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <li v-for="val in brand" :key="val.id">
            <RouterLink to="/">
              <img :src="val.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          +
          <XtxSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
          +
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { findBrand } from "../../../api/home";
export default {
  name: "HomeBrand",
  setup() {
    // 获取数据
    const brand = ref([]);
    findBrand(10).then((data) => {
      brand.value = data.result;
    });

    // 切换效果
    const index = ref(0);

    const toggle = (res) => {
      const newIndex = index.value + res;
      if (newIndex < 0 || newIndex > 1) return;
      index.value = newIndex;
    };
    return { brand, toggle, index };
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/variables.less";
@import "../../../assets/style/mixins.less";
.box-card {
  width: 100%;
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
  .iconfont {
    width: 20px;
    height: 20px;
    background: #ccc;
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: @xtxColor;
    &::before {
      font-size: 12px;
      position: relative;
      top: -2px;
    }
    &.disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
  .box {
    display: flex;
    width: 100%;
    height: 345px;
    overflow: hidden;
    padding-bottom: 40px;
    .list {
      width: 200%;
      display: flex;
      transition: all 1s;
      li {
        margin-right: 10px;
        width: 240px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        img {
          width: 240px;
          height: 305px;
        }
      }
    }
    .skeleton {
      width: 100%;
      display: flex;
      .item {
        margin-right: 10px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>