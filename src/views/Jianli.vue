<template>
  <div class="content"></div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Menu from "@/components/Menu.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
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
    },
    beforeDestroy() {}
};
</script>
<style lang='less' scoped>
.content {
    padding: 0.5rem 0.2rem;
    display: flex;
}
</style>
