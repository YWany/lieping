<template>
    <div class="home" style='text-align: center'>
        <img src="@/assets/images/logo.png">
        <HelloWorld msg="Qianlima" />
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
            .axs("post", "/role/save", {
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
    },
    data() {
        return {
            columns5: [
                {
                    title: "Date",
                    key: "date",
                    sortable: true
                },
                {
                    title: "Name",
                    key: "name"
                },
                {
                    title: "Age",
                    key: "age",
                    sortable: true
                },
                {
                    title: "Address",
                    key: "address"
                }
            ]
        };
    },
    beforeDestroy() {}
    // axios.post('role/save', { roleName: 'Fred',companyId: 1,id:1}).then(function (response) {
    //                   console.log(response);
    // }).catch(function (error) {
    //                   console.log(error);
    // })
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
