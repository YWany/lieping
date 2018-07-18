<template>
    <div class="cooperation">
        <div class='currentNav'>当前位置: 合作中客户
            <Button type="success" class='addNew fr' @click='companyPop=true'>
                <Icon type="plus"></Icon> 录入新客户</Button>
        </div>
        <form class="searches">
            <div class="search">
                <Input v-model="searchVal" @on-enter='searchIn' placeholder="请输入要搜索的内容...">
                <Select v-model="selVal" slot="prepend" class='search-sels' style="width:80px">
                    <Option value="企业名称">企业名称</Option>
                    <Option value="搜索顾问">搜索顾问</Option>
                    <!-- <Option value="客户来源">客户来源</Option> -->
                </Select>
                <Button slot="append" icon="ios-search" @click='searchIn'></Button>
                </Input>
            </div>
            <div class="sels" v-if='allTrees.length'>
                <Select v-model="form.deptId" class='sels-item' placeholder='部门归属' style="width:150px">
                    <Option v-for="(dept,index) in deptlist" :key="index" :value="dept.id">{{ dept.departmentName }}</Option>
                </Select>

                <Input slot="append" @on-focus='professPop=true' v-model='professName' :readonly='true' class='selPro' placeholder="选择行业" style="width:150px"></Input>
                <Select v-model="form.companySource" class='sels-item' placeholder='客户来源' style="width:150px">
                    <Option v-for="(tree,index) in allTrees[1].children" :key="index" :value="tree.code">{{ tree.codeText }}</Option>
                </Select>
                <Select v-model="form.importantLevel" class='sels-item' placeholder='客户重要性' style="width:150px">
                    <Option v-for="(imports,index) in allTrees[6].children" :key="index" :value="imports.code">{{ imports.codeText }}</Option>
                </Select>
                <Select v-model="form.preFee" class='sels-item' placeholder='前期服务费' style="width:150px">
                    <Option v-for="(money,index) in allTrees[7].children" :key="index" :value="money.code">{{ money.codeText }}</Option>
                </Select>
                <Select v-model="form.changeInto" class='sels-item' placeholder='转入客户' style="width:100px">
                    <Option v-for="(peoples,index) in allTrees[8].children" :key="index" :value="peoples.code">{{ peoples.codeText }}</Option>
                </Select>
                <div class="disInB sels-item">
                    签约时间：
                    <DatePicker type="date" v-model='form.signRange' placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" @on-change='seltime3' style="width: 180px"></DatePicker>
                </div>
                <div class="disInB sels-item">
                    创建时间：
                    <DatePicker type="date" v-model='form.createTimeStart' placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" @on-change='seltime1' style="width: 180px"></DatePicker> -- 
                    <DatePicker type="date" v-model='form.createTimeEnd' placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" @on-change='seltime2' style="width: 180px"></DatePicker>
                </div>
                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search" @click="searchIn('selSearch')">搜索</Button>
            </div>
        </form>
        <div class="searchTable">
            <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
            <div class="sendBtns fl">
                <Button type="warning">发送短信</Button>
                <Button type="info">发送邮件</Button>
            </div>
            <div class="tablePage fr">
                <Page :total='form.total' :page-size='form.pageSize' :current='form.pageNum' show-total @on-change='loadLists'></Page>
            </div>
        </div>

        <!-- 新增企业客户弹窗 -->
        <CompanyPop :companyPop='companyPop' />

        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />

    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import CompanyPop from "@/components/customer/addCompanyPop.vue";
