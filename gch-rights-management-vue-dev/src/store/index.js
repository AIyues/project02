
import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        routes:[]
    },
    mutations:{
        initRoutes(state,data){
            state.routes = data;
        }
    },
    actions:{}
})