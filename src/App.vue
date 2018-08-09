<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import "@/assets/css/reset.css";
import "@/assets/css/index.less";
import api from "@/api";
export default {
    data() {
        return {};
    },
    components: {},
    methods: {},
    mounted() {
        // console.log(process.env.NODE_ENV)

        //字典数
        api.axs("post", "/param/dic/tree").then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.$store.state.selTrees = data.data;
                const allTress = data.data;
                for (let i = 0; i < allTress.length; i++) {
                    if (allTress[i].code === "companyType")
                        //公司性质
                        this.$store.state.allTrees.naturelist =
                            allTress[i].children;
                    else if (allTress[i].code === "companySource")
                        // 客户来源
                        this.$store.state.allTrees.companysource =
                            allTress[i].children;
                    else if (allTress[i].code === "phoneType")
                        // 电话类型
                        this.$store.state.allTrees.phonetype =
                            allTress[i].children;
                    else if (allTress[i].code === "dateType")
                        // 日期类型
                        this.$store.state.allTrees.datetype =
                            allTress[i].children;
                    else if (allTress[i].code === "remindBefore")
                        // 提醒时间
                        this.$store.state.allTrees.remindbefore =
                            allTress[i].children;
                    else if (allTress[i].code === "followType")
                        // 跟进方式
                        this.$store.state.allTrees.followtype =
                            allTress[i].children;
                    else if (allTress[i].code === "contractType")
                        // 合同类型
                        this.$store.state.allTrees.contractype =
                            allTress[i].children;
                    else if (allTress[i].code === "preFee")
                        // 前期费用
                        this.$store.state.allTrees.prefee =
                            allTress[i].children;
                    else if (allTress[i].code === "payType")
                        // 支付类型
                        this.$store.state.allTrees.paytype =
                            allTress[i].children;
                    else if (allTress[i].code === "ensurePeriod")
                        // 保证期
                        this.$store.state.allTrees.ensureperiod =
                            allTress[i].children;
                    else if (allTress[i].code === "protectPeriod")
                        // 员工保护期间
                        this.$store.state.allTrees.protectperiod =
                            allTress[i].children;
                    else if (allTress[i].code === "minCharge")
                        // 最低收费
                        this.$store.state.allTrees.mincharge =
                            allTress[i].children;
                    else if (allTress[i].code === "importantLevel")
                        //客户等级
                        this.$store.state.allTrees.importancelist =
                            allTress[i].children;
                    else if (allTress[i].code === "fundType")
                        // 款项类型
                        this.$store.state.allTrees.fundtype =
                            allTress[i].children;
                    else if (allTress[i].code === "invoiceType")
                        // 发票类型
                        this.$store.state.allTrees.invoicetype =
                            allTress[i].children;
                    else if (allTress[i].code === "headType")
                        // 台头类型
                        this.$store.state.allTrees.headtype =
                            allTress[i].children;
                    else if (allTress[i].code === "fundStatus")
                        // 回款状态
                        this.$store.state.allTrees.fundstatus =
                            allTress[i].children;
                    else if (allTress[i].code === "invoiceStatus")
                        // 发票状态
                        this.$store.state.allTrees.invoicestatus =
                            allTress[i].children;
                    else if (allTress[i].code === "preFee")
                        // 前期服务费
                        this.$store.state.allTrees.prefee =
                            allTress[i].children;
                    else if (allTress[i].code === "changeInto")
                        // 转入客户
                        this.$store.state.allTrees.changeinto =
                            allTress[i].children;
                    else if (allTress[i].code === "sex")
                        // 性别
                        this.$store.state.allTrees.sex = allTress[i].children;
                    else if (allTress[i].code === "decisionRelation")
                        // 决策关系
                        this.$store.state.allTrees.decisionrelation =
                            allTress[i].children;
                    else if (allTress[i].code === "signRange")
                        // 签约时间
                        this.$store.state.allTrees.signrange =
                            allTress[i].children;
                    else if (allTress[i].code === "companyStatus")
                        // 客户状态
                        this.$store.state.allTrees.statelist =
                            allTress[i].children;
                    else if (allTress[i].code === "companyScope")
                        //企业规模
                        this.$store.state.allTrees.scalelist =
                            allTress[i].children;
                    else if (allTress[i].code === "proposedParty")
                        //提出方
                        this.$store.state.allTrees.proposedParty =
                            allTress[i].children;
                    else if (allTress[i].code === "feedback")
                        //反馈结果
                        this.$store.state.allTrees.feedback =
                            allTress[i].children;
                    else if (allTress[i].code === "candidateStatus")
                        //候选人状态
                        this.$store.state.allTrees.candidateStatus =
                            allTress[i].children;
                }
            }
        });

        //职位
        api.axs("post", "/param/industry/tree").then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.$store.state.jobTrees = data.data;
            }
        });
    },
    watch: {
        $route() {
            this.$store.state.spinShow = true;
        }
    }
};
</script>

<style lang="less">
.ivu-message {
    padding-left: 200px;
}
</style>
