<template>
  <el-card shadow="never" class="sub-filter" v-if="filterData && !filterLoading">
    <div class="filter-item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="brand in filterData.brands"
          :key="brand.id"
          :class="{ active: filterData.selectedBrand === brand.id }"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div
      class="filter-item"
      v-for="val in filterData.saleProperties"
      :key="val.id"
    >
      <div class="head">
        {{ val.name }}
      </div>
      <div class="body">
        <a
          href="javascript:;"
          :class="{ active: val.selectedProp === item.id }"
          v-for="item in val.properties"
          :key="item.id"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </el-card>
  <div class="sub-filter" v-else>
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { findTSubCategoryFilter } from "../../../api/category";
export default {
  name: "SubFilter",
  setup() {
    const route = useRoute();
    let filterData = ref(null);
    let filterLoading = ref(false);
    // 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
    watch(
      () => route.params.id,
      (newVal, oldVal) => {
        // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
        if (newVal && route.path === `/category/sub/${newVal}`) {
          filterLoading.value = true;
          newVal &&
            findTSubCategoryFilter(route.params.id).then(({ result }) => {
              // 品牌全部
              result.selectedBrand = null;
              // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
              result.brands.unshift({ id: null, name: "全部" });
              // 销售属性全部
              result.saleProperties.forEach((res) => {
                res.selectedProp = undefined;
                res.properties.unshift({ id: null, name: "全部" });
              });
              filterData.value = result;
              filterLoading.value = false;
            });
        }
      },
      // immediate 函数在 watch 里声明了立即执行
      { immediate: true }
    );

    // 获取筛选参数
    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach(p => {
        const attr = p.properties.find(attr => attr.id === p.selectedProp)
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: p.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      return filterParams
    }

    // 选择品牌
    const changeBrand = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return 
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 选中属性
    const changeAttr = (p, attrId) => {
      if (p.selectedProp === attrId) return
      p.selectedProp = attrId
      emit('filter-change', getFilterParams())
    }


    return { filterData, filterLoading, changeBrand, changeAttr };
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/variables.less";
.sub-filter {
  background: #fff;
  margin-top: 20px;
  padding-left: 25px;
  .filter-item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>