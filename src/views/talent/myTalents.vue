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
            <Input v-model="value14" placeholder="请输入姓名、公司名、职位等关键词搜索简历、空格分离" clearable style="width: 1000px"></Input>
            <Button class="serbtn" type="primary">搜素</Button>
        </div>
        <ul class="tab">
            <li @click="tabb(1)" :class="tabId === 1 ? 'clickli' : ''">全部人才</li>
            <li @click="tabb(2)" :class="tabId === 2 ? 'clickli' : ''">上传的私有人才</li>
            <li @click="tabb(3)" :class="tabId === 3 ? 'clickli' : ''">推荐的人才</li>
            <li @click="tabb(4)" :class="tabId === 4 ? 'clickli' : ''">面试的人才</li>
            <li @click="tabb(5)" :class="tabId === 5 ? 'clickli' : ''">录用的人才</li>
            <li @click="tabb(6)" :class="tabId === 6 ? 'clickli' : ''">上岗的人才</li>
            <li @click="tabb(7)" :class="tabId === 7 ? 'clickli' : ''">过保的人才</li>
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
                    <Button type="info" class="addjob">加入职位</Button>
                    <Button type="success">分组</Button>
                </div>
            </li>
        </ul>
        <div class="tablePage fr">
            <Page :total='form.total' :page-size='form.pageSize' :current='form.pageNum' show-total @on-change='loadLists'></Page>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
export default {
    name: "myTalents",
    data() {
        return {
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
                pageSize: 10
            }
        };
    },
    components: {},
    computed: {},
    methods: {
        tabb(id) {
            this.tabId = id;
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
        }
    },
    mounted() {
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
</style>