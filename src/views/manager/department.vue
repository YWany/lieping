<template>
    <div class="jobDoing">
        <div class='currentNav'>当前位置: 部门管理
        </div>
        <div class="departleft">
            <Tree :data="data5" :render="renderContent"></Tree>
        </div>
        <div class="departright">

        </div>

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
            data5: [
                {
                    title: "董事长   洪文祥",
                    expand: true,
                    loading: false,
                    selected: true,
                    render: (h, { root, node, data }) => {
                        return h(
                            "span",
                            {
                                style: {
                                    display: "inline-block",
                                    width: "100%"
                                }
                            },
                            [
                                h("span", [
                                    h("Icon", {
                                        props: {
                                            type: "ios-folder-outline"
                                        },
                                        style: {
                                            marginRight: "8px"
                                        },
                                        title: "x n"
                                    }),
                                    h("span", data.title)
                                ]),
                                h(
                                    "span",
                                    {
                                        style: {
                                            display: "inline-block",
                                            float: "right",
                                            marginRight: "32px"
                                        }
                                    },
                                    [
                                        h("Button", {
                                            props: Object.assign(
                                                {},
                                                this.buttonProps,
                                                {
                                                    icon: "ios-plus-empty",
                                                    type: "primary"
                                                }
                                            ),
                                            style: {
                                                width: "52px"
                                            },
                                            on: {
                                                click: () => {
                                                    this.append(data);
                                                }
                                            }
                                        })
                                    ]
                                )
                            ]
                        );
                    },
                    children: [
                        {
                            title: "child 1-1",
                            expand: true,
                            checked: true,
                            children: [
                                {
                                    title: "leaf 1-1-1",
                                    expand: true,
                                    checked: true
                                },
                                {
                                    title: "leaf 1-1-2",
                                    expand: true,
                                    checked: true
                                }
                            ]
                        },
                        {
                            title: "child 1-2",
                            expand: true,
                            checked: true,
                            children: [
                                {
                                    title: "leaf 1-2-1",
                                    expand: true,
                                    checked: true
                                },
                                {
                                    title: "leaf 1-2-1",
                                    expand: true,
                                    checked: true
                                }
                            ]
                        }
                    ]
                }
            ],
            buttonProps: {
                type: "ghost",
                size: "small"
            }
        };
    },
    components: {
        Menu,
        HelloWorld
    },
    methods: {
        renderContent(h, { root, node, data }) {
            return h(
                "span",
                {
                    style: {
                        display: "inline-block",
                        width: "100%"
                    }
                },
                [
                    h("span", [
                        h("Icon", {
                            props: {
                                type: "ios-paper-outline"
                            },
                            style: {
                                marginRight: "8px"
                            }
                        }),
                        h("span", data.title)
                    ]),
                    h(
                        "span",
                        {
                            style: {
                                display: "inline-block",
                                float: "right",
                                marginRight: "32px"
                            }
                        },
                        [
                            h("Button", {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: "wrench"
                                }),
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        this.change(data);
                                    }
                                }
                            }),
                            h("Button", {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: "ios-plus-empty"
                                }),
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        this.append(data);
                                    }
                                }
                            }),
                            h("Button", {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: "ios-minus-empty"
                                }),
                                on: {
                                    click: () => {
                                        this.remove(root, node, data);
                                    }
                                }
                            })
                        ]
                    )
                ]
            );
        },
        change(data) {
            console.log(data);
        },
        append(data) {
            const children = data.children || [];
            children.push({
                title: "appended node",
                expand: true
            });
            this.$set(data, "children", children);
        },
        remove(root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        }
    },

    mounted() {
        api
            .axs("post", "/dept/queryDepartmentTrees", {})
            .then(({ data: { data, code } }) => {
                console.log(data);
            });

        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
    }
};
</script>

<style lang='less' scoped>
.jobDoing {
    .currentNav {
        .nums {
            display: flex;
            li {
                margin: 0 6px;
                text-shadow: 2px 2px 2px #ddd;
            }
        }
    }
    .departleft {
        width: 30%;
        float: left;
    }
    .departright {
        width: 30%;
        float: right;
    }
}
</style>
