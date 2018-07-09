<template>
<div class="myCustomers">
    <div class='currentNav'>当前位置: 我的客户
        <div class='fr'>
            <Select v-model='creatVal' placeholder='创建' @on-change='createDo' style="width:70px">
                    <Option value='客户'>客户</Option>
                    <Option value='联系人'>联系人</Option>
                    <Option value='合同'>合同</Option>
                </Select>
            <span>&nbsp;&nbsp;</span>
            <Button type="success" class='addNew'>导入</Button>
            <span>&nbsp;&nbsp;</span>
            <Button type="info" class='addNew'>客户查重</Button>
        </div>
    </div>
    <form class="searches">
        <div class="search">
            <Input v-model="form.searchVal" placeholder="请输入客户名称进行搜索...">
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
            <Select v-model="form.sel4" class='sels-item' placeholder='客户状态' style="width:100px">
                    <Option value="客户重要性1">客户重要性1</Option>
                    <Option value="客户重要性2">客户重要性2</Option>
                </Select>
            <Select v-model="form.sel4" class='sels-item' placeholder='客户等级' style="width:100px">
                    <Option value="客户重要性1">客户重要性1</Option>
                    <Option value="客户重要性2">客户重要性2</Option>
                </Select>
            <div class="disInB sels-item">
                创建时间：
                <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
            </div>
            <div class="disInB sels-item">
                最近更新时间：
                <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
            </div>
            <div class="disInB sels-item">
                最后联系时间：
                <DatePicker type="date" v-model='form.signDate' placeholder="开始时间" style="width: 110px"></DatePicker> -
                <DatePicker type="date" v-model='form.signDate' placeholder="结束时间" style="width: 110px"></DatePicker>
            </div>
            <Input v-model="form.kehu" placeholder="客户提供人" style="width:100px;margin-right:10px"></Input>
            <Input v-model="form.guwen" placeholder="BD顾问名字" style="width:100px;margin-right:10px"></Input>
            <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
            <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
        </div>
    </form>
    <div class="searchTable">
        <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
        <div class="sendBtns fl">
            <Button type="warning">发送短信</Button>
            <Button type="info">发送邮件</Button>
        </div>
        <div class="tablePage fr">
            <Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
        </div>
    </div>

    <Modal v-model="recordPop" :closable=false width='400px'>
        <p slot="header">
            <span>最近更新记录</span>
            <Button type="primary" size='small' icon="plus" class='fr' @click='addRecord'></Button>
        </p>
        <ul class="popContent" style='max-height: 335px;overflow-y: scroll'>
            <li>
                <h4 class="name">Wanyu</h4>
                <p class="desc">这个记录描述记录描述记录描述记录描述记录描述记录描述</p>
                <p class="time">
                    <span>当面拜访</span>
                    <time>2016-10-10 12:24</time>
                </p>
            </li>
            <li>
                <h4 class="name">Wanyu</h4>
                <p class="desc">这个记录描述记录描述记录描述记录描述记录描述记录描述</p>
                <p class="time">
                    <span>当面拜访</span>
                    <time>2016-10-10 12:24</time>
                </p>
            </li>
        </ul>
        <p slot='footer'></p>
    </Modal>

    <!-- 新增跟进提醒弹窗 -->
    <AttePop :attePop='attePop'/>

</div>
</template>

