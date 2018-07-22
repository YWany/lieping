<template>
    <div class="myTalents">
        <div class='currentNav'>当前位置:  人才 > 我的人才
            <div class="fr">
                <router-link to='/talent/searchTalents'>
                    <Button type="info" icon='search' class='addNew'>搜索人才</Button>
                </router-link>
                <span>&nbsp;&nbsp;</span>
                <Button type="warning" icon='arrow-up-a' class='addNew'>上传简历</Button>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
export default {
    name: "myTalents",
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