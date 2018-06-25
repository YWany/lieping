<template>
    <div class="home">
        <img src="@/assets/images/logo.png">
        <HelloWorld msg="Qianlima" />
    </div>
</template>

<script>
// @ is an alias to /src
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
            this.$Loading.finish()
            this.$store.state.spinShow = false
        }, 1500)
        
    },
    beforeDestroy() {}
};
</script>
<style lang='less' scoped>
.home {
    padding-top: 1.5rem;
    img {
        width: 6rem;
    }
}
</style>
