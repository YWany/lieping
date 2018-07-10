<template>
	<div id="app">
        <router-view/>
	</div>
</template>

<script>
import "@/assets/css/reset.css"
import "@/assets/css/index.less"
export default {
    data() {
        return {}
    },
    components: {},
    methods: {},
    mounted() {
        // console.log(process.env.NODE_ENV)
    },
    watch: {
        $route() {
            this.$store.state.spinShow = true
        }
    }
};
</script>

<style lang="less">
    .ivu-message {
        padding-left: 200px;
    }
</style>
