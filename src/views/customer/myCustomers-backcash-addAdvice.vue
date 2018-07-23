<template>
    <div class="addBackcashAdvice">
        <div class='currentNav'>当前位置:
            <router-link to='/customer/myCustomers'>我的客户</router-link> >
            <router-link :to="`/customer/myCustomers/records?id=${companyid}`">
                {{companyname}}
                <Rate disabled :value='level' style='font-size:14px'></Rate>
            </router-link>
            >&nbsp;&nbsp;新增付款通知书
        </div>
        <div class="advicebox">
            <div class="detail-title">
                基本资料
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="83">
                <FormItem label="接受单位">
                    <Input disabled style="color:red;" :readonly="true" v-model="formValidate.companyName" placeholder="请输入接受单位名字哦"></Input>
                </FormItem>

                <FormItem label="发出单位">
                    <Input disabled :readonly="true" v-model="formValidate.sendCompanyName" placeholder="请输入款项金额哦"></Input>
                </FormItem>
                <FormItem label="接受人员" prop="contactId">
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
                    <Input v-model="formValidate.contractName" placeholder="请输入合同名称哦"></Input>
                </FormItem>
                <FormItem label="收费比例" prop="payRatio">
                    <Input v-model="formValidate.payRatio" placeholder="请输入收费比例"></Input>
                </FormItem>
                <div v-if="five">
                    <FormItem label="候选人姓名" prop="candidateName">
                        <Input v-model="formValidate.candidateName" placeholder="请输入候选人姓名哦"></Input>
                    </FormItem>
                    <FormItem label="上岗时间">
                        <DatePicker :value='formValidate.startWorkTime' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                    </FormItem>
                    <FormItem label="录用职位" prop="positionName">
                        <Input v-model="formValidate.positionName" placeholder="请输入录用职位哦"></Input>
                    </FormItem>
                    <FormItem label="年薪" prop="annualSalary">
                        <Input @on-change='calculate' v-model="formValidate.annualSalary" placeholder="请输入年薪金额哦"></Input>
                    </FormItem>
                    <FormItem label="总服务费" prop="totalFee">
                        <Input :readonly="true" v-model="formValidate.totalFee" placeholder="请输入总服务费金额哦"></Input>
                    </FormItem>
                </div>
                <FormItem label="前期服务费" prop="preFee">
                    <Input  v-model="formValidate.preFee" placeholder="请输入前期服务费金额哦"></Input>
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
                            <Input v-model="formValidate.payAmount1" placeholder="请输入金额哦"></Input>

                        </FormItem>
                        <Button type="primary" shape="circle" size='small' icon="plus" v-if='addPhoneBtn' @click='addPhones' class='addNewContact'></Button>
                    </li>
                    <li class='li-phone' v-if='addPhone2'>
                        <FormItem label="付款日期">
                            <DatePicker :value='formValidate.payTime2' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                        </FormItem>
                        <FormItem label="金额">
                            <Input v-model="formValidate.payAmount2" placeholder="请输入金额哦"></Input>

                        </FormItem>
                        <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>
                    </li>
                    <li class='li-phone' v-if='addPhone3'>
                        <FormItem label="付款日期">
                            <DatePicker :value='formValidate.payTime3' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                        </FormItem>
                        <FormItem label="金额" prop="">
                            <Input v-model="formValidate.payAmount3" placeholder="请输入金额哦"></Input>

                        </FormItem>
                        <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>
                    </li>
                    <FormItem label="本次应收" prop="">
                        <Input v-model="formValidate.receiveAmount" placeholder="请输入本次应收金额哦"></Input>
                    </FormItem>
                </ul>
                <ul v-else-if="!show">
                    <FormItem label="本次应收">
                        <Input v-model="formValidate.receiveAmount" placeholder="请输入本次应收金额哦"></Input>
                    </FormItem>
                    <FormItem label="付款时间">
                        <DatePicker :value='formValidate.payTime1' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>

                    </FormItem>
                </ul>
                <FormItem label="备注" style="width:100%;">
                    <Input v-model="formValidate.instruction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="必填，若无相关备注，请写“无”"></Input>
                </FormItem>
            </Form>
            <div class="footer">
                <Button type="primary" @click="handleReset('formValidate')">保存</Button>
                <Button type="ghost" @click="handleSubmit('formValidate')" style="margin-left: 8px">发票申请</Button>
                <span style="margin-left: 10px;cursor: pointer;color: #2d8cf0;" @click="getnote">预览</span>
                <Modal width="620" v-model="modal1" title="付款通知书">
                    <div class="book-title">
                        基本资料
                    </div>
                    <ul class="basic">
                        <li>接受单位：{{ formValidate.companyName }}</li>
                        <li>发出单位：{{ formValidate.sendCompanyName }}</li>
                        <li>接收人员：{{ formValidate.contactId }}</li>
                        <li>发出人员：{{ formValidate.sendUserName }}</li>
                        <li>接收人电话：{{ formValidate.contact_phone }}</li>
                        <li>发出人电话：{{ formValidate.sendUserPhone }}</li>
                    </ul>
                    <div class="book-title">
                        致敬爱的客户
                    </div>
                    <ul class="basic">
                        <li>款项内容：{{ formValidate.fundType }}</li>
                        <li>职位名称：{{ formValidate.positionName }}</li>
                        <li>合同名称：人才服务协议</li>
                        <li>付款方式：汇款或转账</li>
                        <li>付款日期：{{ formValidate.payTime1 }}</li>
                        <li>人选姓名：{{ formValidate.candidateName }}</li>
                        <li>人选上岗日期：{{ formValidate.startWorkTime }}</li>
                        <li>年薪：{{ formValidate.annualSalary }}</li>
                        <li>前期服务费：{{ formValidate.preFee }}</li>
                        <li>项目总服务费：{{ formValidate.totalFee }}</li>
                        <li>备注：{{ formValidate.instruction }}</li>
                    </ul>
                    <div class="book-title">
                        请将服务费打入以下账户
                    </div>
                    <ul class="basic2">
                        <li>开户名称：浙江千里马人力资源股份有限公司</li>
                        <li>开户银行：杭州银行学院路支行</li>
                        <li>开户账号：74218100011811</li>
                        <li>财务部电话：0571-89301250</li>
                    </ul>
                    <div slot="footer">
                        <Button type="primary" @click="handleReset('formValidate')">保存</Button>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">发票申请</Button>
                    </div>
                </Modal>
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
            modal1: false,
            show: false,
            five: false,
            trees: this.$store.state.selTrees[14].children,
            companyid: ls.get("companyId"),
            companyname: ls.get("companyName"),
            accid: ls.get("accid"),
            account: ls.get("account"),
            phone: ls.get("phone"),
            contractID: ls.get("contractID"),
            level: ls.get("level"),
            contactlist: [],
            phoneNum: 1,
            addPhoneBtn: true,
            addPhone2: false,
            addPhone3: false,
            addPhone4: false,
            formValidate: {
                contractId: ls.get("contractID"),
                companyId: ls.get("companyId"),
                companyName: ls.get("companyName"),
                receivePlanId: ls.get("receivePlanID"),
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
                payRatio: [
                    {
                        required: true,
                        message: "请输入收费比例",
                        trigger: "blur"
                    }
                ],
                preFee: [
                    {
                        required: true,
                        message: "请输入前期服务费",
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
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    }
                ],
                contactId: [
                    {
                        required: true,
                        message: "请选择相关人员",
                        trigger: "change"
                    }
                ],
                candidateName: [
                    {
                        required: true,
                        message: "请输入候选人",
                        trigger: "blur"
                    }
                ],
                positionName: [
                    {
                        required: true,
                        message: "请输入职位",
                        trigger: "blur"
                    }
                ],
                annualSalary: [
                    {
                        required: true,
                        message: "请输入年薪",
                        trigger: "blur"
                    }
                ]
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
        calculate() {
            this.formValidate.totalFee =
                parseFloat(this.formValidate.payRatio) *
                Number(this.formValidate.annualSalary) /
                100;
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    api
                        .axs(
                            "post",
                            "/receivePlanNotice/add",
                            this.formValidate
                        )
                        .then(({ data: { data, code } }) => {
                            if (code === "SUCCESS") {
                                this.$Message.success("Success!");
                                this.$router.push(
                                    "/customer/myCustomers/backcash/addInvoice?id=" +
                                        ls.get("companyId") +
                                        "&level=" +
                                        ls.get("level") +
                                        "&cname=" +
                                        ls.get("companyName") +
                                        "&tag=fromhk"
                                );
                            }
                        });
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    api
                        .axs(
                            "post",
                            "/receivePlanNotice/add",
                            this.formValidate
                        )
                        .then(({ data: { data, code } }) => {
                            if (code === "SUCCESS") {
                                this.$Message.success("Success!");
                                this.$router.go(-1);
                            }
                        });
                } else {
                    this.$Message.error("Fail!");
                }
            });
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
        },
        getnote() {
            this.modal1 = true;
            api
                .axs("post", "/receivePlanNotice/infoByReceivePlanId", {
                    receivePlanId: ls.get("receivePlanID")
                })
                .then(({ data: { data, code } }) => {
                    if (code === "SUCCESS") {
                        console.log(data);
                    }
                });
        }
    },
    mounted() {
        this.$store.state.spinShow = false;
        console.log(this.companyid);
        console.log(this.companyname);
        api
            .axs("post", "/contact/list", {
                companyId: this.companyid
            })
            .then(({ data: { data, code } }) => {
                if (code === "SUCCESS") {
                    console.log(data);
                    this.contactlist = data;
                    if (data.length === 0) {
                        this.$Message.error("请先添加该公司联系人");
                    }
                }
            });
        api
            .axs("post", "/receivePlanNotice/infoByReceivePlanId", {
                receivePlanId: ls.get("receivePlanID")
            })
            .then(({ data: { data, code } }) => {
                if (code === "SUCCESS") {
                    console.log(data);
                    if (data) {
                        this.modal1 = true;
                        this.formValidate = data;
                    }
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

.book-title {
    width: 100%;
    margin: 10px 0;
    padding: 0 10px;
    font-weight: 700;
    border-left: 2px solid #2d8cf0;
}

.basic {
    width: 100%;
    overflow: auto;
    padding: 0 10px;
    li {
        width: 50%;
        float: left;
        margin-top: 10px;
    }
}

.basic2 {
    width: 100%;
    overflow: auto;
    padding: 0 10px;
    li {
        margin-top: 10px;
    }
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
