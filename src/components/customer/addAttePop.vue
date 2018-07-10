<template>
    <div class="attePop">
        <Modal v-model="attePop" :closable='false' :mask-closable='false' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                跟进提醒
                <a href="javascript:;" @click='closePop'><Icon type="close" class='fr'></Icon></a>
            </div>
            <ul class="atte-content">
                <li>
                    <p><span>*</span> 客户名称：</p>
                    <Input v-model='atteForm.companyName' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 标题：</p>
                    <Input v-model='atteForm.title' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 跟进人：</p>
                    <Input v-model='atteForm.remindUser' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 跟进时间：</p>
                    <DatePicker v-model='atteForm.followTime'  type="date" placeholder="Select date"></DatePicker>
                </li>
                
                <li>
                    <p><span>*</span> 提醒：</p>
                    <Input v-model='atteForm.remark' type="textarea" :rows="4" placeholder=""></Input>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'><Button type='info' @click='subSave'>保存</Button></div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api"
export default {
    name: "addAttePop",
    props: ['attePop'],
    components: {},
    data() {
        return {
            subFlag: true,
            atteForm: {
                companyName: '',
                title: '',
                remindUser: '',
                followTime: new Date(),
                remark: '',
            },
            atteFormError: {
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
            var forms = this.atteForm
            for(var name in forms) {
                if (!forms[name]) {
                    this.$Message.error(this.atteFormError[name] + ': 请填写完整!')
                    return
                }
            }
            if (this.subFlag) this.subFlag = false
            else return
            api.axs("post", "/followRemind/saveFollowRemind", this.atteForm)
            .then(({ data }) => {
                if ( data.code === 'SUCCESS') {
                    this.datas = data
                    this.$Message.success('新增成功!') 
                    this.reset(this.atteForm)
                } else {
                    this.$Message.error(data.remark)
                    this.subFlag = true
                }
            })
        },
        closePop() {
            this.$parent.attePop = false
            this.atteForm.companyName = ''
            this.atteForm.title = ''
            this.atteForm.remindUser = ''
            this.atteForm.remark = ''
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
.atte-content {
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
    }
}
</style>
