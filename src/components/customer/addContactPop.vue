<template>
    <div class="contactPop">
        <Modal v-model="contactPop" :closable='false' :mask-closable='false' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                新增联系人
                <a href="javascript:;" @click='$parent.contactPop=false'><Icon type="close" class='fr'></Icon></a>
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
                <li style='position:relative'>
                    <p><span>*</span> 联系电话：</p>
                    <div style="display:inline-block;vertical-align:middle">
                        <Input>
                            <Select v-model='contactPhone' slot="prepend" style="width:80px">
                                <Option value="工作">工作</Option>
                                <Option value="手机">手机</Option>
                                <Option value="住宅">住宅</Option>
                                <Option value="主要">主要</Option>
                                <Option value="传真">传真</Option>
                                <Option value="其它">其它</Option>
                            </Select>
                        </Input>
                    </div>
                    <Button type="primary" shape="circle" size='small' icon="plus" @click='contactPop=true' class='addNewContact'></Button>
                </li>
                <li>
                    <p>职务：</p>
                    <Input placeholder=""></Input>
                </li>
                <li>
                    <p>决策关系：</p>
                    <Input placeholder=""></Input>
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
                    <Select v-model='addForm.sex' style="width:300px">
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                </li>
                <li>
                    <p>生日：</p>
                    <DatePicker type="date" placeholder="Select date" value='1990-01-01' style="width:300px"></DatePicker>
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
            <div slot='footer' style='text-align:center'><Button type='info'>保存</Button></div>
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
            contactPhone: '工作',
            addForm: {
                sex: ''
            }
        }
    },
    methods: {
        info() {
            this.$Message.info("这是一条普通的提醒")
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
}
</style>
