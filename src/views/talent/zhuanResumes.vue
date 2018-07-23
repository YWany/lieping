<template>
    <div class="zhuanResumes">
        <div class='currentNav'>当前位置:  人才 > 转发的简历</div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
export default {
    name: "zhuanResumes",
    data() {
        return {};
    },
    components: {},
    computed: {},
    methods: {},
    mounted() {
        this.$store.state.spinShow = false;
    }
};
</script>

<style lang='less' scoped>
</style>