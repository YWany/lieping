import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue"
import Main from "./views/Main.vue"

Vue.use(Router);

export default new Router({
    mode: 'hash', //history
    routes: [{
            meta: { title: '千里马-登录' },
            path: "/login",
            name: "login",
            component: Login
        },
        {
            meta: { title: '千里马-首页' },
            path: '/',
            name: 'index',
            redirect: { name: 'home' },
            component: Main,
            children: [{
                    meta: { title: '千里马-首页' },
                    path: '/index',
                    name: 'home',
                    component: () =>
                        import ("./views/Home.vue")
                },
                {
                    meta: { title: '千里马-关于' },
                    path: '/about',
                    name: 'about',
                    component: () =>
                        import ("./views/About.vue")
                },
            ]
        }
    ]
});