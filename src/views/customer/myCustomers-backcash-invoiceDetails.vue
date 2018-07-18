<template>
    <div class="addBackcashInvoice">
        <div class='currentNav'>当前位置:
            <router-link to='/customer/myCustomers'>我的客户</router-link> >
            <router-link :to="`/customer/myCustomers/records?id=${id}`">
                {{cname}}
                <Rate disabled :value='level' style='font-size:14px'></Rate>
            </router-link>
            >&nbsp;&nbsp;发票详情
        </div>
        <div class="invoiceWrap">
            <p class="code">开票编号: {{invoiceDetails.code}}</p>
            <p class="desc">开票金额: {{invoiceDetails.amount}} &nbsp;&nbsp;|&nbsp;&nbsp; 开票日期: {{invoiceDetails.billingTime}}</p>
        </div>
        <div class="invoicebox">
            <Tabs value="details" :animated=false class='inDetails'>
                <TabPane label="发票详情" name="details">
                    <div class="list">
                        <span class="title">开票编号: </span>
                        <span class="content">{{invoiceDetails.code || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">开票号码: </span>
                        <span class="content">{{invoiceDetails.dutyCode || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">申请人: </span>
                        <span class="content">{{invoiceDetails.applyUserName || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">关联客户: </span>
                        <span class="content">{{invoiceDetails.companyName || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">关联合同: </span>
                        <span class="content">无</span>
                    </div>
                    <div class="list">
                        <span class="title">关联回款: </span>
                        <span class="content">无</span>
                    </div>
                    <div class="list">
                        <span class="title">开票日期: </span>
                        <span class="content">{{invoiceDetails.billingTime || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">开票金额: </span>
                        <span class="content">{{invoiceDetails.amount || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">发票类型: </span>
                        <span class="content">{{invoiceDetails.invoiceType || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">备注: </span>
                        <span class="content">{{invoiceDetails.instruction || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">附件: </span>
                        <span class="content">无</span>
                    </div>
                </TabPane>
                <TabPane label="发票信息" name="infos">
                    <div class="list">
                        <span class="title">抬头类型: </span>
                        <span class="content">{{invoiceDetails.roleId || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">发票抬头: </span>
                        <span class="content">{{invoiceDetails.headText || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">纳税识别号: </span>
                        <span class="content">{{invoiceDetails.dutyCode || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">注册电话: </span>
                        <span class="content">{{invoiceDetails.registPhone || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">开票地址: </span>
                        <span class="content">{{invoiceDetails.registAddress || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">开户行: </span>
                        <span class="content">{{invoiceDetails.depositBank || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">开户账号: </span>
                        <span class="content">{{invoiceDetails.bankNum || '--'}}</span>
                    </div>
                </TabPane>
                <TabPane label="寄送信息" name="sends">
                    <div class="list">
                        <span class="title">地址名称: </span>
                        <span class="content">{{invoiceDetails.address || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">联系人: </span>
                        <span class="content">{{invoiceDetails.contact || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">联系电话: </span>
                        <span class="content">{{invoiceDetails.phone || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">详细地址: </span>
                        <span class="content">{{invoiceDetails.address || '--'}}</span>
                    </div>
                    <div class="list">
                        <span class="title">邮政编号: </span>
                        <span class="content">{{invoiceDetails.zipCode || '--'}}</span>
                    </div>
                </TabPane>
            </Tabs>
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
            id: this.$route.query.id,
            vid: this.$route.query.vid,
            level: +this.$route.query.level,
            cname: this.$route.query.cname,
            invoiceDetails: {}
        };
    },
    methods: {
        getHetongLists() {
            api
                .axs("post", "/invoice/info", {
                    id: this.vid
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.invoiceDetails = data.data;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        }
    },
    mounted() {
        this.$store.state.spinShow = true;
        this.getHetongLists();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addBackcashInvoice {
    .invoiceWrap {
        border: 1px solid #dddddd;
        padding: 15px;
        font-size: 14px;
        .code {
            color: #ff6600;
            padding-bottom: 6px;
            font-weight: bold;
            font-size: 15px;
        }
    }
    .invoicebox {
        width: 100%;
        padding: 10px;
        .ivu-tabs-content .ivu-tabs-tabpane {
            border: 1px solid #ddd;
            padding: 15px 5px;
        }
        .inDetails {
            .list {
                font-size: 14px;
                padding: 2px 0;
                .title {
                    display: inline-block;
                    width: 80px;
                    color: #888;
                    text-align: right;
                    margin-right: 20px;
                }
                .content {
                    color: #444;
                }
            }
        }
    }
}
</style>
