<template>
  <div class="home-category" @mouseleave="CategoryId = null">
    <!-- menu -->
    <ul class="menu">
      <li
        v-for="val in menuList"
        :key="val.id"
        @mouseenter="CategoryId = val.id"
        :class="{ active: CategoryId === val.id }"
      >
        <router-link :to="`/category/${val.id}`">{{ val.name }}</router-link>
        <template v-if="val.children">
          <!-- && loading == false -->
          <router-link
            v-for="item in val.children"
            :key="item.id"
            :to="`/category/sub/${item.id}`"
            >{{ item.name }}</router-link
          >
        </template>
        <!-- 骨架屏 -->
        <span v-else>
          <xtxSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
          />
          <xtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4 v-if="currCategory">
        {{ currCategory.id === "brand" ? "品牌" : "分类" }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul
        v-if="currCategory && currCategory.goods && currCategory.goods.length"
      >
        <li v-for="val in currCategory.goods" :key="val.id">
          <router-link to="/">
            <img :src="val.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ val.name }}</p>
              <p class="desc ellipsis">{{ val.desc }}</p>
              <p class="price"><i>¥</i>{{ val.price }}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 品牌分类 -->
      <ul
        v-if="currCategory && currCategory.brands && currCategory.brands.length"
      >
        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { findBrand } from "../../../api/home";
import xtxSkeleton from "../../../components/library/xtx-skeleton.vue";
import xtxCarousel from "../../../components/library/xtx-carousel.vue";
export default {
  components: {
    xtxSkeleton
  },
  setup() {
    const brand = reactive({
      id: "brand",
      name: "品牌",
      brands: [],
      children: [
        {
          id: "brand-children",
          name: "品牌推荐",
        },
      ],
    });

    const store = useStore();
    // 计算属性可以实现响应式
    const menuList = computed(() => {
      const list = store.state.category.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods,
        };
      });
      // push() 方法可向数组的末尾添加一个或多个元素 并返回新的长度
      // 将新创建的 brand 加到原数组的末尾
      list.push(brand);
      return list;
    });

    // 获取当前分类逻辑
    const CategoryId = ref(null);
    const currCategory = computed(() => {
      return menuList.value.find((item) => item.id === CategoryId.value);
    });

    // 品牌分类调取数据
    findBrand().then((data) => {
      brand.brands = data.result;
    });

    const loading = ref(true);

    onMounted(() => {
      loading.value = false;
    });

    return { menuList, CategoryId, currCategory, loading };
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/variables.less";
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
    .xtx-skeleton {
      animation: fade 1s linear infinite alternate;
    }
    @keyframes fade {
      from {
        opacity: 0.2;
      }
      to {
        opacity: 1;
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    li.brand {
      height: 180px;
      a {
        align-items: flex-start;
        img {
          width: 120px;
          height: 160px;
        }
        .info {
          p {
            margin-top: 8px;
          }
          .place {
            color: #999;
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>