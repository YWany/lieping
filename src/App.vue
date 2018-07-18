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
                        this.$store.state.allTrees.statelist =
                            allTress[i].children;
                    else if (allTress[i].code === "companyStatus")
                        // 客户状态
                        this.$store.state.allTrees.statelist =
                            allTress[i].children;
                    else if (allTress[i].code === "companyScope")
                        //企业规模
                        this.$store.state.allTrees.scalelist =
                            allTress[i].children;
                    else if (allTress[i].code === "importantLevel")
                        //客户等级
                        this.$store.state.allTrees.importancelist =
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
