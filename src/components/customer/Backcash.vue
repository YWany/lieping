<template>
	<div class="backcash">
        回款
	</div>
</template>

<script>
import api from "@/api"
import { UTC2Date } from "@/assets/js/utils.js"
export default {
    name: "backcash",
    props: [],
    components: {},
    data() {
        return {
            subFlag: true
        };
    },
    methods: {
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
        }
    },
    mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.backcash {}
</style>
