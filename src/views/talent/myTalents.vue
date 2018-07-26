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
            <li v-for="(type, index) in typelist" v-on:click="addClass(type.code)" v-bind:class="{ clickli:index==current}" :key="index" :value="type.id"> {{ type.value }}
            </li>
        </ul>
        <ul class="talentlist" v-if='resumelist.length'>
            <li v-for="(resume, index) in resumelist" :key="index">
                <div class="pheader">
                    <div class="header-left"><img :src="resume.headUrl" alt=""></div>
                    <div class="header-right">
                        <p class="p-name">
                             <router-link :to="'/talent/talentdetail?id='+resume.id">
                            <span class="name">{{ resume.name }} - {{ resume.expectedLocation }}</span>
                             </router-link>
                            <span class="time">上传时间:{{ resume.updateTime }}</span>
                        </p>
                        <p class="exprice">{{ resume.sex }} | {{ resume.birthday }} | {{ resume.education }} | {{ resume.jobYear }}年经验 | {{ resume.sex }} | {{ resume.position }} </p>
                    </div>
                </div>
                <div class="pastcom" v-for="(res, index) in resume.busWorkExperienceList" :key="index">
                    {{ res.companyName }} | {{ res.jobTitle }} |
                                
                    <span>
                        <template v-if='res.startTime'>{{ res.startTime.substr(0, 10) }}</template>
                        <template v-else>无</template>
                        -
                        <template v-if='res.endTime'>{{ res.endTime.substr(0, 10) }}</template>
                        <template v-else>无</template>
                    </span>

                    <router-link :to="'/talent/allTalents?companyname='+res.companyName+'&job='+res.jobTitle">
                        <a href="javascript:void(0)">搜索同事</a>
                    </router-link>
                </div>
                <div>
                    <Button type="info" class="addjob" @click='professPop=true'>加入职位</Button>
                    <Button type="success" @click='listGroupPop=true'>分组</Button>
                </div>
            </li>
        </ul>
        <ul v-else>
            <li class='nodatas'>暂无数据</li>
        </ul>
        <div class="tablePage fr" v-if='resumelist.length'>
            <Page :total='sumecan.total' :page-size='sumecan.pageSize' :current='sumecan.pageNum' show-total @on-change='loadLists'></Page>
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
            resumelist: [], //简历列表
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
            sumecan: {
                type: "",
                // total: 100,
                pageNum: 1,
                pageSize: 3
            }
        };
    },
    computed: {},
    methods: {
        addClass: function(index) {
            this.$store.state.spinShow = true;
            this.current = index;
            this.sumecan.type = index;
            this.sumecan.pageNum = 1;
            api
                .axs("post", "/resume/resumeList", this.sumecan)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.resumelist = data.data.list;
                        this.sumecan.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                        console.log(data);
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.sumecan.pageNum = page;
            api
                .axs("post", "/resume/resumeList", this.sumecan)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.resumelist = data.data.list;
                        this.sumecan.total = data.data.total;
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
        api.axs("post", "/resume/resumeList", this.sumecan).then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.resumelist = data.data.list;
                this.sumecan.total = data.data.total;
                this.$Loading.finish();
                this.$store.state.spinShow = false;
            } else {
                this.$Message.error(data.remark);
            }
        });
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
.nodatas {
    color:#666;
    font-size:14px;
    text-align:center;
    padding:30px 0;
}
</style>