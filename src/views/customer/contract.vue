<template>
    <div class="customer">
        <div class='currentNav'>当前位置:  客户 > 客户合同
            <Button type="info" class='addNew fr'>
                <Icon type="arrow-down-c"></Icon> 下载</Button>
            <span class='fr'>&nbsp;&nbsp;</span>
            <!-- <Button type="success" class='addNew fr' @click='contractPop=true'>
                    <Icon type="plus"></Icon> 创建新合同</Button> -->
        </div>
        <form class="searches">
            <div class="search">
                <Input v-model="form.searchVal" @on-enter='searchIn' placeholder="请输入要搜索的内容...">
                <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                    <Option value="客户名称">客户名称</Option>
                    <Option value="搜索顾问">搜索顾问</Option>
                </Select>
                <Button slot="append" icon="ios-search" @click='searchIn'></Button>
                </Input>
            </div>
            <div class="sels">
                <Select v-model="form.sel1" class='sels-item' placeholder='前期服务费' style="width:100px">
                    <Option value="部门归属1">部门归属1</Option>
                    <Option value="部门归属2">部门归属2</Option>
                </Select>
                <Select v-model="form.sel2" class='sels-item' placeholder='付款方式' style="width:100px">
                    <Option value="客户行业1">客户行业1</Option>
                    <Option value="客户行业2">客户行业2</Option>
                </Select>
                <Select v-model="form.sel3" class='sels-item' placeholder='保证期' style="width:100px">
                    <Option value="客户来源1">客户来源1</Option>
                    <Option value="客户来源2">客户来源2</Option>
                </Select>
                <Select v-model="form.sel4" class='sels-item' placeholder='合同状态' style="width:100px">
                    <Option value="客户重要性1">客户重要性1</Option>
                    <Option value="客户重要性2">客户重要性2</Option>
                </Select>
                <div class="disInB sels-item">
                    签约时间:
                    <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <div class="disInB sels-item">
                    合同到期日:
                    <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search " @click="searchIn('selSearch')">搜索</Button>
            </div>
        </form>
        <div class="searchTable">
            <Table border ref="selection" :columns="tableHeader" :data="hetongLists"></Table>
            <div class="tablePage fr">
                <Page :total='hetongForm.total' :page-size='hetongForm.pageSize' show-total @on-change='getHetongLists'></Page>
            </div>
        </div>

        <!-- 新增合同弹窗 -->
        <!-- <ContractPop :contractPop='contractPop' /> -->

    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import ContractPop from "@/components/customer/addContractPop.vue";
export default {
    name: "home",
    data() {
        return {
            contractPop: false, //新增合同弹窗
            form: {
                searchVal: "",
                selVal: "客户名称",
                sel1: "",
                sel2: "",
                sel3: "",
                sel4: "",
                sel5: "",
                sel6: "",
                createDate: "",
                signDate: ""
            },
            hetongForm: {
                pageNum: 1,
                total: 1,
                pageSize: 10
            },
            hetongLists: [],
            tableHeader: [
                {
                    title: "客户名称",
                    key: "companyName",
                    width: 140,
                    sortable: true,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "BD顾问",
                    key: "bdName",
                    width: 94,
                    sortable: true,
                    align: "center"
                },
                {
                    title: "前期服务费",
                    key: "preFee",
                    width: 94,
                    align: "center"
                },
                {
                    title: "服务费比列",
                    key: "payRatio",
                    sortable: true,
                    width: 94,
                    align: "center"
                },
                {
                    title: "付款方式",
                    key: "payType",
                    width: 65,
                    align: "center"
                },
                {
                    title: "合同开始时间",
                    key: "strartTime",
                    width: 90,
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "span",
                            params.row.strartTime &&
                                params.row.strartTime.substr(0, 10)
                        );
                    }
                },
                {
                    title: "合同结束时间",
                    key: "endTime",
                    maxWidth: 90,
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "span",
                            params.row.endTime &&
                                params.row.endTime.substr(0, 10)
                        );
                    }
                },
                {
                    title: "保证期",
                    key: "ensurePeriod",
                    width: 66,
                    align: "center"
                },
                {
                    title: "合同状态",
                    key: "ggg",
                    width: 66,
                    align: "center",
                    render: (h, params) => {
                        return h("span", "--");
                    }
                },
                {
                    title: "合同编号",
                    key: "code",
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        return h("span", "--");
                    }
                },
                {
                    title: "操作",
                    key: "iii",
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "router-link",
                            {
                                attrs: {
                                    to:
                                        "/customer/contract/details?id=" +
                                        params.row.id +
                                        "&cname=" +
                                        params.row.companyName
                                }
                            },
                            "详情"
                        );
                    }
                }
            ],
            tableLists: [
                {
                    name: "杭州千里马千里马千里马千里马",
                    kehu: "Wanyyyy",
                    phone: "20000",
                    bbb: "50%",
                    ccc: "7:3",
                    ddd: "2018-06-21",
                    eee: "2018-06-21",
                    fff: "6个月",
                    ggg: "已签订",
                    hhh: "ft23456789000"
                },
                {
                    name: "杭州千里马千里马千里马千里马",
                    kehu: "Wanyyyy",
                    phone: "20000",
                    bbb: "50%",
                    ccc: "7:3",
                    ddd: "2018-06-21",
                    eee: "2018-06-21",
                    fff: "6个月",
                    ggg: "已签订",
                    hhh: "ft23456789000"
                }
            ]
        };
    },
    components: {
        ContractPop
    },
    methods: {
        getHetongLists(page) {
            this.$store.state.spinShow = true;
            this.hetongForm.pageNum = page;
            this.hetongForm = this.hetongForm;
            Object.assign(this.hetongForm, this.form);
            api
                .axs("post", "/contract/page", this.hetongForm)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.hetongLists = data.data.list;
                        this.hetongForm.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        searchIn(type) {
            if (this.form.selVal == "客户名称") {
                this.form.companyName = this.form.searchVal;
                this.form.bdName = "";
            } else if (this.form.selVal == "搜索顾问") {
                this.form.bdName = this.form.searchVals;
                this.form.companyName = "";
            }

            if (!this.form.searchVal && type != "selSearch") {
                this.$Message.warning("想搜点什么?");
                return;
            }
            this.hetongForm.pageNum = 1;
            this.hetongLists = [];
            this.getHetongLists();
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "企业名称";
        }
    },

    mounted() {
        this.getHetongLists();
    }
};
</script>

<style lang='less' scoped>
.customer {
}
</style>
