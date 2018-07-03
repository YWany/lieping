<template>
    <div class="home">
        <img src="@/assets/images/logo.png">
        <HelloWorld msg="Qianlima" />
        <h1>commit 2018-06-25 10:30</h1>
        <Table border :columns="columns5" :data="data5"></Table>
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
            ],
            data5: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03"
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01"
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02"
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04"
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
