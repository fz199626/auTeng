<template>
  <div class="sleceted">
    <v-swiper></v-swiper>
    <div class="sleceted-list">
      <router-link class="sleceted-list-li" :to="{name:'slecetedDetails',params:{selectid:sleceteds.selectid}}" v-for="sleceteds in sleceted" :key="sleceteds.selectid">
        <img :src="sleceteds.selectImg"/>
        <div class="sleceted-list-li-con">
          <p class="sleceted-seat">{{sleceteds.selectname}}</p>
          <p class="sleceted-title">{{sleceteds.selecttitle}}</p>
          <p class="sleceted-tips">{{sleceteds.selectti}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import swiper from './../common/swiper'

  const ERR_OK = 1
  export default {
    data() {
      return{
        url: 'http://www.autengtech.com/index.php?g=API&m=project&a=getSelectedInfo',
        sleceted: {},
      }
    },
    created() {
      this.axios.get(this.url).then((res) => {
        if(res.data.code == ERR_OK){
          this.sleceted = res.data.data
        }
      })
    },
    components: {
      "v-swiper": swiper
    }
  }
</script>

<style scoped lang="less">
  .sleceted{
    overflow: auto;
    .sleceted-list{
      color: #000;
      padding: 15px 15px 0 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .sleceted-list-li{
        width: 48%;
        font-size: 0;
        margin-bottom: 15px;
        border-radius: 8px;
        background: #fff;
        img{
          width: 100%;
          height: 110px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .sleceted-list-li-con{
          font-size: 14px;
          padding: 10px;
        }
        .sleceted-seat{
          color: cornflowerblue;
        }
        .sleceted-title{
          font-size: 15px;
          margin: 5px 0;
          color: #444;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .sleceted-tips{
          font-size: 12px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        }
      }
    }
  }
</style>
