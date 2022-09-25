<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ visible }">
      <span class="placeholder" v-if="!fullLocation">请选择配送地址</span>
      <span class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="visible">
      <el-icon v-if="loading"><Loading /></el-icon>
      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed } from "vue";
import axios from 'axios'
import { onClickOutside } from "@vueuse/core";
import { Loading } from "@element-plus/icons-vue";
export default {
  name: "XtxCity",
  props: {
    fullLocation: {
      type: String,
      default: () => {},
    },
  },
  components: { Loading },
  setup(props, { emit }) {
    // 控制展开收起,默认收起
    const loading = ref(false);
    const visible = ref(false);
    const openDialog = async ()=>{
      cityData.value = await getCityData()
      visible.value = true;
    }
    const closeDialog = () => {
      visible.value = false;
    };
    // 切换展开收起
    const toggleDialog = () => {
      if (visible.value) closeDialog();
      else openDialog();
    };
    // 点击其他位置隐藏
    const target = ref(null);
    onClickOutside(target, () => {
      closeDialog();
    });
    const cityData = ref(null);
    const getCityData = () => {
      // 这个位置可能有异常操作，封装成promise
      return new Promise((resolve, reject) => {
        if (window.cityData) {
          // 有缓存
          resolve(window.cityData);
        } else {
          // 无缓存
          const url =
            "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
          axios.get(url).then((res) => {
            window.cityData = res.data;
            resolve(window.cityData);
          });
        }
      });
    };

    const changeResult = reactive({
      provinceCode: "",
      provinceName: "",
      cityCode: "",
      cityName: "",
      countyCode: "",
      countyName: "",
      fullLocation: "",
    });

    // 定义计算属性
    const currList = computed(() => {
      // 省份
      let currList = cityData.value;
      // 城市
      if (changeResult.provinceCode) {
        currList = currList.find(
          (p) => p.code === changeResult.provinceCode
        ).areaList;
      }
      // 地区
      if (changeResult.cityCode) {
        currList = currList.find(
          (c) => c.code === changeResult.cityCode
        ).areaList;
      }
      return currList;
    });
    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code;
        changeResult.provinceName = item.name;
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code;
        changeResult.cityName = item.name;
      }

      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code;
        changeResult.countyName = item.name;
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
        closeDialog();
        emit("change", changeResult);
      }
    };

    const open = () => {
      visible.value = true;
      loading.value = true;
      // 获取数据
      getCityData().then((data) => {
        console.log(data);
        cityData.value = data;
        loading.value = false;
      });

      for (const key in changeResult) {
        changeResult[key] = "";
      }
    };

    return {
      toggleDialog,
      target,
      currList,
      loading,
      changeItem,
      open,
      changeResult,
      visible,
      getCityData,
    };
  },
};
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>