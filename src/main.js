// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from "axios"
import 'iview/dist/styles/iview.css'
import 'jquery'
Vue.config.productionTip = false
Vue.prototype.axios = axios;
// import store from './vuex/store' // 引入store
Vue.use(iView)
    //判断登陆
router.beforeEach((to, from, next) => {
    // console.log(localStorage);
    // console.log(to);
    // console.log(from);
    // 本地传值给vuex
    // if (!store().state.userName) {
    //     if (localStorage.userName) {
    //         // 多个双引号
    //         let userName = localStorage.userName
    //         store().state.userName = userName.replace("\"", "").replace("\"", "")
    //     }
    //     if (localStorage.isLogin) {
    //         // 多个双引号
    //         let IsLogIn = localStorage.isLogin
    //         store().state.IsLogIn = IsLogIn.replace("\"", "").replace("\"", "")
    //     }
    // }
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token
            next();
        } else {
            next({
                path: '/login/name1',
            })
            Vue.prototype.$Message.info("请先登录或注册")
        }
        /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
        if (to.fullPath == "/login") {
            if (JSON.parse(localStorage.getItem('islogin'))) {
                next({
                    path: from.fullPath
                });
            } else {
                next();
            }
        }
    } else {
        next();
    }
});
new Vue({
    el: '#app',
    router,
    // store,
    components: { App },
    data: {
        Bus: new Vue()
    },
    template: '<App/>'
})