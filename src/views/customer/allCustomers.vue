<template>
    <div class="myCustomers">
        <div class='currentNav'>当前位置: 客户 > 我的客户
            <div class='fr'>
                <Select v-model='creatVal' placeholder='创建' @on-change='createDo' style="width:70px">
                    <Option value='客户'>客户</Option>
                    <Option value='联系人'>联系人</Option>
                    <Option value='合同'>合同</Option>
                </Select>
                <span>&nbsp;&nbsp;</span>
                <Button type="success" class='addNew'>导入</Button>
                <span>&nbsp;&nbsp;</span>
                <Button type="info" class='addNew'>客户查重</Button>
            </div>
        </div>
        <form class="searches">
            <div class="search">
                <Input v-model="form.companyName" @on-enter="searchIn(1)" placeholder="请输入客户名称进行搜索...">
                <Button slot="append" icon="ios-search" @click="searchIn(1)"></Button>
                </Input>
            </div>
            <div class="sels">
                <Select v-model="form.deptId" class='sels-item' placeholder='部门归属' style="width:150px">
                    <Option v-for="(dept,index) in deptlist" :key="index" :value="dept.id">{{ dept.departmentName }}</Option>
                </Select>
                <Input slot="append" @on-focus='professPop=true' v-model='professName' :readonly='true' class='selPro' placeholder="选择行业" style="width:150px"></Input>
                <Select v-model="form.companySource" class='sels-item' placeholder='客户来源' style="width:150px">
                    <Option v-for="(tree,index) in allTrees.companysource" :key="index" :value="tree.code">{{ tree.codeText }}</Option>
                </Select>
                <Select v-model="form.importantLevel" class='sels-item' placeholder='客户重要性' style="width:150px">
                    <Option v-for="(imports,index) in allTrees.importancelist" :key="index" :value="imports.code">{{ imports.codeText }}</Option>
                </Select>
                <Select v-model="form.statelist" class='sels-item' placeholder='客户状态' style="width:150px">
                    <Option v-for="(money,index) in allTrees.statelist" :key="index" :value="money.code">{{ money.codeText }}</Option>
                </Select>
                <div class="disInB sels-item">
                    创建时间：
                    <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <div class="disInB sels-item">
                    更新时间：
                    <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <div class="disInB sels-item">
                    最后联系时间：
                    <DatePicker type="date" v-model='form.lastStartTime' placeholder="开始时间" style="width: 110px"></DatePicker> -
                    <DatePicker type="date" v-model='form.lastEndTime' placeholder="结束时间" style="width: 110px"></DatePicker>
                </div>
                <Input v-model="form.kehu" placeholder="客户提供人" style="width:100px;margin-right:10px"></Input>
                <Input v-model="form.bdName" placeholder="BD顾问名字" style="width:100px;margin-right:10px"></Input>
                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search" @click="searchIn('selSearch')">搜索</Button>
            </div>
        </form>
        <div class="searchTable">
            <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
            <div class="tablePage fr">
                <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
            </div>
        </div>

        <Modal v-model="recordPop" :closable=false width='400px'>
            <p slot="header">
                <span>最近更新记录</span>
                <Button type="primary" size='small' icon="plus" class='fr' @click='addRecord'></Button>
            </p>
            <ul class="popContent" style='max-height: 335px;overflow-y: scroll'>
                <li v-for='list in contactLists' :key='list.id'>
                    <h4 class="name">{{list.contactName}}</h4>
                    <p class="desc">{{list.followRecord}}</p>
                    <p class="time">
                        <span>{{list.followType}}</span>
                        <time>{{list.followTime}}</time>
                    </p>
                </li>
            </ul>
            <p slot='footer' style='text-align:center'></p>
        </Modal>
        <Modal v-model="pickPop" width='400px' style='text-align:center'>
            <p slot="header">
                <span>提示</span>
            </p>
            <p class="content" style='padding:10px 0'>确定要捞取
                <strong>{{pickName}}</strong> 吗?</p>
            <p slot='footer' style='text-align:center;'>
                <Button type="primary" size='small' @click='surePick'>确定</Button>
            </p>
        </Modal>

        <!-- 新增跟进提醒弹窗 -->
        <AttePop :attePop='attePop' :atteCompanyId='atteCompanyId' :atteCompanyName='atteCompanyName' />

        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />

    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import AttePop from "@/components/customer/addAttePop.vue";
