<template>
  <swiper class="swiper" :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="slide in swiperSlides" :style="{ 'background-image': 'url(' + slide.image + ')','background-size':'100% 100%' }" :key="slide.id"></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  const ERR_OK = 1
  export default {
    data () {
      return {
        url: 'http://www.autengtech.com/index.php?g=API&m=project&a=getBanner',
        swiperSlides: {},
        swiperOption: {
          notNextTick: true,
          autoplay: {
            stopOnLastSlide: true,
            disableOnInteraction: false,
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          }
        }
      }
    },
    created() {
      this.axios.get(this.url).then((res) => {
        if(res.data.code == ERR_OK){
          this.swiperSlides = res.data.data
        }
      })
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped lang="less">
  .swiper{
    height: 220px;
  }
</style>
