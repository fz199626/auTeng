<template>
  <div class="twoLevel">
    <v-back></v-back>
    <div class="twoLevel-list">
      <router-link v-if="twoLevels.tiptype == '1'" :to="{name:'silkBag',params:{tipid:twoLevels.tipid}}" v-for="twoLevels in twoLevel" :key="twoLevels.tipid" class="twoLevel-alone">
        <img :src="twoLevels.tipbackimage" />
        <div class="twoLevel-content">
          <span class="twoLevel-content-title">{{twoLevels.tipcurrentname}}</span>
          <span class="twoLevel-content-tips">{{twoLevels.tiptextimage}}</span>
        </div>
      </router-link>
      <router-link v-else-if="twoLevels.tiptype == '0'" :to="{name:'details',params:{tipid:twoLevels.tipid}}" class="twoLevel-alone-other">
        <div  v-if="twoLevels.tipsort == 10000">
          <img src="@/assets/crown.png"/>
          <p style="color: red;">{{twoLevels.tipname}}</p>
        </div>
        <p v-else>{{twoLevels.tipname}}</p>
        <p class="twoLevel-alone-other-seat">{{twoLevels.tipsubtitle}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  import back from './../common/back'

  const ERR_OK=1
  export default {
    data() {
      return{
        url: 'http://www.autengtech.com/index.php?g=API&m=tips&pageSize=200&a=gettipslist&tipid='+this.$route.params.tipid,
        twoLevel:{}
      }
    },
    created() {
      this.axios.get(this.url).then((res) => {
        if(res.data.code == ERR_OK){
          this.twoLevel = res.data.data
        }
      })
    },
    components: {
      "v-back": back
    }
  }
</script>

<style scoped lang="less">
  .twoLevel{
    overflow: auto;
    .twoLevel-alone{
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
      .twoLevel-content{
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
        .twoLevel-content-title{
          font-size: 20px;
        }
        .twoLevel-content-tips{
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
