<template>
    <div class="customer">
        <h1>权限管理.....</h1>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Menu from "@/components/Menu.vue";
import HelloWorld from "@/components/HelloWorld.vue";
export default {
    name: "home",
    data() {
        return {}
    },
    components: {
        Menu,
        HelloWorld
    },
    methods: {},
    mounted() {
        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
    }
};
</script>

<style lang='less' scoped>
</style>
