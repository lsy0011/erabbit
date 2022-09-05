<template>
  <div class="container">
    首页模块
    <nav class="a">1111</nav>
  </div>
</template>

<script>
export default {
  name:"HomePage"
}
</script>

<style lang="less" scoped>
@import '../../assets/style/mixins.less';
@import '../../assets/style/variables.less';
.container{
  .hoverShadow();
  color: @xtxColor;

  .a{
    color: @warnColor;
  }
}
</style>