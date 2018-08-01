<template>
    <div class="addNewPosition">
        新增职位
        <Form ref="formValidate" :model="formValidate"  :label-width="100">
            <div class="number1">
                <div class="title">
                    <span>1</span> 基本信息
                </div>
                <FormItem label="关联企业：" class="half">
                    <Select v-model="formValidate.companyId" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                    <!-- <Input slot="append" @on-focus="getContactLists('select')" v-model='userName' :readonly='true' class='selPro' placeholder="请选择" style='width:200px;'></Input> -->
                </FormItem>
                <FormItem label="所属合同：" prop="contractId" class="half">
                    <Select v-model="formValidate.contractId" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
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
                    <Input v-model="formValidate.jobName" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="工作地点：" prop="jobAddrId" class="half fl">
                    <Select v-model="formValidate.jobAddrId" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="职能分类：" prop="jobStatus" class="half fl">
                    <Select v-model="formValidate.jobStatus" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="汇报对象：" prop="reportTarget" class="half fl">
                    <Input v-model="formValidate.reportTarget" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="下属人数：" prop="subordinateNum" class="half fl">
                    <Input v-model="formValidate.subordinateNum" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <div class="minbox fl">
                    <div class="mintitle">
                        薪资福利
                    </div>
                </div>
                <FormItem label="税前年薪：" prop="mail" class="half fl">
                    <Row>
                        <Col span="11">
                        <FormItem>
                            <Input style="width:80%;" v-model="formValidate.taxBeforeLower" placeholder="Enter your e-mail"></Input>万元
                        </FormItem>

                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                        <FormItem prop="mail">
                            <Input style="width:80%;" v-model="formValidate.taxBeforeUpper" placeholder="Enter your e-mail"></Input>万元
                        </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="通讯交通：" prop="communicationTraffic" class="half fl">
                    <Select v-model="formValidate.communicationTraffic" placeholder="Select your city">
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
                 <FormItem label="年龄要求：" prop="mail"  class="half fl">
                    <Row>
                        <Col span="11">
                        <FormItem>
                            <Input style="width:80%;" v-model="formValidate.ageRequireLower" placeholder="Enter your e-mail"></Input>万元
                        </FormItem>

                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                        <FormItem prop="ageRequireUpper">
                            <Input style="width:80%;" v-model="formValidate.ageRequireUpper" placeholder="Enter your e-mail"></Input>万元
                        </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="性别要求：" class="half fl">
                    <Select v-model="formValidate.sexRequire" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="专业要求：" class="half fl">
                    <Select v-model="formValidate.professionRequire" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="工作年限：" prop="workYear" class="half fl">
                    <Select v-model="formValidate.workYear" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="学历要求：" class="half fl">
                    <Select v-model="formValidate.educationalRequire" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否统招全日制：" class="half fl">
                    <Select v-model="formValidate.sundaySystem" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
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
                <FormItem label="所属行业：" class="half fl">
                    <Select v-model="formValidate.industryId" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem> 
                <div class="minbox fl">
                    <div class="mintitle">
                        职位描述
                    </div>
                </div>

                <FormItem label="职位描述：" style="width:100%" class="fl">
                    <Input v-model="formValidate.jobDescriber" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="岗位职能和能力要力求，最低不能低于60字"></Input>
                </FormItem>
                <FormItem label="补充说明：" style="width:100%" class="fl">
                    <Input v-model="formValidate.additional" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="注：客户的特殊需求，如生肖属相等可进行属相说明"></Input>
                </FormItem>
            </div>
            <div class="number1">
                <div class="title">
                    <span>4</span> 职位备注
                </div>
                <FormItem label="紧急程度：" prop="importantLevel" class="half">
                    <Select v-model="formValidate.importantLevel" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="招聘原因：" prop="reason">
                    <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="岗位职能和能力要力求，最低不能低于60字"></Input>
                </FormItem>
                <FormItem label="寻访方向：">
                    <Input v-model="formValidate.lookForAspect" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="注：客户的特殊需求，如生肖属相等可进行属相说明"></Input>
                </FormItem>
            </div>
            <div class="number1">
                <div class="title">
                    <span>5</span> 面试流程
                </div>
                <FormItem label="流程描述：">
                    <Input v-model="formValidate.processDescriber" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="注：客户的特殊需求，如生肖属相等可进行属相说明"></Input>
                </FormItem>
                <FormItem label="面试决策人：" prop="decisionMaker" class="half fl">
                    <Input v-model="formValidate.decisionMaker" placeholder="Enter your e-mail"></Input>
                </FormItem>
            </div>
            <div class="number1">
                <div class="title">
                    <span>6</span> 发布渠道设置
                </div>
                <FormItem label="是否定向顾问操作" prop="channelType">
                    <RadioGroup v-model="formValidate.channelType">
                        <Radio label="定向顾问操作" class="fl">定向顾问操作</Radio>
                        <!-- <Select style="width:20%;" class="fl" v-model="formValidate.city" placeholder="Select your city">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select> -->
                        <Radio class="fl" label="通过共享发布职位">通过共享发布职位</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="截止时间：" prop="endTime" class="half">
                    <Select v-model="formValidate.endTime" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="共享至：" prop="shareUser" class="half">
                    <Select v-model="formValidate.shareUser" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
            </div>
            <FormItem style="margin-left:35%">
                <Button type="primary" @click="handleSubmit('formValidate')">创建职位</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">保存至草稿箱</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import api from "@/api";
