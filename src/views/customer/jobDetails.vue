<template>
    <div class="customer">
        <h1>职位详情.....</h1>
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

        api
            .axs("post", "role/save", {
                roleName: "总经理",
                companyId: 1,
                roleType: 1
            })
            .then(({ data: { data, code } }) => {
                if (code === SUCCESS) {
                    console.log(data)
                    this.datas = data
                }
            })
    }
};
</script>
<style lang='less' scoped>

</style>
