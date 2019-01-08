<template>
  <div class="silkBag">
    <v-back></v-back>
    <div class="silkBag-list">
      <router-link v-if="silkBags.tiptype == '1'" :to="{name:'twoLevel',params:{tipid:silkBags.tipid}}" v-for="silkBags in silkBag" :key="silkBags.tipid" class="silkBag-alone">
        <img :src="silkBags.tipbackimage" />
        <div class="silkBag-content">
          <span class="silkBag-content-title">{{silkBags.tipcurrentname}}</span>
          <span class="silkBag-content-tips">{{silkBags.tiptextimage}}</span>
        </div>
      </router-link>
      <router-link v-else-if="silkBags.tiptype == '0'" :to="{name:'details',params:{tipid:silkBags.tipid}}" class="twoLevel-alone-other">
        <div  v-if="silkBags.tipsort == 10000">
          <img src="@/assets/crown.png"/>
          <p style="color: red;">{{silkBags.tipname}}</p>
        </div>
        <p v-else>{{silkBags.tipname}}</p>
        <p class="twoLevel-alone-other-seat">{{silkBags.tipsubtitle}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  import back from './../common/back'

  const ERR_OK = 1
  export default {
    data() {
      return{
        url: 'http://www.autengtech.com/index.php?g=API&m=tips&pageSize=200&a=gettipslist&tipid='+this.$route.params.tipid,
        silkBag:{}
      }
    },
    created() {
      this.axios.get(this.url).then((res) => {
        if(res.data.code == ERR_OK){
          this.silkBag = res.data.data
        }
      })
    },
    components: {
      "v-back": back
    }
  }
</script>

<style scoped lang="less">
  .silkBag{
    overflow: auto;
    .silkBag-alone{
      display: block;
      color: #fff;
      height: 150px;
      margin: 15px;
      border-radius: 5px;
      background: rgba(0,0,0,0.3);
      position: relative;
      img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        opacity: 0.9;
      }
      .silkBag-content{
        position: absolute;
        bottom: 0;
        right: 0;
        padding-bottom: 10px;
        margin: 15px 20px;
        text-align: right;
        background: linear-gradient(#fff, #fff) right bottom;
        background-repeat: no-repeat;
        background-size: 60px 3px;
        span{
          display: block;
        }
        .silkBag-content-title{
          font-size: 20px;
        }
        .silkBag-content-tips{
          font-size: 14px;
          opacity: 0.7;
        }
      }
    }
    .twoLevel-alone-other{
      display: block;
      color: #000;
      margin: 15px;
      padding: 15px;
      background: #fff;
      border-radius: 7px;
      font-size: 18px;
      position: relative;
      img{
        position: absolute;
        top: -10px;
        left: -10px;
        width: 30px;
      }
      p{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .twoLevel-alone-other-seat{
        color: #999;
        font-size: 14px;
        margin: 5px;
      }
    }
  }
</style>
