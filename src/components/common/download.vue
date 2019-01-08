<template>
  <div class="download">
    <div class="download-head">
      <img src="@/assets/AT-icon.png"/>
    </div>
    <div class="download-cont">
      <div class="download-title">
        <p>澳腾移民</p>
        <p>科技，改变移民</p>
      </div>
      <div class="go-download" @click="clickApp">
        下载APP<img src="@/assets/right-icon.png"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      clickApp(){
        let ua = navigator.userAgent.toLowerCase();
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  //Android终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);  //Ios终端
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){  //Ios
          window.location='https://itunes.apple.com/cn/app/%E6%BE%B3%E8%85%BE/id1121108714?mt=8'
        } else if(/(Android)/i.test(navigator.userAgent)){  //Android终端
          alert('即将开放')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .download{
    background: #fff;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    border-top: 1px solid #eee;
    .download-head{
      img{
        width: 60px;
        height: 60px;
        position: absolute;
        left: 20px;
        bottom: 10px;
      }
    }
    .download-cont{
      height: 50px;
      position: absolute;
      left: 90px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .download-title p:nth-child(1){
        font-size: 15px;
        font-weight: bold;
      }
      .download-title p:nth-child(2){
        font-size: 10px;
        color: #999;
      }
      .go-download{
        color: red;
        font-size: 17px;
        img {
          height: 14px;
          margin-left: 5px
        }
      }
    }
  }
</style>

