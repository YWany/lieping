<template>
    <div class="customer">
        <h1>权限管理.....</h1>
        <Tree :data="treeData" :load-data="loadData" @on-select-change='selTree'></Tree>
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
    data() {
        return {
            treeData: [
                {
                    title: "parent",
                    loading: false,
                    children: []
                }
            ],
            data1: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2'
                        }
                    ]
                }
            ],
            lists: [
                {
                    title: "111",
                    name: 1,
                    id: 10,
                    child: [
                        {
                            title: "aa",
                            name: 1,
                            id: 1
                        },
                        {
                            title: "bbb",
                            name: 2,
                            id: 2
                        },
                        {
                            title: "ccc",
                            name: 3,
                            id: 3
                        }
                    ]
                },
                {
                    title: "222",
                    name: 2,
                    id: 11
                }
            ]
        };
    },
    components: {
        Menu,
        HelloWorld
    },
    methods: {
        loadData(item, callback) {
            setTimeout(() => {
                var arrs = [];
                this.lists.forEach((item, index) => {
                    arrs[index] = {}
                    arrs[index].title = item.title
                    arrs[index].id = item.id
                    if (item.child && item.child.length) {
                        arrs[index].loading = false
                        arrs[index].expand = true

                        var childs = item.child
                        arrs[index].children = []
                        childs.forEach((item2,index2) => {
                            arrs[index].children[index2] = {}
                            arrs[index].children[index2].title = item2.title
                            arrs[index].children[index2].id = item2.id
                        })
                    }
                })
                callback(arrs)
            }, 1000)
        },
        selTree(n) {
            console.log(n[0].id)
        }
    },

    mounted() {
        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
    }
};
</script>

<style lang='less' scoped>
</style>
