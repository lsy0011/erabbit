<template>
  <div class="home-banner">
    <XtxCarousel :banner='banner'></XtxCarousel>
  </div>
</template>

<script>
import {ref} from 'vue'
import { findBanner } from '../../../api/home'
import XtxCarousel from '../../../components/library/xtx-carousel.vue';
export default {
  components: { XtxCarousel },
  name: "HomeBanner",
  setup(){
    const banner = ref([])

    findBanner().then( data => {
      banner.value = data.result
    })

    return { banner }
  }
};
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  .tx-carousel {
    ::v-deep .carousel-btn.prev {
      left: 270px;
    }
    ::v-deep .carousel-indicator {
      padding-left: 250px;
    }
  }
}
</style>