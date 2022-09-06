<template class="container">
  <div >
      <AppTopnav></AppTopnav>
      <AppHeader></AppHeader>
      <AppHeaderSticky></AppHeaderSticky>
      <router-view></router-view>
      <AppFooter></AppFooter>
  </div>
</template>

<script>

import AppTopnav from '../components/app-topnav.vue'
import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'
import AppHeaderSticky from '../components/app-header-sticky.vue'
import { useStore } from 'vuex'

export default {
  setup(){
    const store = useStore()
    store.dispatch('category/getList')
  },
  components:{
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  }

}
</script>

<style lang="less">

</style>