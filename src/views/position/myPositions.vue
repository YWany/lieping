<template>
    <div class="myPositions">
        <div class='currentNav'>当前位置: 我的职位</div>
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
                <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                    <Option value="未开始">未开始</Option>
                    <Option value="进行中">进行中</Option>
                    <Option value="录用待入职">录用待入职</Option>
                    <Option value="客户行业2">客户行业2</Option>
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
                <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api";
import ls from "store2";
export default {
    name: "myPositions",
    components: {},
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
            form: {
                total: 100,
                pageNum: 1,
                pageSize: 10
            },
             tableHeader: [
                {
                    title: "职位名称",
                    key: "jobName",
                    width: 140,
                    align: "center",
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "router-link",
                            {
                                attrs: {
                                    to:
                                        "/position/myPositions/doing?jodId=" +
                                        row.id
                                }
                            },
                            row.jobName
                        );
                    }
                },
                {
                    title: "公司名称",
                    key: "companyName",
                    width: 140,
                    sortable: true,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "加入职位",
                    key: "phone",
                    width: 94,
                    align: "center"
                },
                {
                    title: "推荐",
                    key: "bbb",
                    sortable: true,
                    width: 94,
                    align: "center"
                },
                {
                    title: "面试",
                    key: "ccc",
                    width: 65,
                    align: "center"
                },
                {
                    title: "录用",
                    key: "ddd",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "入职",
                    key: "eee",
                    width: 65,
                    align: "center"
                },
                {
                    title: "过保",
                    key: "fff",
                    width: 65,
                    align: "center"
                },
                {
                    title: "更新时间",
                    key: "ggg",
                    width: 65,
                    align: "center"
                },
                {
                    title: "更新内容",
                    key: "hhh",
                    width: 85,
                    align: "center"
                },
                {
                    title: "职位运作时长",
                    key: "hhh",
                    width: 85,
                    align: "center"
                },     
                 {
                    title: "主要顾问",
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
                                "编辑"
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
                                "共享发布"
                            ),
                            
                        ]);
                    }
                }
            ],
            tableLists: [
              //我的职位list
            ]
        };
    },
    methods: {
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.form.pageNum = page;
            api.axs("post", "/job/myJobPages", this.form).then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.tableLists = data.data.list;
                    this.form.total = data.data.total;
                    this.$Loading.finish();
                    this.$store.state.spinShow = false;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "企业名称";
        }
    },
    mounted() {
         this.loadLists();
        this.$store.state.spinShow = false;
        // api.axs("post", "/job/myJobPages").then(({ data }) => {
        //     if (data.code === "SUCCESS") {
        //       this.tableLists=data.data.list
        //     } else {
        //         this.$Message.error(data.remark);
        //     }
        // });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.tab {
    width: 100%;
    //  clear: both;
    //   content: "";
    // visibility: hidden;
    // height: 0;
    li {
        float: left;
        margin-right: 10px;
        font-size: 14px;
        padding: 5px 0;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .active {
        color: #0066ff;
        border-bottom: 1px solid #0066ff;
    }
}
</style>
