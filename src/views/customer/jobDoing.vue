<template>
    <div class="jobDoing">
        <div class='currentNav'>当前位置: 职位进展
            <ul class="nums fr">
                <li>所有项目
                    <span>(740)</span>
                </li>
                <li>未开始
                    <span>(45)</span>
                </li>
                <li>进行中
                    <span>(22)</span>
                </li>
                <li>录用
                    <span>(0)</span>
                </li>
                <li>上岗
                    <span>(15)</span>
                </li>
                <li>成功项目
                    <span>(0)</span>
                </li>
                <li>暂换项目
                    <span>(0)</span>
                </li>
                <li>终止项目
                    <span>(0)</span>
                </li>
                <li>失效项目
                    <span>(0)</span>
                </li>
            </ul>
        </div>
        <form class="searches">
            <div class="search">
                <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                    <Option value="职位名称">职位名称</Option>
                    <Option value="公司名称">公司名称</Option>
                </Select>
                <Button slot="append" icon="ios-search"></Button>
                </Input>
            </div>
            <div class="sels">
                <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                    <Option value="部门归属1">部门归属1</Option>
                    <Option value="部门归属2">部门归属2</Option>
                </Select>
                <Select v-model="form.sel2" class='sels-item' placeholder='项目状态' style="width:100px">
                    <Option value="客户行业1">客户行业1</Option>
                    <Option value="客户行业2">客户行业2</Option>
                </Select>
                <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                    <Option value="客户来源1">客户来源1</Option>
                    <Option value="客户来源2">客户来源2</Option>
                </Select>
                <div class="disInB sels-item">
                    创建时间:
                    <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <div class="disInB sels-item">
                    更新时间:
                    <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
            </div>
        </form>
        <div class="searchTable">
            <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
            <div class="tablePage fr">
                <Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
            </div>
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
            form: {
                searchVal: "",
                selVal: "职位名称",
                sel1: "",
                sel2: "",
                sel3: "",
                sel4: "",
                sel5: "",
                sel6: "",
                createDate: "",
                signDate: ""
            },
            formPage: {
                total: 120,
                current: 1,
                pageSize: 20
            },
            tableHeader: [
                {
                    title: "职位名称",
                    key: "name",
                    width: 140,
                    align: "center",
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "router-link",
                            {
                                attrs: {
                                    to:
                                        "/customer/jobDoing/details?jodId=" +
                                        row.id
                                }
                            },
                            row.name
                        );
                    }
                },
                {
                    title: "公司名称",
                    key: "kehu",
                    width: 140,
                    sortable: true,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "项目经理",
                    key: "phone",
                    width: 94,
                    align: "center"
                },
                {
                    title: "项目状态",
                    key: "bbb",
                    sortable: true,
                    width: 94,
                    align: "center"
                },
                {
                    title: "加入项目",
                    key: "ccc",
                    width: 65,
                    align: "center"
                },
                {
                    title: "推荐",
                    key: "ddd",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "面试",
                    key: "eee",
                    width: 65,
                    align: "center"
                },
                {
                    title: "录用",
                    key: "fff",
                    width: 65,
                    align: "center"
                },
                {
                    title: "上岗",
                    key: "ggg",
                    width: 65,
                    align: "center"
                },
                {
                    title: "创建时间",
                    key: "hhh",
                    width: 85,
                    align: "center"
                },
                {
                    title: "更新时间",
                    key: "hhh",
                    width: 85,
                    align: "center"
                },
                {
                    title: "操作",
                    key: "iii",
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "info", //primary、ghost、dashed、text、info、success、warning、error
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info(
                                                "暂缓!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "暂缓"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info(
                                                "终止!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "终止"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "6px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.info(
                                                "失效!!!" + row.name
                                            );
                                        }
                                    }
                                },
                                "失效"
                            )
                        ]);
                    }
                }
            ],
            tableLists: [
                {
                    id: 96,
                    name: "财务总监",
                    kehu: "浙江千里马股份有限公司",
                    phone: "Yuxinhua",
                    bbb: "进行中",
                    ccc: "1",
                    ddd: "23",
                    eee: "10",
                    fff: "00",
                    ggg: "00",
                    hhh: "2018-10-10 12:30:40",
                    hhh: "2018-10-10 12:30:40"
                },
                {
                    id: 97,
                    name: "招商CEO招商CEO",
                    kehu: "浙江千里马股份有限公司",
                    phone: "Yuxinhua",
                    bbb: "进行中",
                    ccc: "1",
                    ddd: "23",
                    eee: "10",
                    fff: "00",
                    ggg: "00",
                    hhh: "2018-10-10 12:30:40",
                    hhh: "2018-10-10 12:30:40"
                }
            ]
        };
    },
    components: {
        Menu,
        HelloWorld
    },
    methods: {
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.$Message.info("当前页: " + page);
            setTimeout(() => {
                this.$store.state.spinShow = false;
            }, 1500);
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "企业名称";
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
}
</style>
