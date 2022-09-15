<template>
  <div class="category-sub container">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><router-link :to="`/category/${category.top.id}`">{{
          category.top.name
        }}</router-link></el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ category.sub.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 筛选 -->
    <SubFilter @sort-change="changeFilter"/>
    <!-- 商品 -->
    <SubSort class="goods-list" @filter-change="changeSort" />
    <ul v-infinite-scroll="load" style="overflow: auto" class="infinite">
      <li v-for="val in goodList.items" :key="val.id">
        <GoodsItem :goods="val" />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref, watch, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import SubFilter from "./components/sub-filter.vue";
import SubSort from "./components/sub-sort.vue";
import GoodsItem from "./components/goods-item.vue";
import { findSubCategoryGoods } from "../../api/category";
export default {
  name: "SubCategory",
  components: { SubFilter, SubSort, GoodsItem },

  setup() {
    const store = useStore();
    const route = useRoute();
    const category = computed(() => {
      const obj = {};
      store.state.category.list.forEach((top) => {
        top.children &&
          top.children.forEach((sub) => {
            if (sub.id === route.params.id) {
              obj.sub = { id: sub.id, name: sub.name };
              obj.top = { id: top.id, name: top.name };
            }
          });
      });
      return obj;
    });

    // goodlist
    let reqParams = {
      page: 1,
      pageSize: 20,
    };
    let loading = ref(false);
    let finished = ref(false);
    const goodList = ref([]);
    findSubCategoryGoods(reqParams).then(({ result }) => {
      goodList.value = result;
    });
    const load = () => {
      loading.value = true;
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          // goodList.value.items.push(...result.items)
             goodList.value.items.push(...result.items)
          reqParams.page++;
        } else {
          // 加载完毕
          finished.value = true;
        }
        // 请求结束
        loading.value = false;
      });
    };
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === `/category/sub/${newVal}`) {
          goodList.value = [];
          reqParams = {
            page: 1,
            pageSize: 20,
          };
          finished.value = false;
        }
      }
    );
    

     const changeFilter = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodList.value = []
      finished.value = false
    }
    // 监听排序改变
    const changeSort = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodList.value = []
      finished.value = false
    }

    return { category, goodList, load, loading, finished, changeFilter, changeSort };
  },
};
</script>

<style lang="less" scoped>
.category-sub {
  .breadcrumb {
    margin-top: 20px;
  }
  .goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;
  }
  ul {
    background: #fff;
    padding: 0 25px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    height: 1000px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>