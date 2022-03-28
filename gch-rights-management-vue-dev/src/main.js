import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {getRequest} from "./utils/api";
import {initMenu} from "@/utils/menus";
import {downloadRequest} from "@/utils/download";

Vue.prototype.downloadRequest = downloadRequest;

Vue.config.productionTip = false

Vue.use(ElementUI);
router.beforeEach((to,from,next) =>{
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router,store);
    if (!window.sessionStorage.getItem('user')) {
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user', JSON.stringify(resp));
          next();
        }
      })
    }
    next();
  }else {
    if (to.path=='/'){
      next();
    }else {
      next('/?redirect'+to.path);
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


