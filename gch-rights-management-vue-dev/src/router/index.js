import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import Test1 from "../views/userManage/userList";
import Test3 from "../views/roleManage/roleList";
import Test4 from "../views/CourseStudent";
import Test6 from "../views/Test6";
import Test2 from "../views/rootManage/rootList";
import course from "@/views/courseManage/course";
import dept from "@/views/deptManage/dept";
import evaTeaching from "@/views/evaTeachingManage/evaTeaching";
import selTeacherPj from "@/views/evaTeachingManage/selTeacherPj";
import CourseStudent from "@/views/CourseStudent";
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
  {
    path: '/courseStudent',
    name: 'CourseStudent',
    component: CourseStudent,
    hidden:true
  },
  {
    path: '/home',
      name: '用户管理',
    component: Home,
    children:[
      {
        path: '/userList',
        name: '查询用户列表',
        component: Test1
      }
    ]
  },
  {
    path: '/home',
    name: '角色管理',
    component: Home,
    children:[
      {
        path: '/roleList',
        name: '查询角色列表',
        component: Test3
      },
      {
        path: '/test4',
        name: '新增角色',
        component: Test4
      }
    ]

  },
  {
    path: '/home',
    name: '权限管理',
    component: Home,
    children:[
      {
        path: '/test2',
        name: '更改权限',
        component: Test2
      },
      {
        path: '/test6',
        name: '新增权限',
        component: Test6
      }
    ]
  },
  {
    path: '/home',
    name: '课程管理',
    component: Home,
    children:[
      {
        path: '/courseManage',
        name: '课程管理',
        component: course
      }
    ]
  },
  {
    path: '/home',
    name: '院系管理',
    component: Home,
    children:[
      {
        path: '/deptManage',
        name: '院系管理',
        component: dept
      }
    ]
  },
  {
    path: '/home',
    name: '评教体系管理',
    component: Home,
    children:[
      {
        path: '/evaTeachingManage/evaTeaching',
        name: '学生评教',
        component: evaTeaching
      },
      {
        path: '/evaTeachingManage/selTeacherPj',
        name: '学生评教',
        component: selTeacherPj
      }
    ]
  },
]
const router = new VueRouter({
  routes
})

export default router
