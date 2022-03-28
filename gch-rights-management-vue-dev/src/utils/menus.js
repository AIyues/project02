import {getRequest, postRequest} from "@/utils/api";
import da from "element-ui/src/locale/lang/da";

export const initMenu = (router,store)=>{
    if (store.state.routes.length>0){
        return;
    }
    postRequest('/SelMenuById?id='+JSON.parse(window.sessionStorage.getItem('user')).ttype).then(data=>{
        if (data){
            // 格式化Router
            let fmtRoutes = formatRoutes(data['obj']);
            //添加到router
            router.addRoutes(fmtRoutes);
            //将数据存入vuex
            store.commit('initRoutes',fmtRoutes);
        }
    })
}
export const formatRoutes = (routes) =>{
    let fmtRoutes = [];
    routes.forEach(router=>{
        let{
            path,
            component,
            menuName,
            children,
        }= router;
        if (children && children instanceof Array){
            //递归
             children= formatRoutes(children);
        }
        let fmRouter ={
            path:path,
            menuName:menuName,
            children:children,
            component(resolve){
                if (component.startsWith('Home')){
                    require(['../views/'+component+'.vue'],resolve);
                }
                if (component.startsWith('role')){
                    require(['../views/roleManage'+component+'.vue'],resolve);
                }else if (component.startsWith('user')){
                    require(['../views/userManage'+component+'.vue'],resolve);
                }
                else if (component.startsWith('root')){
                    require(['../views/rootManage'+component+'.vue'],resolve);
                }
            }
        }
        fmtRoutes.push(fmRouter);
    });
    return fmtRoutes;
}