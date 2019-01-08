<template>
  <div class="details">
    <div>
      <swiper class="details-banner" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="slide in details.tipscrolls" :key="slide" :style="{ 'background-image': 'url(' + slide + ')','background-size':'100% 100%' }"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="details-content">
        <div class="details-con">
          <p class="details-title">{{details.tiptitle}}</p>
          <p class="tipcity" v-html="details.tipcontent"></p>
        </div>
        <div class="details-t">
          <p>
            <span>基本兴趣</span>
            <span @click="btnShow" class="btnShow">
              <img v-show="isShow" src="@/assets/up.png"/>
              <img v-show="!isShow" src="@/assets/down.png"/>
            </span>
          </p>
          <ul v-show="isShow">
            <li v-for="(tipcompares,index) in details.tipcompares" :key="index">
              <span v-if="tipcompares.type=='0'">T</span>
              <span v-else-if="tipcompares.type=='1'" style="background: red">T</span>
              {{tipcompares.content}}
            </li>
          </ul>
        </div>
        <div class="details-help">
          <a :href="'tel:'+details.tipphone">
            <img v-if="details.tipphone == ''" class="c" src="@/assets/tel.png"/>
            <img v-else class="d" src="@/assets/tel-ing.png"/>
          </a>
          <a @click="clickApp">
            <img src="../../assets/kefu-ing.png"/>
          </a>
          <a :href="details.tipurl">
            <img v-if="details.tipurl == ''" src="@/assets/wangzhi.png"/>
            <img v-else src="@/assets/wangzhi-ing.png"/>
          </a>
        </div>
      </div>
      <router-link v-if="coordinate[1]" :to="{name:'mapbox',params:{coordinateX:coordinate[1],coordinateY:coordinate[0]}}" class="details-map">
        <p>{{details.tipaddress}}</p>
        <div ref="basicMapbox" style="height: 300px;width: 100%"></div>
      </router-link>
      <router-link v-else :to="{name:'mapbox',params:{coordinateX:144.962380,coordinateY:-37.812373}}" class="details-map">
        <p>{{details.tipaddress}}</p>
        <div ref="basicMapbox" style="height: 300px;width: 100%;"></div>
      </router-link>
    </div>
    <v-download></v-download>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import download from './../common/download'
  import mapboxgl from 'mapbox-gl'

  const ERR_OK = 1
  export default {
    data() {
      return{
        isShow: true,
        url: 'http://www.autengtech.com/index.php?g=API&m=tips&a=gettipdetail&tipid='+this.$route.params.tipid,
        details:{},
        coordinate: {},
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
          this.details = res.data.data
          this.coordinate = res.data.data.tiptude.split(',')
          if(res.data.data.tiptude){
            this.init(this.coordinate[1], this.coordinate[0], 12) //调用地图
          }else{
            this.init(144.962380, -37.812373, 8) //调用地图
          }
        }
      })
    },
    methods: {
      btnShow(){
        this.isShow = !this.isShow
      },
      init (coordinateX,coordinateY,size) { // 地图初始化
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXV0ZW5nMjAxOCIsImEiOiJjamMxbm56dzkwNTF0MnFueml0M251YmNxIn0.6-b6SY1IhjlQjoqwXwxGEQ'
        const map = new mapboxgl.Map({
          container: this.$refs.basicMapbox,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [coordinateX, coordinateY],
          zoom: size
        })
        if(size != 8){
          let marker = new mapboxgl.Marker().setLngLat([coordinateX, coordinateY]).addTo(map)
        }
        // map.dragPan.disable()
      },
      clickApp(){
        let ua = navigator.userAgent.toLowerCase();
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;//Android终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//Ios终端
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {//Ios
          window.location='https://itunes.apple.com/cn/app/%E6%BE%B3%E8%85%BE/id1121108714?mt=8'
        } else if (/(Android)/i.test(navigator.userAgent)) {//Android终端
          alert('即将开放')
        }
      }
    },
    components: {
      "v-download": download,
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped lang="less">
  @import 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css';
  .details{
    overflow: auto;
    background: #fff;
    .details-banner{
      height: 240px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .details-content{
    color: #000;
    .details-con{
      padding: 10px 20px 20px;
      color: #666;
      letter-spacing: 1px;
      font-size: 14px;
      .details-title{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #000;
      }
    }
    .details-t{
      p{
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        color: #666;
      }
      .btnShow img{
        width: 14px;
        opacity: .6;
      }
      ul{
        list-style: none;
        background: #eee;
        padding: 10px 20px 30px;
        li{
          margin: 15px 0;
          font-size: 14px;
          color: #666;
          span{
            display: block;
            width: 15px;
            height: 15px;
            border-radius: 15px;
            margin-right: 10px;
            float: left;
            color: #fff;
            background: #000;
            margin-top: 3px;
            text-align: center;
            line-height: 15px;
            font-size: 10px;
          }
        }
      }
    }
    .details-help{
      display: flex;
      justify-content: center;
      a{
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 70px;
        background: #eee;
        margin: 20px;
        img{
          width: 100%;
        }
      }
    }
  }
  .details-map p{
    color: #666;
    font-size: 14px;
    padding: 10px 20px;
  }
</style>
