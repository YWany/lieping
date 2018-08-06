<template>
    <div class="companyPop">
        <Modal v-model="companyPop" :closable='false' :mask-closable='false' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                <span v-if='companyMod'>编辑企业</span>
                <span v-else>新增企业</span>
                <a href="javascript:;" @click='$parent.companyPop=false'>
                    <Icon type="close" class='fr'></Icon>
                </a>
            </div>
            <ul class="company-content">
                <li>
                    <p>
                        <span>*</span> 客户名称：</p>
                    <Input v-model='companyForm.companyName' placeholder="" class='selpro'></Input>
                </li>
                <li>
                    <p>
                        <span>*</span> 客户来源：</p>

                    <Select v-model='companyForm.companySource' style="width:300px">
                        <Option v-for="(source,index) in sourcelist" :value="source.code" :key='index'>{{source.codeText}}</Option>

                    </Select>
                </li>
                <li style='text-align:left'>
                    <p style='width:130px'>
                        <span>*</span> 客户对外显示名称：</p>
                    <Input v-model='companyForm.outerName' placeholder="" class='selpro'></Input>
                </li>
                <li>
                    <div style='color:#ff8686'>为保障企业及猎头公司的隐私，我们不会将企业的真实名称展示给经理人</div>
                </li>
                <li>
                    <p>
                        <span>*</span> 重要程度：</p>
                    <Select v-model="companyForm.importantLevel" style="width:300px">
                        <Option v-for="(importance,index) in importancelist" :value="importance.code" :key='index'>{{importance.codeText}}</Option>
                    </Select>
                </li>
                <li>
                    <p>
                        <span>*</span> 客户状态：</p>
                    <Select v-model="companyForm.companyStatus" style="width:300px">
                        <Option v-for="(item,index) in statelist" :value="item.code" :key='index'>{{item.codeText}}</Option>

                    </Select>
                </li>
                <li>
                    <p>
                        <span>*</span> 所属行业：</p>
                    <Input v-model='professName' @on-focus='professPop=true' :readonly='true' placeholder="选择行业" class='selpro'></Input>
                    <Professions ref='pfoFess' />
                </li>
                <li>
                    <p>
                        <span>*</span> 所在地：</p>
                    <!-- <Input v-model='companyForm.outerName' placeholder=""></Input> -->
                    <Citysels ref='proCity' />
                    <!-- this.$refs.proCity.cityId -->
                </li>
                <li>
                    <p>
                        <span>*</span> 企业性质：</p>

                    <Select v-model='companyForm.companyType' style="width:300px">
                        <Option v-for="(nature,index) in naturelist" :value="nature.code" :key='index'>{{nature.codeText}}</Option>

                    </Select>
                </li>
                <li>
                    <p>
                        <span>*</span> 企业规模：</p>

                    <Select v-model='companyForm.companyScope' style="width:300px">
                        <Option v-for="(scale,index) in scalelist" :value="scale.code" :key='index'>{{scale.codeText}}</Option>

                    </Select>
                </li>
                <li>
                    <p>企业官网：</p>
                    <Input v-model='companyForm.network' placeholder="" class='selpro'></Input>
                </li>
                <li>
                    <p>
                        <span>*</span> 企业介绍：</p>
                    <Input v-model='companyForm.introduction' type="textarea" :rows="2" placeholder=""></Input>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'>
                <Button type='info' @click='subSave' v-if='companyMod'>保存编辑</Button>
                <Button type='info' @click='subSave' v-else>保存</Button>
            </div>
        </Modal>
        <Professions ref='professionComp' @selPro='selPro' :professPop='professPop' />
    </div>
</template>

