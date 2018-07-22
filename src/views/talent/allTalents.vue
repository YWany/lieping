<template>
    <div class="allTalents">
        <div class='currentNav'>当前位置: 人才 > 所有人才</div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
export default {
    name: "allTalents",
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