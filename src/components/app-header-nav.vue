<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="val in list" :key="val.id" @mouseenter="show(val)" @mouseleave="hide(val)" @mousemove="show(val)">
      <router-link :to="`/category/${val.id}`" @click="hide(val)">{{ val.name }}</router-link>
      <div class="layer" :class="{open:val.open}">
        <ul>
          <li v-for="item in val.children" :key="item.id" @click="hide(val)">
            <router-link :to="`/category/sub/${item.id}`">
              <img :src="item.picture" alt="" />
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "AppHeaderNav",
  setup() {
    const store = useStore();
    const list = computed(() => {
      return store.state.category.list;
    });

    const show = (item) => {
      store.commit('category/show',item)
    };
    const hide = (item) => {
      store.commit('category/hide',item)
    }
    return { list, show, hide };
  },
};
</script>

<style scoped lang='less'>
@import "../assets/style/variables.less";
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
  }
}
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>