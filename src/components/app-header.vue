<template>
  <header class="app-header">
    <div class="container">
      <!-- logo -->
      <h1 class="logo">
        <router-link to="/">小兔鲜</router-link>
      </h1>
      <!-- nav -->
      <AppHeadernav></AppHeadernav>
      <!-- search -->
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- cart -->
      <div class="cart">
        <a href="#" class="curr">
          <el-badge :value="0" class="item">
            <i class="iconfont icon-cart"></i>
          </el-badge>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import AppHeadernav from './app-header-nav.vue'
export default {
  components:{
    AppHeadernav
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/variables.less";
.app-header {
  background-color: #fff;
  .container {
    display: flex;
    align-items: center;

    .logo {
      width: 200px;
      a {
        display: block;
        height: 132px;
        width: 100%;
        text-indent: -9999px;
        background: url(../assets/img/logo.png) no-repeat center 18px / contain;
      }
    }

    

    .search {
      width: 170px;
      height: 32px;
      position: relative;
      border-bottom: 1px solid #e7e7e7;
      line-height: 32px;
      .icon-search {
        font-size: 18px;
        margin-left: 5px;
      }
      input {
        width: 140px;
        padding-left: 5px;
        color: #666;
      }
    }

    .cart {
      width: 50px;
      padding-left: 15px;
      padding-bottom: 21px;
      .curr {
        height: 32px;
        line-height: 32px;
        text-align: center;
        position: relative;
        display: block;
        .item {
          width: 20px;
          height: 20px;
          margin-top: 10px;
          margin-right: 40px;
        }
        .icon-cart {
          font-size: 22px;
        }
      }
    }
  }
}
</style>