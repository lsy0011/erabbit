<template>
  <div class="page-login">
    <LoginHeader>欢迎登录</LoginHeader>
    <section class="login-section">
      <div class="wrapper">
        <!-- <a href="javascript:;">账户登录</a>
          <a href="javascript:;">扫码登录</a> -->
        <el-tabs v-model="activeName" class="tabs">
          <el-tab-pane class="tabs-item" label="账户" name="first"
            ><LoginForm v-if="activeName === 'first'"/></el-tab-pane
          >
          <el-tab-pane class="tabs-item" label="扫码" name="second">
            <div class="qrcode-box">
              <img src="../../assets/img/qrcode.jpg" alt="" />
              <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
            </div></el-tab-pane
          >
        </el-tabs>
      </div>
    </section>
    <LoginFooter />
  </div>
</template>

<script>
import LoginHeader from "./components/login-header.vue";
import LoginFooter from "./components/login-footer.vue";
import LoginForm from './components/login-form.vue'
import { ref } from "vue";
export default {
  name: "PageLogin",
  components: { LoginHeader, LoginFooter, LoginForm },
  setup(e) {
    const activeName = ref("first");
    return { activeName };
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/variables.less";
.login-section {
  background: url(../../assets/img/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        a {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }
  }
}

/deep/.el-tabs__nav {
  display: flex;
  justify-content: space-evenly;
  width: 380px;
}
</style>