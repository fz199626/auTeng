<template>
  <div class="login-box">
    <div class="backLogin" v-show="!login" @click="backLogin"></div>
    <div class="back-msg" v-show="showMsg">{{msg}}</div>
    <div class="login" v-show="login"><!--登陆-->
      <div class="login-form">
        <p><label><img src="@/assets/login-user.png"/></label><input type="text" placeholder="输入账号" v-model="lUsername"></p>
        <p><label><img src="@/assets/login-psd.png"/></label><input type="password" placeholder="输入密码" v-model="lPassword"></p>
        <div class="register-btn" @click="loginBtn">完成</div>
      </div>
      <p class="login-res"><span @click="goRegister">我要注册</span><span @click="goForget">忘记密码</span></p>
    </div>
    <div class="register" v-show="register"><!--注册-->
      <div class="login" v-show="!perfect">
        <div class="register-form">
          <p><label><img class="telImg" src="@/assets/login-tel.png"/></label><span class="numberFormat">+{{numberFormat}}</span><input class="userTel" type="text" placeholder="请输入手机号" v-model="userTel"></p>
          <p><label><img class="codeImg" src="@/assets/login-code.png"/></label><input class="userCode" type="text" placeholder="请输入验证码" v-model="userCode"><span class="register-code" @click="getCode1">{{code1}}</span></p>
          <div class="register-btn" @click="registerBtn">下一步</div>
        </div>
        <p class="numberFormatText" @click="numberFormatBtn">{{numberFormatText}}</p>
        <p class="tips">小提示：注册填写的手机号将成为您的登陆账号</p>
      </div>
      <div class="login" v-show="perfect">
        <div class="perfect-form">
          <p><label><img src="@/assets/login-user.png"/></label><input type="text" placeholder="请输入您的用户名" v-model="username"></p>
          <p><label><img src="@/assets/login-psd.png"/></label><input type="password" placeholder="请输入您的新密码" v-model="password"></p>
          <p><label><img src="@/assets/login-psd.png"/></label><input type="password" placeholder="请重复输入您的新密码" v-model="passwords"></p>
          <div class="register-btn" @click="perfectBtn">完成</div>
        </div>
      </div>
    </div>
    <div class="forget" v-show="forget"><!--忘记密码-->
      <div class="login" v-show="!perfectForget">
        <div class="register-form">
          <p><label><img class="telImg" src="@/assets/login-tel.png"/></label><span class="numberFormat">+{{numberFormat}}</span><input class="userTel" type="text" placeholder="请输入手机号" v-model="forgetTel"></p>
          <p><label><img class="codeImg" src="@/assets/login-code.png"/></label><input class="userCode" type="text" placeholder="请输入验证码" v-model="forgetCode"><span class="register-code" @click="getCode2">{{code2}}</span></p>
          <div class="register-btn" @click="forgetBtn">下一步</div>
        </div>
        <p class="login-res"><span></span><span @click="backLogin">我已记起</span></p>
      </div>
      <div class="login" v-show="perfectForget">
        <div class="perfect-form">
          <p><label><img src="@/assets/login-psd.png"/></label><input type="password" placeholder="请输入您的新密码" v-model="newPassword"></p>
          <p><label><img src="@/assets/login-psd.png"/></label><input type="password" placeholder="请重复输入您的新密码" v-model="newPasswords"></p>
          <div class="register-btn" @click="perfectForgetBtn">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const ERR_OK = 1
  export default {
    data() {
      return{
        msg : '',
        showMsg : false,
        code1: '获取验证码',
        code2: '获取验证码',
        numberFormat: '86',
        numberFormatText: '我是澳洲号码',
        login : true,
        register : false,
        perfect : false,
        forget : false,
        perfectForget : false,
        lUsername : '',
        lPassword : '',
        userTel : '',
        userCode : '',
        username : '',
        password : '',
        passwords : '',
        forgetTel : '',
        forgetCode : '',
        newPassword : '',
        newPasswords : '',
      }
    },
    methods:{
      backLogin(){ //返回
        this.login = true
        this.register = false
        this.forget = false
        this.perfect = false
      },
      msgTips(tips){ //提示框
        this.msg = tips
        this.showMsg = true
        setTimeout(() => {
          this.showMsg = false
        },2000);
      },
      goRegister(){ //我要注册
        this.register = true
        this.login = false
        this.forget = false
      },
      goForget(){ //忘记密码
        this.forget = true
        this.register = false
        this.login = false
      },
      getCode1(){ //获取注册验证码
        if(this.userTel == ""){
          this.msgTips('请输入手机号')
        }else{
          let codeUrl = 'http://www.autengtech.com/index.php?g=API&m=registe&a=getmobilecode&type=1&mobile='+this.userTel
          this.axios.get(codeUrl).then((res) => {
            if(res.data.code != ERR_OK){
              this.msgTips(res.data.msg)
            }else {
              let num = 60
              var timer = setInterval(()=>{
                num--;
                this.code1 = num + 's'
                if(num <= 0){
                  clearInterval(timer);
                  this.code1 = '重新获取';
                }
              }, 1000);
            }
          })
        }
      },
      getCode2(){ //获取忘记密码验证码
        if(this.forgetTel == ""){
          this.msgTips('请输入手机号')
        }else{
          let codeUrl = 'http://www.autengtech.com/index.php?g=API&m=registe&a=getmobilecode&type=2&mobile='+this.forgetTel
          this.axios.get(codeUrl).then((res) => {
            if(res.data.code != ERR_OK){
              this.msgTips(res.data.msg)
            }else {
              let num = 60
              var timer = setInterval(()=>{
                num--;
                this.code2 = num + 's'
                if(num <= 0){
                  clearInterval(timer);
                  this.code2 = '重新获取';
                }
              }, 1000);
            }
          })
        }
      },
      loginBtn(){ //登陆
        if(this.lUsername == ""){
          this.msgTips('输入账号')
        }else if (this.lPassword == ""){
          this.msgTips('输入密码')
        }else{
          let registerUrl = 'http://www.autengtech.com/index.php?g=API&m=member&a=gettoken&deviceid=C278F42A-5B19-4CB6-A515-8808242DA6BA&username='+this.lUsername+'&password='+this.lPassword
          this.axios.get(registerUrl).then((res) => {
            if(res.data.code != ERR_OK){
              this.msgTips(res.data.msg)
            }else {
              sessionStorage.setItem('token',res.data.data.token);
              this.$router.replace('/index')
            }
          })
        }
      },
      registerBtn(){ //注册
        if(this.userTel == ""){
          this.msgTips('请输入手机号')
        }else if (this.userCode == ""){
          this.msgTips('请输入验证码')
        }else{
          let registerUrl = 'http://www.autengtech.com/index.php?g=API&m=registe&a=checkmobilecode&type=1&mobile='+this.userTel+'&code='+this.userCode
          this.axios.get(registerUrl).then((res) => {
            if(res.data.code != ERR_OK){
              this.msgTips(res.data.msg)
            }else {
              this.perfect = true
            }
          })
        }
      },
      perfectBtn(){ //注册信息
        if(this.username == ""){
          this.msgTips('请输入您的用户名')
        }else if (this.password == ""){
          this.msgTips('请输入您的新密码')
        }else if(this.passwords == ""){
          this.msgTips('请重复输入您的新密码')
        }else if(this.password != this.passwords){
          this.msgTips('两次密码输入不相同，请修改！')
        }else{
          let perfectUrl = 'http://www.autengtech.com/index.php?g=API&m=registe&a=savemember&deviceid=C278F42A-5B19-4CB6-A515-8808242DA6BA&mobile='+this.userTel+'&nickname='+this.username+'&passwd='+this.password+'&repasswd='+this.passwords
          this.axios.get(perfectUrl).then((res) => {
            if(res.data.code != ERR_OK){
              this.msgTips(res.data.msg)
            }else {
              sessionStorage.setItem('token',res.data.data.token);
              this.$router.replace('/index')
            }
          })
        }
      },
      forgetBtn(){//忘记密码
        if(this.forgetTel == ""){
          this.msgTips('请输入手机号')
        }else if (this.forgetCode == ""){
          this.msgTips('请输入验证码')
        }else{
          let forgetUrl = 'http://www.autengtech.com/index.php?g=API&m=registe&a=checkmobilecode&type=2&mobile='+this.forgetTel+'&code='+this.forgetCode
          this.axios.get(forgetUrl).then((res) => {
            if(res.data.code != ERR_OK){
              this.msgTips(res.data.msg)
            }else {
              this.perfectForget = true
            }
          })
        }
      },
      perfectForgetBtn(){//忘记密码信息
        if(this.newPassword == ""){
          this.msgTips('请输入您的新密码')
        }else if(this.newPasswords == ""){
          this.msgTips('请重复输入您的新密码')
        }else if(this.newPassword != this.newPasswords){
          this.msgTips('两次密码输入不相同，请修改！')
        }else{
          let perfectForgetUrl = 'http://www.autengtech.com/index.php?g=API&m=registe&a=updatepasswd&mobile='+this.forgetTel+'&passwd='+this.newPassword
          this.axios.get(perfectForgetUrl).then((res) => {
            if(res.data.code != ERR_OK){
              this.msgTips(res.data.msg)
            }else {
              sessionStorage.setItem('token',res.data.data.token);
              this.$router.replace('/index')
            }
          })
        }
      },
      numberFormatBtn(){ //切换归属地
        this.number = !this.number
        if(this.number == true){
          this.numberFormat = "86"
          this.numberFormatText = '我是澳洲号码'
        }else if(this.number == false){
          this.numberFormat = "61"
          this.numberFormatText = '我是国内号码'
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .login-box{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("./../assets/login-bj.jpg") no-repeat center center fixed;
    background-size: cover;
    color: #fff;
    .backLogin{
      width: 10px;
      height: 10px;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      transform: rotate(-45deg);
      margin: 20px
    }
    .back-msg{
      width: 56%;
      text-align: center;
      padding: 15px 2%;
      border: 1px solid #999;
      border-radius: 10px;
      position: absolute;
      bottom: 352px;
      margin-left: 20%;
    }
    .login{
      width: 88%;
      height: 330px;
      position: absolute;
      bottom: 0;
      padding: 6%;
      .register-form{
        height: 180px;
        border-radius: 10px;
        background: rgba(0,0,0,0.5);
        margin-bottom: 20px;
        padding-top: 20px;
        p{
          padding: 10px 12%;
          height: 30px;
          position: relative;
          label{
            display: inline-block;
            height: 30px;
            width: 12%;
            text-align: center;
            .telImg{
              width: 13px;
              position: relative;
              top: 5px;
            }
            .codeImg{
              width: 22px;
              position: relative;
              top: 3px;
            }
          }
        }
      }
      .register-form{
        p{
          .numberFormat{
            position: absolute;
            color: #ccc;
            top: 17px;
            font-size: 13px;
          }
          input{
            height: 30px;
            outline: none;
            border: 0;
            border-bottom: 1px solid #333;
            background: transparent;
            color: #ccc;
          }
          .userTel{
            width: 76%;
            margin-left: 2%;
            padding-left: 10%;
          }
          .userCode{
            width: 50%;
            margin-left: 2%;
          }
          .register-code{
            display: inline-block;
            width: 30%;
            margin-left: 6%;
            font-size: 12px;
            color: #666;
            background: #ddd;
            border-radius: 30px;
            padding: 4px 0;
            text-align: center;
          }
        }
      }
      .register-btn {
        width: 100px;
        line-height: 26px;
        text-align: center;
        font-size: 12px;
        margin: 20px auto 0;
        background: red;
        border-radius: 30px;
      }
      .numberFormatText{
        text-align: right;
        font-size: 12px;
        color: #ccc;
        padding-right: 20px;
        margin-bottom: 20px;
      }
      .tips{
        font-size: 12px;
        text-align: center;
        color: #999;
      }
      .perfect-form{
        height: 240px;
        border-radius: 10px;
        background: rgba(0,0,0,0.5);
        margin-bottom: 20px;
        padding-top: 20px;
        p{
          padding: 10px 12%;
          height: 30px;
          position: relative;
          label{
            display: inline-block;
            height: 30px;
            width: 12%;
            text-align: center;
            img{
              width: 16px;
              position: relative;
              top: 4px;
            }
          }
          input{
            width: 88%;
            height: 30px;
            outline: none;
            border: 0;
            border-bottom: 1px solid #333;
            background: transparent;
            color: #ccc;
          }
        }
      }
      .login-form{
        height: 180px;
        border-radius: 10px;
        background: rgba(0,0,0,0.5);
        margin-bottom: 20px;
        padding-top: 20px;
        p{
          padding: 10px 12%;
          height: 30px;
          position: relative;
          label{
            display: inline-block;
            height: 30px;
            width: 12%;
            text-align: center;
            img{
              width: 16px;
              position: relative;
              top: 4px;
            }
          }
          input{
            width: 88%;
            height: 30px;
            outline: none;
            border: 0;
            border-bottom: 1px solid #333;
            background: transparent;
            color: #ccc;
          }
        }
      }
      .login-res{
        display: flex;
        justify-content: space-between;
        padding: 0 10%;
        font-size: 12px;
        color: #ccc;
      }
    }
  }

</style>
