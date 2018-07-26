<template>
    <div class="serachItems">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="职位名称" prop="position">
                <Input v-model="formValidate.position"></Input>
            </FormItem>
            <FormItem label="所在行业" prop="industryName">
                <Input @on-focus='professPop=true' v-model='professName' :readonly='true' placeholder="选择行业" class='selPro' style="width:150px"></Input>
                <!-- <Input v-model="formValidate.industryId"></Input> -->
            </FormItem>
            <FormItem label="目前工作地区" prop="areaName">
                <Citysels ref='proCity' />
            </FormItem>
            <!-- <FormItem label="期望工作地区" prop="applyUserName">
                <Citysels ref='proCity' />
            </FormItem> -->
            <FormItem label="关键词">
                <Input v-model="formValidate.keyword"></Input>
            </FormItem>
            <FormItem label="公司名称" prop="companyName">
                <Input v-model="formValidate.companyName" placeholder="请输入公司名称"></Input>
                <!-- <RadioGroup v-model="formValidate.comtype" style='margin-left:10px;'>
                    <Radio label="apple">
                        <span>目前公司</span>
                    </Radio>
                    <Radio label="android">
                        <span>全部经历</span>
                    </Radio>
                </RadioGroup> -->
            </FormItem>
            <FormItem label="职能类别" prop="applyUserName">
                <Input v-model="formValidate.applyUserName"></Input>
            </FormItem>
            <FormItem label="学历" prop="applyUserName">
                <Select value='' placeholder="请选择学历" class='liSel'>
                    <Option value='1'>小学</Option>
                    <Option value='2'>初中</Option>
                    <Option value='3'>高中</Option>
                </Select> -
                <Select value='' placeholder="请选择学历" class='liSel'>
                    <Option value='1'>小学</Option>
                    <Option value='2'>初中</Option>
                    <Option value='3'>高中</Option>
                </Select>
            </FormItem>
            <FormItem label="工作年限" prop="applyUserName">
                <Select value='' placeholder="请选择年限" class='liSel'>
                    <Option value='1'>1年</Option>
                    <Option value='2'>2年</Option>
                    <Option value='3'>3年</Option>
                </Select> -
                <Select value='' placeholder="请选择年限" class='liSel'>
                    <Option value='1'>1年</Option>
                    <Option value='2'>2年</Option>
                    <Option value='3'>3年</Option>
                </Select>
            </FormItem>
            <FormItem label="年龄" prop="applyUserName">
                <Select value='' placeholder="请选择年龄" class='liSel'>
                    <Option value='1'>18年</Option>
                    <Option value='2'>19年</Option>
                    <Option value='3'>3年</Option>
                </Select> -
                <Select value='' placeholder="请选择年龄" class='liSel'>
                    <Option value='1'>1年</Option>
                    <Option value='2'>2年</Option>
                    <Option value='3'>3年</Option>
                </Select>
            </FormItem>
            <FormItem label="性别">
                <Select v-model="formValidate.resumeGender" placeholder="请选择性别">
                    <Option value='male'>男</Option>
                    <Option value='female'>女</Option>
                </Select>
            </FormItem>
            <FormItem label="更新时间" prop="dateModified">
                <Select v-model="formValidate.dateModified" placeholder="请选择性别">
                    <Option value='male'>男</Option>
                    <Option value='female'>女</Option>
                </Select>
            </FormItem>
            <FormItem label="求职状态" prop="applyUserName">
                <Select value='' placeholder="请选择求职状态">
                    <Option value='1'>在职</Option>
                    <Option value='2'>离职</Option>
                </Select>
            </FormItem>
            <!-- <FormItem label="合同序号" prop="contractId">
                            <Select v-model="formValidate.contractId" placeholder="请选择合同序号">
                                <Option v-for="(item,index) in hetongLists" :value="item.id" :key='index'>{{item.num}}</Option>
                            </Select>
                        </FormItem> -->
        </Form>
        <div class="search" style='text-align:center;'>
            <!-- <Button type='info' @click="handleSubmit('formValidate')">搜索人才</Button> -->
            <Button type="primary" :loading="loading" @click="handleSubmit(1)">
                <span v-if="!loading">搜索人才</span>
                <span v-else>Loading...</span>
            </Button>
        </div>

        <!-- 新建分组 -->
        <!-- <div class="addGroupPop">
                        <Modal v-model="addGroupPop" :closable='false' :mask-closable='false' style='text-align:center'>
                            <div slot='header' style='font-size:14px;color:#444'>
                                新建分组
                                <a href="javascript:;" @click='addGroupPop=false'>
                                    <Icon type="close" class='fr'></Icon>
                                </a>
                            </div>
                            <span>分组名称： </span>
                            <Input v-model='addgroupForm.folderName' placeholder='请输入分组名称' style='width:300px;padding:20px 0'></Input>
                            <div slot='footer' style='text-align:center'>
                                <Button type='info' @click='subGroupSave'>保存</Button>
                            </div>
                        </Modal>
                    </div> -->

        <!-- 分组列表 -->
        <!-- <div class="listGroupPop">
                        <Modal v-model="listGroupPop" :closable='false' :mask-closable='false' style='text-align:center;' width='360px'>
                            <div slot='header' style='font-size:14px;color:#444'>
                                新建分组
                                <a href="javascript:;" @click='listGroupPop=false'>
                                    <Icon type="close" class='fr'></Icon>
                                </a>
                            </div>
                            <Input v-model="addgroupForm.folderName" @on-enter='searchIn' placeholder="请输入分组名称" style='margin:20px auto;width:300px;'>
                                <Button slot="append" @click='searchIn'>新增</Button>
                            </Input>
                            <div class="sels">
                                <RadioGroup v-model="selgroupForm.folderId">
                                    <Radio label="金斑蝶"></Radio>
                                    <Radio label="爪哇犀牛"></Radio>
                                    <Radio label="印度黑羚"></Radio>
                                    <Radio label="金斑蝶"></Radio>
                                    <Radio label="爪哇犀牛"></Radio>
                                </RadioGroup>
                            </div>
                            <div slot='footer' style='text-align:center'>
                                <Button type='info' @click='subGroupSave'>确定</Button>
                            </div>
                        </Modal>
                    </div> -->
        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />

    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Citysels from "@/components/common/citysels.vue";
