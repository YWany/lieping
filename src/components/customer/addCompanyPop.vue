<template>
    <div class="companyPop">
        <Modal v-model="companyPop" :closable='false' :mask-closable='false' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                新增企业
                <a href="javascript:;" @click='$parent.companyPop=false'><Icon type="close" class='fr'></Icon></a>
            </div>
            <ul class="company-content">
                <li>
                    <p><span>*</span> 客户名称：</p>
                    <Input v-model='companyForm.companyName' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 客户来源：</p>
                    <Input placeholder=""></Input>
                </li>
                <li style='text-align:left'>
                    <p style='width:130px'><span>*</span> 客户对外显示名称：</p>
                    <Input v-model='companyForm.outerName' placeholder=""></Input>
                </li>
                <li>
                    <div style='color:#ff8686'>为保障企业及猎头公司的隐私，我们不会将企业的真实名称展示给经理人</div>
                </li>
                <li>
                    <p><span>*</span> 重要程度：</p>
                    <Select v-model="companyForm.importantLevel" style="width:300px">
                        <Option value='1'>一星</Option>
                        <Option value='2'>二星</Option>
                        <Option value='3'>三星</Option>
                        <Option value='4'>四星</Option>
                        <Option value='5'>五星</Option>
                    </Select>
                </li>
                <li>
                    <p><span>*</span> 客户状态：</p>
                    <Select v-model="companyForm.companyStatus" style="width:300px">
                        <Option value='意向客户'>意向客户</Option>
                        <Option value='潜在客户'>潜在客户</Option>
                        <Option value='合作谈判'>合作谈判</Option>
                        <Option value='失信客户'>失信客户</Option>
                        <Option value='失效客户'>失效客户</Option>
                    </Select>
                </li>
                <li>
                    <p><span>*</span> 所属行业：</p>
                    <Input v-model='companyForm.companyVocation' :readonly='true' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 所在地：</p>
                    <!-- <Input v-model='companyForm.outerName' placeholder=""></Input> -->
                    <Citysels ref='proCity'/>
                    <!-- this.$refs.proCity.cityId -->
                </li>
                <li>
                    <p><span>*</span> 企业性质：</p>
                    <Input v-model='companyForm.companyType' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 企业规模：</p>
                    <Input v-model='companyForm.companyScope' placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 企业介绍：</p>
                    <Input v-model='companyForm.introduction' type="textarea" :rows="4" placeholder=""></Input>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'><Button type='info' @click='subSave'>保存</Button></div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api"
import Citysels from "@/components/common/citysels.vue"
export default {
    name: "addCompanyPop",
    props: ['companyPop'],
    components: {
        Citysels
    }, 
    data() {
        return {
            subFlag: true,
            companyForm: {
                companyName: '',
                outerName: '',
                importantLevel: '',
                companyStatus: '',
                companyType: '',
                companyVocation: '',
                companyScope: '',
                introduction: '',
                areaId:''
            },
            companyFormError: {
                companyName: '客户名称',
                outerName: '客户对外显示名称',
                province: '身份',
                city: '城市',
                country: '区县',
                importantLevel: '重要程度',
                companyStatus: '客户状态',
                companyType: '企业性质',
                companyVocation: '所属行业',
                companyScope: '企业规模',
                introduction: '企业介绍'
            }
        }
    },
    methods: {
        info() {
            this.$Message.info("这是一条普通的提醒")
        },
        subSave() {
            this.companyForm.areaId=this.$refs.proCity.cityId
            var forms = this.companyForm
            console.log(forms)
            console.log(this.$refs.proCity.cityId)
            for(var name in forms) {
                if (!forms[name]) {
                    this.$Message.error(this.companyFormError[name] + ': 请填写完整!')
                    return
                }
            }
            if (this.subFlag) this.subFlag = false
            else return
            
            api.axs("post", "/company/save", this.companyForm)
            .then(({ data }) => {
                if ( data.code === 'SUCCESS') {
                    this.datas = data
                    this.$Message.success('新增成功!') 
                    this.reset(this.companyForm)  
                } else {
                    this.$Message.error(data.remark)
                    this.subFlag = true
                }
            })
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
.company-content {
    height: 380px;
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
    }
}
</style>
