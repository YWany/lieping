<template>
    <div class="contactPop">
        <Modal v-model="contactPop" :closable='false' :mask-closable='false' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                新增联系人
                <a href="javascript:;" @click='closePop'><Icon type="close" class='fr'></Icon></a>
            </div>
            <ul class="contact-content">
                <li>
                    <p><span>*</span> 姓名：</p>
                    <Input placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 关联客户：</p>
                    <Input placeholder=""></Input>
                </li>
                <li class='li-phone'>
                    <p><span>*</span> 联系电话：</p>
                    <div style="display:inline-block;vertical-align:middle">
                        <Input v-model='addForm.phone1'>
                            <Select v-model='addForm.phone1Type' slot="append" style="width:80px">
                                <Option value="工作">工作</Option>
                                <Option value="手机">手机</Option>
                            </Select>
                        </Input>
                    </div>
                    <Button type="primary" shape="circle" size='small' icon="plus" v-if='addPhoneBtn' @click='addPhones' class='addNewContact'></Button>
                </li>
                <li class='li-phone' v-if='addPhone2'>
                    <p>&nbsp;</p>
                    <div style="display:inline-block;vertical-align:middle">
                        <Input v-model='addForm.phone2'>
                            <Select v-model='addForm.phone2Type' slot="append" style="width:80px">
                                <Option value="工作">工作</Option>
                                <Option value="手机">手机</Option>  
                            </Select>
                        </Input>
                        <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>
                    </div>
                </li>
                <li class='li-phone' v-if='addPhone3'>
                    <p>&nbsp;</p>
                    <div style="display:inline-block;vertical-align:middle">
                        <Input v-model='addForm.phone3'>
                            <Select v-model='addForm.phone3Type' slot="append" style="width:80px">
                                <Option value="工作">工作</Option>
                                <Option value="手机">手机</Option>
                            </Select>
                        </Input>
                        <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>
                    </div>
                </li>
                <li class='li-phone' v-if='addPhone4'>
                    <p>&nbsp;</p>
                    <div style="display:inline-block;vertical-align:middle">
                        <Input v-model='addForm.phone4'>
                            <Select v-model='addForm.phone4Type' slot="append" style="width:80px">
                                <Option value="工作">工作</Option>
                                <Option value="手机">手机</Option>
                            </Select>
                        </Input>
                        <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>
                    </div>
                </li>
                <li>
                    <p>职务：</p>
                    <Input v-model='addForm.incumbency' placeholder=""></Input>
                </li>
                <li>
                    <p>决策关系：</p>
                    <Input v-model='addForm.decisionRelation' placeholder=""></Input>
                </li>
                <li>
                    <p>邮箱：</p>
                    <Input placeholder=""></Input>
                </li>
                <li>
                    <p>微信：</p>
                    <Input placeholder=""></Input>
                </li>
                <li>
                    <p>性别：</p>
                    <Select v-model='addForm.sex' style="width:300px;text-align:left">
                        <Option value="1">男</Option>
                        <Option value="0">女</Option>
                    </Select>
                </li>
                <li>
                    <p>生日：</p>
                    <DatePicker type="date" v-model='addForm.birthday'  placeholder="Select date" style="width:300px;"></DatePicker>
                </li>
                <li>
                    <p>爱好：</p>
                    <Input placeholder=""></Input>
                </li>
                <li>
                    <p>备注：</p>
                    <Input type="textarea" :rows="4" placeholder=""></Input>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'><Button type='info' @click='subSave'>保存</Button></div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api"
export default {
    name: "addContactPop",
    props: ['contactPop'],
    components: {},
    data() {
        return {
            subFlag: true,
            addForm: {
                mainContact: '',
                phone1: '',
                phone2: '',
                phone3: '',
                phone4: '',
                phone1Type: '工作',
                phone2Type: '工作',
                phone3Type: '工作',
                phone4Type: '工作',
                incumbency: '',
                decisionRelation:'',
                email: '',
                wechat: '',
                sex: '1',
                birthday: '1990-01-01'
            },
            addFormError: {
                mainContact: '姓名',
                phone1: '电话',
                decisionRelation:'决策关系'
            },
            phoneNum: 1,
            addPhoneBtn: true,
            addPhone2: false,
            addPhone3: false,
            addPhone4: false,
        }
    },
    methods: {
        subSave() {
            if (!addForm.mainContact) {
                this.$Message.error('姓名: 请填写完整!')
                return
            } else if (!addForm.phone1) {
                this.$Message.error('手机: 请填写完整!')
                return
            }

            if (this.subFlag) this.subFlag = false
            else return
            api.axs("post", "/contact/save", this.addForm)
            .then(({ data }) => {
                if ( data.code === 'SUCCESS') {
                    this.datas = data
                    this.$Message.success('新增成功!')
                    this.reset(this.addForm)
                } else {
                    this.$Message.error(data.remark)
                    this.subFlag = true
                }
            })
        },
        addPhones() {
            this.phoneNum += 1
            if (this.phoneNum > 3) this.addPhoneBtn = false
            if (this.phoneNum == 2) this.addPhone2 = true
            if (this.phoneNum == 3) this.addPhone3 = true
            if (this.phoneNum == 4) this.addPhone4 = true
        },
        delPhones() {
            this.phoneNum -= 1
            if (this.phoneNum < 4) this.addPhoneBtn = true
            if (this.phoneNum == 1) this.addPhone2 = false
            if (this.phoneNum == 2) this.addPhone3 = false
            if (this.phoneNum == 3) this.addPhone4 = false
        },
        closePop() {
            this.$parent.contactPop=false
            this.reset(this.addForm)
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
.contact-content {
    height: 400px;
    overflow-y: auto;
    li {
        margin-bottom: 10px;
        p {
            display: inline-block;
            width: 80px;
            line-height: 32px;
            text-align: right;
            color: #444;
            margin-right: 10px;
            span {
                color: #ff8686
            }
        }
        .ivu-input-wrapper {
            width: 300px;
        }
        .addNewContact {
            position: absolute;
            top: 5px;
            right: 20px;
        }
    }
    li.li-phone {
        position:relative;
        margin-bottom:5px;
    }
}
</style>
