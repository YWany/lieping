<template>
    <div class="customer">
        <h1>权限管理.....</h1>
        <Table class="class" border :columns="columns7" :data="data6"></Table>
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
    data () {
            return {
                columns7: [
                    {
                        title: '角色名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '角色类型',
                        key: 'type'
                    },
                    {
                        title: '创建时间',
                        key: 'time'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        type: 'BD负责人',
                        time: '1970-01-01 08:00:00',
                        remark:'死的话说的很熟的',
                    },
                    {
                        name: 'John Brown',
                        type: 'BD负责人',
                        time: '1970-01-01 08:00:00',
                        remark:'死的话说的很熟的',
                    },
                   {
                        name: 'John Brown',
                        type: 'BD负责人',
                        time: '1970-01-01 08:00:00',
                        remark:'死的话说的很熟的',
                    },
                   {
                        name: 'John Brown',
                        type: 'BD负责人',
                        time: '1970-01-01 08:00:00',
                        remark:'死的话说的很熟的',
                    },
                ]
            }
        },
        methods: {
          
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].type}<br>Address：${this.data6[index].time}<br>Address：${this.data6[index].remark}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        },
    mounted() {
api.axs("post", "/role/save", {
              roleName: '负责人', 
              companyId: '1',
              roleType: '1',
            })
            .then(({ data: { data, code } }) => {
              if (code === SUCCESS) {
                console.log(data);
                this.datas = data;
              }
            }),
        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
    }
};
</script>

<style lang='less' scoped>
.class{
    margin-top: 15px;
    -webkit-box-shadow: 0 -5px 10px #eee;
    box-shadow: 0 -5px 10px #eee;
}
</style>
