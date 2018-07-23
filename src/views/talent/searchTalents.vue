<template>
    <div class="serachTalents">
        <Tabs type="card">
            <TabPane label="按条件搜索">
                <SearchItems />
            </TabPane>
            <TabPane label="按进行中职位搜索">
                <div class="doingJob" style='text-align:center;padding: 30px 0;'>
                    <Select v-model="searchVal" filterable remote :remote-method="searchJob" :loading="searchLoading" placeholder='请输入您要搜索的内容并选择' style='width:390px'>
                        <Option v-for="(option, index) in searchLists" :value="option" :key="index">{{option}}</Option>
                    </Select> &nbsp;&nbsp;&nbsp;
                    <Button type='info'>搜索</Button>
                </div>
            </TabPane>
            <TabPane label="按发布职位搜索">标签三的内容</TabPane>
        </Tabs>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import SearchItems from "@/components/talent/searchItems.vue";
export default {
    name: "serachTalents",
    data() {
        return {
            searchLoading: false,
            searchVal: "",
            searchLists: []
        };
    },
    components: {
        SearchItems
    },
    computed: {},
    methods: {
        searchJob(query) {
            this.searchLoading = true;
            var s1 = [1, 1, 1, 1, 1, 1, 1, 1];
            var s2 = [2, 2, 2, 2, 2, 2, 2, 2];
            var ss;
            if (query.indexOf("1") > -1) ss = s1;
            else ss = s2;
            setTimeout(() => {
                this.searchLists = ss;
                this.searchLoading = false;
            }, 3000);
        }
    },
    mounted() {
        this.$store.state.spinShow = false;
    }
};
</script>

<style lang='less' scoped>
.serachTalents {
}
</style>