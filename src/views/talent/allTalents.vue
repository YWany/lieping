<template>
    <div class="allTalents">
        <div class='currentNav'>当前位置: 人才 > 所有人才</div>
        <div class="search-box">
            <div class="crux clearfix ">
                <template v-if='!serachitemsShow'>
                    <span>关键词：</span>
                    <Input v-model="keyword" placeholder="请输入搜索关键词" clearable style="width: 200px"></Input>
                    <Button class="serbtn" type="primary" @click='nativesearch(1)'>搜索</Button>
                </template>
                <template v-else>
                    <span style='line-height:32px'>高级搜索</span>
                </template>
                <a class="showup" href="javascript:void(0)" v-if='!serachitemsShow' @click='serachitemsShow=true'>
                    展开搜索条件
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <a class="showup" href="javascript:void(0)" v-else @click='serachitemsShow=false'>
                    收起搜索条件
                    <Icon type="arrow-down-b"></Icon>
                </a>
            </div>
            <div class="searchif" v-show="showif && !serachitemsShow">
                当前搜索条件：
                <Tag type="dot" closable color="green">公司：{{ companyname }} | {{job}}</Tag>
            </div>
        </div>
        <SerachItems ref='searchItemsName' :companyname='companyname' :job='job' v-if='serachitemsShow' />
        <div class="alltalentlist">
            <div class="fristsear">
                <Button @click='gotalentdetail()' class="serbtn" type="primary">批量查看</Button>
                <span>共5000+人选</span>
                <!-- <Form style="float:right;" ref="formValidate" :model="formValidate"  :label-width="80">
                    <FormItem style="width:120px" label="每页显示：">
                       <Select v-model="formValidate.page" placeholder="回款状态">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </Select>
                    </FormItem>
                </Form> -->
            </div>
            <Table border ref="selection" :columns="columns4" :data="searchLists" @on-selection-change="handleRowChange"></Table>
            <div class="tablePage fr" v-if='serachitemsShow && $refs.searchItemsName && $refs.searchItemsName.formValidate.companyName'>
                <Page :total='form.total' :page-size='form.pageSize' :current='form.pageNum' show-total @on-change='$refs.searchItemsName.search2Lits'></Page>
            </div>
            <div class="tablePage fr" v-else>
                <Page :total='form.total' :page-size='form.pageSize' :current='form.pageNum' show-total @on-change='loadLists'></Page>
            </div>
        </div>

        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />
        <Modal v-model="workbut" :closable='false' :mask-closable='false' style='text-align:center;'>
            <div slot='header' style='font-size:14px;color:#444'>
                加入职位
                <a href="javascript:;" @click='workbut=false'>
                    <Icon type="close" class='fr'></Icon>
                </a>
            </div>
            <ul class="re-listpage">
                <!-- <li v-for="(remarks,index) in remarklistpage" :key='index'>
                            <p>{{ remarks.recordContent }}</p>
                            <p>
                                <span>
                                    {{ remarks.createTime }} 来自{{ remarks.createName }}</span>
                            </p>
                        </li> -->
                <li>
                    <RadioGroup v-model="vertical" vertical>
                        <Radio v-for="(alljob,index) in alljoblist" :key='index' :label='alljob.id+","+alljob.companyName+","+alljob.jobName'>

                            <span>{{ alljob.jobName }}</span>/
                            <span>{{ alljob.name }}</span>/
                            <span>{{ alljob.companyName }}</span>
                        </Radio>

                    </RadioGroup>
                </li>
                <div class="tablePage fr">
                    <Page :total='form1.total' :page-size='form1.pageSize' show-total @on-change='loadLists1'></Page>
                </div>
            </ul>

            <div slot='footer' style='text-align:center'>
                <Button type='info' @click='addjob'>确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import { UTC2Date } from "@/assets/js/utils.js";
