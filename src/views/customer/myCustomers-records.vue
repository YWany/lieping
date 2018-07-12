<template>

	<div class="myCustomersRecords">
		<div class='currentNav'>当前位置:
			<router-link to='/customer/myCustomers'>我的客户</router-link> > {{recordsDetails.companyName}}
			<Rate disabled :value='+recordsDetails.importantLevel' style='font-size:14px'></Rate>
			<Button type="info" icon='arrow-right-a' class='toolBtn fr' @click='selUsersFun(1)'></Button>
			<span class='fr'>&nbsp;&nbsp;</span>
			<Button type="error" icon='trash-a' class='toolBtn fr' @click='delCompanyPop=true'></Button>
			<span class='fr'>&nbsp;&nbsp;</span>
			<Button type="warning" icon='ios-compose' class='toolBtn fr' @click='companyPop=true'></Button>
			<span class='fr'>&nbsp;&nbsp;</span>
		</div>
		<ul class="info">
			<li>BD顾问: {{recordsDetails.bdName}}
				<span>|</span>
			</li>
			<li>客户状态: {{recordsDetails.companyStatus}}
				<span>|</span>
			</li>
			<li>最后跟进时间: {{recordsDetails.updateTime}}</li>
		</ul>
		<div class="recordsContent">
			<Tabs type="card" value="jilu" :animated=false @on-click='clickTab'>
				<TabPane label="跟进记录" name="jilu">
					<div class="add-record clearfix">
						<div class="sels">
							<span class='xing'>*</span>联系人: &nbsp;&nbsp;
                            <Input slot="append" @on-focus="selUsersFun(1,'select')" v-model='userName' :readonly='true' class='selPro' placeholder="请选择" style='width:200px;'></Input>
							<Button type="primary" shape="circle" size='small' icon="plus" @click='contactPop=true' style='margin:0 30px 0 4px'></Button>
							<span class='xing'>*</span>跟进方式: &nbsp;&nbsp;
							<Select v-model="recordsForm.followType" style='width:200px;margin-right:30px'>
								<Option :value='tree.id' v-for='tree in genjinTrees'>{{tree.codeText}}</Option>
							</Select>
							<span class='xing'>*</span>跟进时间: &nbsp;&nbsp;
							<DatePicker type="datetime" :value='recordsForm.followTime' format="yyyy-MM-dd HH:mm:ss" @on-change='seltime' style="width: 200px"></DatePicker>
						</div>
						<div class="add-content">
							<p style='padding: 15px 0 5px'>
								<span class='xing'>*</span>跟进记录:</p>
							<Input v-model="recordsForm.followRecord" type="textarea" :autosize="{minRows: 6,maxRows: 10}" placeholder="请输入跟近记录..."></Input>
						</div>
						<div class="add-sub" style='margin:10px 0 0'>
							<Upload class='up-img' action="//jsonplaceholder.typicode.com/posts/" :format="['jpg','jpeg','png']" :max-size="2048">
								<Button type="ghost">
									<Icon type="ios-camera-outline"></Icon>
									<span>图片</span>
								</Button>
							</Upload>
							<Upload class='up-oth' action="//jsonplaceholder.typicode.com/posts/">
								<Button type="ghost">
									<Icon type="link"></Icon>
									<span>附件</span>
								</Button>
							</Upload>
						</div>
						<div class="add-sub" style='display:block;text-align:center'>
							<Button type='info' style='font-size:14px;' @click='subRecord'>提交</Button>
						</div>
					</div>
					<ul class="history-records">
						<li>
							<div class="header">
								<div class="avatar"><img src="@/assets/images/logo.png"></div>
								<div class="name">
									<h5>Wanyu</h5>
									<p class="company">电话沟通 | 浙江钱里面股份有限公司</p>
								</div>
								<div class="time">2018-06-12 08:10</div>
							</div>
							<p class="desc">这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述</p>
							<div class="contact">联系人: 巴啦啦 (人力资源中心)
								<span class="check-files fr">文件(2)</span>
								<span class="check-pics fr">查看图片(6)</span>
							</div>
						</li>
						<li class='null-records'>
							<h5 style='text-align:center;padding:20px 0;font-size:14px;'>
								<Icon type="social-snapchat-outline" style='font-size:22px;vertical-align:middle'></Icon>
								<span style='vertical-align:middle;padding-left:5px;'>无任何跟进记录</span>
							</h5>
						</li>
					</ul>
				</TabPane>
				<TabPane class="pact" label="合同" name="hetong">
					<!-- <router-link to='/customer/myCustomers/contract'>合同列表</router-link> -->

					<div class="search">
						<div class="disInB sels-item">
							<DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
						</div>----
						<div class="disInB sels-item">
							<DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
						</div>
					</div>

					<Tabs size='small' :animated=false class="subTabs" value="name1">
						<TabPane label="所有合同(3)" name="name1">
							<div class="searchTable">
								<Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>

							</div>
						</TabPane>
						<TabPane label="猎头(3)" name="name2">
							<div class="searchTable">
								<Table border ref="selection" :columns="headhunter" :data="headlist"></Table>

							</div>
						</TabPane>
						<TabPane label="背景调查(1)" name="name3">
							<div class="searchTable">
								<Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
							</div>
						</TabPane>
						<TabPane label="薪酬调查(1)" name="name4">
							<div class="searchTable">
								<Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
							</div>
						</TabPane>
						<TabPane label="咨询服务(1)" name="name5">
							<div class="searchTable">
								<Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
							</div>
						</TabPane>
						<TabPane label="外包(1)" name="name6">
							<div class="searchTable">
								<Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
							</div>
						</TabPane>
						<TabPane label="其他(1)" name="name7">
							<div class="searchTable">
								<Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
							</div>
						</TabPane>
					</Tabs>
					<div class="tablePage fr leta">
						<Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
					</div>
				</TabPane>
				<TabPane label="汇款" name="huikuan">汇款</TabPane>
				<TabPane label="开票历史" name="lishi">开票历史</TabPane>
				<TabPane label="开票信息" name="xinxi">开票信息</TabPane>
				<TabPane label="联系人" name="contact">
					<ul class="contact-lists">
						<li v-for='list in contactLists' :key='list.id'>
							<div class="name clearfix">
								<strong>{{list.name}}</strong>
								<span class='imp' v-if='list.mainContact'>主联系人</span>
								<span class='imp imp2' v-else @click='setMainContact(list.id)'>设为主联系人</span>
								<p class="sels fr" v-if='list.incumbency'>
									<Button type='info' size='small'>在职</Button>
									<Button type='dashed' size='small' @click='dimissionFun(list.id,list.name)'>离职</Button>
								</p>
								<p class="sels fr" v-else>
									<Button type='dashed' size='small' @click="inWork">在职</Button>
									<Button type='error' size='small'>离职</Button>
								</p>
							</div>
							<div class="desc">
								<span>电话: {{list.phone1}} {{list.phone2}} {{list.phone3}} {{list.phone4}}</span>
								<span v-if='list.email'>邮箱: {{list.email}}</span>
								<a href="javascript:;" class='fr'>查看简历</a>
							</div>
						</li>
					</ul>
				</TabPane>
				<TabPane label="职位" name="job">
					<div class="job-content searchTable">
						<Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
						<div class="tablePage fr">
							<Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
						</div>
					</div>
				</TabPane>
				<TabPane label="文件" name="files">
					<div class="job-content searchTable">
						<Table border ref="selection" :columns="filetable" :data="filelist"></Table>
						<div class="tablePage fr">
							<Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
						</div>
					</div>
				</TabPane>

			</Tabs>
		</div>
		<div class="other-btns">
			<Button @click='contactPop=true'>新增联系人</Button>
			<Button @click='contractPop=true'>新建合同</Button>
			<Button @click='attePop=true'>设置跟进提醒</Button>
			<Button>发票申请</Button>
		</div>

		<!-- 设置主联系人弹窗 -->
		<Modal v-model="mainperPop" title="离职提醒" width='400px' @on-ok="sureMainper" @on-cancel="dimissonFun" style='text-align: center'>
			<p style='font-size:14px;text-align:center;padding:20px 0'>
				是否将
				<strong>Wanyyy</strong> 设为主联系人?
			</p>
		</Modal>

		<!-- 离职确认弹窗 -->
		<Modal v-model="dimissionPop" title="离职提醒" width='400px' @on-ok="sureDim" @on-cancel="dimissonFun" style='text-align: center'>
			<p style='font-size:14px;text-align:center;padding:20px 0'>
				<strong>{{contactName}}</strong>离职, 提醒相关人员</p>
		</Modal>

		<!-- 选择BD角色 -->
		<Modal v-model="selUsersPop" width='400px' :mask-closable='false' :closable='false'>
            <div slot="header">
                <span style='font-size:14px'>选择BD</span>
                <a href="javascript:;" class='fr' @click='closeSelUsersPop'><Icon type="close-round"></Icon></a>
            </div>
			<ul class='users-content' >
				<li v-for='user in users'>
					<RadioGroup v-model="userId">
						<Radio :label="user.id + '&' +user.userName">
							<span class='name'>{{user.userName}}</span>
							<span class='depart'>{{user.departmentName}}</span>
						</Radio>
					</RadioGroup>
				</li>
			</ul>
			<div class="tablePage" style='text-align:right;margin-bottom:0;'>
                <Page size='small' :total='userForm.total' :page-size='userForm.pageSize' :current='userForm.pageNum' show-total @on-change='selUsersFun'></Page>
            </div>
            <div slot='footer' style='text-align:center'>
				<Button type='primary' @click='sureSelUser'>确定</Button>
			</div>
		</Modal>

		<!-- 删除 -->
		<Modal v-model="delCompanyPop" title="删除确认" width='400px' @on-ok="delCompany" style='text-align: center'>
			<p style='font-size:14px;text-align:center;padding:20px 0'>确定要删除这个客户 : {{recordsDetails.companyName}} ?</p>
		</Modal>

		<!-- 新增企业客户弹窗 -->
		<CompanyPop :recordsDetails='recordsDetails' :companyPop='companyPop' :companyMod='companyMod' />

		<!-- 新增跟进提醒弹窗 -->
		<AttePop :attePop='attePop' />

		<!-- 新增联系人弹窗 -->
		<ContactPop :contactPop='contactPop' />

		<!-- 新增合同弹窗 -->
		<ContractPop :contractPop='contractPop' />

	</div>
