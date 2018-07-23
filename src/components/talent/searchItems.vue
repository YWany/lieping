<template>
    <div class="serachItems">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="职位名称" prop="position">
                <Input v-model="formValidate.position" :readonly='true'></Input>
            </FormItem>
            <FormItem label="所在行业" prop="industryName">
                <Input v-model="formValidate.industryId" :readonly='true'></Input>
            </FormItem>
            <FormItem label="目前工作地区" prop="areaName">
                <Input v-model="formValidate.areaId" :readonly='true'></Input>
            </FormItem>
            <FormItem label="期望工作地区" prop="applyUserName">
                <Input v-model="formValidate.applyUserName" :readonly='true'></Input>
            </FormItem>
            <FormItem label="关键词">
                <Input v-model="formValidate.keyword" :readonly='true'></Input>
            </FormItem>
            <FormItem label="公司名称" prop="companyName">
                <Input v-model="formValidate.companyName" placeholder="请输入公司名称"></Input>
                <RadioGroup v-model="formValidate.comtype" style='margin-left:10px;'>
                    <Radio label="apple">
                        <span>目前公司</span>
                    </Radio>
                    <Radio label="android">
                        <span>全部经历</span>
                    </Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="职能类别" prop="applyUserName">
                <Input v-model="formValidate.applyUserName" :readonly='true'></Input>
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
                    <Option value='1'>1年</Option>
                    <Option value='2'>2年</Option>
                    <Option value='3'>3年</Option>
                </Select> - 
                <Select value='' placeholder="请选择年龄" class='liSel'>
                    <Option value='1'>1年</Option>
                    <Option value='2'>2年</Option>
                    <Option value='3'>3年</Option>
                </Select>
            </FormItem>
            <FormItem label="性别" prop="applyUserName">
                <Select value='' placeholder="请选择性别">
                    <Option value='1'>男</Option>
                    <Option value='2'>女</Option>
                </Select>
            </FormItem>
            <FormItem label="更新时间" prop="applyUserName">
                <DatePicker type="datetime" :value='formValidate.followTime' format="yyyy-MM-dd HH:mm:ss" @on-change='seltime'></DatePicker>
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
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
export default {
    name: "serachItems",
    data() {
        return {
            formValidate: {
                position: '',
                industryId: '',
                companyName: "",
                keyword: '',
                comtype: '',
                contractId: "",
                fundType: ""
            },
            ruleValidate: {
                position: [
                    {
                        required: true,
                        message: "请输入职位名称",
                        trigger: "blur"
                    }
                ],
                industryName: [
                    {
                        required: true,
                        message: "请输入行业名称",
                        trigger: "blur"
                    }
                ],
                areaName: [
                    {
                        required: true,
                        message: "请输入地区",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    components: {},
    computed: {},
    methods: {
        seltime(date) {
            this.recordsForm.followTime = date;
        },
    },
    mounted() {}
};
</script>

<style lang='less' scoped>
.serachItems {
    padding: 20px 0!important;
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
        line-height: 30px!important;
    }
}
</style>