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
                    <Option value="客户来源">客户来源</Option>
                </Select>
                <Button slot="append" icon="ios-search" @click='searchIn'></Button>
                </Input>
            </div>
            <div class="sels">
                <Select v-model="form.sel1" class='sels-item' placeholder='部门归属' style="width:100px">
                    <Option value="部门归属1">部门归属1</Option>
                    <Option value="部门归属2">部门归属2</Option>
                </Select>

                <Input slot="append" @on-focus='professPop=true' v-model='professName' :readonly='true' class='selPro' placeholder="选择行业"></Input>
                <Select v-model="form.sel3" class='sels-item' placeholder='客户来源' style="width:100px">
                    <Option value="客户来源1">客户来源1</Option>
                    <Option value="客户来源2">客户来源2</Option>
                </Select>
                <Select v-model="form.sel4" class='sels-item' placeholder='客户重要性' style="width:100px">
                    <Option value="客户重要性1">客户重要性1</Option>
                    <Option value="客户重要性2">客户重要性2</Option>
                </Select>
                <Select v-model="form.sel5" class='sels-item' placeholder='前期服务费' style="width:100px">
                    <Option value="前期服务费1">前期服务费1</Option>
                    <Option value="前期服务费2">前期服务费2</Option>
                </Select>
                <Select v-model="form.sel6" class='sels-item' placeholder='转入客户' style="width:100px">
                    <Option value="转入客户1">转入客户1</Option>
                    <Option value="转入客户2">转入客户2</Option>
                </Select>
                <div class="disInB sels-item">
                    创建时间：
                    <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <div class="disInB sels-item">
                    签约时间：
                    <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
            </div>
        </form>
        <div class="searchTable">
            <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
            <div class="sendBtns fl">
                <Button type="warning">发送短信</Button>
                <Button type="info">发送邮件</Button>
            </div>
            <div class="tablePage fr">
                <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
            </div>
        </div>

        <!-- 新增企业客户弹窗 -->
        <CompanyPop :companyPop='companyPop' />

        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />

    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api"
import ls from "store2"
import CompanyPop from "@/components/customer/addCompanyPop.vue"
import Professions from "@/components/common/professions.vue"
import { mapState, mapMutations, mapActions } from "vuex"
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
            form: {
                sel1: "",
                sel2: "",
                sel3: "",
                sel4: "",
                sel5: "",
                sel6: "",
                createDate: "",
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
                    align: "center"
                },
                {
                    title: "最近沟通",
                    key: "lastFollowTime",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("span", row.lastFollowTime && row.lastFollowTime.substr(0, 10) || '--');
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
                    title: "附件",
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
    methods: {
        ...mapActions(["selTrees"]),
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
        searchIn() {
            if (this.selVal == "企业名称")
                this.form.companyName = this.searchVal;
            else if (this.selVal == "搜索顾问")
                this.form.companyName = this.searchVal;
            else if (this.selVal == "客户来源")
                this.form.companyName = this.searchVal;

            if (!this.searchVal) {
                this.$Message.warning("想搜点什么?");
                return;
            }
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
            this.professPop = false;
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "企业名称";
        }
    },

    mounted() {
        this.loadLists();
        this.selTrees();
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