</template>

<script>
// @ is an alias to /src
import api from "@/api"
import ls from "store2"
import { mapState, mapMutations, mapActions } from "vuex"
import CompanyPop from "@/components/customer/addCompanyPop.vue"
import AttePop from "@/components/customer/addAttePop.vue"
import ContactPop from "@/components/customer/addContactPop.vue"
import ContractPop from "@/components/customer/addContractPop.vue"
import { UTC2Date } from '@/assets/js/utils.js'
export default {
    name: "personalDetails",
    components: {
        CompanyPop,
        AttePop,
        ContactPop,
        ContractPop
    },
    data() {
        return {
            subFlag: true,
            genjinTrees: this.$store.state.selTrees[5].children,
            pageNum: "1",
            pageSize: "10",
            form: {
                createDate: "",
                signDate: ""
			},
			userForm: {
				pageNum: 1,
				total: 1,
				pageSize: 3
			},
            recordsForm: {
                contactId: '',
                companyId: this.$route.query.id,
                followType: '',
                followTime: UTC2Date(new Date(),'y-m-d h:i:s'),
                followRecord: '',
                contactRecord: [],
                attachmentList: [
                    {
                        fileName: "f.jpg",
                        filePath: "g.jpg",
                        fileSize: 3
                    }
                ]
            },
            id: this.$route.query.id,
            cname: this.$route.query.cname,
			level: +this.$route.query.level,
            contactId: '', //联系人ID
            contactName: '', //联系人姓名
			userId: '',
            userName: '',
            selUserSelect: false,
            recordsDetails: {}, //记录详情
            contactLists: [], //联系人列表
            companyPop: false, //新增企业客户弹窗
            attePop: false, //新增联系人弹窗
            contactPop: false, //新增联系人弹窗
            contractPop: false, //新增合同弹窗
            mainperPop: false, //设置主联系人弹窗
            dimissionPop: false, //离职提醒弹窗
            selUsersPop: false, //选择BD弹窗
            delCompanyPop: false, //删除弹窗
            companyMod: true,
            cityList: [
                {
                    value: "New York",
                    label: "New York"
                },
                {
                    value: "London",
                    label: "London"
                },
                {
                    value: "Sydney",
                    label: "Sydney"
                },
                {
                    value: "Ottawa",
                    label: "Ottawa"
                },
                {
                    value: "Paris",
                    label: "Paris"
                }
            ],
            formPage: {
                total: 120,
                current: 1,
                pageSize: 20
            },
            tableHeader: [
                {
                    title: "合同类型",
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
                                        "/customer/myCustomers/contract?jodId=" +
                                        row.id
                                }
                            },
                            row.name
                        );
                    }
                },
                {
                    title: "合同开始时间",
                    key: "hhh",
                    width: 150,
                    align: "center"
                },
                {
                    title: "合同结束时间",
                    key: "hhh",
                    width: 150,
                    align: "center"
                },

                {
                    title: "合同状态",
                    key: "bbb",
                    sortable: true,
                    width: 94,
                    align: "center"
                },

                {
                    title: "BD顾问",
                    key: "ddd",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "合同编号",
                    key: "phone",
                    width: 94,
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
            filetable: [
                {
                    title: "文件名",
                    key: "fileName",
                    width: 250,
                    align: "center",
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "router-link",
                            {
                                attrs: {
                                    to:
                                        "/customer/myCustomers/contract?jodId=" +
                                        row.id
                                }
                            },
                            row.fileName
                        );
                    }
                },
                {
                    title: "上传人",
                    key: "createBy",
                    width: 250,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "上传时间",
                    key: "createTime",
                    width: 250,
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
                                                "预览!!!" + row.id
                                            );
                                        }
                                    }
                                },
                                "预览"
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
                                                "下载!!!" + row.id
                                            );
                                        }
                                    }
                                },
                                "下载"
                            )
                        ]);
                    }
                }
            ],
            headhunter: [
                {
                    title: "合同类型",
                    key: "name",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "router-link",
                            {
                                attrs: {
                                    to:
                                        "/customer/myCustomers/contract?jodId=" +
                                        row.id
                                }
                            },
                            row.name
                        );
                    }
                },
                {
                    title: "BD顾问",
                    key: "ddd",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "前期服务费",
                    key: "ccc",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "服务费比例",
                    key: "ggg",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "付款方式",
                    key: "eee",
                    width: 65,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "合同开始时间",
                    key: "hhh",
                    width: 120,
                    align: "center"
                },
                {
                    title: "合同结束时间",
                    key: "hhh",
                    width: 120,
                    align: "center"
                },

                {
                    title: "合同状态",
                    key: "bbb",
                    sortable: true,
                    width: 94,
                    align: "center"
                },

                {
                    title: "合同编号",
                    key: "phone",
                    width: 94,
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
                            )
                        ]);
                    }
                }
            ],
            tableLists: [
                {
                    id: 96,
                    name: "猎头协议",
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
            ],
            headlist: [
                {
                    id: 96,
                    name: "猎头协议",
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
            ],
            filelist: [
                //    文件列表
            ]
        };
    },
    computed: {
        users() {
            return this.$store.state.users;
        }
    },
    methods: {
        ...mapActions(["getUsers"]),
        companyInfo() {
			api.axs("post", "/company/info", {id: this.id}).then(({ data }) => {
                if (data.code === "SUCCESS") {
					this.recordsDetails = data.data
                    this.$Loading.finish()
                    this.$store.state.spinShow = false
                } else {
                    this.$Message.error(data.remark)
                }
            })
		},
        subRecord() { //提交记录
            if (!this.recordsForm.contactId) {
                this.$Message.error('请选择联系人!')
                return
            } else if (!this.recordsForm.followType) {
                this.$Message.error('请选择跟进方式!')
                return
            } else if (!this.recordsForm.followRecord) {
                this.$Message.error('请填写跟进记录!')
                return
            }

            if (this.subFlag) this.subFlag = false
            else return
            this.$store.state.spinShow = true
            api.axs("post", "/contactRecord/save", this.recordsForm).then(({ data }) => {
                if (data.code === "SUCCESS") {
					this.$Message.error('提交成功!')
                    this.$Loading.finish()
                    this.$store.state.spinShow = false
                    this.subFlag = true
                } else {
                    this.$Message.error(data.remark)
                }
            })
        },
        getContactLists() { //联系人
            api.axs("post", "/contact/list", {companyId: this.id}).then(({ data }) => {
                if (data.code === "SUCCESS") {
					this.contactLists = data.data
                    this.$Loading.finish()
                    this.$store.state.spinShow = false
                } else {
                    this.$Message.error(data.remark)
                }
            })
        },
        seltime(date) {
            this.recordsForm.followTime = date
        },
        clickTab(name) {
            if (name == "contact") this.getContactLists();
            if (name == "files") this.getFileLists(this.pageNum);
        },
        setMainContact(id) { //设置主联系人
            api.axs("post", "/contact/setIncumbency", {companyId: this.id, id: id}).then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.$Message.success('设置成功!')
                    this.getContactLists()
                } else {
                    this.$Message.error(data.remark)
                }
            })
        },
        dimissionFun(id, name) {
            this.dimissionPop = true;
            this.contactId = id;
            this.contactName = name;
        },
        loadLists(page) {
            this.clickTab(name);
            this.$store.state.spinShow = true;
            this.$Message.info("当前页: " + page);
            setTimeout(() => {
                this.$store.state.spinShow = false;
            }, 1500);
        },
		selUsersFun(page, type) {
            this.userId = ''
            if (type == 'select') this.selUserSelect = true
            
			this.userForm.pageNum = page
			api.axs("post", "/user/queryLikeForPages", this.userForm).then(({ data }) => {
				if (data.code === "SUCCESS") {
					this.$store.state.users = data.data.list
					this.userForm.total = data.data.total
					this.selUsersPop = true
				} else {
					this.$Message.error(data.remark)
				}
			})
		},
		sureSelUser() {
			if (!this.userId) {
				this.$Message.info("选一个BD啊!")
				return
			}else if (this.selUserSelect) {
                this.userName = (this.userId).split('&')[1]
                this.recordsForm.contactId = (this.userId).split('&')[0]
                this.selUsersPop = false
                return
            }
			api.axs("post", "/company/changeInto", {id: this.id, bdId: (this.userId).split('&')[0]}).then(({ data }) => {
                if (data.code === "SUCCESS") {
					this.$Message.success("转出成功!")
					this.$router.push('/customer/cooperation')
                    this.selUsersPop = false
                } else {
                    this.$Message.error(data.remark)
                }
            })
		},
        closeSelUsersPop() {
            this.selUserSelect = false
            this.selUsersPop = false
        },
		delCompany() {
			api.axs("post", "/company/delete", {id: this.id}).then(({ data }) => {
                if (data.code === "SUCCESS") {
					this.$Message.success("删除成功")
					this.$router.push('/customer/cooperation')
                } else {
                    this.$Message.error(data.remark)
                }
            })
		},
        sureMainper() {
            this.$Message.info("确认主联系人成功!");
        },
        inWork() {
            //在职
            this.$Message.info("又回来了?");
        },
        sureDim() {
            //离职确认
            this.$store.state.spinShow = true;
            api.axs("post", "/contact/setLeaveStatus", { id: this.contactId }).then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.$Message.success("离职成功!");
                    this.getContactLists();
                    this.$store.state.spinShow = false;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        dimissonFun() {
            //关闭离职弹窗
            this.mainperPop = false;
            this.dimissionPop = false;
        }
    },
    mounted() {
        this.companyInfo()
    },
    beforeDestroy() {}
};
</script>

