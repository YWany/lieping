<template>
    <div class="contractPop">
        <Modal v-model="contractPop" :closable='false' :mask-closable='false' width='900px' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                新建合同
                <a href="javascript:;" @click='closePop'><Icon type="close" class='fr'></Icon></a>
            </div>
            <ul class="contract-content">
                <li>
                    <p><span>*</span> 合同类型：</p>
                    <Select v-model='contractForm.sex'>
                        <Option value="1">猎头协议（续签)</Option>
                        <Option value="2">猎头协议</Option>
                        <Option value="3">培训协议</Option>
                        <Option value="4">薪酬调查合作协议</Option>
                    </Select>
                </li>
                <li>
                    <p><span>*</span> 客户来源：</p>
                    <Select v-model='contractForm.sex'>
                        <Option value="1">来源1</Option>
                        <Option value="2">来源2</Option>
                    </Select>
                </li>
                <li>
                    <p><span>*</span> 客户名称：</p>
                    <Input v-model='contractForm.remindUser' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 前期服务费：</p>
                    <Input v-model='contractForm.remindUser' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 付款方式：</p>
                    <Input v-model='contractForm.remindUser' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 付款比例：</p>
                    <Input v-model='contractForm.remindUser' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 保证期：</p>
                    <Input v-model='contractForm.remindUser' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 最低收费：</p>
                    <Input v-model='contractForm.remindUser' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 合同开始时间：</p>
                    <DatePicker v-model='contractForm.followTime'  type="date" placeholder="Select date"></DatePicker>
                </li>
                <li>
                    <p><span>*</span> 合同开始结束：</p>
                    <DatePicker v-model='contractForm.followTime'  type="date" placeholder="Select date"></DatePicker>
                </li>
                
                <li class='line-all'>
                    <p>特殊说明：</p>
                    <Input v-model='contractForm.remark' type="textarea" :rows="2" placeholder="" style='width:696px'></Input>
                </li>
                <li>
                    <p><span>*</span> BD顾问：</p>
                    <Input v-model='contractForm.remindUser' placeholder=""></Input>
                </li>
                <li>&nbsp;</li>
                <li>
                    <p><span>*</span> 回款计划：</p>
                    <p class='addHuik'><Button @click='huiK1=true'>添加</Button></p>
                </li>
                <li>&nbsp;</li>
                <li class='line-all' v-if='huiK1'>
                    <p><Button type="error" shape="circle" size='small' icon="minus-round" @click='huiK1=false'></Button></p>
                    <Input placeholder="" style='width:140px'></Input>
                    &nbsp;&nbsp;
                    <Select placeholder="选择回款类型" style='width:140px'>
                        <Option value="1">前期服务费</Option>
                        <Option value="2">尾款第一期</Option>
                        <Option value="3">尾款第二期</Option>
                        <Option value="4">尾款全部</Option>
                        <Option value="5">全部服务费</Option>
                    </Select>
                    &nbsp;&nbsp;
                    <DatePicker type="date" class='sel-picker' placeholder="Select date"></DatePicker>
                    &nbsp;&nbsp;
                    <Select placeholder="未收费" style='width:140px'>
                        <Option value="1">未收费</Option>
                        <Option value="2">未收费2</Option>
                        <Option value="3">未收费3</Option>
                    </Select>
                </li>
                <li class='line-all'>
                    <div style='color:#ff9900'>*已开启合同订单审批，新增合同订单进入待审批中，且在合同订单列表中展示</div>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'>
                <Button type='info' @click='subSave'>保存</Button>
                &nbsp;&nbsp;&nbsp;
                <router-link to='/customer/myCustomers/contract'>合同模板</router-link>
            </div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api"
export default {
    name: "addContractPop",
    props: ['contractPop'],
    components: {},
    data() {
        return {
            subFlag: true,
            huiK1: false, //回款计划1
            huiK2: false, //回款计划2
            contractForm: {
                companyName: '',
                title: '',
                remindUser: '',
                followTime: new Date(),
                remark: '',
            },
            contractFormError: {
                companyName: '客户名称',
                title: '标题',
                remindUser: '跟进人',
                followTime: '跟进时间',
                remark: '提醒内容',
            }
        }
    },
    methods: {
        subSave() {
            var forms = this.contractForm
            for(var name in forms) {
                if (!forms[name]) {
                    this.$Message.error(this.contractFormError[name] + ': 请填写完整!')
                    return
                }
            }
            if (this.subFlag) this.subFlag = false
            else return
            api.axs("post", "/followRemind/saveFollowRemind", this.contractForm)
            .then(({ data }) => {
                if ( data.code === 'SUCCESS') {
                    this.datas = data
                    this.$Message.success('新增成功!') 
                    this.reset('contractForm')
                } else {
                    this.$Message.error(data.remark)
                    this.subFlag = true
                }
            })
        },
        closePop() {
            this.$parent.contractPop = false
            this.contractForm.companyName = ''
            this.contractForm.title = ''
            this.contractForm.remindUser = ''
            this.contractForm.remark = ''
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = ""
            })
        }
    },
    mounted() {
        
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"> 
.contract-content {
    li {
        margin-bottom: 10px;
        width: 50%;
        display: inline-block;
        p {
            display: inline-block;
            width: 100px;
            line-height: 32px;
            text-align: right;
            color: #444;
            margin-right: 10px;
            span {
                color: #ff8686
            }
        }
        .addHuik {
            width:260px;
            width: 260px;
            margin-right: 0;
            text-align: left;
        }
        .ivu-input-wrapper,
        .ivu-select {
            width: 260px;
        }
        .sel-picker .ivu-date-picker-editor {
            width: 234px;
        }
    }
    li.line-all {
        width: 100%;
        display: block;
    }
}
</style>
