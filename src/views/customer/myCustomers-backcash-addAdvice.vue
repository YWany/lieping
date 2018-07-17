<template>
    <div class="addBackcashAdvice">
        新增付款通知书
        <div class="advicebox">
            <div class="detail-title">
                基本资料
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="83">
                <FormItem label="接受单位">
                    <Input disabled style="color:red;" :readonly="true" v-model="formValidate.companyName" placeholder="请输入接受单位名字哦"></Input>
                </FormItem>

                <FormItem label="发出单位" prop="sex">
                    <Input disabled :readonly="true" v-model="formValidate.sendCompanyName" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="接受人员">
                    <Select v-model="formValidate.contactId" placeholder="请选择接受人员" @on-change='getphone'>
                        <Option v-for="(item,index) in contactlist" :value="item.id" :key='index'>{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="发出人员">
                    <Input disabled :readonly="true" v-model="formValidate.sendUserName" placeholder="请输入用户名字哦"></Input>
                </FormItem>
                <FormItem label="接受人电话">
                    <Input :readonly="true" v-model="formValidate.contact_phone" placeholder="请输入用户名字哦"></Input>

                </FormItem>
                <FormItem label="发出人电话" prop="none">
                    <Input disabled :readonly="true" v-model="formValidate.sendUserPhone" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <div class="detail-title" style="float:left;">
                    致敬爱的客户
                </div>
                <FormItem label="款项内容" prop="fundType">
                    <Select v-model="formValidate.fundType" placeholder="合同编号" @on-change='getfuntype'>
                        <Option value="PRE_FEE">前期服务费</Option>
                        <Option value="TOTLE_FEE">全部服务费</Option>
                        <Option value="PRE_WITH_FULL">有前期，一次性尾款</Option>
                        <Option value="PRE_WITH_INSTALLMENT">有前期，分期尾款</Option>
                        <Option value="NO_PRE_WITH_INSTALLMENT">无前期，分期尾款</Option>
                    </Select>
                </FormItem>
                <FormItem label="合同名称">
                    <Input disabled :readonly="true" v-model="formValidate.contractName" placeholder="请输入合同名称哦"></Input>
                </FormItem>
                <FormItem label="收费比例">
                    <Input v-model="formValidate.payRatio" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <div v-if="five">
                    <FormItem label="候选人姓名">
                        <Input v-model="formValidate.candidateName" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="上岗时间">
                        <DatePicker :value='formValidate.startWorkTime' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                    </FormItem>
                    <FormItem label="录用职位" prop="">
                        <Input v-model="formValidate.positionName" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="年薪">
                        <Input v-model="formValidate.annualSalary" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="总服务费">
                        <Input v-model="formValidate.totalFee" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                </div>
                <FormItem label="前期服务费">
                    <Input v-model="formValidate.preFee" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="付款方式" style="width:100%;">
                    <RadioGroup v-model="formValidate.settleType">

                        <Radio label="installment" disabled>分期</Radio>

                        <Radio label="fullSection" disabled>一次性</Radio>

                    </RadioGroup>
                </FormItem>
                <ul v-if="show">
                    <li class='li-phone'>
                        <FormItem label="付款日期">
                            <DatePicker :value='formValidate.payTime1' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                        </FormItem>
                        <FormItem label="金额">
                            <Input v-model="formValidate.payAmount1" placeholder="请输入款项金额哦"></Input>

                        </FormItem>
                        <Button type="primary" shape="circle" size='small' icon="plus" v-if='addPhoneBtn' @click='addPhones' class='addNewContact'></Button>
                    </li>
                    <li class='li-phone' v-if='addPhone2'>
                        <FormItem label="付款日期">
                            <DatePicker :value='formValidate.payTime2' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                        </FormItem>
                        <FormItem label="金额">
                            <Input v-model="formValidate.payAmount2" placeholder="请输入款项金额哦"></Input>

                        </FormItem>
                        <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>
                    </li>
                    <li class='li-phone' v-if='addPhone3'>
                        <FormItem label="付款日期">
                            <DatePicker :value='formValidate.payTime3' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                        </FormItem>
                        <FormItem label="金额" prop="">
                            <Input v-model="formValidate.payAmount3" placeholder="请输入款项金额哦"></Input>

                        </FormItem>
                        <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>
                    </li>
                    <FormItem label="本次应收" prop="">
                        <Input v-model="formValidate.receiveAmount" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                </ul>
                <ul v-else-if="!show">
                    <FormItem label="本次应收" prop="phone">
                        <Input v-model="formValidate.receiveAmount" placeholder="请输入款项金额哦"></Input>
                    </FormItem>
                    <FormItem label="付款时间" prop="phone">
                        <DatePicker :value='formValidate.payTime3' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                    </FormItem>
                </ul>
                <FormItem label="备注" style="width:100%;">
                    <Input v-model="formValidate.instruction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不少于10字"></Input>
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
import ls from "store2";
import { UTC2Date } from "@/assets/js/utils.js";
export default {
    name: "addBackcashAdvice",
    components: {},
    data() {
        return {
            show: false,
            five: false,
            trees: this.$store.state.selTrees[14].children,
            companyid: ls.get("companyID"),
            companyname: ls.get("companyName"),
            accid: ls.get("accid"),
            account: ls.get("account"),
            phone: ls.get("phone"),
            contractID: ls.get("contractID"),
            
            contactlist: [],
            phoneNum: 1,
            addPhoneBtn: true,
            addPhone2: false,
            addPhone3: false,
            addPhone4: false,
            formValidate: {
                contractId: ls.get("contractID"),
                companyId: ls.get("companyID"),
                companyName: ls.get("companyName"),
                receivePlanID: ls.get("receivePlanID"),
                sendCompanyName: "浙江千里马人力资源股份有限公司",
                sendCompanyId: "",
                sendUserId: ls.get("accid"),
                sendUserName: ls.get("account"),
                sendUserPhone: ls.get("phone"),
                contactId: "",
                contact_phone: "",
                contractName: " 人才服务协议",
                fundType: "PRE_FEE",
                settleType: "fullSection",
                payRatio: "",
                candidateName: "",
                startWorkTime: UTC2Date(new Date(), "y-m-d h:i:s"),
                positionName: "",
                annualSalary: "",
                totalFee: "",
                preFee: "",
                payTime1: UTC2Date(new Date(), "y-m-d h:i:s"),
                payAmount1: "",
                payTime2: UTC2Date(new Date(), "y-m-d h:i:s"),
                payAmount2: "",
                payTime3: UTC2Date(new Date(), "y-m-d h:i:s"),
                payAmount3: "",
                receiveAmount: "",
                instruction: ""
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
        addPhones() {
            this.phoneNum += 1;

            if (this.phoneNum > 3) this.addPhoneBtn = false;
            if (this.phoneNum == 2) this.addPhone2 = true;
            if (this.phoneNum == 3) this.addPhone3 = true;
            if (this.phoneNum == 4) this.addPhone4 = true;
        },
        delPhones() {
            this.phoneNum -= 1;
            if (this.phoneNum < 4) this.addPhoneBtn = true;
            if (this.phoneNum == 1) {
                this.addPhone2 = false;
                this.formValidate.phone = "";
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    api
                        .axs("post", "/receivePlanNotice/add", this.formValidate)
                        .then(({ data: { data, code } }) => {
                            if (code === "SUCCESS") {
                                this.$Message.success("Success!");
                               
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
        getphone() {
            for (var i = 0; i < this.contactlist.length; i++) {
                if (this.contactlist[i].id === this.formValidate.contactId) {
                    this.formValidate.contact_phone = this.contactlist[
                        i
                    ].phone1;
                }
            }
        },
        getfuntype() {
            // alert(this.formValidate.fundType);
            if (this.formValidate.fundType == "PRE_FEE") {
                this.five = false;
                this.show = false;
                this.formValidate.settleType = "fullSection";
            } else if (this.formValidate.fundType == "TOTLE_FEE") {
                this.five = true;
                this.show = false;
                this.formValidate.settleType = "fullSection";
            } else if (this.formValidate.fundType == "PRE_WITH_FULL") {
                this.five = true;
                this.show = false;
                this.formValidate.settleType = "fullSection";
            } else if (this.formValidate.fundType == "PRE_WITH_INSTALLMENT") {
                this.five = true;
                this.show = true;
                this.formValidate.settleType = "installment";
            } else if (
                this.formValidate.fundType == "NO_PRE_WITH_INSTALLMENT"
            ) {
                this.five = true;
                this.show = true;
                this.formValidate.settleType = "installment";
            }
        }
    },
    mounted() {
        this.$store.state.spinShow = false;
        console.log(this.companyid);
        console.log(this.companyname);
        api
            .axs("post", "/contact/list", { companyId: this.companyid })
            .then(({ data: { data, code } }) => {
                if (code === "SUCCESS") {
                    console.log(data);
                    this.contactlist = data;
                }
            });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.colors {
    color: red !important;
}
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
            .li-phone {
                display: flex;
                width: 100%;
                .addNewContact {
                    margin-top: 5px;
                }
            }
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
