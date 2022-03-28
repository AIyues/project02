<template>
  <div>
      <el-container>
        <el-header class="homeHeader">
          <div class="title">教师通用评教系统</div>
          <el-dropdown class="userInfo" @command="commandHandler">
            <span class="el-dropdown-link">
            {{user.name}}<i><img src="" alt=""></i>
           </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="logout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
<br>
        <el-container>
          <el-aside width="210px">
                <el-menu default-active="2"
                         class="el-menu-vertical-demo"
                         router unique-opened>
              <el-submenu :index="index" v-for="(item,index) in routes"
                          :key="index" v-if="!item.hidden">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.menuName}}</span>
                </template>
                <el-menu-item :index="children.path" v-for="(children,indexj) in item.children ">
                  {{children.menuName}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <el-breadcrumb  v-if="this.$router.currentRoute.path!='/home'" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
              欢迎来到浩康权限管理系统首页
            </div>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>

import {getRequest,postRequest} from "../utils/api";

export default {
  name: "Home",
  computed:{
    routes(){
      return this.$store.state.routes;
    }
  },
  data(){
    return{
      user:JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  methods:{

    handleEdit(index,data){

    },
    handleDelete(index,data){

    },
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
<style>
.homeHeader{
  background: #6dd6f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title{
  font-size: 30px;
  font-family: 楷体,serif;
  color: #4a3c3c;
}
.homeHeader .userInfo{
  cursor: pointer;
}
.homeWelcome{
  text-align: center;
  font-size: 30px;
  font-family: 华文楷体,serif;
  color: #409eff;
  padding-top: 50px;
}
</style>