<script>
import api from "@/api";
import Citysels from "@/components/common/citysels.vue";
import Professions from "@/components/common/professions.vue";
export default {
    name: "addCompanyPop",
    props: ["recordsDetails", "companyPop", "companyMod", "id"],
    components: {
        Citysels,
        Professions
    },
    computed: {
        selTrees() {
            return this.$store.state.selTrees;
        }
    },
    data() {
        return {
            subFlag: true,
            professPop: false,
            professName: "",
            professId: "",
            statelist: [],
            naturelist: [],
            scalelist: [],
            importancelist: [],
            sourcelist: [],
            companyForm: {
                companyName: "",
                companySource: "",
                outerName: "",
                importantLevel: "",
                companyStatus: "",
                companyType: "",
                industryId: "",
                companyScope: "",
                introduction: "",
                areaId: "",
                network: ""
            },
            companyFormError: {
                companyName: "客户名称",
                outerName: "客户对外显示名称",
                province: "身份",
                city: "城市",
                country: "区县",
                importantLevel: "重要程度",
                companyStatus: "客户状态",
                companyType: "企业性质",
                industryId: "所属行业",
                companyScope: "企业规模",
                introduction: "企业介绍"
            }
        };
    },
    methods: {
        info() {
            let alllist = this.selTrees;
            for (let i = 0; i < alllist.length; i++) {
                if (alllist[i].code === "companyType") {
                    //公司性质
                    this.naturelist = alllist[i].children;
                }
                if (alllist[i].code === "companyStatus") {
                    this.statelist = alllist[i].children;
                }
                if (alllist[i].code === "companyScope") {
                    this.scalelist = alllist[i].children;
                }
                if (alllist[i].code === "importantLevel") {
                    this.importancelist = alllist[i].children;
                }
                if (alllist[i].code === "companySource") {
                    this.sourcelist = alllist[i].children;
                }
            }
        },
        subSave() {
            if (this.companyMod) {
                if (this.$refs.proCity.cityId === "") {
                    this.companyForm.areaId = this.$refs.proCity.proId;
                } else {
                    this.companyForm.areaId = this.$refs.proCity.cityId;
                }
                this.companyForm.industryId = this.professId;
                var forms = this.companyForm;
                for (var name in forms) {
                    if (!forms[name] && this.companyFormError[name]) {
                        this.$Message.error(
                            this.companyFormError[name] + ": 请填写完整!"
                        );
                        return;
                    }
                }
                if (this.subFlag) this.subFlag = false;
                else return;
                api
                    .axs("post", "/company/update", this.changeform)
                    .then(({ data }) => {
                        if (data.code === "SUCCESS") {
                            this.datas = data;
                            this.$Message.success("新增成功!");
                            this.$emit("compantMod", false);
                            this.$parent.loadLists();
                            this.subFlag = true;
                        } else {
                            this.$Message.error(data.remark);
                            this.subFlag = true;
                        }
                    });
            } else {
                if (this.$refs.proCity.cityId === "") {
                    this.companyForm.areaId = this.$refs.proCity.proId;
                } else {
                    this.companyForm.areaId = this.$refs.proCity.cityId;
                }
                this.companyForm.industryId = this.professId;
                var forms = this.companyForm;
                for (var name in forms) {
                    if (!forms[name] && this.companyFormError[name]) {
                        this.$Message.error(
                            this.companyFormError[name] + ": 请填写完整!"
                        );
                        return;
                    }
                }
                if (this.subFlag) this.subFlag = false;
                else return;

                api
                    .axs("post", "/company/add", this.companyForm)
                    .then(({ data }) => {
                        if (data.code === "SUCCESS") {
                            this.datas = data;
                            this.$Message.success("新增成功!");
                            this.$parent.companyPop = false;
                            this.$parent.loadLists();
                            this.reset("companyForm");
                        } else {
                            this.$Message.error(data.remark);
                            this.subFlag = true;
                        }
                    });
            }
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
            this.professPop = false;
        },
        success(res) {
            this.professPop = res;
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
        }
    },
    mounted() {
        this.info();
        if (this.companyMod) {
            this.companyForm = this.recordsDetails;
        }
    },
    watch: {
        recordsDetails: (newData, oldData) => {}
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.company-content {
    height: 510px;
    li {
        margin-bottom: 10px;
        .selpro {
            .ivu-input {
                text-align: center;
            }
        }
        p {
            display: inline-block;
            width: 80px;
            line-height: 32px;
            text-align: right;
            color: #444;
            margin-right: 10px;
            span {
                color: #ff8686;
            }
        }
        .ivu-input-wrapper {
            width: 300px;
        }
    }
}
</style>
