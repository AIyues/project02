<template>
  <div id="colorBody">
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="">
    </div>
    <div>
    <el-form :rules="rules"
             v-loading="loading"
             ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">教师评教管理系统</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username"  placeholder="用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password"  placeholder="密码">
        </el-input>

      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"
                  style="width: 225px;margin-right: 5px"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>

          <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
  </div>

</template>

<script>
import {getRequest, postRequest} from "../utils/api";
export default {
  name: "Login",
  data(){
    return{
      imgSrc:require('../image/pg11.png'),
      captchaUrl:'/captcha?time='+new Date(),
      loginForm:{
        username:'gch',
        password:'1234561',
        code:''
      },
      loading:false,
      checked:true,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      }
    };
  },
  methods:{
    updateCaptcha(){
      this.captchaUrl='/captcha?time'+new Date();
    },
    submitLogin(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          postRequest('/login',this.loginForm).then(resp=>{
            this.loading=false;
            if (resp) {
              //存储用户token
              const tokenStr = resp.obj.tokenHead+resp.obj.token;
              window.sessionStorage.setItem('tokenStr',tokenStr);
              //存储当前用户信息
              getRequest('/admin/info').then(resp=>{
                if (resp){
                  window.sessionStorage.setItem('user',JSON.stringify(resp));
                  //页面跳转
                  let path=this.$route.query.redirect;
                  // if (window.sessionStorage.getItem('tokenStr')){
                  //
                  // }
                  if (JSON.parse(window.sessionStorage.getItem('user')).ttype===1){
                    this.$router.replace((path=='/'||path==undefined)?'/home':path);
                  }
                  else{
                    this.$router.replace((path=='/'||path==undefined)?'/courseStudent':path);
                  }

                }
              })
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style>
    .loginContainer{
      opacity: 0.75;
      border-radius: 15px;
      background-clip: padding-box;
      margin: 180px auto;
      width: 350px;
      padding: 15px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
      margin: 0px auto 40px auto;
      text-align: center;
    }
    .loginRemember{
      text-align: left;
      margin: 0px 0px 15px 0px;
    }
    .el-form-item__content{
      display: flex;
      align-items: center;
    }
    .background{
      width:100%;
      height:100%;  /**宽高100%是为了图片铺满屏幕 */
      z-index:-1;
      position: absolute;
    }
    #colorBody {
      display: flex;
      justify-content: center;
      align-items: center;
    }

</style>