<template>
    <div class="contractPop">
        <Modal v-model="contractPop" :closable='false' :mask-closable='false' width='900px' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                新建合同
                <a href="javascript:;" @click='closePop'>
                    <Icon type="close" class='fr'></Icon>
                </a>
            </div>
            <ul class="contract-content">
                <li class="company-li">
                    <p>
                        <span>*</span> 合同类型：</p>
                    <Select v-model="contractForm.contractType">
                        <Option :value='tree.code' v-for='tree in hetongTrees'>{{tree.codeText}}</Option>
                    </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 合同模板：</p>
                    <Select v-model='contractForm.templateId'>
                        <Option value="1">模板1</Option>
                        <Option value="2">模板2</Option>
                    </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 客户名称：</p>
                    <Input v-model='contractForm.companyName' :readonly='true'></Input>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 客户来源：</p>
                    <Select v-model="contractForm.companySource">
                        <Option :value='tree.code' v-for='tree in sourceTrees'>{{tree.codeText}}</Option>
                    </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 付款方式：</p>
                    <Select v-model="contractForm.payType">
                        <Option :value='tree.code' v-for='tree in payTrees'>{{tree.codeText}}</Option>
                    </Select>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 前期服务费：</p>
                    <Input v-model='contractForm.preFee' placeholder=""></Input>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 付款比例：</p>
                    <Input v-model='contractForm.payRatio' placeholder="例如: 10%"></Input>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 最低收费：</p>
                    <Input v-model='contractForm.minCharge' placeholder=""></Input>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 合同开始时间：</p>
                    <DatePicker v-model='contractForm.strartTime' format="yyyy-MM-dd HH:mm:ss" @on-change='seltime1' type="date" placeholder="请选择日期"></DatePicker>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 合同开始结束：</p>
                    <DatePicker :value='contractForm.endTime' format="yyyy-MM-dd HH:mm:ss" @on-change='seltime2' type="date" placeholder="请选择日期"></DatePicker>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> 保证期：</p>
                    <Select v-model="contractForm.ensurePeriod">
                        <Option :value='tree.code' v-for='tree in ensurePeriodtree'>{{tree.codeText}}</Option>
                    </Select>
                </li>
                <li class="company-li">
                    <p>甲方在职人员保护期：</p>
                    <Select v-model="contractForm.protectPeriod">
                        <Option :value='tree.code' v-for='tree in protectPeriodtree'>{{tree.codeText}}</Option>
                    </Select>
                </li>

                <li class='company-li line-all'>
                    <p>特殊说明：</p>
                    <Input v-model='contractForm.instruction' type="textarea" :rows="2" placeholder="" style='width:696px'></Input>
                </li>
                <li class="company-li">
                    <p>
                        <span>*</span> BD顾问：</p>
                    <Input v-model='contractForm.bdName' placeholder=""></Input>
                </li>
                <li class="company-li">&nbsp;</li>
                <!-- <li>
                        <p>
                            <span>*</span> 回款计划：</p>
                        <p class='addHuik'>
                            <Button @click='huiK1=true'>添加</Button>
                        </p>
                    </li>
                    <li>&nbsp;</li>
                    <li class='line-all' v-if='huiK1'>
                        <p>
                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='huiK1=false'></Button>
                        </p>
                        <Input v-model='contractFormBody.receivePlanList[0].amount' placeholder="金额" style='width:140px'></Input>
                        &nbsp;&nbsp;
                        <Select v-model='contractFormBody.receivePlanList[0].fundType' placeholder="选择回款类型" style='width:140px'>
                            <Option value="1">前期服务费</Option>
                            <Option value="2">尾款第一期</Option>
                            <Option value="3">尾款第二期</Option>
                            <Option value="4">尾款全部</Option>
                            <Option value="5">全部服务费</Option>
                        </Select> &nbsp;&nbsp;
                        <DatePicker v-model='contractFormBody.receivePlanList[0].receiveTime' format="yyyy-MM-dd HH:mm:ss" @on-change='seltime3' type="date" class='sel-picker' placeholder="请选择回款时间"></DatePicker>
                        &nbsp;&nbsp;
                        <Select v-model="contractFormBody.receivePlanList[0].fundStatus" placeholder="收费类型" style='width:140px'>
                            <Option :value='tree.code' v-for='tree in feeTrees'>{{tree.codeText}}</Option>
                        </Select>
                    </li>
                    <li class='line-all' v-if='huiK1'>
                        <p>&nbsp;&nbsp;</p>
                        <Input v-model='contractFormBody.receivePlanList[0].instruction' type="textarea" :rows="1" placeholder="请填写回款说明" style='width:695px'></Input>
                    </li> -->
                <li class='line-all'>
                    <div style='color:#ff9900'>*已开启合同订单审批，新增合同订单进入待审批中，且在合同订单列表中展示</div>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'>
                <Button type='info' @click='subSave'>保存</Button>
            </div>
        </Modal>

        <!-- 选择联系人 -->
        <Modal v-model="selContactsPop" width='400px' :mask-closable='false' :closable='false'>
            <div slot="header">
                <span style='font-size:14px'>选择联系人</span>
                <a href="javascript:;" class='fr' @click='selContactsPop=false'>
                    <Icon type="close-round"></Icon>
                </a>
            </div>
            <ul class='users-content'>
                <li v-for='user in contactLists'>
                    <RadioGroup v-model="recordsForm.contactId">
                        <Radio :label="user.id + '&' + user.name">
                            <span class='name'>{{user.name}}</span>
                            <span class='depart' v-if='user.incumbency'>在职</span>
                            <span class='depart' v-else style='color:red'>离职</span>
                        </Radio>
                    </RadioGroup>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'>
                <Button type='primary' @click='selContactFun'>确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api";
