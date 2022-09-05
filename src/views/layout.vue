<template class="container">
  <div >
      <AppTopnav></AppTopnav>
      <AppHeader></AppHeader>
      <router-view></router-view>
      <AppFooter></AppFooter>
  </div>
</template>

<script>

import AppTopnav from '../components/app-topnav.vue'
import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'
export default {
  components:{
    AppTopnav,
    AppHeader,
    AppFooter
  }

}
</script>

<style lang="less">

</style>