import Professions from "@/components/common/professions.vue";
export default {
    name: "serachItems",
    components: {
        Citysels,
        Professions
    },
    data() {
        return {
            addGroupPop: false,
            listGroupPop: false,
            groupLists: [], //分组列表
            professPop: false, //职位弹窗
            loading: false,
            professName: "",
            addgroupForm: {
                userId: ls.get("accid"),
                folderName: ""
            },
            selgroupForm: {
                folderId: ""
            },
            formdata: {
                total: 100,
                pageNum: 1,
                pageSize: 10
            },
            formValidate: {
                position: "前端工程师", //岗位
                keyword: "", //关键词
                ageFrom: "", //年龄下限(不能小于18)
                ageTo: "", //年龄上限(不能大于60)
                workYearFrom: "", //工作经验下限
                workYearTo: "", //工作经验上限
                eduForm: "", //学历下限
                eduTo: "", //学历上限
                dateModified: "", //简历更新时间
                schoolName: "", //学校名
                resumeGender: "", //性别
                areaId: "", //区域id
                industryId: "2002", //行业id
                companyName: "千里马" //公司名称
            },
            ruleValidate: {
                // position: [
                //     {
                //         required: true,
                //         message: "请输入职位名称",
                //         trigger: "blur"
                //     }
                // ],
                // industryName: [
                //     {
                //         required: true,
                //         message: "请输入行业名称",
                //         trigger: "change"
                //     }
                // ],
                // areaName: [
                //     {
                //         required: true,
                //         message: "请输入地区",
                //         trigger: "blur"
                //     }
                // ]
            }
        };
    },
    computed: {},
    methods: {
        // getGroupLists() {
        //     //获取分组列表
        //     api.axs("post", "/userFolder/folderList").then(({
        //         data
        //     }) => {
        //         if (data.code === "SUCCESS") {
        //             this.groupLists = data.data;
        //         } else {
        //             this.$Message.error(data.remark);
        //         }
        //     });
        // },
        // subGroupSave() {
        //     //选择分组
        //     if (!this.selgroupForm.folderId) {
        //         this.$Message.warning("请一个分组！");
        //         return;
        //     }
        //     api
        //         .axs("post", "/userFolder/addUserFolder", this.addgroupForm)
        //         .then(({ data }) => {
        //             if (data.code === "SUCCESS") {
        //                 this.$Message.success("新增成功!");
        //             } else {
        //                 this.$Message.error(data.remark);
        //             }
        //         });
        // },
        handleSubmit(page) {
            console.log(page)
            //搜素人才
            // if (this.$refs.proCity.cityId === "") {
            //     this.companyForm.areaId = this.$refs.proCity.proId;
            // } else {
            //     this.companyForm.areaId = this.$refs.proCity.cityId;
            // }
            this.loading = true;
            this.$store.state.spinShow = true;
            api
                .axs("post", "/resume/search", this.formValidate)
                .then(({ data }) => {
                    this.$store.state.spinShow = false;
                    if (data.code === "SUCCESS") {
                        this.createpop();
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        createpop() {
            //创建任务
            var vm = this;
            window.timer = setInterval(function() {
                api
                    .axs("post", "/resume/pollingTaskSchedule")
                    .then(({ data }) => {
                        if (data.code === "SUCCESS" && data.data == 3) {
                            console.log(data);
                            window.clearInterval(window.timer);
                            api
                                .axs("post", "/resume/getResumeList", vm.formdata)
                                .then(({ data }) => {
                                    if (data.code === "SUCCESS") {
                                        console.log(data);
                                        vm.loading = false;
                                        vm.$parent.data1 = data.data.list;
                                        vm.$parent.form.total = data.data.total;
                                    } else {
                                        vm.$Message.error(data.remark);
                                    }
                                });
                        } else if (data.code === "FAIL") {
                            this.$Message.error(data.remark);
                            window.clearInterval(window.timer);
                        }
                    });
            }, 1000);
        },
        search2Lits(page) {
            this.formdata.pageNum = page
            api
                .axs("post", "/resume/getResumeList", vm.formdata)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        vm.loading = false;
                        vm.$parent.data1 = data.data.list;
                        vm.$parent.form.total = data.data.total;
                    } else {
                        vm.$Message.error(data.remark);
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
            this.formValidate.industryId = idName.split("&")[0];
            this.professPop = false;
        },
        seltime(date) {
            this.recordsForm.followTime = date;
        }
    },
    mounted() {
        // this.getGroupLists();
    }
};
</script>

<style lang='less' scoped>
.serachItems {
    padding: 20px 0 !important;
    form {
        overflow: auto;
        width: 100%;
        .ivu-form-item-content {
            margin-left: 85px;
            width: 50%;
        }
        .ivu-select-dropdown {
            width: 50% !important;
            left: 0 !important;
        }
        .datatable {
            i {
                right: 50%;
            }
        }
        .ivu-form-item {
            width: 50%;
            float: left;
            .ivu-input-wrapper {
                width: 60% !important;
            }
            .ivu-select-selection,
            .ivu-select,
            .ivu-date-picker {
                width: 60% !important;
            }
            .liSel {
                width: 28.8% !important;
            }
        }
    }
    .ivu-radio-wrapper {
        line-height: 30px !important;
    }
}

.ivu-radio-wrapper {
    margin-right: 34px !important;
    padding: 5px 0;
    text-align: left;
}
</style>
