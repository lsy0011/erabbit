<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="#"
              ><i class="iconfont icon-user"></i>{{ profile.account }}</a
            >
          </li>
          <li><a href="#" @click="logout()">退出登录</a></li>
        </template>
        <template v-else>
          <li><router-link to="/login">请先登录</router-link></li>
          <li><a href="#">免费注册</a></li>
        </template>
        <li v-for="val in list" :key="val.id">
          <a href="#">{{ val.txt }}</a>
        </li>
        <li>
          <a href="#"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// useStore()   PC返回state  移动端不返回state
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const list = [
      { id: 1, txt: "我的订单" },
      { id: 2, txt: "会员中心" },
      { id: 3, txt: "帮助中心" },
      { id: 4, txt: "关于我们" },
    ];
    const store = useStore();
    //不用计算属性没有响应式  需在v-if中直接 $store.state.user.profile.token 和 $store.state.user.profile.account 所以需要加计算属性更方便
    const profile = computed(() => store.state.user.profile);
    const router = useRouter()
    const logout = ()=>{
      store.commit('user/setUser',{})
      router.push('/login')
    }
    return { list, store, profile, logout };
  },
};
</script>

<style lang="less" scoped>
@import "../assets/style/variables.less";
.app-topnav {
  background-color: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      color: #cdcdcd;
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>