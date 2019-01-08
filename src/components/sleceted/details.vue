<template>
  <div class="details">
    <div></div>
    <div class="details-con">
      <div class="details-banner">
        <img :src="slecetedDetails.selectImg"/>
      </div>
      <div class="details-head">
        <div class="details-header">
          <img :src="slecetedDetails.selectIcon"/>
          <p class="sleceted-seat">{{slecetedDetails.selectname}}</p>
        </div>
      </div>
      <div class="sleceted-title">
        {{slecetedDetails.selecttitle}}
      </div>
      <div class="selected-text" v-html="selecttext"></div>
    </div>
    <v-download></v-download>
  </div>
</template>

<script>
  import download from './../common/download'

  const ERR_OK = 1
  export default {
    data() {
      return {
        url: 'http://www.autengtech.com/index.php?g=API&m=project&&a=getProjecInfo&projectid='+this.$route.params.selectid,
        slecetedDetails: {},
        selecttext: ""
      }
    },
    created() {
      this.axios.get(this.url).then((res) => {
        if(res.data.code == ERR_OK){
          this.slecetedDetails = res.data.data
          function escape2Html(str) {
            var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
          }
          this.selecttext = escape2Html(res.data.data.selecttext);
        }
      })
    },
    components: {
      "v-download": download
    }
  }
</script>

<style scoped lang="less">
  .details{
    overflow: auto;
    background: #fff;
    .details-con{
      color: #000;
      .details-banner{
        font-size: 0;
        img{
          width: 100%;
          height: 220px;
        }
      }
      .details-head{
        display: flex;
        justify-content: space-between;
        height: 70px;
        img{
          width: 80px;
          height: 80px;
          border-radius: 80px;
          margin: -40px 10px 0 30px;
        }
        .details-header{
          display: flex;
          p{
            font-size: 18px;
            padding-top: 8px;
          }
        }
      }
      .sleceted-title{
        width: 90%;
        margin: auto;
        font-size: 20px;
        font-weight: bold;
        border-top: 1px solid #ccc;
        padding: 15px 0;
      }
      .selected-text{
        width: 90%;
        margin: auto;
        color: #666;
        line-height: 180%;
        /deep/ p{
          margin: 5px 0;
        }
        /deep/ img{
          width: 100%;
          margin: 5px 0;
        }
      }
    }
  }
</style>
