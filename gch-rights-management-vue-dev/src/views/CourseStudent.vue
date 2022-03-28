<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">haoo在线学习</div>
        <el-dropdown class="userInfo" @command="commandHandler">
            <span class="el-dropdown-link">
            用户:{{user.name}}<i><img src="" alt=""></i>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>

        <div class="block" style="width:100%;">
          <el-carousel  height="250px" >
            <el-carousel-item v-for="item in imgList" :key="item.name">
              <img :src=item.img width="100%" height="100%" alt="">
              <!--<img src="../image/1.jpg" width="100%" height="100%" alt="">-->
            </el-carousel-item>
          </el-carousel>
        </div>

        <el-row :gutter="10">
          <el-col :xs="{span: 12, offset: 1}" :sm="{span: 8, offset: 1}" :md="{span: 6, offset: 1}" :lg="{span: 4, offset: 1}" :xl="{span: 2, offset: 1}"><div class="grid-content bg-purple"><div class="courseClass">
            <img :src=imgSrc width="100%" height="100%" alt=""> </div>
            <el-button size="small" style="margin-left: 100%" type="primary">选课</el-button>
             </div>
          </el-col>

          <el-col :xs="{span: 12, offset: 0}" :sm="{span: 8, offset: 0}" :md="{span: 6, offset: 0}" :lg="{span: 4, offset: 1}" :xl="{span: 2, offset: 1}"><div class="grid-content bg-purple"><div class="courseClass">
            <img :src=imgSrc width="100%" height="100%" alt=""> </div>
            <el-button size="small" style="margin-left: 100%" type="primary">选课</el-button>
          </div>
          </el-col>

          <el-col :xs="{span: 12, offset: 1}" :sm="{span: 8, offset: 1}" :md="{span: 6, offset: 1}" :lg="{span: 4, offset: 1}" :xl="{span: 2, offset: 1}"><div class="grid-content bg-purple"><div class="courseClass">
            <img :src=imgSrc width="100%" height="100%" alt=""> </div>
            <el-button size="small" style="margin-left: 100%" type="primary">选课</el-button>
          </div>
          </el-col>

          <el-col :xs="{span: 12, offset: 1}" :sm="{span: 8, offset: 1}" :md="{span: 6, offset: 1}" :lg="{span: 4, offset: 1}" :xl="{span: 2, offset: 1}"><div class="grid-content bg-purple"><div class="courseClass">
            <img :src=imgSrc width="100%" height="100%" alt=""> </div>
            <el-button size="small" style="margin-left: 100%" type="primary">选课</el-button>
          </div>
          </el-col>

          <el-col :xs="{span: 12, offset: 1}" :sm="{span: 8, offset: 1}" :md="{span: 4, offset: 1}" :lg="{span: 4, offset: 1}" :xl="{span: 2, offset: 1}"><div class="grid-content bg-purple"><div class="courseClass">
            <img :src=imgSrc width="100%" height="100%" alt=""> </div>
            <el-button size="small" style="margin-left: 100%" type="primary">选课</el-button>
          </div>
          </el-col>
        </el-row>

      </el-main>
      <el-footer><span style="color: white">联系我们:</span>   <span style="color: white">110</span>

      </el-footer>
    </el-container>
  </div>

</template>

<script>
import {postRequest} from "@/utils/api";

export default {
  name: "CourseStudent",
  data(){
    return{
      imgSrc: require('../image/course1.png'),
      imgList:[
        {
          name: "图片1",
          img:require('../image/courseStudy.png')
        },
        {
          name: "图片2",
          img:require('../image/course2.png')
        },
        {
          name: "图片3",
          img:require('../image/course3.png')
        },
        {
          name: "图片4",
          img:require('../image/course4.png')
        },
      ],
      user:JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  methods:{
    commandHandler(command){
      if (command==='logout'){
        //注销登录
        postRequest('logout');
        //清空用户信息
        window.sessionStorage.removeItem('tokenStr');
        window.sessionStorage.removeItem('user');
        //跳转登录页
        this.$router.replace('/');
      }
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #939090;
  color: #918080;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  height: 600px;
}

.courseClass {
  margin: 20px 50px;
  width: 260px;
  height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-carousel__item h3 {
  color: #8cbbf8;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.homeHeader{
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
}
</style>