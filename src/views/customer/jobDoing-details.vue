<template>
    <div class="jobDoingDetails">
        <div class='currentNav'>当前位置: 客户 >
            <router-link to='/customer/jobDoing'>职位进展</router-link> > 职位运作</div>
        <div class="jodDesc">
            <h3>财务总监
                <span class='code'> (职位编号: 123435555)</span>
                <Tag type="border" color="blue">进行中</Tag>
                <Tag type="border" color="green">一般</Tag>
                <Tag type="border" color="yellow">啊哈哈</Tag>
                <span class="update fr">更新时间: 2018-02-22</span>
            </h3>
            <p class="company clearfix">
                <span class='fl'>委托企业: 浙江千里马人力资源有股份有线公司</span>
                <span class="tip fr">投递: 100</span>
                <span class="tip fr">浏览: 235</span>
            </p>
            <div class="tags">
                <Tag color="blue">内部共享</Tag>
                <Tag color="green">悬赏发布</Tag>
                <Tag color="yellow">赏金500</Tag>
            </div>
        </div>
        <div class="searchTable">
            <div class="tabsTable">
                <Tabs value="jianli" :animated=false>
                    <TabPane label="简历" name="jianli">
                        <div class="searchItem">
                            <Button type="ghost">自主寻访</Button>
                            <Button type="ghost">他人推荐</Button>
                            <Button type="ghost">智能匹配</Button>
                            <Button type="text" disabled>CallList(1)</Button>
                            <Button type="text" disabled>推荐简历(25)</Button>
                            <Button type="text" disabled>面试(25)</Button>
                            <Button type="text" disabled>Offer(25)</Button>
                            <Button type="text" disabled>过保(25)</Button>
                            <Button type="text" disabled>淘汰人选(25)</Button>
                        </div>
                        <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
                        <div class="tablePage fr">
                            <Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
                        </div>
                    </TabPane>
                    <TabPane label="职位详情" name="xiangqing">
                        <div class="jobtile">
                            <div class="left-box">
                                <div class="detail-left">

                                    <div class="resume-header">
                                        <div class="re-top">
                                            <div class="re-jobname">
                                                <div class="c-name">
                                                    财务总监兼董秘
                                                    <span>某建筑装饰公司</span>
                                                </div>
                                                <div class="c-money">
                                                    70-100w
                                                </div>
                                            </div>
                                            <div class="re-handle">
                                                <Button class="but1" type="primary" :loading="loading" @click="toLoading">
                                                    <span v-if="!loading">收 藏</span>
                                                    <span v-else>Loading...</span>
                                                </Button>
                                                <Button class="but2" type="primary">立即推荐</Button>
                                            </div>
                                        </div>
                                        <div class="re-up">
                                            <div class="position">
                                                <span>
                                                    <Icon type="navigate"></Icon> 杭州</span>
                                                <span>
                                                    <Icon type="calendar"></Icon> 前天</span>
                                            </div>
                                            <div class="condition">
                                                <span>统招本科</span>
                                                <span>8年以上</span>
                                                <span>语言不限</span>
                                                <span>35-45岁</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="describe">
                                        <div class="des-title">职位描述</div>
                                        <p>
                                            1.熟练掌握公司各项财务系统的运作，并定期进行数据监测、分析； 2.公司的财务管理和审计工作； 3.参与公司有关部门的经济活动分析，审核公司财务计划、成本、价格测算体系等； 4.负责建立健全财务审计档案管理制度，保证审计资料的安全与完整； 5.负责收集整理与财务相关的资料，制定和提供财务分析报告； 6.企业成本管理工作，进行成本预测、控制、核算、分析等工作； 7.数据披露：主持编制、执行和审核公司的各种财务报表，对外披露季报、年报； 8.外部关系：保持与投资人、税务、财政等外部机构和事务所建立良好合作关系；
                                        </p>
                                    </div>
                                    <div class="information">
                                        <div class="info-title">其他信息</div>
                                        <ul class="infolist">
                                            <li>汇报对象：总经理</li>
                                            <li>下属人数：10人</li>
                                            <li>所属行业：汽车/摩托车</li>
                                            <li>所属部门：财务部</li>
                                            <li>企业性质：国内上市公司</li>
                                            <li>企业规模：1000-2000人</li>
                                            <li>专业要求：不限</li>
                                        </ul>
                                    </div>

                                    <div class="salary">
                                        <div class="sal-title">薪酬福利</div>
                                        <ul class="salarylist">
                                            <li>职位年薪：30-60w</li>
                                            <li>薪资构成：基本信息</li>
                                            <li>年假福利：国家标准</li>
                                            <li>社保福利：国家标准</li>
                                            <li>通讯交通：不确定</li>
                                        </ul>
                                    </div>
                                    <div class="remarks">
                                        <div class="remarks-title">补充说明</div>
                                        <p>
                                            3、原则性强，思维敏捷，严谨，工作踏实，认真，有较强的敬业精神。4、具有良好的沟通协调能力，有良好的口头表达能力。5、互联网行 业工作经验者优先。
                                        </p>
                                    </div>
                                    <div class="profile">
                                        <div class="profile-title">企业介绍</div>
                                        <p>
                                            杭州范娱科技有限公司成立于2015年5月，是一家极具潜力的新锐手游公司。公司研发团队多来自业内知名互联网企业（网易、阿里、新浪 、人人、中清龙图、），公司定位精品弱联网单机手游自研、境外社交类手机应用及海外发行业务。研运一体化，并在多个地区搭建多语种 平台，致力打造国际化的游戏平台。
                                        </p>
                                    </div>
                                </div>
                                <div class="work-list">
                                    <div class="list-title">类似岗位</div>
                                    <ul>
                                        <li>
                                            <span class="bold">财务总监</span>
                                            <span class="bold">国内某知名互联网公司</span>
                                            <span class="bold color1">60-90万</span>
                                            <span class="color2">统招本科 | 8年以上 |</span>
                                            <span class="color2">互联网/移动互联网</span>
                                            <span class="color2">杭州</span>
                                        </li>
                                        <li>
                                            <span class="bold">财务总监</span>
                                            <span class="bold">国内某知名互联网公司</span>
                                            <span class="bold color1">60-90万</span>
                                            <span class="color2">统招本科 | 8年以上 |</span>
                                            <span class="color2">互联网/移动互联网</span>
                                            <span class="color2">杭州</span>
                                        </li>
                                        <li>
                                            <span class="bold">财务总监</span>
                                            <span class="bold">国内某知名互联网公司</span>
                                            <span class="bold color1">60-90万</span>
                                            <span class="color2">统招本科 | 8年以上 |</span>
                                            <span class="color2">互联网/移动互联网</span>
                                            <span class="color2">杭州</span>
                                        </li>
                                        <li>
                                            <span class="bold">财务总监</span>
                                            <span class="bold">国内某知名互联网公司</span>
                                            <span class="bold color1">60-90万</span>
                                            <span class="color2">统招本科 | 8年以上 |</span>
                                            <span class="color2">互联网/移动互联网</span>
                                            <span class="color2">杭州</span>
                                        </li>
                                        <li>
                                            <span class="bold">财务总监</span>
                                            <span class="bold">国内某知名互联网公司</span>
                                            <span class="bold color1">60-90万</span>
                                            <span class="color2">统招本科 | 8年以上 |</span>
                                            <span class="color2">互联网/移动互联网</span>
                                            <span class="color2">杭州</span>
                                        </li>
                                        <li>
                                            <span class="bold">财务总监</span>
                                            <span class="bold">国内某知名互联网公司</span>
                                            <span class="bold color1">60-90万</span>
                                            <span class="color2">统招本科 | 8年以上 |</span>
                                            <span class="color2">互联网/移动互联网</span>
                                            <span class="color2">杭州</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- <div class="left-top">
        
                                  </div> -->
                            <div class="detail-right">
                                <div class="promulgator">
                                    <div class="pro-title">职位发布者</div>
                                    <div class="pro-box">
                                        <div class="gator-images"><img src="@/assets/images/logo.png" alt=""></div>
                                        <div class="gator-name">某某某</div>
                                        <div class="gator-post">猎头顾问/猎头一部</div>
                                        <div class="operation">
                                            <Button type="primary">沟通</Button>
                                            <Button type="primary">关注</Button>
                                        </div>
                                    </div>
                                    <div class="lv">
                                        ID：LT67823
                                        <i></i>
                                        <!-- <Icon type="ios-star" v-for="n in 4" :key="n"></Icon> -->
                                    </div>
                                </div>
                                <div class="matching">
                                    <div class="mat-title">智能匹配</div>
                                    <ul class="mat-list">
                                        <li>
                                            <p class="p1">万先生-42岁</p>
                                            <p>董秘兼财务总监 | 2010.1-2018-05</p>
                                            <p>杭州明白网络科技有限公司</p>
                                        </li>
                                        <li>
                                            <p class="p1">万先生-42岁</p>
                                            <p>董秘兼财务总监 | 2010.1-2018-05</p>
                                            <p>杭州明白网络科技有限公司</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="职位日志" name="rizhi">职位日志</TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Menu from "@/components/Menu.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    data() {
        return {
            loading: false,
            formPage: {
                total: 120,
                current: 1,
                pageSize: 20
            },
            tableHeader: [
                {
                    title: "姓名",
                    key: "name",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "router-link",
                            {
                                attrs: {
                                    to:
                                        "/customer/jobDoing/personalDetails?id=" +
                                        row.id
                                }
                            },
                            row.name
                        );
                    }
                },
                {
                    title: "运行状态",
                    key: "kehu",
                    width: 100,
                    sortable: true,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "性别",
                    key: "phone",
                    sortable: true,
                    width: 70,
                    align: "center"
                },
                {
                    title: "工作年限",
                    key: "bbb",
                    sortable: true,
                    width: 90,
                    align: "center"
                },
                {
                    title: "目前公司",
                    key: "ccc",
                    ellipsis: true,
                    width: 140,
                    align: "center"
                },
                {
                    title: "目前职位",
                    key: "ddd",
                    width: 120,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "加入时间",
                    key: "eee",
                    sortable: true,
                    width: 100,
                    align: "center"
                },
                {
                    title: "操作",
                    key: "iii",
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info(
                                                "联系ta!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "联系ta"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info(
                                                "加入CallList!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "加入CallList"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info(
                                                "待定!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "待定"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info(
                                                "关注候选人!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "关注候选人"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info(
                                                "不合适!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "不合适"
                            )
                        ]);
                    }
                }
            ],
            tableLists: [
                {
                    id: 96,
                    name: "Wanyyy",
                    kehu: "这是状态",
                    phone: "男",
                    bbb: "10年",
                    ccc: "浙江千里马股份有限公司",
                    ddd: "财务总监",
                    eee: "2018-10-10"
                },
                {
                    id: 99,
                    name: "Wan0000",
                    kehu: "这是状态",
                    phone: "男",
                    bbb: "10年",
                    ccc: "浙江千里马股份有限公司",
                    ddd: "财务总监",
                    eee: "2015-12-25"
                }
            ]
        };
    },
    components: {
        Menu,
        HelloWorld
    },
    methods: {
        toLoading() {
            this.loading = true;
        },
        loadLists(page) {
            this.$store.state.spinShow = true;
            setTimeout(() => {
                this.$store.state.spinShow = false;
            }, 1500);
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "企业名称";
        }
    },
    mounted() {
        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
    },
    beforeRouteLeave(to, from, next) {
        ls.session("lastRouter", this.$route.fullPath);
        next();
    }
};
</script>

