<template>
    <div class="jobDoingDetails">
        <div class='currentNav'>当前位置: <router-link to='/customer/jobDoing'>职位进展</router-link> > 职位运作</div>
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
                    <TabPane label="职位详情" name="xiangqing">职位详情</TabPane>
                    <TabPane label="职位日志" name="rizhi">职位日志</TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api"
import ls from "store2"
import Menu from "@/components/Menu.vue"
import HelloWorld from "@/components/HelloWorld.vue"

export default {
    name: "home",
    data() {
        return {
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
                    align: 'center',
                    render: (h, params) => {
                        var row = params.row
                        return h("router-link",{
                            attrs: {
                                to: '/customer/jobDoing/personalDetails?id=' + row.id
                            }
                        },row.name)
                    }
                },
                {
                    title: "运行状态",
                    key: "kehu",
                    width: 100,
                    sortable: true,
                    ellipsis: true,
                    align: 'center'
                },
                {
                    title: "性别",
                    key: "phone",
                    sortable: true,
                    width: 70,
                    align: 'center'
                },
                {
                    title: "工作年限",
                    key: "bbb",
                    sortable: true,
                    width: 90,
                    align: 'center'
                },
                {
                    title: "目前公司",
                    key: "ccc",
                    ellipsis: true,
                    width: 140,
                    align: 'center'
                },
                {
                    title: "目前职位",
                    key: "ddd",
                    width: 120,
                    ellipsis: true,
                    align: 'center'
                },
                {
                    title: "加入时间",
                    key: "eee",
                    sortable: true,
                    width: 100,
                    align: 'center'
                },
                {
                    title: "操作",
                    key: "iii",
                    align: 'center',
                    render: (h, params) => {
                        const row = params.row
                        return h("div", [
                            h("Button", {
                                props: {
                                    type: 'info', //primary、ghost、dashed、text、info、success、warning、error
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '6px'
                                },
                                on: {
                                    click: () => {
                                        this.$Message.info("联系ta!!!" + row.name)
                                    }
                                }
                            }, '联系ta'),
                            h("Button", {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '6px'
                                },
                                on: {
                                    click: () => {
                                        this.$Message.info("加入CallList!!!" + row.name)
                                    }
                                }
                            }, '加入CallList'),
                            h("Button", {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '6px'
                                },
                                on: {
                                    click: () => {
                                        this.$Message.info("待定!!!" + row.name)
                                    }
                                }
                            }, '待定'),
                            h("Button", {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '6px'
                                },
                                on: {
                                    click: () => {
                                        this.$Message.info("关注候选人!!!" + row.name)
                                    }
                                }
                            }, '关注候选人'),
                            h("Button", {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '6px'
                                },
                                on: {
                                    click: () => {
                                        this.$Message.info("不合适!!!" + row.name)
                                    }
                                }
                            }, '不合适')
                        ])
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
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.$Message.info("当前页: " + page)
            setTimeout(() => {
                this.$store.state.spinShow = false
            }, 1500)
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
            this.$Loading.finish()
            this.$store.state.spinShow = false
        }, 1500)
    },
    beforeRouteLeave (to, from, next) {
        ls.session('lastRouter', this.$route.fullPath)
        next()
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
            .code,.update {
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
                color: #666!important
            }
        }
    }
}
</style>