import ls from "store2";
import { UTC2Date } from "@/assets/js/utils.js";
export default {
    name: "addContractPop",
    props: ["contractPop", "recordsDetails"],
    components: {},
    data() {
        return {
            subFlag: true,
            huiK1: false, //回款计划1
            huiK2: false, //回款计划2
            hetongTrees: this.$store.state.allTrees.contractype, //合同类型
            sourceTrees: this.$store.state.allTrees.companysource, //客户来源
            payTrees:  this.$store.state.allTrees.paytype, //支付类型
            feeTrees: this.$store.state.allTrees.paytype, //收费类型
            contactLists: [], //联系人列表
            selUsersPop: false, //选择BD弹窗
            selContactsPop: false, //选择联系人弹窗
            ensurePeriodtree: this.$store.state.allTrees.ensureperiod, //保护人
            protectPeriodtree: this.$store.state.allTrees.protectperiod,
            userForm: {
                pageNum: 1,
                total: 1,
                pageSize: 6
            },
            userId: "",
            userName: "",
            contractForm: {
                companyId: this.recordsDetails.id,
                companyName: this.recordsDetails.companyName,
                contractType: "",
                companySource: "",
                preFee: "",
                payRatio: "",
                ensurePeriod: "",
                protectPeriod: "",
                templateId: "",
                minCharge: "",
                strartTime: UTC2Date(new Date()),
                endTime: "",
                instruction: "",
                bdName: ls.get("account"),
                bdId: ls.get("accid")
            },
            contractFormError: {
                contractType: "合同类型",
                companyName: "客户名称",
                companySource: "客户来源",
                preFee: "前期费用",
                payRatio: "支付比例",
                ensurePeriod: "保证期",
                minCharge: "最低收费",
                strartTime: "起始时间",
                endTime: "结束时间",
                bdName: "BD顾问"
            },
            contractFormBody: {
                receivePlanList: [
                    {
                        amount: "",
                        fundType: "",
                        fundStatus: "",
                        receiveTime: "",
                        instruction: ""
                    }
                ]
            }
        };
    },
    methods: {
        subSave() {
            var forms = this.contractForm;
            for (var name in forms) {
                if (!forms[name] && this.contractFormError[name]) {
                    this.$Message.error(
                        this.contractFormError[name] + ": 请填写完整!"
                    );
                    return;
                }
            }
            if (this.subFlag) this.subFlag = false;
            else return;
            api
                .axs(
                    "post",
                    "/contract/add",
                    this.contractForm,
                    this.contractFormBody.receivePlanList
                )
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.datas = data;
                        this.$Message.success("新增成功!");
                        this.$parent.tabShow = "hetong";
                        this.$parent.getHetongLists();
                        this.$parent.contractPop = false;
                        this.reset("contractForm");
                        this.contractForm.companyId = this.recordsDetails.id;
                        this.contractForm.companyName = this.recordsDetails.companyName;
                        this.contractForm.strartTime = UTC2Date(new Date());
                        this.contractForm.bdName = ls.get("account");
                        this.contractForm.bdId = ls.get("accid");
                    } else {
                        this.$Message.error(data.remark);
                        this.subFlag = true;
                    }
                });
        },
        selUsersFun(page, type) {
            this.userId = "";
            if (type == "select") this.selUserSelect = true;

            this.userForm.pageNum = page;
            api
                .axs("post", "/user/queryLikeForPages", this.userForm)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$store.state.users = data.data.list;
                        this.userForm.total = data.data.total;
                        this.selUsersPop = true;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        selContactFun() {
            this.userName = this.recordsForm.contactId.split("&")[1];
            this.selContactsPop = false;
        },
        seltime1(date) {
            this.contractForm.strartTime = date;
        },
        seltime2(date) {
            this.contractForm.endTime = date;
        },
        seltime3(date) {
            this.contractFormBody.receivePlanList[0].receiveTime = date;
        },
        closePop() {
            this.$parent.contractPop = false;
            this.reset("contractForm");
            this.contractForm.companyId = this.recordsDetails.id;
            this.contractForm.companyName = this.recordsDetails.companyName;
            this.contractForm.strartTime = UTC2Date(new Date());
            this.contractForm.bdName = ls.get("account");
            this.contractForm.bdId = ls.get("accid");
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
        }
    },
    mounted() {
        
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.contract-content {
    & > .company-li{
        margin-bottom: 10px;
        width: 50%;
        display: inline-block;
        .ivu-input-wrapper input {
            text-align: center;
        }
        p {
            display: inline-block;
            width: 130px;
            line-height: 32px;
            text-align: right;
            color: #444;
            margin-right: 10px;
            span {
                color: #ff8686;
            }
        }
        .addHuik {
            width: 260px;
            width: 260px;
            margin-right: 0;
            text-align: left;
        }
        .ivu-input-wrapper,
        .ivu-select {
            width: 260px;
        }
        .sel-picker .ivu-date-picker-editor {
            width: 234px;
        }
    }
    li.line-all {
        width: 100%;
        display: block;
    }
}
</style>
