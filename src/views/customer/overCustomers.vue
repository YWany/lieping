<template>
    <div class="myCustomers">
        <div class='currentNav'>当前位置: 我的客户</div>
        <div class="searchTable">
            <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
            <div class="tablePage fr">
                <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
            </div>
        </div>

        <Modal v-model="recordPop" :closable=false width='400px'>
            <p slot="header">
                <span>最近更新记录</span>
                <Button type="primary" size='small' icon="plus" class='fr' @click='addRecord'></Button>
            </p>
            <ul class="popContent" style='max-height: 335px;overflow-y: scroll'>
                <li v-for='list in contactLists' :key='list.id'>
                    <h4 class="name">{{list.contactName}}</h4>
                    <p class="desc">{{list.followRecord}}</p>
                    <p class="time">
                        <span>{{list.followType}}</span>
                        <time>{{list.followTime}}</time>
                    </p>
                </li>
            </ul>
            <p slot='footer' style='text-align:center'></p>
        </Modal>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import AttePop from "@/components/customer/addAttePop.vue";
export default {
    name: "home",
    data() {
        return {
            id:'',
            creatVal: "",
            recordPop: false,
            cname: "",
            attePop: false, //新增提醒弹窗
            atteCompanyId: '',
            atteCompanyName: '',
            form: {
                total: 120,
                current: 1,
                pageSize: 10
            },
            tableHeader: [
                {
                    title: "客户名称",
                    key: "companyName",
                    width: 160,
                    ellipsis: true,
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "span", row.companyName
                        );
                    }
                },
                {
                    title: "申请原因",
                    key: "importantLevel",
                    sortable: true
                },
                {
                    title: "退款",
                    key: "contactName",
                    width: 90,
                    sortable: true,
                    align: "center"
                },
                {
                    title: "终止合作时间",
                    key: "outOfContactDays",
                    width: 100,
                    align: "center"
                },
                {
                    title: "付款",
                    key: "outOfContactDays",
                    width: 80,
                    align: "center"
                },
                {
                    title: "申请人",
                    key: "outOfContactDays",
                    width: 80,
                    align: "center"
                }
            ],
            tableLists: [],
            contactLists: []
        };
    },
    components: {
        AttePop
    },
    computed: {
        allTrees() {
            return this.$store.state.selTrees
        }
    },
    methods: {
        loadLists(page) {
            this.$store.state.spinShow = true;

            api
                .axs("post", "/company/allPage", this.form)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.tableLists = this.tableLists.concat(
                            data.data.list
                        );
                        this.form.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        getContactLists(id) {
            //记录
            api
                .axs("post", "/contactRecord/page", { companyId: id })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.contactLists = data.data.list.slice(0,3)
                        this.recordPop = true
                    } else {
                        this.$Message.error(data.remark)
                    }
                });
        },
        searchIn() {
            if (!this.form.companyName) {
                this.$Message.warning("想搜点什么?");
                return;
            }
            this.tableLists = []
            // this.loadLists()
        },
        addRecord() {
            //添加记录
            this.$Message.info("添加记录~~");
            this.$router.push(
                "/customer/myCustomers/records?cname=" + this.cname + '&id=' + this.atteCompanyId 
            );
        },
        createDo(val) {
            this.$Message.info(val + "1000000000");
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "企业名称";
        }
    },

    mounted() {
        this.loadLists()
    }
};
</script>

<style lang='less' scoped>
.myCustomers {
}
.popContent {
    li {
        border-bottom: 1px solid #eee;
        padding: 10px 0;
        .name {
            font-size: 16px;
            font-weight: bold;
        }
        .desc {
            line-height: 16px;
            padding: 6px 0 10px;
        }
        .time {
            span {
                color: #4f8ae4;
            }
            time {
                float: right;
            }
        }
    }
}
</style>
