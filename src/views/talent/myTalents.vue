<template>
    <div class="myTalents">
        <div class='currentNav'>当前位置: 人才 > 我的人才
            <div class="fr">
                <router-link to='/talent/searchTalents'>
                    <Button type="info" icon='search' class='addNew'>搜索人才</Button>
                </router-link>
                <span>&nbsp;&nbsp;</span>
                <Button type="warning" icon='arrow-up-a' class='addNew'>上传简历</Button>
            </div>
        </div>
        <div>
            <Input placeholder="请输入姓名、公司名、职位等关键词搜索简历、空格分离" clearable style="width: 1000px"></Input>
            <Button class="serbtn" type="primary">搜素</Button>
        </div>
        <ul class="tab">
            <li v-for="(type, index) in typelist" v-on:click="addClass(index)" v-bind:class="{ clickli:index==current}" :key="index" :value="type.id"> {{ type.value }}
            </li>
        </ul>
        <ul class="talentlist">
            <li>
                <div class="pheader">
                    <div class="header-left"><img src="@/assets/images/logo.png" alt=""></div>
                    <div class="header-right">
                        <p class="p-name">
                            <span class="name">徐毅 - 某钛业有限公司</span>
                            <span class="time">上传时间:2018-02-05</span>
                        </p>
                        <p class="exprice">男 | 36 | 西安 | 本科 | 17年经验 | 财务总监兼董秘</p>
                    </div>
                </div>
                <div class="pastcom">
                    浙江生烟草公司丽水市公司 | 财务总监兼董秘 |
                    <span>2010.01-2015.01(3年5个月)</span>
                    <a href="##">搜索同事</a>
                </div>
                <div class="pastcom">
                    浙江生烟草公司丽水市公司 | 财务总监兼董秘 |
                    <span>2010.01-2015.01(3年5个月)</span>
                    <a href="##">搜索同事</a>
                </div>
                <div>
                    <Button type="info" class="addjob" @click='professPop=true'>加入职位</Button>
                    <Button type="success" @click='listGroupPop=true'>分组</Button>
                </div>
            </li>
        </ul>
        <div class="tablePage fr">
            <Page :total='form.total' :page-size='form.pageSize' :current='form.pageNum' show-total @on-change='loadLists'></Page>
        </div>
        <div class="listGroupPop">
            <Modal v-model="listGroupPop" :closable='false' :mask-closable='false' style='text-align:center;' width='360px'>
                <div slot='header' style='font-size:14px;color:#444'>
                    新建分组
                    <a href="javascript:;" @click='listGroupPop=false'>
                        <Icon type="close" class='fr'></Icon>
                    </a>
                </div>
                <Input v-model="addgroupForm.folderName" @on-enter='searchIn' placeholder="请输入分组名称" style='margin:20px auto;width:300px;'>
                <Button slot="append" @click='searchIn'>新增</Button>
                </Input>
                <div class="sels">
                    <RadioGroup v-model="selgroupForm.folderId">
                        <Radio label="分组1"></Radio>
                        <Radio label="分组2"></Radio>
                        <Radio label="分组3"></Radio>
                        <Radio label="分组4"></Radio>
                        <Radio label="分组5"></Radio>
                    </RadioGroup>
                </div>
                <div slot='footer' style='text-align:center'>
                    <Button type='info' @click='subGroupSave'>确定</Button>
                </div>
            </Modal>
        </div>

        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Professions from "@/components/common/professions.vue";

export default {
    name: "myTalents",
    components: {
        Professions
    },
    data() {
        return {
            addGroupPop: false,
            listGroupPop: false,
            professPop: false, //职位弹窗
            groupLists: [], //分组列表
            typelist: [], //类型列表
            resumelist:[],//简历列表
            current: 0,
            addgroupForm: {
                userId: ls.get("accid"),
                folderName: ""
            },
            selgroupForm: {
                folderId: ""
            },
            tabId: 1,
            lists: [],
            form: {
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
                pageSize: 3
            }
        };
    },
    computed: {},
    methods: {
        tabb(id) {
            this.tabId = id;
        },
        addClass: function(index) {
            this.current = index;
        },
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.form.pageNum = page;
            api.axs("post", "/resume/page", this.form).then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.lists = data.data.list;
                    this.form.total = data.data.total;
                    this.$Loading.finish();
                    this.$store.state.spinShow = false;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        getGroupLists() {
            //获取分组列表
            api.axs("post", "/userFolder/folderList").then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.groupLists = data.data;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        subGroupSave() {
            //选择分组
            if (!this.selgroupForm.folderId) {
                this.$Message.warning("请一个分组！");
                return;
            }
            api
                .axs("post", "/userFolder/addUserFolder", this.addgroupForm)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success("新增成功!");
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        handleSubmit(name) {
            //新增分组
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$store.state.spinShow = true;
                    api
                        .axs("post", "/resume/search", this.formValidate)
                        .then(({ data }) => {
                            this.$store.state.spinShow = false;
                            if (data.code === "SUCCESS") {
                                this.$Message.success("新增成功!");
                            } else {
                                this.$Message.error(data.remark);
                            }
                        });
                } else {
                    this.$Message.warning("请填写完整!");
                }
            });
        },
        searchIn() {
            if (!this.form.companyName) {
                this.$Message.warning("想搜点什么?");
                return;
            }
            this.tableLists = [];
            // this.loadLists()
        },
        seltime(date) {
            this.recordsForm.followTime = date;
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
        }
    },
    mounted() {
        api.axs("post", "/resume/queryResumeType").then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.typelist = data.data;
            } else {
                this.$Message.error(data.remark);
            }
        });
        api.axs("post", "/resume/resumeList").then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.typelist = data.data;
            } else {
                this.$Message.error(data.remark);
            }
        });
        this.$store.state.spinShow = false;
    }
};
</script>

<style lang='less' scoped>
.tab {
    width: 100%;
    margin-top: 10px;
    overflow: auto;
    li {
        width: 120px;
        height: 40px;
        float: left;
        // border: 1px solid red;
        text-align: center;
        line-height: 50px;
        // font-weight: 500;
        // font-size: 16px;
        color: #666666;
        cursor: pointer;
    }
    li:hover {
        color: #2d8cf0;
        border-bottom: 1px solid #2d8cf0;
    }
    .clickli {
        color: #2d8cf0;
        border-bottom: 1px solid #2d8cf0;
    }
}

.talentlist {
    width: 100%;
    border: 1px solid #dddddd;
    margin-top: 10px;
    li {
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid #dddddd;
        .pheader {
            width: 100%;
            padding: 10px 0px;
            overflow: auto;
            .header-left {
                width: 50px;
                height: 50px;
                overflow: hidden;
                border-radius: 50%;
                float: left;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .header-right {
                .name {
                    color: #2d8cf0;
                    font-size: 18px;
                }
                .time {
                    float: right;
                }
                .exprice {
                    padding: 5px 0;
                }
            }
        }
        .pastcom {
            padding: 10px 0;
            font-size: 14px;
            span {
                color: #999999;
            }
            a {
                float: right;
            }
        }
        .addjob {
            margin-right: 10px;
        }
    }
}

.ivu-radio-wrapper {
    margin-right: 34px !important;
    padding: 5px 0;
    text-align: left;
}
</style>