import Professions from "@/components/common/professions.vue";
import SerachItems from "@/components/talent/searchItems.vue";
export default {
    name: "allTalents",
    components: {
        Professions,
        SerachItems
    },
    data() {
        return {
            companyname: this.$route.query.companyname || "",
            job: this.$route.query.job || "",
            pageTag: 1, //内网
            alljoblist: [], //所有职位
            vertical: "",
            workbut: false,
            verticalform: {
                resumeId: "",
                jobId: "",
                companyName: "",
                candidateName: "",
                jobName: ""
            }, //职位选择
            form1: {
                //加入职位分页
                total: 100,
                pageNum: 1,
                pageSize: 10
            },
            showif: false,
            serachitemsShow: false,
            professPop: false, //职位弹窗
            keyword: "",
            formValidate: {
                page: "10"
            },
            form: {
                companyname: this.$route.query.companyname,
                position: this.$route.query.job,
                deptId: "",
                industryId: "",
                sel2: "",
                companySource: "",
                importantLevel: "",
                preFee: "",
                changeInto: "",
                createTimeStart: "",
                signDate: "",
                total: 100,
                pageNum: 1,
                pageSize: 10
            },

            columns4: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "姓名",
                    key: "name",
                    width: 140,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.$router.push(
                                                "/talent/talentdetail?id=" +
                                                    params.row.id
                                            );
                                        }
                                    }
                                },
                                params.row.name
                            ),
                            h(
                                "Tag",
                                {
                                    props: {
                                        color: "blue"
                                    }
                                },
                                params.row.name
                            )
                        ]);
                    }
                },
                {
                    title: "性别",
                    key: "sex",
                    sortable: true,
                    width: 80,
                    align: "center"
                },
                {
                    title: "年龄",
                    key: "birthday",
                    sortable: true,
                    width: 90,
                    align: "center"
                },
                {
                    title: "学历",
                    key: "education",
                    width: 80,
                    align: "center"
                },
                {
                    title: "工作年限",
                    key: "jobYear",
                    sortable: true,
                    width: 105,
                    align: "center"
                },

                {
                    title: "所在地区",
                    key: "address",
                    width: 100,
                    align: "center"
                },
                {
                    title: "当前职位",
                    key: "position",
                    width: 150,
                    align: "center"
                },
                {
                    title: "目前公司",
                    key: "age",
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "加入时间",
                    key: "createTime",
                    width: 105,
                    sortable: true,
                    align: "center"
                },
                {
                    title: "操作",
                    key: "cz",
                    width: 100,
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
                                            this.workbut = true;
                                            this.verticalform.resumeId = row.id;
                                            this.verticalform.candidateName =
                                                row.name;
                                        }
                                    }
                                },
                                "加入职位"
                            )
                        ]);
                    }
                }
            ],
            searchLists: [],
            resumelist: []
        };
    },
    methods: {
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.form.pageNum = page;

            if (this.companyname) {
                this.form.companyname = this.companyname;
                this.showif = true;
            }
            api.axs("post", "/resume/page", this.form).then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.searchLists = data.data.list;
                    this.form.total = data.data.total;
                    this.$Loading.finish();
                    this.$store.state.spinShow = false;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        loadLists1(page) {
            //职位分页
            this.$store.state.spinShow = true;
            this.form.pageNum = page;
            api.axs("post", "/job/jobPages", this.form1).then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.alljoblist = data.data.list;
                    this.form1.total = data.data.total;
                    this.$Loading.finish();
                    this.$store.state.spinShow = false;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        nativesearch(page) {
            this.$store.state.spinShow = true;
            this.form.pageNum = page;
            if (!this.keyword) {
                this.$Message.warning("请输入关键词");
                return;
            }
            api
                .axs("post", "/resume/page", { keyword: this.keyword })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.searchLists = data.data.list;
                        this.form.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        selPro() {
            //选择职位
            var idName = this.$refs.professionComp.professVal;
            if (!idName) {
                this.$Message.warning("不选一个职位么?");
                return;
            }
            this.professId = idName.split("&")[0];
            this.professName = idName.split("&")[1];
            this.form.industryId = idName.split("&")[0];
            this.professPop = false;

            const title = "成功提示";
            const content = "<p>加入职位成功</p>";
            this.$Modal.success({
                title: title,
                content: content
            });
        },
        addjob() {
            //加入职位
            if (!this.vertical) {
                this.$Message.warning("您还未选择职位");
                return;
            }
            var arrjob = this.vertical.split(",");
            console.log(arrjob);
            this.verticalform.jobId = arrjob[0];
            this.verticalform.companyName = arrjob[1];
            this.verticalform.jobName = arrjob[2];
            api
                .axs("post", "/jobCandidate/save", this.verticalform)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.workbut = false;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        handleRowChange(currentRow, oldCurrentRow) {
            this.resumelist = currentRow;
        },
        gotalentdetail() {
            if (this.resumelist.length == 0) {
                this.$Message.warning("您还未选择简历哦");
            } else {
                ls.set("resumeList", this.resumelist);
                this.$router.push("/talent/talentdetail");
            }
        }
    },
    mounted() {
        this.loadLists();
        this.loadLists1();
    }
};
</script>

<style lang='less' scoped>
.search-box {
    width: 100%;
    padding: 10px;
    background: #f0eeee;
    .serbtn {
        margin-left: 20px;
    }
    .showup {
        float: right;
        margin-top: 7px;
    }
    .searchif {
        width: 100%;
        height: 25px;
        line-height: 25px;
        margin: 10px 0;
    }
}

.alltalentlist {
    width: 100%;
    border: 1px solid #dddddd;
    margin-top: 20px;
    padding: 5px;
    .fristsear {
        margin-bottom: 10px;
        span {
            margin-left: 10px;
        }
    }
}
.re-listpage {
    width: 100%;
    overflow: auto;
    li {
        float: right;
        width: 100%;
        padding: 0.5rem 0.3rem;
        background: rgb(228, 226, 226);
        margin-top: 0.75rem;
        p {
            text-align: left;
            overflow: auto;
            span {
                float: right;
            }
        }
    }
}
</style>