import CompanyPop from "@/components/customer/addCompanyPop.vue";
import Professions from "@/components/common/professions.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: "home",
    data() {
        return {
            id: "",
            creatVal: "",
            recordPop: false,
            pickPop: false,
            cname: "",
            attePop: false, //新增提醒弹窗
            atteCompanyId: "",
            atteCompanyName: "",
            professName: "",
            professId: "",
            professPop: false,
            pickId: "",
            pickName: "",
            deptlist: [],
            form: {
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
                pageSize: 10
            },
            tableHeader: [
                {
                    title: "操作",
                    key: "iii",
                    width: 60,
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
                                            this.pickId = row.id;
                                            this.pickName = row.companyName;
                                            this.pickPop = true;
                                        }
                                    }
                                },
                                "捞取"
                            )
                        ]);
                    }
                },
                {
                    title: "客户状态",
                    key: "companyStatus",
                    width: 94,
                    sortable: true,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        if (
                            this.allTrees.statelist.length &&
                            this.allTrees.statelist[+row.companyStatus]
                        ) {
                            return h(
                                "span",
                                this.allTrees.statelist[+row.companyStatus].codeText
                            );
                        }
                    }
                },
                {
                    title: "客户名称",
                    key: "companyName",
                    width: 140,
                    ellipsis: true,
                    render: (h, params) => {
                        var row = params.row;
                        return h("span", row.companyName);
                    }
                },
                {
                    title: "客户重要性",
                    key: "importantLevel",
                    width: 95,
                    sortable: true,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("Rate", {
                            props: {
                                value: +row.importantLevel,
                                disabled: true
                            }
                        });
                    }
                },
                {
                    title: "联系人",
                    key: "contactName",
                    width: 94,
                    align: "center"
                },
                {
                    title: "联系方式",
                    key: "contactPhone1",
                    width: 94,
                    align: "center"
                },
                {
                    title: "未联系时间",
                    key: "outOfContactDays",
                    width: 86,
                    align: "center"
                },
                {
                    title: "跟进记录",
                    key: "lastFollowRecord",
                    align: "center",
                    render: (h, params) => {
                        var row = params.row;
                        if (row.lastFollowRecord) {
                            return h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.atteCompanyId = row.id;
                                            this.cname = row.companyName;
                                            this.getContactLists(row.id);
                                        }
                                    }
                                },
                                row.lastFollowRecord.substr(0, 10) + "..."
                            );
                        } else {
                            return h("span", "无记录");
                        }
                    }
                },
                {
                    title: "客户来源",
                    key: "eee",
                    maxWidth: 94,
                    align: "center"
                },
                {
                    title: "创建时间",
                    key: "createTime",
                    width: 80,
                    align: "center"
                },
                {
                    title: "更新时间",
                    key: "updateTime",
                    width: 80,
                    align: "center"
                }
            ],
            tableLists: [],
            contactLists: []
        };
    },
    components: {
        AttePop,
        Professions
    },
    computed: {
        allTrees() {
            return this.$store.state.allTrees;
        }
    },
    methods: {
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.form.pageNum = page;
            api.axs("post", "/company/freePage", this.form).then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.tableLists = data.data.list;
                    this.form.total = data.data.total;
                    this.$Loading.finish();
                    this.$store.state.spinShow = false;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        getContactLists(id) {
            //记录
            api
                .axs("post", "/contactRecord/page", {
                    companyId: id
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.contactLists = data.data.list.slice(0, 2);
                        this.recordPop = true;
                        this.loadLists(this.form.pageNum);
                    } else {
                        this.$Message.error(data.remark);
                        this.recordPop = true;
                    }
                });
        },
        searchIn(type) {
            if (type == 1 && !this.form.companyName) {
                this.$Message.warning("想搜点什么?");
                return;
            }
            this.form.pageNum = 1;
            this.tableLists = [];
            this.loadLists();
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
        },
        addRecord() {
            //添加记录
            this.$Message.info("添加记录~~");
            this.$router.push(
                "/customer/myCustomers/records?cname=" +
                    this.cname +
                    "&id=" +
                    this.atteCompanyId
            );
        },
        surePick() {
            api
                .axs("post", "/company/pickUp", {
                    id: this.pickId
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success("打捞成功!");
                        this.loadLists();
                        this.pickPop = false
                    } else {
                        this.$Message.error(data.remark);
                        this.pickPop = false
                    }
                });
        },
        createDo(val) {
            this.$Message.info(val + "1000000000");
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.pageSize = 10;
        }
    },

    mounted() {
        this.loadLists();
        api.axs("post", "/dept/info", {}).then(({ data: { data, code } }) => {
            this.deptlist = data;
            console.log(this.deptlist);
        });
    }
};
</script>

<style lang='less' scoped>

.popContent {
    li {
        border-bottom: 1px solid #eee;
        padding: 10px 0;
        .name {
            font-size: 16px;
            font-weight: bold;
        }
        .desc {
            line-height: 16px;
            padding: 6px 0 10px;
        }
        .time {
            span {
                color: #4f8ae4;
            }
            time {
                float: right;
            }
        }
    }
}
.selPro {
    width: 100px;
    margin: 10px;
    margin-left: 0;
    text-align: center;
}
</style>