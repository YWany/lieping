<template>
    <div class="allTalents">
        <div class='currentNav'>当前位置: 人才 > 所有人才</div>
        <div class="search-box">
            <div class="crux">
                <span>关键词：</span>
                <Input v-model="value14" placeholder="请输入搜索关键词" clearable style="width: 200px"></Input>
                <Button class="serbtn" type="primary">搜素</Button>
                <a class="showup" href="javascript:void(0)">
                    展开搜索条件
                    <Icon type="arrow-down-b"></Icon>
                </a>
            </div>
        </div>
        <div class="alltalentlist">
            <div class="fristsear">
                <Button class="serbtn" type="primary">批量查看</Button>
                <span>共5000+人选</span>
            </div>
            <Table border ref="selection" :columns="columns4" :data="data1" @on-current-change="handleRowChange"></Table>
            <div class="tablePage fr">
                <Page :total='form.total' :page-size='form.pageSize' :current='form.pageNum' show-total @on-change='loadLists'></Page>
            </div>
        </div>

        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Professions from "@/components/common/professions.vue";
export default {
    name: "allTalents",
    components: {
        Professions
    },
    data() {
        return {
            value14: "Hello World",
            professPop: false, //职位弹窗
            form: {
                deptId: "",
                industryId: "",
                sel2: "",
                companySource: "",
                importantLevel: "",
                preFee: "",
                changeInto: "",
                createTimeStart: "",
                signDate: "",
                total: 100,
                pageNum: 1,
                pageSize: 10
            },
            columns4: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "姓名",
                    key: "name",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.$router.push(
                                                "/talent/talentdetail?id=" +
                                                    params.row.id
                                            );
                                        }
                                    }
                                },
                                params.row.name
                            ),
                            h(
                                "Tag",
                                {
                                    props: {
                                        color: "blue"
                                    }
                                },
                                params.row.name
                            )
                        ]);
                    }
                },
                {
                    title: "性别",
                    key: "sex",
                    width: 70,
                    align: "center"
                },
                {
                    title: "年龄",
                    key: "birthday",
                    width: 80,
                    align: "center"
                },
                {
                    title: "学历",
                    key: "education",
                    width: 80,
                    align: "center"
                },
                {
                    title: "工作年限",
                    key: "jobYear",
                    width: 90,
                    align: "center"
                },

                {
                    title: "所在地区",
                    key: "address",
                    width: 100,
                    align: "center"
                },
                {
                    title: "当前职位",
                    key: "position",
                    width: 150,
                    align: "center"
                },
                {
                    title: "目前公司",
                    key: "age",
                    width: 150,
                    align: "center"
                },
                {
                    title: "加入时间",
                    key: "createTime",
                    width: 150,
                    align: "center"
                },
                {
                    title: "操作",
                    key: "cz",
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
                                            this.professPop = true;
                                            this.$Message.info(row.id);
                                        }
                                    }
                                },
                                "加入职位"
                            )
                        ]);
                    }
                }
            ],
            data1: []
        };
    },
    methods: {
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.form.pageNum = page;
            api.axs("post", "/resume/page", this.form).then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.data1 = data.data.list;
                    this.form.total = data.data.total;
                    this.$Loading.finish();
                    this.$store.state.spinShow = false;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        selPro() {
            //选择职位
            var idName = this.$refs.professionComp.professVal;
            if (!idName) {
                this.$Message.warning("不选一个职位么?");
                return;
            }
            this.professId = idName.split("&")[0];
            this.professName = idName.split("&")[1];
            this.form.industryId = idName.split("&")[0];
            this.professPop = false;

            const title = "成功提示";
            const content = "<p>加入职位成功</p>";
            this.$Modal.success({
                title: title,
                content: content
            });
        },
        handleRowChange(currentRow, oldCurrentRow) {
            console.log("1");
            //console.log(oldCurrentRow)
        }
    },
    mounted() {
        this.loadLists();
        this.$store.state.spinShow = false;
    }
};
</script>

<style lang='less' scoped>
.search-box {
    width: 100%;
    padding: 10px;
    background: #f0eeee;
    .serbtn {
        margin-left: 20px;
    }
    .showup {
        float: right;
        margin-top: 7px;
    }
}
.alltalentlist {
    width: 100%;
    border: 1px solid #dddddd;
    margin-top: 20px;
    padding: 5px;
    .fristsear {
        margin-bottom: 10px;
        span {
            margin-left: 10px;
        }
    }
}
</style>