import ls from "store2";
export default {
    name: "addNewPosition",
    components: {},
    data() {
        return {
            formValidate: {
                companyId: "",//公司id
                contractId: "",//合同id
                jobName: "",//职位名称
                jobAddrId: "",//工作地址
                jobStatus: "",//0保存草稿1创建职位
                jobType: "",//职能分类
                reportTarget: "",//汇报对象
                subordinateNum: "",//下属人数
                taxBeforeLower: "",//税前年薪最小值
                taxBeforeUpper: "",//税前年薪最大值
                communicationTraffic: "",//通讯交通
                salaryType: [],//薪资构成
                liveWelfare: [],//居住福利
                socialWelfare: [],//社保福利
                annualLeaveWelfare: [],//年假福利
                ageRequireLower: "",//年龄要求最小值
                ageRequireUpper: "",//年龄要求最大值
                sexRequire: "",//性别要求
                professionRequire: "",//专业要求
                workYear: "",//工作年限
                educationalRequire: "",//学历要求
                sundaySystem: "",//是否全日制统招
                languageRequire: [],//语言要求
                industryId: "",//所属行业
                jobDescriber: "",//职位描述
                additional: "",//补充说明
                importantLevel: "",//紧急程度
                reason: "",//招聘原因
                lookForAspect: "",//寻访方向
                processDescriber: "",//流程描述
                decisionMaker: "",//面试决策人
                channelType: "",//渠道设置
                channelBd: "",//渠道顾问
                endTime: "",//截止时间
                shareUser: ""//共享到XXX
            },
            ruleValidate: {
                // companyId: [
                //     {
                //         required: true,
                //         message: "The name cannot be empty",
                //         trigger: "change"
                //     }
                // ],
                // contractId: [
                //     {
                //         required: true,
                //         message: "Mailbox cannot be empty",
                //         trigger: "change"
                //     }
                // ],
                // jobName: [
                //     {
                //         required: true,
                //         message: "Please select the city",
                //         trigger: "blur"
                //     }
                // ],
                // gender: [
                //     {
                //         required: true,
                //         message: "Please select gender",
                //         trigger: "change"
                //     }
                // ],
                // interest: [
                //     {
                //         required: true,
                //         type: "array",
                //         min: 1,
                //         message: "Choose at least one hobby",
                //         trigger: "change"
                //     },
                //     {
                //         type: "array",
                //         max: 2,
                //         message: "Choose two hobbies at best",
                //         trigger: "change"
                //     }
                // ],
                // date: [
                //     {
                //         required: true,
                //         type: "date",
                //         message: "Please select the date",
                //         trigger: "change"
                //     }
                // ],
                // time: [
                //     {
                //         required: true,
                //         type: "string",
                //         message: "Please select time",
                //         trigger: "change"
                //     }
                // ],
                // professionRequire: [
                //     {
                //         required: true,
                //         type: "string",
                //         message: "Please select time",
                //         trigger: "change"
                //     }
                // ],
                // desc: [
                //     {
                //         required: true,
                //         message: "Please enter a personal introduction",
                //         trigger: "blur"
                //     },
                //     {
                //         type: "string",
                //         min: 20,
                //         message: "Introduce no less than 20 words",
                //         trigger: "blur"
                //     }
                // ]
            }
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$Message.success("Success!");
                } else {
                    this.$Message.error("Fail!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
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
    width: 50%;
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
