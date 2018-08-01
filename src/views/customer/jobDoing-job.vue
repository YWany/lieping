<template>
    <div class="jobDoingJob">
        <div class='currentNav'>当前位置: 客户 >
            <router-link to='/customer/jobDoing'>职位进展</router-link> > 职位运作
        </div>
        <div class="jodDesc">
            <h3>
                <router-link to='/customer/jobDoing/details?jodId=96'><span class='name'>财务总监</span></router-link>
                <Tag type="border" color="green">进行中</Tag>
                <Tag type="border" color="yellow">共享发布</Tag>
                <span class="update fr">更新时间: 2018-02-22</span>
                <span class='fr'>&nbsp;&nbsp;&nbsp;</span>
                <span class="update fr">创建时间: 2018-02-22</span>
            </h3>
            <p class="company clearfix">
                <router-link :to="'/customer/myCustomers/records?id='+id" class='fl'>浙江千里马人力资源有股份有线公司</router-link>
                <!-- <span class="tip fr">投递: 100</span> -->
                <!-- <span class="tip fr">浏览: 235</span> -->
            </p>
            <div class="tags">
                <span>Business Development：<a href="javascript:;">张浩(离职)</a></span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>Consultant：<a href="javascript:;">浪潮群</a></span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>Assistant Consultant：<a href="javascript:;">郎超群</a></span>
            </div>  
            <div class="tags disNone">
                <Tag color="blue">内部共享</Tag>
                <Tag color="green">悬赏发布</Tag>
                <Tag color="yellow">赏金500</Tag>
            </div>
        </div>
        <div class="searchTable">
            <div class="tabsTable">
                <Tabs value="jianli" :animated=false>
                    <TabPane label="候选人" name="jianli">
                        <form class="searches" style='margin-bottom: 15px;'>
                            <div class="search">
                                <Input v-model="hxForm.searchVal" @on-enter='searchIn' placeholder="请输入要搜索的内容...">
                                <Select v-model="hxForm.selVal" slot="prepend" class='search-sels' style="width:80px">
                                    <Option value="候选人">候选人</Option>
                                    <Option value="联系方式">联系方式</Option>
                                    <Option value="名称搜索">名称搜索</Option>
                                </Select>
                                <Button slot="append" icon="ios-search" @click='searchIn'></Button>
                                </Input>
                            </div>
                            <div class="sels">
                                <Select v-model="hxForm.sel1" class='sels-item' placeholder='候选人状态' style="width:100px">
                                    <Option value="部门归属1">部门归属1</Option>
                                    <Option value="部门归属2">部门归属2</Option>
                                </Select>
                                <Select v-model="hxForm.sel2" class='sels-item' placeholder='流程阶段' style="width:100px">
                                    <Option value="客户行业1">客户行业1</Option>
                                    <Option value="客户行业2">客户行业2</Option>
                                </Select>
                                <div class="disInB sels-item">
                                    加入时间:
                                    <DatePicker type="date" v-model='hxForm.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                                    -
                                    <DatePicker type="date" v-model='hxForm.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                                </div>
                                <div class="disInB sels-item">
                                    更新时间:
                                    <DatePicker type="date" v-model='hxForm.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                                    -
                                    <DatePicker type="date" v-model='hxForm.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                                </div>
                                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('hxForm')" style='margin-right:0'>重置</Button>
                                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search " @click="searchIn('selSearch')">搜索</Button>
                            </div>
                        </form>
                        <div class="searchItem">
                            <Button type="ghost">他人推荐 (2)</Button>
                            <Button type="ghost">智能匹配 (18)</Button>
                            <div class="disInb fr">
                                <Button type="text" disabled>推荐企业(1)</Button>
                                <Button type="text" disabled>企业面试(25)</Button>
                                <Button type="text" disabled>Offer(25)</Button>
                                <Button type="text" disabled>上岗(25)</Button>
                                <Button type="text" disabled>过保(25)</Button>
                            </div>
                        </div>
                        <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
                        <div class="tablePage fr">
                            <Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
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
            id: 1,
            loading: false,
            formPage: {
                total: 120,
                current: 1,
                pageSize: 20
            },
            hxForm: {
                searchVal: "",
                selVal: "候选人",
                sel1: "",
                sel2: "",
                sel3: "",
                sel4: "",
                sel5: "",
                sel6: "",
                createDate: "",
                signDate: ""
            },
            hxLists: [],
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
                    title: "性别",
                    key: "phone",
                    width: 45,
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
                    title: "手机",
                    key: "bbb",
                    width: 90,
                    align: "center"
                },
                {
                    title: "邮箱",
                    key: "bbb",
                    width: 90,
                    align: "center"
                },
                {
                    title: "流程阶段",
                    key: "bbb",
                    width: 90,
                    align: "center"
                },
                {
                    title: "状态",
                    key: "bbb",
                    sortable: true,
                    width: 90,
                    align: "center"
                },
                {
                    title: "加入时间",
                    key: "eee",
                    width: 80,
                    align: "center"
                },
                {
                    title: "更新时间",
                    key: "eee",
                    width: 80,
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
                                                "推荐企业!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "推荐企业"
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
                                                "转发简历!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "转发简历"
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
                                                "人才备注!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "人才备注"
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
        searchIn(type) {
            if (this.hxForm.selVal == "候选人") {
                this.hxForm.companyName = this.hxForm.searchVal;
                this.hxForm.bdName = "";
            } else if (this.hxForm.selVal == "联系方式") {
                this.hxForm.bdName = this.hxForm.searchVals;
                this.hxForm.companyName = "";
            }

            if (!this.hxForm.searchVal && type != "selSearch") {
                this.$Message.warning("想搜点什么?");
                return;
            }
            this.formPage.pageNum = 1;
            this.hxLists = [];
            this.loadLists();
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.hxForm.selVal = "候选人";
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
.jobDoingJob {
    .jodDesc {
        border: 1px solid #eee;
        padding: 10px 15px;
        .name {
            vertical-align: text-top;
            margin-right: 5px;
        }
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
            margin: 4px 0;
            font-size: 14px;
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
            a {
                color: #000;
            }
        }
    }
    .tabsTable {
        min-height: 400px;
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
}
</style>
