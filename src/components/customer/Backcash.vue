<template>
    <div class="backcash">
        <form class="searches">
            <div class="sels">
                <div class="disInB sels-item">
                    创建时间:
                    <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <div class="disInB sels-item">
                    更新时间:
                    <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>

                <Button type="info" class='fr sels-item' @click="modal1 = true;">添加回款计划</Button>
                <Modal v-model="modal1" title="新增回款计划">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="合同序号" prop="contractId">
                            <Select v-model="formValidate.contractId" placeholder="合同编号">
                                <Option v-for="(pact,index) in pactlist" :value="pact.id" :key='index'>{{pact.num}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="款项类型" prop="fundType">
                            <Select v-model="formValidate.fundType" placeholder="合同编号">
                                <Option v-for="(tree,index) in trees" :value="tree.code" :key='index'>{{tree.codeText}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="款项状态" prop="fundStatus">
                            <Select v-model="formValidate.fundStatus" placeholder="回款状态">
                                <Option value="unPayed">等待打款</Option>
                                <Option value="payed">已经打款</Option>

                            </Select>
                        </FormItem>
                        <FormItem label="关联职位">
                            <Input v-model="formValidate.positionId" placeholder="请输入关联职位"></Input>
                        </FormItem>
                        <FormItem label="款项金额" prop="amount">
                            <Input v-model="formValidate.amount" placeholder="请输入款项金额哦"></Input>
                        </FormItem>
                        <FormItem label="应回款时间" prop="receiveTime">
                            <DatePicker :value='formValidate.receiveTime' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                        </FormItem>
                        <FormItem label="是否已开发票" prop="">
                            <RadioGroup v-model="formValidate.invoiceStatus">
                                <span @click="show = true;">
                                    <Radio label="1">是</Radio>
                                </span>
                                <span @click="show = false;">
                                    <Radio label="2">否</Radio>
                                </span>
                            </RadioGroup>
                        </FormItem>
                        <div v-if="this.show==true">
                            <FormItem label="发票金额">
                                <Input v-model="formValidate.invoiceAmount" placeholder="请输入款项金额哦"></Input>
                            </FormItem>

                        </div>
                        <FormItem label="回款负责人">
                            <Input :readonly='true' v-model="formValidate.dutyUserName" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="回款说明" prop="instruction">
                            <Input v-model="formValidate.instruction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不少于10字"></Input>
                        </FormItem>

                    </Form>
                    <div slot="footer">

                        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空表格</Button>

                    </div>
                </Modal>
            </div>
        </form>
        <Tabs size='small' :animated=false class="subTabs" value="name1">
            <TabPane label="代收款" name="name1">
                <div class="searchTable">
                    <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>

                </div>
                <div class="tablePage fr leta">
                    <Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
                </div>
            </TabPane>
            <TabPane label="已收款" name="name2">
                <div class="searchTable">
                    <Table border ref="selection" :columns="tableHeader1" :data="tableLists1"></Table>
                </div>
                <div class="tablePage fr leta">
                    <Page :total='formPage1.total' :page-size='formPage1.pageSize' show-total @on-change='loadLists1'></Page>
                </div>
            </TabPane>
        </Tabs>

    </div>
</template>

<script>
import api from "@/api";
import ls from "store2";
import { UTC2Date } from "@/assets/js/utils.js";
export default {
    name: "backcash",
    props: [],
    components: {},
    data() {
        return {
            show: true,
            id: this.$route.query.id,
            subFlag: true,
            modal1: false,
            pageNum: "1",
            pageSize: "10",
            trees: this.$store.state.selTrees[14].children,
            hkstatus: this.$store.state.selTrees[16].children,
            pactlist: [],
            form: {
                createDate: "",
                signDate: ""
            },
            genjinTrees:
                this.$store.state.selTrees.length &&
                this.$store.state.selTrees[5].children,
            pageNum: "1",
            pageSize: "10",
            formPage: {
                total: 120,
                current: 1,
                pageSize: 10
            },
            formPage1: {
                total: 120,
                current: 1,
                pageSize: 10
            },
            formValidate: {
                invoiceAmount: "",
                dutyUserName: "",
                amount: "",
                contractId: "",
                instruction: "",
                receiveTime: UTC2Date(new Date(), "y-m-d h:i:s"),
                fundType: "1",
                fundStatus: "unPayed",
                invoiceStatus: "1",
                dutyUserId: ls.get("id"),
                dutyUserName: ls.get("account")
            },
            ruleValidate: {
                userName: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                receiveTime: [
                    {
                        required: true,
                        message: "请输入日期",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入登陆密码.",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        message: "不能少于6个字符",
                        trigger: "blur"
                    }
                ],

                fundType: [],
                isLeader: [],
                phone: [
                    { required: true, message: "请输入手机号", trigger: "blur" }
                ],
                contractId: [
                    {
                        required: true,
                        message: "请选择合同序号",
                        trigger: "change"
                    }
                ],
                deptId: [
                    { required: true, message: "未赋予部门", trigger: "change" }
                ],
                locked: [{ required: true, trigger: "change" }]
            },
            tableHeader: [
                {
                    title: "状态",
                    key: "fundType",
                    width: 140,
                    align: "center"
                },
                {
                    title: "应汇款时间",
                    key: "receiveTime",
                    width: 120,
                    align: "center"
                },
                {
                    title: "逾期天数",
                    key: "updateTime",
                    width: 120,
                    align: "center"
                },

                {
                    title: "款项金额",
                    key: "amount",
                    sortable: true,
                    width: 94,
                    align: "center"
                },

                {
                    title: "发票",
                    key: "invoiceAmount",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "款项内容",
                    key: "instruction",
                    width: 94,
                    align: "center"
                },
                {
                    title: "负责人",
                    key: "dutyUserName",
                    width: 94,
                    align: "center"
                },
                {
                    title: "对应合同",
                    key: "contractId",
                    width: 94,
                    align: "center"
                },
                {
                    title: "对应职位",
                    key: "positionId",
                    width: 94,
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
                                            this.$router.push(
                                                "/customer/myCustomers/backcashDetails?id="+ row.id
                                            ) 
                                        }
                                    }
                                },
                                "详情"
                            )
                        ]);
                    }
                }
            ],
            tableHeader1: [
                {
                    title: "状态",
                    key: "fundType",
                    width: 140,
                    align: "center"
                },
                {
                    title: "应汇款时间",
                    key: "receiveTime",
                    width: 120,
                    align: "center"
                },
                {
                    title: "逾期天数",
                    key: "updateTime",
                    width: 120,
                    align: "center"
                },

                {
                    title: "款项金额",
                    key: "amount",
                    sortable: true,
                    width: 94,
                    align: "center"
                },

                {
                    title: "发票",
                    key: "invoiceAmount",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "款项内容",
                    key: "instruction",
                    width: 94,
                    align: "center"
                },
                {
                    title: "负责人",
                    key: "dutyUserName",
                    width: 94,
                    align: "center"
                },
                {
                    title: "对应合同",
                    key: "contractId",
                    width: 94,
                    align: "center"
                },
                {
                    title: "对应职位",
                    key: "positionId",
                    width: 94,
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
                                            this.$router.push(
                                                "/customer/myCustomers/backcashDetails?id="
                                            ) + row.id;
                                        }
                                    }
                                },
                                "详情"
                            )
                        ]);
                    }
                }
            ],
            tableLists: [],
            tableLists1: []
        };
    },
    methods: {
        Init: function(page) {
            var _this = this;

            api
                .axs("post", "/receivePlan/list", {
                    pageNum: page,
                    fundStatus: "unPayed"
                })
                .then(({ data: { data, code } }) => {
                   
                    _this.formPage.total = data.total;
                    _this.formPage.pageSize = data.pageSize;
                    _this.tableLists = data;
                });

            api
                .axs("post", "/receivePlan/list", {
                    pageNum: page,
                    fundStatus: "payed"
                })
                .then(({ data: { data, code } }) => {
                   
                    _this.formPage.total = data.total;
                    _this.formPage1.pageSize = data.pageSize;
                    _this.tableLists1 = data;
                });
        },

        loadLists(page) {
            // this.clickTab(name);
            this.$store.state.spinShow = true;
            setTimeout(() => {
                this.$store.state.spinShow = false;
            }, 1500);
        },
        loadLists1(page) {
            // this.clickTab(name);
            this.$store.state.spinShow = true;
            setTimeout(() => {
                this.$store.state.spinShow = false;
            }, 1500);
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    api
                        .axs("post", "/receivePlan/add", this.formValidate)
                        .then(({ data: { data, code } }) => {
                            if (code === "SUCCESS") {
                                this.$Message.success("Success!");
                                this.modal1 = false;
                                this.Init(this.pageNum);
                            }
                        });
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        seltime(date) {
            this.formValidate.account = date;
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
        }
    },
    mounted() {
        this.Init(this.pageNum);
        console.log(ls.get("account"));
        api
            .axs("post", "/contract/page", {
                id: this.id
            })
            .then(({ data: { data, code } }) => {
                if (code === "SUCCESS") {
                    this.pactlist = data.list;
                } else if (code === "PHONE_REPEAT") {
                    this.$Message.error(" 该公司还未有合同");
                }
            });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.backcash {
    width: 85%;
    position: relative;
    .search {
        width: 100%;
    }
}
</style>
