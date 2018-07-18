<template>
    <div class="backcashDetails">
        <div class='currentNav'>当前位置:
            <router-link to='/customer/myCustomers'>我的客户</router-link> >
            <router-link :to="`/customer/myCustomers/records?id=${id}`">
                {{cname}}
                <Rate disabled :value='level' style='font-size:14px'></Rate>
            </router-link>
            >&nbsp;&nbsp;回款详情
        </div>
        <div class="returneddetail">
            <div class="detail-header">
                <p class="p1">SO.20180620001.2</p>
                <p>负责人：{{ massages.dutyUserName }} | 关联职位：-</p>
            </div>
            <div class="detail-button">
                <router-link to='/customer/myCustomers/backcash/addAdvice'>
                    <Button type="primary">新增付款通知书</Button>
                </router-link>
                <router-link to='/customer/myCustomers/backcash/addInvoice'>
                    <Button type="primary">新增发票</Button>
                </router-link>
                <Button type="primary">新增回款</Button>
            </div>
        </div>
        <div class="detail-title">
            基本资料
            <span @click="modal2 = true;">编辑</span>
            <Modal v-model="modal2" title="基本资料">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="关联职位" prop="userName">
                        <Input v-model="formValidate.userName" placeholder="请输入用户名字哦"></Input>
                    </FormItem>

                    <FormItem label="回款编号" prop="sex">
                        <Input v-model="formValidate.sex" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="计划回款" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="实收金额" prop="account">
                        <DatePicker :value='formValidate.account' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                    </FormItem>
                    <FormItem label="未收金额" prop="roleId">
                        <Select v-model="formValidate.roleId" placeholder="回款状态">
                            <!-- <Option v-for="(item,index) in rolelist" :value="item.id" :key='index'>{{item.roleName}}</Option> -->
                        </Select>
                    </FormItem>
                    <FormItem label="回款状态" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="开票金额" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="客户" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="合同" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="回款类型" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="预计回款日期" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="实际收款日期" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                    </FormItem>

                    <FormItem label="回款状态" prop="desc">
                        <Input v-model="formValidate.deptId" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不少于10字"></Input>
                    </FormItem>

                </Form>
                <div slot="footer">

                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空表格</Button>

                </div>
            </Modal>
        </div>
        <ul class="detail-list">
            <li>
                <span>回款编号：</span>{{ massages.contractId }}
            </li>
            <li>
                <span>计划回款金额：</span>{{ massages.amount }}
            </li>
            <li>
                <span>实收金额：</span>--
            </li>
            <li>
                <span>未收金额：</span>--
            </li>
            <li>
                <span>回款状态：</span>{{ massages.fundStatus }}
            </li>
            <li>
                <span>开票金额：</span>{{ massages.invoiceAmount }}
            </li>
            <li>
                <span>客户：</span>{{ massages.dutyUserName }}
            </li>
            <li>
                <span>合同：</span>{{ massages.contractId }}
            </li>
            <li>
                <span>回款类型：</span>{{ massages.fundType }}
            </li>
            <li>
                <span>负责人：</span>{{ massages.dutyUserName }}
            </li>
            <li>
                <span>预计回款日期：</span>{{ massages.receiveTime }}
            </li>
            <li>
                <span>实际收款日期：</span>--
            </li>
            <li>
                <span>备注：</span>{{ massages.instruction }}
            </li>
        </ul>
        <div class="detail-title">
            其他信息
        </div>
        <ul class="detail-list">
            <li>
                <span>创建人：</span>{{ massages.dutyUserName }}
            </li>
            <li>
                <span>创建时间：</span>{{ massages.createTime }}
            </li>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import { UTC2Date } from "@/assets/js/utils.js";
export default {
    name: "backcashDetails",

    data() {
        return {
            id: this.$route.query.id,
            level: +(this.$route.query.level),
            cname: this.$route.query.cname,
            massages:[],
            modal2: false,
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
            }
        };
    },
    components: {},
    methods: {
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
        }
    },

    mounted() {
        this.$store.state.spinShow = false;
        console.log(this.$route.query.id);
        api
            .axs("post", "/receivePlan/info", { id: this.id })
            .then(({ data: { data, code } }) => {
                if (code === "SUCCESS") {
                    this.$Message.success("Success!");
                    console.log(data)
                   this.massages=data;
                } else if (code === "PHONE_REPEAT") {
                    this.$Message.error(" 操作有误");
                }
            });
    }
};
</script>
<style lang='less' scoped>
.backcashDetails {
    .returneddetail {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        display: flex;
        .detail-header {
            flex: 1;
            .p1 {
                color: red;
                margin-bottom: 10px;
                font-weight: 700;
                font-size: 16px;
            }
        }
        .detail-button {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex: 1;

            button {
                margin-right: 20px;
            }
        }
    }
    .detail-title {
        margin: 15px 0;
        padding: 0 10px;
        font-weight: 700;
        border-left: 2px solid #2d8cf0;
        span {
            float: right;
            color: #2d8cf0;
            cursor: pointer;
        }
    }
    .detail-list {
        width: 100%;
        padding: 15px 10px;
        border: 1px solid #ddd;
        li {
            font-size: 14px;
            margin: 10px 0;
            span {
                color: #999999;
            }
        }
    }
}
</style>

