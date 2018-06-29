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
                {
                    meta: { title: '千里马-客户-合作中的客户' },
                    path: '/customer/cooperation',
                    name: 'cooperation',
                    component: () =>
                        import ("./views/customer/cooperation.vue")
                },
                {
                    meta: { title: '千里马-客户-客户合同' },
                    path: '/customer/contract',
                    name: 'contract',
                    component: () =>
                        import ("./views/customer/contract.vue")
                },
                {
                    meta: { title: '千里马-客户-职位进展-职位运作' },
                    path: '/customer/jobDoing',
                    name: 'jobDoing',
                    component: () =>
                        import ("./views/customer/jobDoing.vue")
                },
                {
                    meta: { title: '千里马-客户-职位进展-职位运作-候选人详情' },
                    path: '/customer/jobDoing/personalDetails',
                    name: 'jobDoingPersonalDetails',
                    component: () =>
                        import ("./views/customer/jobDoing-personalDetails.vue")
                },
            ]
        }
    ]
})