<style lang='less' scoped>
.myCustomersRecords {
    .info {
        display: flex;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 10px;
        li {
            font-size: 14px;
            span {
                margin: 0 10px;
            }
        }
    }
    .recordsContent {
        margin-top: 10px;
        .add-record {
            width: 88%;
            padding: 20px 20px 10px;
            background-color: #f2f2f2;
            .xing {
                color: #dd3030;
                padding-right: 2px;
            }
            .sels {
                .tip {
                    line-height: 30px;
                }
            }
            .add-sub {
                .ivu-icon {
                    font-size: 20px;
                    vertical-align: middle;
                    margin-right: 4px;
                }
                span {
                    vertical-align: middle;
                }
                .ivu-upload {
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 10px;
                }
            }
        }
        .history-records {
            width: 88%;
            li {
                background-color: #f2f2f2;
                padding: 10px;
                margin: 10px 0;
                .header {
                    display: flex;
                    .avatar {
                        width: 38px;
                        height: 38px;
                        border-radius: 50%;
                        border: 1px solid #eee;
                        padding: 10px 15px;
                        margin-bottom: 10px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                        .name {
                            line-height: 32px;
                            strong {
                                font-size: 14px;
                            }
                            .imp {
                                padding: 3px 4px;
                                margin-left: 5px;
                                border: 1px solid #f1c840;
                                background-color: #f1c840;
                                border-radius: 4px;
                                color: #fff;
                                cursor: pointer;
                            }
                            .imp2 {
                                background-color: #fff;
                                border-radius: 4px;
                                color: #f1c840;
                            }
                            .sels {
                                display: inline-block;
                                button {
                                    margin-left: 10px;
                                }
                            }
                        }
                    }
                    .name {
                        margin-left: 15px;
                        h5 {
                            font-size: 15px;
                            font-weight: bold;
                            color: #333;
                        }
                    }
                    .time {
                        flex: 2;
                        text-align: right;
                    }
                }
                .desc {
                    padding: 8px 0;
                }
                .contact {
                    span {
                        margin-left: 10px;
                        color: #207ace;
                    }
                }
            }
        }
        .subTabs {
            width: 85%;
        }
        .leta {
            margin-right: 15%;
            margin-top: 10px;
        }
        .pact {
            position: relative;
            .search {
                position: absolute;
                right: 15%;
                top: 0;
            }
        }
    }
    .contact-lists {
        width: 88%;
        li {
            border: 1px solid #eee;
            padding: 10px 15px;
            margin-bottom: 10px;
            .name {
                line-height: 32px;
                strong {
                    font-size: 14px;
                }
                .imp {
                    padding: 3px 4px;
                    margin-left: 5px;
                    border: 1px solid #f1c840;
                    background-color: #f1c840;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                }
                .imp2 {
                    background-color: #fff;
                    border-radius: 4px;
                    color: #f1c840;
                }
                .sels {
                    display: inline-block;
                    button {
                        margin-left: 10px;
                    }
                }
            }
            .desc {
                padding: 10px 0 0;
                span {
                    margin-right: 20px;
                }
            }
        }
    }
    .job-content {
        width: 88%;
    }
    .other-btns {
        position: fixed;
        top: 210px;
        right: 25px;
        button {
            display: block;
            width: 120px;
            margin: 10px 0;
            color: #207ace;
            background-color: #c3e0fa;
            border: 2px solid #c3e0fa;
        }
    }
}
</style>
