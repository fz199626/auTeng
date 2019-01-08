<template>
  <div class="index">
    <div class="index-title">
      <div class="index-title-chinese">澳腾集团</div>
      <div class="index-title-en">AUTENG</div>
    </div>
    <div class="menu">
      <!--<router-link to="/hourglass">-->
        <!--<span class="menu-title">沙漏</span>-->
        <!--<span class="menu-title-en">- Hourglass -</span>-->
      <!--</router-link>-->
      <router-link :to="{name:'silkBag',params:{tipid:0}}">
        <span class="menu-title">锦囊</span>
        <span class="menu-title-en">- Kits -</span>
      </router-link>
      <router-link to="/sleceted">
        <span class="menu-title">甄选</span>
        <span class="menu-title-en">- SLECETED -</span>
      </router-link>
      <router-link to="">
        <span class="menu-title">收藏</span>
        <span class="menu-title-en">- COLLECTION -</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="less">
  .index{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("./../assets/bj.jpg");
    background-size: 100% 100%;
    color: #fff;
    .index-title{
      margin: 30px 0 0 20px;
      letter-spacing: 2px;
      .index-title-chinese{
        font-size: 32px;
      }
      .index-title-en{
        font-size: 18px;
      }
    }
    .menu{
      width: 100%;
      position: absolute;
      bottom: 50px;
      a{
        display: block;
        padding: 5px 25px;
        margin: 15px 40px;
        color: #fff;
        text-align: right;
        background: linear-gradient(#999, #999) right bottom;
        background-repeat: no-repeat;
        background-size: 60px 1px;
        span{
          display: block;
        }
        .menu-title{
          font-size: 20px;
        }
        .menu-title-en{
          font-size: 14px;
          opacity: 0.6;
        }
      }
    }
  }
</style>
