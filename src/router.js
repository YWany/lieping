import Vue from "vue"
import Router from "vue-router"
import Login from "./views/Login.vue"
import Main from "./views/Main.vue"

Vue.use(Router)

export default new Router({
    mode: 'hash', //history
    routes: [{
            meta: {
                title: '千里马-登录'
            },
            path: "/login",
            name: "login",
            component: Login
        },
        {
            meta: {
                title: '千里马-首页'
            },
            path: '/',
            name: 'index',
            redirect: {
                name: 'home'
            },
            component: Main,
            children: [{
                    meta: {
                        title: '千里马-首页'
                    },
                    path: '/index',
                    name: 'home',
                    component: () =>
                        import ("./views/Home.vue")
                },
                {
                    meta: {
                        title: '千里马-关于'
                    },
                    path: '/about',
                    name: 'about',
                    component: () =>
                        import ("./views/About.vue")
                },

                { // customer 客户=======================================================
                    meta: {
                        title: '千里马-客户-合作中的客户'
                    },
                    path: '/customer/cooperation',
                    name: 'cooperation',
                    component: () =>
                        import ("./views/customer/cooperation.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-客户合同'
                    },
                    path: '/customer/contract',
                    name: 'contract',
                    component: () =>
                        import ("./views/customer/contract.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-职位进展-职位运作'
                    },
                    path: '/customer/jobDoing',
                    name: 'jobDoing',
                    component: () =>
                        import ("./views/customer/jobDoing.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-职位进展-职位运作'
                    },
                    path: '/customer/jobDoing/job',
                    name: 'jobDoingJob',
                    component: () =>
                        import ("./views/customer/jobDoing-job.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-职位进展-职位详情'
                    },
                    path: '/customer/jobDoing/details',
                    name: 'jobDoingDetails',
                    component: () =>
                        import ("./views/customer/jobDoing-details.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-职位进展-推荐人选'
                    },
                    path: '/customer/jobDoing/recommend',
                    name: 'jobDoingRecommend',
                    component: () =>
                        import ("./views/customer/jobDoing-recommend.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-职位进展-职位运作-候选人详情'
                    },
                    path: '/customer/jobDoing/personalDetails',
                    name: 'jobDoingPersonalDetails',
                    component: () =>
                        import ("./views/customer/jobDoing-personalDetails.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户'
                    },
                    path: '/customer/myCustomers',
                    name: 'myCustomers',
                    component: () =>
                        import ("./views/customer/myCustomers.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户'
                    },
                    path: '/customer/allCustomers',
                    name: 'allCustomers',
                    component: () =>
                        import ("./views/customer/allCustomers.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户'
                    },
                    path: '/customer/overCustomers',
                    name: 'overCustomers',
                    component: () =>
                        import ("./views/customer/overCustomers.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户-记录'
                    },
                    path: '/customer/myCustomers/records',
                    name: 'myCustomersRecords',
                    component: () =>
                        import ("./views/customer/myCustomers-records.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户-合同模板'
                    },
                    path: '/customer/myCustomers/contract',
                    name: 'myCustomersContract',
                    component: () =>
                        import ("./views/customer/myCustomers-contract.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户-合同详情'
                    },
                    path: '/customer/contract/details',
                    name: 'contractDetails',
                    component: () =>
                        import ("./views/customer/contract-details.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户-回款详情'
                    },
                    path: '/customer/myCustomers/backcashDetails',
                    name: 'myCustomersbackcashDetails',
                    component: () =>
                        import ("./views/customer/myCustomers-backcashDetails.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户-新增付款通知书'
                    },
                    path: '/customer/myCustomers/backcash/addAdvice',
                    name: 'myCustomersbackcashAddAdvice',
                    component: () =>
                        import ("./views/customer/myCustomers-backcash-addAdvice.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户-新增发票'
                    },
                    path: '/customer/myCustomers/backcash/addInvoice',
                    name: 'myCustomersbackcashAddInvoice',
                    component: () =>
                        import ("./views/customer/myCustomers-backcash-addInvoice.vue")
                },
                {
                    meta: {
                        title: '千里马-客户-我的客户-发票详情'
                    },
                    path: '/customer/myCustomers/backcash/invoiceDetails',
                    name: 'myCustomersbackcashInvoiceDetails',
                    component: () =>
                        import ("./views/customer/myCustomers-backcash-invoiceDetails.vue")
                },

                { // talent 人才 =======================================================
                    meta: {
                        title: '千里马-人才-我的人才'
                    },
                    path: '/talent/myTalents',
                    name: 'myTalents',
                    component: () =>
                        import ("./views/talent/myTalents.vue")
                },
                {
                    meta: {
                        title: '千里马-人才-所有人才'
                    },
                    path: '/talent/allTalents',
                    name: 'allTalents',
                    component: () =>
                        import ("./views/talent/allTalents.vue")
                },
                {
                    meta: {
                        title: '千里马-人才-下载的简历'
                    },
                    path: '/talent/downResumes',
                    name: 'downResumes',
                    component: () =>
                        import ("./views/talent/downResumes.vue")
                },
                {
                    meta: {
                        title: '千里马-人才-转发的简历'
                    },
                    path: '/talent/zhuanResumes',
                    name: 'zhuanResumes',
                    component: () =>
                        import ("./views/talent/zhuanResumes.vue")
                },
                {
                    meta: {
                        title: '千里马-人才-我的关注'
                    },
                    path: '/talent/myAttention',
                    name: 'myAttention',
                    component: () =>
                        import ("./views/talent/myAttention.vue")
                },
                {
                    meta: {
                        title: '千里马-人才-搜索'
                    },
                    path: '/talent/searchTalents',
                    name: 'searchTalents',
                    component: () =>
                        import ("./views/talent/searchTalents.vue")
                },
                {
                    meta: {
                        title: '千里马-人才-简历详情'
                    },
                    path: '/talent/talentdetail',
                    name: 'talentdetail',
                    component: () =>
                        import ("./views/talent/talentdetail.vue")
                },

                { // postion 职位 =======================================================
                    meta: {
                        title: '千里马-职位-新增职位'
                    },
                    path: '/position/addNewPosition',
                    name: 'positionAddNewPosition',
                    component: () =>
                        import ("./views/position/addNewPosition.vue")
                },
                {
                    meta: {
                        title: '千里马-职位-我的职位'
                    },
                    path: '/position/myPositions',
                    name: 'position/myPositions',
                    component: () =>
                        import ("./views/position/myPositions.vue")
                },
                {
                    meta: {
                        title: '千里马-职位-我的职位-详情'
                    },
                    path: '/position/myPositions/details',
                    name: 'position/myPositions/details',
                    component: () =>
                        import ("./views/position/myPositions-details.vue")
                },
                {
                    meta: {
                        title: '千里马-职位-我的职位-运作-推荐企业'
                    },
                    path: '/position/myPositions/recommendreports',
                    name: 'position/myPositions/recommendreports',
                    component: () =>
                        import ("./views/position/recommendreports.vue")
                },
                {
                    meta: {
                        title: '千里马-职位-我的职位-运作'
                    },
                    path: '/position/myPositions/doing',
                    name: 'position/myPositions/doing',
                    component: () =>
                        import ("./views/position/myPositions-doing.vue")
                },
                {
                    meta: {
                        title: '千里马-职位-职位推荐'
                    },
                    path: '/position/recommend',
                    name: 'position/recommend',
                    component: () =>
                        import ("./views/position/recommend.vue")
                },
                {
                    meta: {
                        title: '千里马-职位-所有职位'
                    },
                    path: '/position/allPositions',
                    name: 'position/allPositions',
                    component: () =>
                        import ("./views/position/allPositions.vue")
                },
                {
                    meta: {
                        title: '千里马-职位-职位公海池'
                    },
                    path: '/position/publicePositions',
                    name: 'position/publicePositions',
                    component: () =>
                        import ("./views/position/publicePositions.vue")
                },

                { // manager 管理 =======================================================
                    meta: {
                        title: '千里马-管理-新增账号'
                    },
                    path: '/manager/addacc',
                    name: 'addacc',
                    component: () =>
                        import ("./views/manager/addacc.vue")
                },
                {
                    meta: {
                        title: '千里马-管理-权限管理'
                    },
                    path: '/manager/authority',
                    name: 'authority',
                    component: () =>
                        import ("./views/manager/authority.vue")
                },
                {
                    meta: {
                        title: '千里马-管理-部门管理'
                    },
                    path: '/manager/department',
                    name: 'department',
                    component: () =>
                        import ("./views/manager/department.vue")
                },
            ]
        }
    ]
})