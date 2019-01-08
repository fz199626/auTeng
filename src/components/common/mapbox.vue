<template>
  <div class="mapbox">
    <v-back></v-back>
    <div ref="basicMapbox" style="height: 100%;width: 100%"></div>
  </div>
</template>
<script>
  import back from './../common/back'
  import mapboxgl from 'mapbox-gl'

  export default {
    mounted () {
      if(this.$route.params.coordinateX != 144.962380){
        this.init(this.$route.params.coordinateX, this.$route.params.coordinateY, 12) //调用地图
      }else {
        this.init(144.962380, -37.812373, 8) //调用地图
      }
    },
    methods: {
      init (coordinateX, coordinateY, size) { // 初始化
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXV0ZW5nMjAxOCIsImEiOiJjamMxbm56dzkwNTF0MnFueml0M251YmNxIn0.6-b6SY1IhjlQjoqwXwxGEQ'
        const map = new mapboxgl.Map({
          container: this.$refs.basicMapbox,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [coordinateX, coordinateY],
          zoom: size
        })
        if(size != 8) {
          var marker = new mapboxgl.Marker().setLngLat([this.$route.params.coordinateX, this.$route.params.coordinateY]).addTo(map)
        }
      }
    },
    components: {
      "v-back": back
    }
  }
</script>
<style scoped lang="less">
  @import 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css';
  .mapbox{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
