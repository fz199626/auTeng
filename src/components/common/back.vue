<template>
  <div class="header">
    <div class="back-go" @click="back">返回</div>
  </div>
</template>

<script>
  export default {
    methods: {
      back(){
        this.$router.go(-1);//返回上一层
      }
    }
  }
</script>

<style scoped lang="less">
  .header{
    height: 50px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background: #ccc;
    .back-go{
      width: 50px;
      color: #fff;
      text-align: center;
      line-height: 50px;
    }
  }
</style>
