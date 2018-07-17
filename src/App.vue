<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import "@/assets/css/reset.css"
import "@/assets/css/index.less"
import api from "@/api"
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
                this.$store.state.selTrees = data.data
            }
        })

        //职位
        api.axs("post", "/param/industry/tree").then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.$store.state.jobTrees = data.data
            }
        })
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
