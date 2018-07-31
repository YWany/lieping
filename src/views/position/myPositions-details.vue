<template>
    <div class="myPositionsDetails">
        职位公海
    </div>
</template>

<script>
import api from "@/api";
import ls from "store2";
export default {
    name: "myPositionsDetails",
    components: {},
    data() {
        return {};
    },
    methods: {},
    mounted() {
        this.$store.state.spinShow = false
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