<style lang='less' scoped>
.jobDoingDetails {
    .jodDesc {
        border: 1px solid #eee;
        padding: 10px 15px;
        h3 {
            font-size: 20px;
            .code,
            .update {
                font-size: 14px;
                color: #666;
                margin-right: 10px;
            }
        }
        .company {
            .tip {
                margin: 0 10px;
            }
        }
        .tags {
            margin: 10px 0 0;
            .ivu-tag {
                height: 28px;
                line-height: 28px;
                padding: 0 15px;
            }
        }
    }
    .tabsTable {
        padding: 5px 10px;
        .searchItem {
            margin-bottom: 10px;
            button {
                margin-right: 10px;
            }
            .ivu-btn-text {
                color: #666 !important;
            }
        }
    }
    .jobtile {
        width: 100%;
        .left-box {
            float: left;
            width: 74%;
            // padding: 0.5rem;
            .detail-left {
                width: 100%;
                border: 1px solid #ddd;
                padding: 0.5rem;
                .resume-header {
                    width: 100%;
                    padding: 0.5rem;
                    background: rgba(245, 245, 245, 1);
                    .re-top {
                        width: 100%;
                        border-bottom: 1px dashed #ddd;
                        overflow: auto;
                        .re-jobname {
                            float: left;
                            .c-name {
                                font-size: 1.25rem;
                                span {
                                    font-size: 0.8rem;
                                    color: #999;
                                    margin-left: 0.3rem;
                                }
                            }
                            .c-money {
                                font-size: 1.25rem;
                                color: #ff3333;
                            }
                        }
                        .re-handle {
                            float: right;
                            .but1 {
                                margin-right: 0.3rem;
                            }
                        }
                    }
                    .re-up {
                        width: 100%;
                        .position {
                            padding: 0.5rem 0;
                            span {
                                font-size: 0.85rem;
                                margin-right: 0.5rem;
                            }
                        }
                        .condition {
                            span {
                                padding: 0 0.4rem;
                                border-right: 1px solid #ddd;
                            }
                        }
                    }
                }
                .describe {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    border-bottom: 1px solid #ddd;
                    .des-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    p {
                        color: #666666;
                    }
                }
                .information {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    border-bottom: 1px solid #ddd;
                    .info-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    .infolist {
                        width: 100%;
                        padding: 0 0.5rem;
                        overflow: auto;
                        li {
                            float: left;
                            width: 50%;
                            margin: 0.4rem 0;
                            color: #666666;
                        }
                    }
                }
                .salary {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    border-bottom: 1px solid #ddd;
                    .sal-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    .salarylist {
                        width: 100%;
                        padding: 0 0.5rem;
                        overflow: auto;
                        li {
                            float: left;
                            width: 50%;
                            margin: 0.4rem 0;
                            color: #666666;
                        }
                    }
                }
                .remarks {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    border-bottom: 1px solid #ddd;
                    .remarks-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    p {
                        color: #666666;
                    }
                }
                .profile {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    // border-bottom: 1px solid #ddd;
                    .profile-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    p {
                        color: #666666;
                    }
                }
            }
            .work-list {
                width: 100%;
                border: 1px solid #ddd;
                padding: 0.5rem;
                margin-top: 0.5rem;
                .list-title {
                    padding: 0 0.3rem;
                    margin: 0.5rem 0;
                    font-size: 0.85rem;
                    border-left: 3px solid #2d8cf0;
                }
                ul {
                    width: 100%;
                    padding: 0.5rem;
                    li {
                        width: 100%;
                        overflow: auto;
                        border-bottom: 1px solid #ddd;
                        padding: 0.75rem 0.5rem;
                        span {
                            float: left;
                            width: 33%;
                            margin: 0.2rem 0;
                        }
                        .bold {
                            font-weight: 700;
                        }
                        .color1 {
                            color: red;
                        }
                        .color2 {
                            color: #666666;
                        }
                    }
                }
            }
        }
        .detail-right {
            width: 25%;
            float: right;
            .promulgator {
                width: 100%;
                border: 1px solid #ddd;
                padding: 0.5rem;
                .pro-title {
                    padding: 0 0.3rem;
                    margin: 0.5rem 0;
                    font-size: 0.85rem;
                    border-left: 3px solid #2d8cf0;
                }
                .pro-box {
                    border-bottom: 1px dashed #ddd;
                    .gator-images {
                        width: 4rem;
                        height: 4rem;
                        margin: 0 auto;
                        border-radius: 100px;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .gator-name {
                        font-size: 0.85rem;
                        font-weight: 700;
                        width: 100%;
                        text-align: center;
                        margin: 0.5rem 0;
                    }
                    .gator-post {
                        font-size: 0.75rem;
                        color: #999;
                        width: 100%;
                        text-align: center;
                        margin: 0.5rem 0;
                    }
                    .operation {
                        margin: 0.5rem 0;
                        text-align: center;
                        button {
                            margin-left: 0.2rem;
                        }
                    }
                }
                .lv {
                    text-align: center;
                    padding: 0.4rem 0;
                    i {
                    }
                }
            }
            .matching {
                width: 100%;
                border: 1px solid #ddd;
                padding: 0.5rem;
                margin-top: 0.5rem;
                .mat-title {
                    padding: 0 0.3rem;
                    margin: 0.5rem 0;
                    font-size: 0.85rem;
                    border-left: 3px solid #2d8cf0;
                }
                .mat-list {
                    width: 100%;
                    li {
                        width: 100%;
                        padding: 0.5rem;
                        border: 1px solid #ddd;
                        margin-top: 0.5rem;
                        p {
                            font-size: 0.85rem;
                            padding: 0.3rem 0;
                        }
                        .p1 {
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
}
</style>
