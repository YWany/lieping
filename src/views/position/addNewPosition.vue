<template>
    <div class="addNewPosition">
        <div class='currentNav'>当前位置: 新增职位</div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <div class="number1">
                <div class="title">
                    <span>1</span> 基本信息
                </div>
                <FormItem label="关联企业：" class="half fl">
                    <Select v-model="formValidate.companyId" filterable remote :remote-method="searchCompany" :loading="comLoading" @on-change="searchHetong" placeholder="请输入关键词并搜索">
                        <Option v-for="(item, index) in comLists" :value="item.id" :key="index">{{item.companyName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="保证期：" prop="jobName" class="half fl">
                    <Input v-model="formValidate.jobName"></Input>
                </FormItem>
                <FormItem label="所属合同：" prop="contractId" v-if="formValidate.companyId" class="half fl">
                    <Select v-model="formValidate.contractId">
                        <Option v-for="list in htLists" :key="list.id" :value="list.id">{{list.num}}</Option>
                    </Select>
                </FormItem>
            </div>
            <div class="number1">
                <div class="title">
                    <span>2</span> 职位基本信息
                </div>
                <div class="minbox">
                    <div class="mintitle">
                        基本信息
                    </div>
                </div>
                <FormItem label="职位名称：" prop="jobName" class="half fl">
                    <Input v-model="formValidate.jobName"></Input>
                </FormItem>
                <FormItem label="工作地点：" prop="jobAddrId" class="half fl">
                    <Citysels ref='proCity' />
                </FormItem>
                <FormItem label="职能分类：" prop="jobType" class="half fl">
                    <Select v-model="formValidate.jobType">
                        <Option value="1">New York</Option>
                        <Option value="2">London</Option>
                        <Option value="3">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="汇报对象：" prop="reportTarget" class="half fl">
                    <Input v-model="formValidate.reportTarget"></Input>
                </FormItem>
                <FormItem label="下属人数：" prop="subordinateNum" class="half fl">
                    <Input v-model="formValidate.subordinateNum"></Input>
                </FormItem>
                <div class="minbox fl">
                    <div class="mintitle">
                        薪资福利
                    </div>
                </div>
                <FormItem label="税前年薪：" prop="taxBeforeLower" class="half fl">
                    <Row>
                        <Col span="11">
                        <FormItem prop="taxBeforeLower">
                            <Input style="width:80%;" v-model="formValidate.taxBeforeLower"></Input> 万元
                        </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                        <FormItem prop="taxBeforeUpper">
                            <Input style="width:80%;" v-model="formValidate.taxBeforeUpper"></Input> 万元
                        </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="通讯交通：" prop="communicationTraffic" class="half fl">
                    <Select v-model="formValidate.communicationTraffic">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="薪资构成：" prop="salaryType" class="half fl">
                    <CheckboxGroup v-model="formValidate.salaryType">
                        <Checkbox label="基本薪资"></Checkbox>
                        <Checkbox label="奖金提成"></Checkbox>
                        <Checkbox label="期权"></Checkbox>
                        <Checkbox label="其他"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="居住福利：" prop="liveWelfare" class="half fl">
                    <CheckboxGroup v-model="formValidate.liveWelfare">
                        <Checkbox label="住房补贴"></Checkbox>
                        <Checkbox label="公司安排"></Checkbox>
                        <Checkbox label="公积金"></Checkbox>
                        <Checkbox label="其他"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="社保福利：" prop="socialWelfare" class="half fl">
                    <CheckboxGroup v-model="formValidate.socialWelfare">
                        <Checkbox label="国家标准"></Checkbox>
                        <Checkbox label="商业保险"></Checkbox>
                        <Checkbox label="其他"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="年假福利：" prop="annualLeaveWelfare" class="half fl">
                    <CheckboxGroup v-model="formValidate.annualLeaveWelfare">
                        <Checkbox label="国家标准"></Checkbox>
                        <Checkbox label="其他"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

            </div>
            <div class="number1">
                <div class="title">
                    <span>3</span> 职位要求
                </div>
                <div class="minbox">
                    <div class="mintitle">
                        基本信息
                    </div>
                </div>
                <FormItem label="年龄要求：" prop="ageRequireUpper" class="half fl">
                    <Row>
                        <Col span="11">
                        <FormItem>
                            <Input style="width:80%;" v-model="formValidate.ageRequireLower"></Input> 周岁
                        </FormItem>

                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                        <FormItem prop="ageRequireUpper">
                            <Input style="width:80%;" v-model="formValidate.ageRequireUpper"></Input> 周岁
                        </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="性别要求：" prop="sexRequire" class="half fl">
                    <Select v-model="formValidate.sexRequire">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </FormItem>
                <FormItem label="专业要求：" class="half fl">
                    <Select v-model="formValidate.professionRequire">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="工作年限：" prop="workYear" class="half fl">
                    <Input v-model="formValidate.workYear" :maxlength="2"></Input>
                    <span style='position:absolute;top:0;right:10px'>年以上</span>
                </FormItem>
                <FormItem label="学历要求：" prop="educationalRequire" class="half fl">
                    <Select v-model="formValidate.educationalRequire">
                        <Option value="1">New York</Option>
                        <Option value="2">London</Option>
                        <Option value="3">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否全日制：" prop="sundaySystem" class="half fl">
                    <Select v-model="formValidate.sundaySystem">
                        <Option value="1">是</Option>
                        <Option value="2">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="语言要求：" class="half fl">
                    <CheckboxGroup v-model="formValidate.languageRequire">
                        <Checkbox label="英语"></Checkbox>
                        <Checkbox label="日语"></Checkbox>
                        <Checkbox label="法语"></Checkbox>
                        <Checkbox label="普通话"></Checkbox>
                        <Checkbox label="粤语"></Checkbox>
                        <Checkbox label="其他"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="所属行业：" prop="industryId" class="half fl">
                    <Input type="text" @on-focus='professPop=true' v-model="professName" :readonly='true' placeholder="请选择"></Input>
                </FormItem>
                <div class="minbox fl">
                    <div class="mintitle">
                        职位描述
                    </div>
                </div>

                <FormItem label="职位描述：" prop="jobDescriber" style="width:100%" class="fl">
                    <Input v-model="formValidate.jobDescriber" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="岗位职能和能力要力求，最低不能低于60字" style='width:98%'></Input>
                </FormItem>
                <FormItem label="补充说明：" style="width:100%" class="fl">
                    <Input v-model="formValidate.additional" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="注：客户的特殊需求，如生肖属相等可进行属相说明" style='width:98%'></Input>
                </FormItem>
            </div>
            <div class="number1">
                <div class="title">
                    <span>4</span> 职位备注
                </div>
                <FormItem label="紧急程度：" prop="importantLevel" class="half">
                    <Select v-model="formValidate.importantLevel">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                    </Select>
                </FormItem>
                <FormItem label="招聘原因：" prop="reason">
                    <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="岗位职能和能力要力求，最低不能低于60字" style='width:98%'></Input>
                </FormItem>
                <FormItem label="寻访方向：">
                    <Input v-model="formValidate.lookForAspect" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="注：客户的特殊需求，如生肖属相等可进行属相说明" style='width:98%'></Input>
                </FormItem>
            </div>
            <div class="number1">
                <div class="title">
                    <span>5</span> 面试流程
                </div>
                <FormItem label="流程描述：" prop="processDescriber">
                    <Input v-model="formValidate.processDescriber" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="注：客户的特殊需求，如生肖属相等可进行属相说明" style='width:98%'></Input>
                </FormItem>
                <FormItem label="面试决策人：" prop="decisionMaker" class="half fl">
                    <Input v-model="formValidate.decisionMaker"></Input>
                </FormItem>
            </div>
            <div class="number1">
                <div class="title">
                    <span>6</span> 其它
                </div>
                <div class='clearfix' style='padding: 10px 0 30px'>
                    <RadioGroup v-model="formValidate.channelType" class="half fl" style='width:220px;margin:8px 0 8px 20px'>
                        <Radio label="1" class="fl" style='margin-right:60px'>职位公海池</Radio>
                        <Radio label="2" class="fl">定向顾问</Radio>
                    </RadioGroup>
                    <Select v-model="formValidate.channelBd" class="half fl" v-if='formValidate.channelType == 2' style='width:120px'>
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </div>
            </div>
            <FormItem style="margin-left:35%">
                <Button type="primary" @click="handleSubmit('formValidate',1)">创建职位</Button>
                <Button type="ghost" @click="handleSubmit('formValidate',2)" style="margin-left: 8px">保存至草稿箱</Button>
            </FormItem>
        </Form>
        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />

    </div>

</template>

<script>
import api from "@/api";
import ls from "store2";
import Citysels from "@/components/common/citysels.vue";
import Professions from "@/components/common/professions.vue";

export default {
    name: "addNewPosition",
    components: {
        Citysels,
        Professions
    },
    data() {
        return {
            professPop: false, //职位弹窗
            professId: "",
            professName: "",
            comLists: [],
            htLists: [],
            comLoading: false,
            formValidate: {
                companyId: "", //公司id
                contractId: "", //合同id
                jobName: "", //职位名称
                jobAddrId: "540", //工作地址
                jobStatus: 1, //0保存草稿1创建职位
                jobType: "", //职能分类
                reportTarget: "", //汇报对象
                subordinateNum: "", //下属人数
                taxBeforeLower: "", //税前年薪最小值
                taxBeforeUpper: "", //税前年薪最大值
                communicationTraffic: "", //通讯交通
                salaryType: [], //薪资构成
                liveWelfare: [], //居住福利
                socialWelfare: [], //社保福利
                annualLeaveWelfare: [], //年假福利
                ageRequireLower: "", //年龄要求最小值
                ageRequireUpper: "", //年龄要求最大值
                sexRequire: "", //性别要求
                professionRequire: "", //专业要求
                workYear: "", //工作年限
                educationalRequire: "", //学历要求
                sundaySystem: "", //是否全日制统招
                languageRequire: [], //语言要求
                industryId: "", //所属行业
                jobDescriber: "", //职位描述
                additional: "", //补充说明
                importantLevel: "", //紧急程度
                reason: "", //招聘原因
                lookForAspect: "", //寻访方向
                processDescriber: "", //流程描述
                decisionMaker: "", //面试决策人
                channelType: "1", //渠道设置
                channelBd: "", //渠道顾问
                endTime: "", //截止时间
                shareUser: "" //共享到XXX
            },
            ruleValidate: {
                jobName: [
                    {
                        required: true,
                        message: "请填写职位名称",
                        trigger: "blur"
                    }
                ],
                jobAddrId: [
                    {
                        required: true,
                        message: "请选择地址",
                        trigger: "change"
                    }
                ],
                jobType: [
                    {
                        required: true,
                        message: "请选择职能分类",
                        trigger: "change"
                    }
                ],
                reportTarget: [
                    {
                        required: true,
                        message: "请填写回报对象",
                        trigger: "blur"
                    }
                ],
                taxBeforeLower: [
                    {
                        required: true,
                        message: "请填写最小年薪",
                        trigger: "blur"
                    }
                ],
                taxBeforeUpper: [
                    {
                        required: true,
                        message: "请填写最大年薪",
                        trigger: "blur"
                    }
                ],
                salaryType: [
                    {
                        required: true,
                        message: "请选择薪资构成",
                        type: "array",
                        min: 1,
                        trigger: "change"
                    }
                ],
                ageRequireLower: [
                    {
                        required: true,
                        message: "请填写最小年龄",
                        trigger: "blur"
                    }
                ],
                ageRequireUpper: [
                    {
                        required: true,
                        message: "请填写最大年龄",
                        trigger: "blur"
                    }
                ],
                sexRequire: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "change"
                    }
                ],
                workYear: [
                    {
                        required: true,
                        message: "请填写工作年限",
                        trigger: "blur"
                    }
                ],
                educationalRequire: [
                    {
                        required: true,
                        message: "请选择学历",
                        trigger: "change"
                    }
                ],
                sundaySystem: [
                    {
                        required: true,
                        message: "请选择是否全日制",
                        trigger: "change"
                    }
                ],
                industryId: [
                    {
                        required: true,
                        message: "请选择行业",
                        trigger: "change"
                    }
                ],
                jobDescriber: [
                    {
                        required: true,
                        message: "请填写职位描述",
                        trigger: "blur"
                    }
                ],
                importantLevel: [
                    {
                        required: true,
                        message: "请选择紧急程度",
                        trigger: "change"
                    }
                ],
                processDescriber: [
                    {
                        required: true,
                        message: "请填写流程描述",
                        trigger: "blur"
                    }
                ],
                decisionMaker: [
                    {
                        required: true,
                        message: "请填写面试决策人",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        searchCompany(query) { //搜索关联企业
            if (query !== "") {
                this.comLoading = true;
                api
                    .axs("post", "/company/queryCompanyInfo", {companyName: query})
                    .then(({ data }) => {
                        if (data.code === "SUCCESS") {
                            this.comLists = data.data;
                            this.comLoading = false;
                        } else {
                            this.$Message.error(data.remark);
                        }
                    });
            } else {
                this.comLists = [];
            }
        },
        searchHetong(hId) {
            console.log(hId)
            api
                .axs("post", "/contract/page", {companyId: hId})
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.htLists = data.data.list;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        handleSubmit(name, tag) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$store.state.spinShow = true;
                    this.formValidate.salaryType = JSON.stringify(
                        this.formValidate.salaryType
                    );
                    if (tag == 2) this.formValidate.jobStatus = 0;
                    api
                        .axs("post", "/job/createJob", this.formValidate)
                        .then(({ data }) => {
                            if (data.code === "SUCCESS") {
                                if (tag == 1)
                                    this.$Message.success("新增成功!");
                                else this.$Message.success("保存草稿成功!");
                                this.$Loading.finish();
                                this.$store.state.spinShow = false;
                            } else {
                                this.$Message.error(data.remark);
                            }
                        });
                } else {
                    this.$Message.error("请填写完整");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
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
        }
    },
    mounted() {
        this.$store.state.spinShow = false;
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.half {
    width: 406px;
    margin-right: 100px;
}

.fl {
    float: left;
}

.number1:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}

.number1 {
    zoom: 1;
}

.number1 {
    width: 100%;
    // padding: 20px 0;
    border: 1px solid #dddddd;
    // overflow: auto;
    clear: both;
    margin-bottom: 10px;
    .minbox {
        width: 100%;
        padding: 0 20px;
    }
    .mintitle {
        width: 100%;
        height: 18px;
        line-height: 18px;
        padding: 0 10px;
        font-weight: 600;
        color: rgb(0, 102, 255);
        margin-bottom: 12px;
        border-left: 2px solid rgb(0, 102, 255);
    }
    .title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid #dddddd;
        margin-bottom: 20px;
        font-weight: 600;
        span {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            text-align: center;
            display: inline-block;
            line-height: 20px;
            border: 1px solid #0066ff;
            color: #0066ff;
            margin-right: 10px;
        }
    }
}
</style>
