<template>
	<div class="cakelists">
		<ul class='lists'></ul>
	</div>
</template>

<script>
import cakelists from "@/assets/json/cakelists.json";
export default {
    name: "Cakelists",
    data() {
        return {
            lists: cakelists,
        };
    },
    mounted() {}
};
</script>

<style scoped lang="less">
</style>
