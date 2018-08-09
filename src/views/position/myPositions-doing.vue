<template>
    <div class="jobDoingDetails">
        <div class='currentNav'>当前位置:
            <router-link to='/position/myPositions'>我的职位</router-link> > 职位运作</div>
        <div class="jodDesc">
            <h3>
                <router-link :to="'/position/myPositions/details?jodId='+this.jodId+'&&jobName='+this.jobName+'&&companyName='+this.companyName+'&&companyid='+this.companyid">{{ jobName }}</router-link>
                <Tag style="margin-left:10px;" type="border" color="blue">进行中</Tag>
                <Tag type="border" color="green">职位发布中</Tag>
                <span class="update fr">更新时间: 2018-02-22</span>
                <span class='fr'>&nbsp;&nbsp;&nbsp;</span>
                <span class="update fr">创建时间: 2018-02-22</span>
            </h3>
            <p class="company clearfix">
                <router-link class='fl' :to="'/customer/myCustomers/records?id=' + this.companyid">委托企业:{{ companyName }}</router-link>
                <!-- <span class='fl'>委托企业: 浙江千里马人力资源有股份有线公司</span> -->
                <span class="tip fr">投递: 100</span>
                <span class="tip fr">浏览: 235</span>
            </p>
            <div class="tags">
                <span>Business Development：
                    <a href="javascript:;">张浩(离职)</a>
                </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>Consultant：
                    <a href="javascript:;">浪潮群</a>
                </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>Assistant Consultant：
                    <a href="javascript:;">郎超群</a>
                </span>
                <span class="tip fr">
                    <Icon type="share"></Icon>
                    <Icon type="compose"></Icon>
                    <!-- <Icon type="ios-eye-outline"></Icon>
                    <Icon type="ios-loop-strong"></Icon>
                    <Icon type="android-arrow-dropright-circle"></Icon>
                    <Icon type="android-warning"></Icon> -->
                </span>
            </div>
        </div>
        <div class="searchTable">
            <div class="tabsTable">
                <Tabs value="jianli" :animated=false>
                    <TabPane label="简历" name="jianli">
                        <form class="searches" style='margin-bottom: 15px;'>
                            <div class="search">
                                <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                                <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                    <Option value="候选人名">候选人名</Option>
                                    <Option value="公司名称">公司名称</Option>
                                </Select>
                                <Button slot="append" icon="ios-search"></Button>
                                </Input>
                            </div>
                            <div class="sels">
                                <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                    <Option value="部门归属1">部门归属1</Option>
                                    <Option value="部门归属2">部门归属2</Option>
                                </Select>
                                <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                                    <Option value="客户行业1">客户行业1</Option>
                                    <Option value="客户行业2">客户行业2</Option>
                                </Select>
                                <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                    <Option value="客户来源1">客户来源1</Option>
                                    <Option value="客户来源2">客户来源2</Option>
                                </Select>
                                <div class="disInB sels-item">
                                    创建时间:
                                    <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                                </div>
                                <div class="disInB sels-item">
                                    更新时间:
                                    <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                                </div>
                                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                            </div>
                        </form>
                        <div class="searchItem">
                            <Button type="ghost">他人推荐</Button>
                            <Button type="ghost">智能匹配</Button>
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
                            <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                        </div>
                        <Modal v-model="ranspond" title="转发简历">
                            <Form ref="" :model="transpondform" :label-width="80">

                                <FormItem label="顾问" prop="sex">
                                    <Select v-model="transpondform.refereeTo" placeholder="请选择顾问">

                                        <Option v-for="(item,index) in userlist" :key='index' :value="item.id">{{item.userName}}</Option>
                                    </Select>
                                </FormItem>

                            </Form>
                            <div slot="footer">

                                <Button @click="transmit" type="primary">保存</Button>
                                <!-- <Button type="ghost" @click="handleReset('ranspond')" style="margin-left: 8px">清空表格</Button> -->

                            </div>
                        </Modal>
                    </TabPane>
                    <TabPane label="职位日志" name="xiangqing">
                        职位日志
                    </TabPane>
                    <TabPane label="跟进记录" name="rizhi">
                        跟进记录
                    </TabPane>
                    <TabPane label="文件" name="wenjian">
                        文件
                    </TabPane>
                    <TabPane label="团队" name="tuandui">
                        团队
                    </TabPane>
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
            jodId: this.$route.query.jodId,
            userlist: [],
            form: {
                searchVal: "",
                selVal: "候选人名",
                sel1: "",
                sel2: "",
                sel3: "",
                sel4: "",
                sel5: "",
                sel6: "",
                createDate: "",
                signDate: "",
                total: 120,
                current: 1,
                pageSize: 20
            },
            ranspond: false,
            transpondform: {
                //转发简历参数
                refereeTo: "",
                id: ls.get("candidateId")
            },

            jodId: this.$route.query.jodId,
            companyName: this.$route.query.companyName,
            companyid: this.$route.query.companyid,
            jobName: this.$route.query.jobName,
            loading: false,
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
                    key: "currentCompanyName",
                    ellipsis: true,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("span", row.currentCompanyName || "--");
                    }
                },
                {
                    title: "目前职位",
                    key: "ddd",
                    width: 100,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "手机",
                    key: "bbb",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("span", row.mobile || "--");
                    }
                },
                {
                    title: "邮箱",
                    key: "email",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("span", row.email || "--");
                    }
                },
                {
                    title: "候选人状态",
                    key: "jobHuntStatus",
                    width: 130,
                    align: "center"
                },
                {
                    title: "状态",
                    key: "bbb",
                    width: 100,
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
                    width: 130,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("div", [
                            h(
                                "router-link",
                                {
                                    props: {
                                        type: "success", //primary、ghost、dashed、text、info、success、warning、error
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    attrs: {
                                        to:
                                            "/position/myPositions/recommendreports?srcId=" +
                                            row.srcId +
                                            "&&resumeId=" +
                                            row.resumeId
                                    }
                                },
                                "推荐企业"
                            ),
                            h(
                                "router-link",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    attrs: {
                                        to:
                                            "/position/myPositions/recommendreports?srcId=" +
                                            row.srcId +
                                            "&&resumeId=" +
                                            row.resumeId
                                    }
                                },
                                "推荐职位"
                            ),
                            h(
                                "a",
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
                                            this.ranspond = true;
                                            ls.set(
                                                "candidateId",
                                                row.candidateId
                                            );
                                        }
                                    }
                                },
                                "转发简历"
                            ),
                            h(
                                "a",
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
                                                "转发简历!!!" + row.name
                                            );
                                            this.ranspond = true;
                                            ls.set(
                                                "candidateId",
                                                row.candidateId
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
                //职位下的人员列表
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
            this.form.pageNum = page;
            api
                .axs("post", "/jobCandidate/myJoinJobs", this.form)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        this.tableLists = data.data.list;
                        this.form.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "候选人名";
        },
        transmit() {
            api
                .axs("post", "/jobCandidate/redirectJob", this.transpondform)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.ranspond = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        this.loadLists();
        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
        api.axs("post", "/user/list").then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.userlist = data.data;
            } else {
                this.$Message.error(data.remark);
            }
        });
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
            span {
                padding: 0 5px;
                i {
                    font-size: 18px;
                    margin: 0 5px;
                    padding: 5px;
                }
            }
            a {
                color: #000;
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
