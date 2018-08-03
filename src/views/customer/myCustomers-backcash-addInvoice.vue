<template>
    <div class="addBackcashInvoice">
        <div class='currentNav'>当前位置: 客户 >
            <router-link to='/customer/myCustomers'>我的客户</router-link> >
            <router-link :to="`/customer/myCustomers/records?id=${id}`">
                {{cname}}
                <Rate disabled :value='level' style='font-size:14px'></Rate>
            </router-link>
            >&nbsp;&nbsp;新增发票
        </div>
        <div class="invoicebox">
            <div class="detail-title">
                发票详情
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="83">
                <FormItem label="开票编号" prop="code">
                    <Input v-model="formValidate.code" placeholder="请输入开票编号"></Input>
                </FormItem>
                <FormItem label="申请人" prop="applyUserName">
                    <Input disabled v-model="formValidate.applyUserName" :readonly='true'></Input>
                </FormItem>
                <FormItem label="合同编号">
                    <Select v-model="formValidate.contractId" placeholder="请选择合同编号">
                        <Option v-for="(item,index) in hetongLists" :value="item.id" :key='index'>{{item.num}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="关联客户" prop="companyName">
                    <Input disabled v-model="formValidate.companyName" :readonly='true' placeholder="请输入客户名字"></Input>
                </FormItem>
                <FormItem label="款项类型" prop="fundType">
                    <Select v-model="formValidate.fundType" placeholder="款项类型">
                        <Option v-for="(item,index) in fundTrees" :value="item.code" :key='index'>{{item.codeText}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="关联回款">
                    <Input disabled value='无' :readonly='true' placeholder="无"></Input>
                </FormItem>
                <FormItem label="开票金额" prop="amount">
                    <Input v-model="formValidate.amount" placeholder="开票金额"></Input>
                </FormItem>
                <FormItem label="申请日期" prop='billingTime'>
                    <DatePicker :value='formValidate.billingTime' format="yyyy-MM-dd HH:mm:ss " @on-change='seltime' type="date" placeholder="回款时间" style="width:100%"></DatePicker>
                </FormItem>
                <FormItem label="发票类型" prop='invoiceType'>
                    <Select v-model="formValidate.invoiceType" placeholder="发票类型" @on-change='getfuntype'>
                        <Option v-for="(item,index) in invoiceTrees" :value="item.code" :key='index'>{{item.codeText}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="instruction" style="width:100%;">
                    <Input v-model="formValidate.instruction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不少于10字"></Input>
                </FormItem>
                <FormItem label="附件">
                    <Upload class='up-oth' action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost">
                            <Icon type="link"></Icon>
                            <span>上传</span>
                        </Button>
                    </Upload>
                </FormItem>

                <!-- 发票信息 -->
                <div class="detail-title" style="float:left;">
                    发票信息
                </div>
                <FormItem label="抬头类型" prop="headType">
                    <Select v-model="formValidate.roleId" placeholder="抬头类型">
                        <Option v-for="(item,index) in headerTrees" :value="item.code" :key='index'>{{item.codeText}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="发票抬头" prop="headText">
                    <Input v-model="formValidate.headText" placeholder="发票抬头"></Input>
                </FormItem>
                <FormItem label="纳税识别号" prop="dutyCode">
                    <Input v-model="formValidate.dutyCode" placeholder="纳税识别号"></Input>
                </FormItem>
                <div v-if="four">
                    <FormItem label="注册电话">
                        <Input v-model="formValidate.registPhone" placeholder="注册电话"></Input>
                    </FormItem>
                    <FormItem label="开票地址">
                        <Input v-model="formValidate.registAddress" placeholder="开票地址"></Input>
                    </FormItem>
                    <FormItem label="开户行">
                        <Input v-model="formValidate.depositBank" placeholder="开户行"></Input>
                    </FormItem>
                    <FormItem label="开户账号">
                        <Input v-model="formValidate.bankNum" placeholder="开户账号"></Input>
                    </FormItem>
                </div>
                <div v-else-if="!four">
                    <FormItem label="注册电话" prop="registPhone">
                        <Input v-model="formValidate.registPhone" placeholder="注册电话"></Input>
                    </FormItem>
                    <FormItem label="开票地址" prop="registAddress">
                        <Input v-model="formValidate.registAddress" placeholder="开票地址"></Input>
                    </FormItem>
                    <FormItem label="开户行" prop="depositBank">
                        <Input v-model="formValidate.depositBank" placeholder="开户行"></Input>
                    </FormItem>
                    <FormItem label="开户账号" prop="bankNum">
                        <Input v-model="formValidate.bankNum" placeholder="开户账号"></Input>
                    </FormItem>
                </div>
                <div class="detail-title" style="float:left;">
                    寄送信息
                </div>
                <FormItem label="地址名称" prop="address">
                    <Input v-model="formValidate.address" placeholder="请输入地址名称"></Input>
                </FormItem>
                <FormItem label="联系人" prop="contact">
                    <Select v-model="formValidate.contact" placeholder="请选择联系人" @on-change='getphone'>
                        <Option v-for="(item,index) in contactlist" :value="item.id" :key='index'>{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="联系电话" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入联系电话"></Input>
                </FormItem>
                <!-- <FormItem label="详细地址" prop="address">
                        <Input v-model="formValidate.address" placeholder="请输入详细地址"></Input>
                    </FormItem> -->
                <FormItem label="邮政编码" prop="zipCode">
                    <Input v-model="formValidate.zipCode" placeholder="请输入邮政编码"></Input>
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
import Citysels from "@/components/common/citysels.vue";
export default {
    name: "addBackcashInvoice",
    components: {
        Citysels
    },
    data() {
        return {
            id: this.$route.query.id || ls.get("companyId"),
            level: +this.$route.query.level || ls.get("level"),
            cname: this.$route.query.cname || ls.get("companyName"),
            tag: this.$route.query.tag || "",
            four: true,
            hetongLists: [],
            contactId: "",
            contact_phone: "",
            contactlist: [],
            fundTrees: this.$store.state.allTrees.fundtype, //款项dic
            invoiceTrees: this.$store.state.allTrees.invoicetype, //发票类型dic
            headerTrees: this.$store.state.allTrees.headtype, //发票抬头dic
            formValidate: {
                code: "",
                applyUserId: ls.get("accid"),
                applyUserName: ls.get("account"),
                companyId: ls.get("companyId"),
                contractId: 0,
                companyName: ls.get("companyName"),
                fundType: "",
                amount: "",
                billingTime: UTC2Date(new Date(), "y-m-d h:i:s"),
                invoiceType: "1",
                instruction: "",
                headText: "",
                dutyCode: "",
                phone: ""
            },
            ruleValidate: {
                code: [
                    {
                        required: true,
                        message: "请输入开票编号",
                        trigger: "blur"
                    }
                ],
                applyUserName: [
                    {
                        required: true,
                        message: "请输入申请人",
                        trigger: "blur"
                    }
                ],

                companyName: [
                    {
                        required: true,
                        message: "请输入关联客户",
                        trigger: "blur"
                    }
                ],
                fundType: [
                    {
                        required: true,
                        message: "请选择款项类型",
                        trigger: "change"
                    }
                ],
                amount: [
                    {
                        required: true,
                        message: "请输入开票金额",
                        trigger: "blur"
                    }
                ],
                billingTime: [
                    {
                        required: true,
                        message: "请选择开票时间",
                        trigger: "change"
                    }
                ],
                invoiceType: [
                    {
                        required: true,
                        message: "请选择发票类型",
                        trigger: "change"
                    }
                ],
                headText: [
                    {
                        required: true,
                        message: "请输入发票台头",
                        trigger: "blur"
                    }
                ],
                dutyCode: [
                    {
                        required: true,
                        message: "请输入税号",
                        trigger: "blur"
                    }
                ],
                registPhone: [
                    {
                        required: true,
                        message: "请输入注册电话",
                        trigger: "blur"
                    }
                ],
                registAddress: [
                    {
                        required: true,
                        message: "请输入开票地址",
                        trigger: "blur"
                    }
                ],
                depositBank: [
                    {
                        required: true,
                        message: "请输入开户行",
                        trigger: "blur"
                    }
                ],
                bankNum: [
                    {
                        required: true,
                        message: "请输入开户账号",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        getHetongLists() {
            api
                .axs("post", "/contract/page", {
                    companyId: this.id,
                    pageNum: 1,
                    pageSize: 30
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.hetongLists = data.data.list;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        seltime(date) {
            this.recordsForm.followTime = date;
        },
        getphone() {
            for (var i = 0; i < this.contactlist.length; i++) {
                if (this.contactlist[i].id === this.formValidate.contact) {
                    this.formValidate.phone = this.contactlist[i].phone1;
                }
            }
        },
        getfuntype() {
            // alert(this.formValidate.invoiceType);
            if (this.formValidate.invoiceType == "1") {
                this.four = true;
            } else if (this.formValidate.invoiceType == "2") {
                this.four = false;
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$store.state.spinShow = true;

                    api
                        .axs("post", "/invoice/add", this.formValidate)
                        .then(({ data }) => {
                            this.$store.state.spinShow = false;
                            if (data.code === "SUCCESS") {
                                this.$Message.success("新增成功!");
                                if (this.tag == "fromhk")
                                    this.$router.push(
                                        "/customer/myCustomers/records?id=" +
                                            this.id
                                    );
                                else this.$router.go(-1);
                            } else {
                                this.$Message.error(data.remark);
                            }
                        });
                } else {
                    this.$Message.error("请填写完整!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        this.$store.state.spinShow = true;
        this.getHetongLists(); //合同列表
        api
            .axs("post", "/contact/list", {
                companyId: ls.get("companyId")
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
        // if (this.$store.state.selTrees.length) {
        //     this.fundTrees = this.$store.state.selTrees[13].children;
        //     this.invoiceTrees = this.$store.state.selTrees[14].children;
        //     this.headerTrees = this.$store.state.selTrees[15].children;
        // }
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
                } // i{
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
