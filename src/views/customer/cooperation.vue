<template>
    <div class="customer">
        <div class='currentNav'>当前位置: 合作中客户 <Button type="success" class='addNew fr'><Icon type="plus"></Icon> 录入新客户</Button></div>
        <form class="searches">
            <div class="search">
                <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                    <Option value="企业名称">企业名称</Option>
                    <Option value="搜索顾问">搜索顾问</Option>
                    <Option value="客户来源">客户来源</Option>
                </Select>
                <Button slot="append" icon="ios-search"></Button>
                </Input>
            </div>
            <div class="sels">
                <Select v-model="form.sel1" class='sels-item' placeholder='部门归属' style="width:100px">
                    <Option value="部门归属1">部门归属1</Option>
                    <Option value="部门归属2">部门归属2</Option>
                </Select>
                <Select v-model="form.sel2" class='sels-item' placeholder='客户行业' style="width:100px">
                    <Option value="客户行业1">客户行业1</Option>
                    <Option value="客户行业2">客户行业2</Option>
                </Select>
                <Select v-model="form.sel3" class='sels-item' placeholder='客户来源' style="width:100px">
                    <Option value="客户来源1">客户来源1</Option>
                    <Option value="客户来源2">客户来源2</Option>
                </Select>
                <Select v-model="form.sel4" class='sels-item' placeholder='客户重要性' style="width:100px">
                    <Option value="客户重要性1">客户重要性1</Option>
                    <Option value="客户重要性2">客户重要性2</Option>
                </Select>
                <Select v-model="form.sel5" class='sels-item' placeholder='前期服务费' style="width:100px">
                    <Option value="前期服务费1">前期服务费1</Option>
                    <Option value="前期服务费2">前期服务费2</Option>
                </Select>
                <Select v-model="form.sel6" class='sels-item' placeholder='转入客户' style="width:100px">
                    <Option value="转入客户1">转入客户1</Option>
                    <Option value="转入客户2">转入客户2</Option>
                </Select>
                <div class="disInB sels-item">
                    创建时间：
                    <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <div class="disInB sels-item">
                    签约时间：
                    <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                </div>
                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
            </div>
        </form>
        <div class="searchTable">
            <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
            <div class="sendBtns fl">
                <Button type="warning">群发短信</Button>
                <Button type="info">群发邮件</Button>
            </div>
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
                selVal: "企业名称",
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
                    type: "selection",
                    width: 45,
                    align: "center"
                },
                {
                    title: "客户名称",
                    key: "name",
                    width: 140,
                    sortable: true,
                    ellipsis: true,
                    render: (h, params) => {
                        return h('span',{
                            on: {
                                click: () => {
                                    console.log(params)
                                }
                            }
                        },params.row.name)
                    }
                },
                {
                    title: "客户重要性",
                    key: "a1",
                    width: 95,
                    sortable: true,
                    render: (h, params) => {
                        const row = params.row
                        return h("Rate", {
                            props: {
                                value: row.aaa,
                                disabled: true
                            }
                        });
                    }
                },
                {
                    title: "客户联系人",
                    key: "kehu",
                    width: 94,
                    sortable: true
                },
                {
                    title: "手机",
                    key: "phone",
                    width: 94
                },
                {
                    title: "合作状态",
                    key: "bbb",
                    sortable: true
                },
                {
                    title: "最近沟通",
                    key: "ccc"
                },
                {
                    title: "沟通记录",
                    key: "ddd",
                    width: 90,
                    ellipsis: true,
                    render: (h, params) => {
                        const row = params.row;
                        return h( "Tooltip", {
                                props: {
                                    content: row.ddd,
                                    placement: "top"
                                }
                            },
                        [h("div", row.ddd.substr(0, 5) + "...")]
                        );
                    }
                },
                {
                    title: "进行中/总职位",
                    key: "eee",
                    maxWidth: 94
                },
                {
                    title: "项目经理",
                    key: "fff",
                    width: 66
                },
                {
                    title: "BD顾问",
                    key: "ggg",
                    width: 66
                },
                {
                    title: "附件",
                    key: "hhh",
                    width: 60
                },
                {
                    title: "贡献值",
                    key: "iii",
                    sortable: true
                }
            ],
            tableLists: [
                {
                    name: "杭州千里马千里马千里马千里马",
                    aaa: 4,
                    kehu: "Wanyyyy",
                    phone: "18788888888",
                    bbb: "潜在客户",
                    ccc: "2018-10-10",
                    ddd: "这是沟通记录记录记录记录记录记录记录记录11111111",
                    eee: "25 / 799",
                    fff: "Yuxinhua",
                    ggg: "Yuxinhua",
                    hhh: 345,
                    iii: 999999
                },
                {
                    name: "杭州千里哈哈哈",
                    aaa: 3,
                    kehu: "Wany",
                    phone: "18700000000",
                    bbb: "潜在客户",
                    ccc: "2018-10-10",
                    ddd: "这是沟通记录记录记录记录",
                    eee: "88 / 999",
                    fff: "Yuxinhua",
                    ggg: "Yuxinhua",
                    hhh: 345000,
                    iii: 2000000
                },
                {
                    name: "千里马嘛嘛嘛",
                    aaa: 5,
                    kehu: "Wany000",
                    phone: "18700000000",
                    bbb: "潜在客户",
                    ccc: "2018-10-10",
                    ddd: "这是沟通记录记录记录记录",
                    eee: "88 / 999",
                    fff: "Yuxinhua",
                    ggg: "Yuxinhua",
                    hhh: 345000,
                    iii: 2000000
                },
                {
                    name: "千里马嘛嘛嘛",
                    aaa: 5,
                    kehu: "Wany000",
                    phone: "18700000000",
                    bbb: "潜在客户",
                    ccc: "2018-10-10",
                    ddd: "这是沟通记录记录记录记录",
                    eee: "88 / 999",
                    fff: "Yuxinhua",
                    ggg: "Yuxinhua",
                    hhh: 345000,
                    iii: 2000000
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
            this.$Message.info("当前页: " + page)
            setTimeout(() => {
                this.$store.state.spinShow = false
            }, 1500)
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
            this.$Loading.finish()
            this.$store.state.spinShow = false
        }, 1500)
        
    }
};
</script>

<style lang='less' scoped>
.customer {
}
</style>
