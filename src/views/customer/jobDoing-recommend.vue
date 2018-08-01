<template>
    <div class="jobDoingRecommend">
        <ul class="steps">
            <li>
                <div class="num">01</div>
                <div class="desc">
                    <h4>选择人选</h4>
                    <p class="tip">两种方式提交人选信息</p>
                </div>
            </li>
            <li>
                <div class="num">02</div>
                <div class="desc">
                    <h4>信息校对</h4>
                    <p class="tip">校对简历信息准备性</p>
                </div>
            </li>
            <li>
                <div class="num">03</div>
                <div class="desc">
                    <h4>选择人选</h4>
                    <p class="tip">填写人选推荐报告</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
export default {
    name: "home",
    data() {
        return {};
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
.jobDoingRecommend {
    .steps {
        
    }
}
</style>