<script>
// @ is an alias to /src
import api from "@/api"
import ls from "store2"
import AttePop from "@/components/customer/addAttePop.vue"
export default {
    name: "home",
    data() {
        return {
            creatVal: '',
            recordPop: false,
            cname: '',
            attePop: false, //新增提醒弹窗
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
            tableHeader: [{
                    type: "selection",
                    width: 45,
                    align: "center"
                },
                {
                    title: "提醒",
                    key: "tix",
                    width: 50,
                    align: 'center',
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.attePop = true
                                    this.$Message.info('通知通知通知通知')
                                }
                            }
                        }, [
                            h('Icon', {
                                style: {
                                    fontSize: '16px'
                                },
                                props: {
                                    type: "android-notifications",
                                    color: '#d3585f'
                                }
                            })
                        ])
                    }
                },
                {
                    title: "客户状态",
                    key: "zhuangt",
                    width: 94,
                    sortable: true,
                    align: 'center',
                },
                {
                    title: "客户名称",
                    key: "name",
                    width: 140,
                    sortable: true,
                    ellipsis: true,
                    render: (h, params) => {
                        var row = params.row
                        return h('a', {
                            on: {
                                click: () => {
                                    this.$router.push('/customer/myCustomers/records?cname='+row.name)
                                }
                            }
                        }, params.row.name)
                    }
                },
                {
                    title: "客户重要性",
                    key: "a1",
                    width: 95,
                    sortable: true,
                    align: 'center',
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
                    title: "联系人",
                    key: "kehu",
                    width: 94,
                    sortable: true,
                    align: 'center',
                },
                {
                    title: "联系方式",
                    key: "phone",
                    width: 94,
                    align: 'center',
                },
                {
                    title: "未联系时间",
                    key: "bbb",
                    width: 86,
                    align: 'center',
                },
                {
                    title: "跟进记录",
                    key: "ccc",
                    ellipsis: true,
                    align: 'center',
                    render: (h, params) => {
                        var row = params.row
                        return h('a', {
                            on: {
                                click: () => {
                                    this.recordPop = true
                                    this.cname = row.name
                                }
                            }
                        }, row.ccc)
                    }
                },
                {
                    title: "客户来源",
                    key: "eee",
                    maxWidth: 94,
                    align: 'center',
                },
                {
                    title: "创建时间",
                    key: "fff",
                    width: 80,
                    align: 'center',
                },
                {
                    title: "最近更新时间",
                    key: "ggg",
                    width: 80,
                    align: 'center',
                }
            ],
            tableLists: [{
                    zhuangt: '潜在客户',
                    name: "杭州千里马千里马千里马千里马",
                    aaa: 4,
                    kehu: "Wanyyyy",
                    phone: "18788888888",
                    bbb: "50天未联系",
                    ccc: "这是沟通记录录记录录记录记录记录记录记录记录记录111111",
                    ddd: "这是沟通记录记录记录记录记录记录记录记录11111111",
                    eee: "公司支持",
                    fff: "2018-10-10",
                    ggg: "2018-10-10"
                },
                {
                    zhuangt: '潜在客户',
                    name: "杭州千里马千里马千里马千里马",
                    aaa: 5,
                    kehu: "Wanyyyy",
                    phone: "18788888888",
                    bbb: "50天未联系",
                    ccc: "这是沟通记录录记录录记录记录记录记录记录记录记录111111",
                    ddd: "这是沟通记录记录记录记录记录记录记录记录11111111",
                    eee: "公司支持",
                    fff: "2018-10-10",
                    ggg: "2018-10-10"
                },
                {
                    zhuangt: '潜在客户',
                    name: "杭州千里马千",
                    aaa: 3,
                    kehu: "Wanyyyy",
                    phone: "18788888888",
                    bbb: "50天未联系",
                    ccc: "这是沟通记录录记录录记录记录记录记录记录记录记录111111",
                    ddd: "这是沟通记录记录记录记录记录记录记录记录11111111",
                    eee: "公司支持",
                    fff: "2018-10-10",
                    ggg: "2018-10-10"
                },
                {
                    zhuangt: '潜在客户',
                    name: "杭州千里马千里",
                    aaa: 2,
                    kehu: "Wanyyyy",
                    phone: "18788888888",
                    bbb: "50天未联系",
                    ccc: "这是沟通记录录记录录记录记录记录记录记录记录记录111111",
                    ddd: "这是沟通记录记录记录记录记录记录记录记录11111111",
                    eee: "公司支持",
                    fff: "2018-10-10",
                    ggg: "2018-10-10"
                },
                
            ]
        };
    },
    components: {
        AttePop
    },
    methods: {
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.$Message.info("当前页: " + page)
            setTimeout(() => {
                this.$store.state.spinShow = false
            }, 1500)
        },
        addRecord() { //添加记录
            this.$Message.info('添加记录~~')
            this.$router.push('/customer/myCustomers/records?cname=' + this.cname)
        },
        createDo(val) {
            this.$Message.info(val + '1000000000')
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
                color: #4f8ae4
            }
            time {
                float: right;
            }
        }
    }
}
</style>
