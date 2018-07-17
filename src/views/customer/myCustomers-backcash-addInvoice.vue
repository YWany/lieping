<template>
    <div class="addBackcashInvoice">
        新增发票
        <div class="invoicebox">
            <div class="detail-title">
                发票详情
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="83">
                <FormItem label="开票编号" prop="userName">
                    <Input v-model="formValidate.userName" placeholder="请输入用户名字哦"></Input>
                </FormItem>

                <FormItem label="申请人" prop="sex">
                    <Input v-model="formValidate.sex" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="关联合同" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="关联客户" prop="userName">
                    <!-- <DatePicker :value='formValidate.account' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker> -->
                    <Input v-model="formValidate.userName" placeholder="请输入用户名字哦"></Input>
                </FormItem>
                <FormItem label="款项类型" prop="roleId">
                    <Select v-model="formValidate.roleId" placeholder="回款状态">
                        <!-- <Option v-for="(item,index) in rolelist" :value="item.id" :key='index'>{{item.roleName}}</Option> -->
                    </Select>
                </FormItem>
                <FormItem label="关联回款" prop="none">
                    <Input :readonly="true" v-model="formValidate.none" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="开票金额" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="开票日期" class="datatable">
                    <DatePicker :value='formValidate.account' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>
                </FormItem>
                <FormItem label="发票类型">
                    <Select v-model="formValidate.roleId" placeholder="回款状态">
                        <!-- <Option v-for="(item,index) in rolelist" :value="item.id" :key='index'>{{item.roleName}}</Option> -->
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="desc" style="width:100%;">
                    <Input v-model="formValidate.deptId" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不少于10字"></Input>
                </FormItem>
                <Upload class='up-img' action="//jsonplaceholder.typicode.com/posts/" :format="['jpg','jpeg','png']" :max-size="2048">
                    <span>附件</span>
                    <Button type="ghost">
                        <Icon type="ios-camera-outline"></Icon>
                        <span>图片</span>
                    </Button>
                </Upload>
                <div class="detail-title" style="float:left;">
                    发票信息
                </div>
                <FormItem label="抬头类型" prop="phone">
                    <Select v-model="formValidate.roleId" placeholder="回款状态">
                        <!-- <Option v-for="(item,index) in rolelist" :value="item.id" :key='index'>{{item.roleName}}</Option> -->
                    </Select>
                </FormItem>
                <FormItem label="发票抬头" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="纳税识别号" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="注册电话" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="开票地址" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="开户行" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="开户账号" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <div class="detail-title" style="float:left;">
                    寄送信息
                </div>
                <FormItem label="地址名称" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="联系人" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="联系电话" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="详细地址" prop="phone">
                    <!-- <Cascader  :data="data" v-model="value2"></Cascader> -->

                    <Citysels ref='proCity' />
                </FormItem>
                <FormItem label="邮政编码" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
            </Form>
            <div class="footer">
                <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空表格</Button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api";
import { UTC2Date } from "@/assets/js/utils.js";
import Citysels from "@/components/common/citysels.vue";
export default {
    name: "addBackcashInvoice",
    components: {
        Citysels
    },
    data() {
        return {
            formValidate: {
                password: "",
                userName: "",
                none: "无",
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
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addBackcashInvoice {
    .invoicebox {
        width: 100%;
        padding: 10px;
        border: 1px solid #dddddd;
        .detail-title {
            width: 100%;
            margin: 15px 0;
            padding: 0 10px;
            font-weight: 700;
            border-left: 2px solid #2d8cf0;
        }
        form {
            overflow: auto;
            width: 100%;
            .ivu-form-item-content {
                margin-left: 85px;
                width: 50%;
            }
            .ivu-select-dropdown {
                width: 50% !important;
                left: 0 !important;
            }
            .datatable {
                i {
                    right: 50%;
                }
            }
            .ivu-form-item {
                width: 50%;
                float: left;
                .ivu-input {
                    width: 50%;
                }
                .ivu-select-selection {
                    width: 50%;
                }
                // i{
                //     right: 50%;
                // }
            }
            .up-img {
                float: left;
                span {
                    width: 77px;
                    display: inline-block;
                    text-align: right;
                    padding-right: 5px;
                }
            }
        }
        .footer {
            margin-top: 20px;
            text-align: center;
        }
    }
}
</style>
