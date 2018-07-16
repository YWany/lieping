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
                        <FormItem label="创建人" prop="userName">
                            <Input v-model="formValidate.userName" placeholder="请输入用户名字哦"></Input>
                        </FormItem>
                        <FormItem label="合同编号" prop="roleId">
                            <Select v-model="formValidate.roleId" placeholder="合同编号">
                                <!-- <Option v-for="(item,index) in rolelist" :value="item.id" :key='index'>{{item.roleName}}</Option> -->
                            </Select>
                        </FormItem>
                        <FormItem label="款项类型" prop="sex">
                            <Input v-model="formValidate.sex" placeholder="请输入款项金额哦"></Input>
                        </FormItem>
                        <FormItem label="款项金额" prop="phone">
                            <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                        </FormItem>
                        <FormItem label="回款时间" prop="account">
                            <DatePicker :value='formValidate.account' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                        </FormItem>
                        <FormItem label="回款状态" prop="roleId">
                            <Select v-model="formValidate.roleId" placeholder="回款状态">
                                <!-- <Option v-for="(item,index) in rolelist" :value="item.id" :key='index'>{{item.roleName}}</Option> -->
                            </Select>
                        </FormItem>
                        <FormItem label="回款说明" prop="desc">
                            <Input v-model="formValidate.deptId" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不少于10字"></Input>
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
            <TabPane label="代收款(3)" name="name1">
                <div class="searchTable">
                    <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>

                </div>
            </TabPane>
            <TabPane label="已收款(3)" name="name2">
                <div class="searchTable">
                    <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
                </div>
            </TabPane>
        </Tabs>
        <div class="tablePage fr leta">
            <Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
        </div>
    </div>
</template>

<script>
import api from "@/api";
import { UTC2Date } from "@/assets/js/utils.js";
export default {
    name: "backcash",
    props: [],
    components: {},
    data() {
        return {
            subFlag: true,
            modal1: false,
            form: {
                createDate: "",
                signDate: ""
            },
            genjinTrees: this.$store.state.selTrees.length && this.$store.state.selTrees[5].children,
            pageNum: "1",
            pageSize: "10",
            formPage: {
                total: 120,
                current: 1,
                pageSize: 10
            },
            formValidate: {
                password: "",
                userName: "",
                roleId: "",
                deptId: "",
                account: UTC2Date(new Date(), "y-m-d h:i:s"),
                sex: "1",
                locked: true,
                isLeader: "2"
            },
            ruleValidate: {
                userName: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                account: [
                    {
                        required: true,
                        message: "请输入登陆账号",
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

                sex: [],
                isLeader: [],
                phone: [
                    { required: true, message: "请输入手机号", trigger: "blur" }
                ],
                roleId: [
                    { required: true, message: "未赋予角色", trigger: "change" }
                ],
                deptId: [
                    { required: true, message: "未赋予部门", trigger: "change" }
                ],
                locked: [{ required: true, trigger: "change" }]
            },
            tableHeader: [
                {
                    title: "状态",
                    key: "name",
                    width: 140,
                    align: "center",
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "router-link",
                            {
                                attrs: {
                                    to:
                                        "/customer/myCustomers/contract?jodId=" +
                                        row.id
                                }
                            },
                            row.name
                        );
                    }
                },
                {
                    title: "应汇款时间",
                    key: "hhh",
                    width: 120,
                    align: "center"
                },
                {
                    title: "逾期天数",
                    key: "hhh",
                    width: 120,
                    align: "center"
                },

                {
                    title: "款项金额",
                    key: "bbb",
                    sortable: true,
                    width: 94,
                    align: "center"
                },

                {
                    title: "发票",
                    key: "ddd",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "款项内容",
                    key: "phone",
                    width: 94,
                    align: "center"
                },
                {
                    title: "负责人",
                    key: "phone",
                    width: 94,
                    align: "center"
                },
                {
                    title: "对应合同",
                    key: "phone",
                    width: 94,
                    align: "center"
                },
                {
                    title: "对应职位",
                    key: "phone",
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
            tableLists: [
                {
                    id: 96,
                    name: "猎头协议",
                    kehu: "浙江千里马股份有限公司",
                    phone: "Yuxinhua",
                    bbb: "进行中",
                    ccc: "1",
                    ddd: "23",
                    eee: "10",
                    fff: "00",
                    ggg: "00",
                    hhh: "2018-10-10 12:30:40",
                    hhh: "2018-10-10 12:30:40"
                },
                {
                    id: 97,
                    name: "招商CEO招商CEO",
                    kehu: "浙江千里马股份有限公司",
                    phone: "Yuxinhua",
                    bbb: "进行中",
                    ccc: "1",
                    ddd: "23",
                    eee: "10",
                    fff: "00",
                    ggg: "00",
                    hhh: "2018-10-10 12:30:40",
                    hhh: "2018-10-10 12:30:40"
                }
            ]
        };
    },
    methods: {
        loadLists(page) {
            // this.clickTab(name);
            this.$store.state.spinShow = true
            setTimeout(() => {
                this.$store.state.spinShow = false;
            }, 1500);
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    console.log(this.formValidate);

                    if (this.local == true) {
                        api
                            .axs("post", "/user/save", {
                                account: this.formValidate.account,
                                password: this.formValidate.password,
                                phone: this.formValidate.phone,
                                sex: this.formValidate.sex,
                                userName: this.formValidate.userName,
                                roleId: this.formValidate.roleId,
                                deptId: this.formValidate.deptId,
                                locked: this.formValidate.locked,
                                isLeader: this.formValidate.isLeader
                            })
                            .then(({ data: { data, code } }) => {
                                if (code === "SUCCESS") {
                                    this.$Message.success("Success!");
                                    this.modal1 = false;
                                    this.Init(this.pageNum);
                                } else if (code === "PHONE_REPEAT") {
                                    this.$Message.error(" 该手机账号已存在");
                                } else if (code === "ACCOUNT_EXIST") {
                                    this.$Message.error(" 该登陆账号已存在");
                                }
                            });
                    } else {
                        api
                            .axs("post", "/user/update", {
                                id: this.id,
                                account: this.formValidate.account,
                                phone: this.formValidate.phone,
                                sex: this.formValidate.sex,
                                userName: this.formValidate.userName,
                                roleId: this.formValidate.roleId,
                                deptId: this.formValidate.deptId,
                                locked: this.formValidate.locked,
                                isLeader: this.formValidate.isLeader
                            })
                            .then(({ data: { data, code } }) => {
                                if (code === "SUCCESS") {
                                    this.$Message.success("Success!");
                                    this.modal1 = false;
                                    this.Init(this.pageNum);
                                } else if (code === "PHONE_REPEAT") {
                                    this.$Message.error(" 该手机账号已存在");
                                }
                            });
                    }
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
    mounted() {}
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