import Professions from "@/components/common/professions.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: "cooperation",
    components: {
        CompanyPop,
        Professions
    },
    data() {
        return {
            companyPop: false, //新增企业客户弹窗
            professPop: false, //职位弹窗
            selVal: "企业名称",
            searchVal: "",
            professName: "",
            professId: "",
            deptlist: [],
            form: {
                deptId: "",
                industryId: '',
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
            tableLists: [],
            tableHeader: [
                {
                    type: "selection",
                    width: 45,
                    align: "center"
                },
                {
                    title: "客户名称",
                    key: "companyName",
                    width: 140,
                    ellipsis: true,
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "a",
                            {
                                on: {
                                    click: () => {
                                        this.$router.push(
                                            "/customer/myCustomers/records?id=" +
                                                row.id
                                        );
                                    }
                                }
                            },
                            row.companyName
                        );
                    }
                },
                {
                    title: "客户重要性",
                    key: "importantLevel",
                    width: 95,
                    sortable: true,
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
                    title: "客户联系人",
                    key: "contactName",
                    width: 94
                },
                {
                    title: "手机",
                    key: "contactPhone1",
                    width: 94
                },
                {
                    title: "合作状态",
                    key: "companyStatus",
                    width: 90,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row
                        if (this.allTrees[12].children[row.companyStatus] && this.allTrees[12].children[row.companyStatus].codeText) {
                            return h("span", this.allTrees[12].children[row.companyStatus].codeText)
                        }
                    }
                },
                {
                    title: "最近沟通",
                    key: "lastFollowTime",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h(
                            "span",
                            (row.lastFollowTime &&
                                row.lastFollowTime.substr(0, 10)) ||
                                "--"
                        );
                    }
                },
                {
                    title: "沟通记录",
                    key: "lastFollowRecord",
                    width: 120,
                    ellipsis: true,
                    render: (h, params) => {
                        const row = params.row;
                        return h(
                            "Tooltip",
                            {
                                props: {
                                    content: row.lastFollowRecord || "",
                                    placement: "top"
                                }
                            },
                            [
                                h(
                                    "div",
                                    (row.lastFollowRecord &&
                                        row.lastFollowRecord.substr(0, 5) +
                                            "...") ||
                                        "无记录"
                                )
                            ]
                        );
                    }
                },
                {
                    title: "进行中/总职位",
                    key: "totalPosition",
                    maxWidth: 94,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h(
                            "span",
                            row.doingPosition + " / " + row.totalPosition
                        );
                    }
                },
                {
                    title: "BD顾问",
                    key: "bdName",
                    width: 80
                },
                {
                    title: "文件",
                    key: "totalAttachment",
                    width: 60,
                    align: "center"
                },
                {
                    title: "贡献值",
                    key: "totalPayed",
                    align: "center"
                }
            ]
        };
    },
    computed: {
        allTrees() {
            return this.$store.state.selTrees;
        }
    },
    methods: {
        ...mapActions(["selTrees", "getRoles"]),
        loadLists(page) {
            this.form.pageNum = page;
            this.$store.state.spinShow = true;

            api.axs("post", "/company/allPage", this.form).then(({ data }) => {
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
        searchIn(type) {
            if (this.selVal == "企业名称") {
                this.form.companyName = this.searchVal
                this.form.bdName = ''
            } else if (this.selVal == "搜索顾问") {
                this.form.bdName = this.searchVal
                this.form.companyName = ''
            }  
            if (!this.searchVal && type != 'selSearch') {
                this.$Message.warning("想搜点什么?")
                return
            }
            this.form.pageNum = 1
            this.tableLists = []
            this.loadLists()
        },
        selPro() {
            //选择职位
            var idName = this.$refs.professionComp.professVal;
            if (!idName) {
                this.$Message.warning("不选一个职位么?");
                return;
            }
            this.professId = idName.split("&")[0]
            this.professName = idName.split("&")[1]
            this.form.industryId = idName.split("&")[0]
            this.professPop = false
        },
        seltime1(date) {
            this.form.createTimeStart = date
        },
        seltime2(date) {
            this.form.createTimeEnd = date
        },
        seltime3(date) {
            this.form.signRange = date
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "企业名称";
            this.form.pageSize = 10
        }
    },

     mounted() {
        this.loadLists();
        // this.selTrees();
        api.axs("post", "/dept/info", {}).then(({ data: { data, code } }) => {
            this.deptlist = data;
            console.log(this.deptlist);
        });
        // await this.getRoles()
        // setTimeout(() => {
        //     this.$Loading.finish()
        //     this.$store.state.spinShow = false
        // }, 1500)
    }
};
</script>

<style lang='less' scoped>
.cooperation {
    .selPro {
        width: 100px;
        margin: 10px;
        margin-left: 0;
        text-align: center;
    }
}
</style>
