<template>
    <div class="addBackcashAdvice">
        新增付款通知书
        <div class="advicebox">
            <div class="detail-title">
                基本资料
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="83">
                <FormItem label="接受单位" prop="userName">
                    <Input v-model="formValidate.userName" placeholder="请输入用户名字哦"></Input>
                </FormItem>

                <FormItem label="发出单位" prop="sex">
                    <Input v-model="formValidate.sex" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="接受人员" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="发出人员" prop="userName">
                    <!-- <DatePicker :value='formValidate.account' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker> -->
                    <Input v-model="formValidate.userName" placeholder="请输入用户名字哦"></Input>
                </FormItem>
                <FormItem label="接受人电话" prop="roleId">
                    <Select v-model="formValidate.roleId" placeholder="回款状态">
                        <!-- <Option v-for="(item,index) in rolelist" :value="item.id" :key='index'>{{item.roleName}}</Option> -->
                    </Select>
                </FormItem>
                <FormItem label="发出人电话" prop="none">
                    <Input :readonly="true" v-model="formValidate.none" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <div class="detail-title" style="float:left;">
                    致敬爱的客户
                </div>
                <FormItem label="合同名称" prop="phone">
                    <Select v-model="formValidate.roleId" placeholder="回款状态">
                        <!-- <Option v-for="(item,index) in rolelist" :value="item.id" :key='index'>{{item.roleName}}</Option> -->
                    </Select>
                </FormItem>
                <FormItem label="收费比例" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="候选人姓名" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="上岗时间" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="录用职位" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="年薪" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="总服务费" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="前期服务费" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="付款方式" prop="phone" style="width:100%;">
                    <RadioGroup v-model="formValidate.phone">
                        <span @click="show = true;">
                            <Radio label="1">是</Radio>
                        </span>
                        <span @click="show = false;">
                            <Radio label="2">否</Radio>
                        </span>
                    </RadioGroup>
                </FormItem>
                <FormItem label="付款日期" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="金额" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="本次应收" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入款项金额哦"></Input>
                </FormItem>

                <FormItem label="备注" prop="phone" style="width:100%;">
                    <Input v-model="formValidate.phone" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不少于10字"></Input>
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

export default {
    name: "addBackcashAdvice",
    components: {},
    data() {
        return {
            formValidate: {
                show: true,
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
    methods: {},
    mounted() {
        this.$store.state.spinShow = false;
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addBackcashAdvice {
    .advicebox {
        width: 100%;
        border: 1px solid #dddddd;
        padding: 10px;
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
