<template>
    <div class="downResumes">
        <div class='currentNav'>当前位置:  人才 > 下载的简历</div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
export default {
    name: "downResumes",
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