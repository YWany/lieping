<template>
    <div class="functionPop" style='position:relative;z-index:99999'>
        <Modal v-model='functionPop' :closable='false' :mask-closable='false' width='650px' style='z-index:1999'>
            <div slot='header' style='text-align:center;font-size:14px;color:#444'>
                选择职能
                <a href="javascript:;" @click="$parent.functionPop=false">
                    <Icon type="close" class='fr'></Icon>
                </a>
            </div>
            <h4 class="title">通用职能</h4>
            <ul class="func-content">
                <li v-for='fun in funcTree.slice(0,8)' :key='fun.id' @click='$parent.selFunc(fun.codeText)'>{{fun.codeText}}</li>
            </ul>
            <h4 class="title" style='margin-top:10px;'>专业职能</h4>
            <ul class="func-content">
                <li v-for='fun in funcTree.slice(8)' :key='fun.id' @click='$parent.selFunc(fun.codeText)'>{{fun.codeText}}</li>
            </ul>
            <div slot='footer' style='text-align:center'></div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api";
export default {
    name: "functionPop",
    data() {
        return {
            proLists: [],
            professVal: ""
        };
    },
    props: ["functionPop"],
    computed: {
        funcTree() {
            return this.$store.state.allTrees.functionType;
        }
    },
    methods: {},
    mounted() {}
};
</script>

<style lang="less">
h4.title {
    font-weight: bold;
    font-size: 14px;
}
.func-content {
    margin: 2px 10px;
    li {
        display: inline-block;
        width: 25%;
        margin: 8px 0;
        color: #4cacfa;
        cursor: pointer;
    }
}
</style>
