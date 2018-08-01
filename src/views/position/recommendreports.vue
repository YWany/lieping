<template>
    <div class="recommend">
        <div class='currentNav'>当前位置: 职位 >
            <router-link to='/position/myPositions'>职位进展</router-link> >
            <router-link to='/position/myPositions/doing'>职位运作</router-link> > 推荐企业</div>
        <div class="report1">
            <ul class="zoom">
                <li>
                    <div :class='[styles1]'>
                        01
                    </div>
                    <div class="right">
                        <p class="p1">信息校对</p>
                        <p class="p2">校对简历信息准确性</p>
                    </div>
                </li>
                <li>
                    <div :class='[styles2]'>
                        02
                    </div>
                    <div class="right">
                        <p class="p1">推荐报告</p>
                        <p class="p2">填选人选推荐报告</p>
                    </div>
                </li>
                <li>
                    <div :class='[styles3]'>
                        03
                    </div>
                    <div class="right">
                        <p class="p1">预览确认</p>
                        <p class="p2">预览人选推荐报告</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="stage">
            <div class="stage1" v-show="stage1">
                <div class="font1">
                    <div class="title">
                        推荐信息
                        <span @click="message = true" type="text">
                            <Icon type="document-text"></Icon>编辑</span>
                    </div>
                    <ul class="message">
                        <li>
                            <span>推荐企业：</span>浙江千里马人力资源股份有限公司</li>
                        <li>
                            <span>推荐职位：</span>人力资源总监</li>
                        <li>
                            <span>姓名：</span>李先生</li>
                        <li>
                            <span>推荐企业：</span>年龄：44岁</li>
                        <li>
                            <span>户籍所在地：</span>浙江省杭州市下城区</li>
                        <li>
                            <span>居住地所在地：</span>浙江省杭区</li>
                        <li>
                            <span>最高学历：</span>MBA</li>
                    </ul>
                    <Modal width="820px" v-model="message" title="推荐信息" @on-ok="ok" @on-cancel="cancel">
                        <ul class="messagechange">
                            <li>
                                <p>
                                    <span>*</span> 推荐企业：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 推荐职位：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 姓名：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 年龄：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    户籍所在地：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    居住所在地：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    家庭情况：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    目前薪酬：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    期望薪酬：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span>最高学历：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    第一学历：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                        </ul>
                    </Modal>
                    <div class="title">
                        工作经历
                        <!-- <span @click="experience = true" type="text">
                                <Icon type="plus-circled"></Icon>新增</span> -->
                    </div>
                    <ul class="experience">
                        <li>杭州千里马信息科技有限公司 | 副总经理（行政人力中心）
                            <!-- <span class="change" @click="experience = true" type="text">
                                    <Icon type="document-text"></Icon>编辑</span> -->
                            <span>2017.06-2018.06</span>
                        </li>
                        <li>杭州千里马信息科技有限公司 | 副总经理（行政人力中心）
                            <!-- <span class="change" @click="experience = true" type="text">
                                    <Icon type="document-text"></Icon>编辑</span> -->
                            <span>2017.06-2018.06</span>
                        </li>
                    </ul>
                    <Modal width="820px" v-model="experience" title="工作经历（由近及远）" @on-ok="ok" @on-cancel="cancel">
                        <ul class="messagechange">
                            <li>
                                <p>
                                    <span>*</span> 工作时间：</p>
                                <DatePicker type="date" placeholder="Select date" v-model="messageForm.companyName"></DatePicker>-
                                <DatePicker type="date" placeholder="Select date" v-model="messageForm.companyName"></DatePicker>
                                <!-- <Button type="primary" shape="circle" size='small' icon="plus" class='addNewContact' @click='addexnum'></Button> -->
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 企业名称：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 职位：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <!-- <div v-for="(num,index) in addnum" :key='index'>
                                    <li>
                                        <p>
                                            <span>*</span> 工作时间：</p>
                                        <DatePicker type="date" placeholder="Select date" v-model="messageForm.companyName"></DatePicker>-
                                        <DatePicker type="date" placeholder="Select date" v-model="messageForm.companyName"></DatePicker>
                                        <Button type="primary" shape="circle" size='small' icon="minus-round" class='addNewContact'></Button>
                                    </li>
                                    <li>
                                        <p>
                                            <span>*</span> 企业名称：</p>
                                        <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                                    </li>
                                    <li>
                                        <p>
                                            <span>*</span> 职位：</p>
                                        <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                                    </li>
                                </div> -->
                        </ul>
                    </Modal>
                    <div class="title">
                        详细说明
                        <span @click="experience = true" type="text">
                            <Icon type="plus-circled"></Icon>添加</span>
                    </div>
                    <ul class="explain">
                        <li>
                            <p>杭州千里马信息科技有限公司 | 副总经理（行政人力中心）
                                <span class="change" @click="experience = true" type="text">
                                    <Icon type="document-text"></Icon>编辑</span>
                                <span>2017.06-2018.06</span>
                            </p>
                            <p>企业简介：韩资企业，互联网电商贸易，重点方向韩国电子商务女装网站。</p>
                            <p>汇报对象：董事长</p>
                            <p>下属人数：14人</p>
                            <p>工资职责：1、制定、组织、推动经营计划，实现业务目标。 2、负责主抓公司内部管理，分管人力资源、行政办公室、采购等部门的工作。 3、根据公司业务需求，重新确立和调整公司及办事处的组织机构，督导落实。 4、建立健全公司各项内部管理制度，包括人力资源招聘、考核、培训、薪酬以及各项行政规 章制度。 5、负责各项人事行政规章制度的实施和监督，充分激励员工积极性，提高工作效率。 6、定期组织召开管理层办公会和经营分析会，就相关重大问题进行讨论，并形成决议。 7、指导分支机构的筹划组建和变更撤消，包括北京、上海、天津、烟台等地。 8、参与策划品牌战略及电子商务发展策略，注册实施自有品牌。 9、负责协调内外部资源和公共关系，妥善处理经营中出现的各类事件。 10、协调与韩国电子商务女装网站的合作。 11、负责公司其他管理任务。
                            </p>
                            <p>离职原因：集团撤离中国市场</p>
                        </li>
                    </ul>
                    <Modal width="820px" v-model="experience" title="工作经历（由近及远）" @on-ok="ok" @on-cancel="cancel">
                        <ul class="messagechange">

                            <li>
                                <p>
                                    <span>*</span> 工作时间：</p>
                                <DatePicker type="date" placeholder="Select date" v-model="messageForm.companyName"></DatePicker>-
                                <DatePicker type="date" placeholder="Select date" v-model="messageForm.companyName"></DatePicker>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 企业名称：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 职位：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li style="width:100%;">
                                <p>
                                    <span>*</span> 企业介绍：</p>
                                <Input style="width:600px;" type="textarea" v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 汇报对象：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 下属人数：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li style="width:100%;">
                                <p>
                                    <span>*</span> 工作职责：</p>
                                <Input style="width:600px;" type="textarea" v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li style="width:100%;">
                                <p>
                                    <span>*</span> 工作业绩：</p>
                                <Input style="width:600px;" type="textarea" v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li style="width:100%;">
                                <p>
                                    <span>*</span> 离职原因：</p>
                                <Input style="width:600px;" type="textarea" v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                        </ul>
                    </Modal>
                    <div class="title">
                        教育经历
                        <span @click="education = true" type="text">
                            <Icon type="plus-circled"></Icon>添加</span>
                    </div>
                    <ul class="education">
                        <li>
                            浙江大学 | 计算机科学与技术 | 本科
                            <span class="change" @click="education = true" type="text">
                                <Icon type="document-text"></Icon>编辑</span>
                            <span>2017.06-2018.06</span>
                        </li>
                    </ul>
                    <Modal width="820px" v-model="education" title="教育经历" @on-ok="ok" @on-cancel="cancel">
                        <ul class="messagechange">
                            <li>
                                <p>
                                    <span>*</span> 起止时间：</p>
                                <DatePicker type="date" placeholder="Select date" v-model="messageForm.companyName"></DatePicker>-
                                <DatePicker type="date" placeholder="Select date" v-model="messageForm.companyName"></DatePicker>
                                <!-- <Button type="primary" shape="circle" size='small' icon="plus" class='addNewContact' @click='addexnum'></Button> -->
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 学校名称：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 专业名称：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 学历：</p>
                                <Input v-model='messageForm.companyName' placeholder="" class='selpro'></Input>
                            </li>
                        </ul>
                    </Modal>
                    <div class="save">
                        <Button type="primary">保存</Button>
                        <Button type="primary" @click="gonext2()">下一步</Button>
                    </div>
                </div>
            </div>
            <div class="stage2" v-show="stage2">
                <div class="font1">
                    <div class="title">
                        评估和执行内容（如遇项目紧急的特殊情况，顾问会将背调与推荐同时进行，之后及时反馈
                    </div>
                    <div class="assess">
                        <CheckboxGroup v-model="checkbox">
                            <Checkbox label="个人基本信息核实"></Checkbox>
                            <Checkbox label="教育背景核实"></Checkbox>
                            <Checkbox label="工作经验核实"></Checkbox>
                            <Checkbox label="初步沟通"></Checkbox>
                            <Checkbox label="人才意向确认"></Checkbox>
                            <Checkbox label="人岗匹配度评估"></Checkbox>
                            <Checkbox label="专业顾问面试"></Checkbox>
                            <Checkbox label="综合评估"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="title">
                        千里马推荐建议
                    </div>
                    <ul class="messagechange">
                        <li>
                            <p>
                                <span>*</span> 推荐建议：</p>
                            <div class="suggest">

                                1、17 年以上外企/集团公司/大型股份制企业人力资源及企业综合管理经验，经历 IT 电子商务/快递物流/ 金融投资/地产等多元行业，擅长集团化管控模式，根据企业运营模式和发展规划，建立健全人力资源管理体系， 包括招聘、绩效考核、薪酬激励、干部培养、劳动关系等，搭建核心高管团队。

                                <br/> 2、具有资深人力资源管理水平和综合管理能力，同时在企业综合治理方面拥有大量实战经验，涉及领域包 括人力资源、营销、客服、信息技术、采购行政、法务等。
                            </div>
                        </li>
                    </ul>
                    <div class="save">
                        <Button type="primary">保存</Button>
                        <Button type="primary" @click="gonext3()">下一步</Button>
                    </div>
                </div>
            </div>
            <div class="stage3" v-show="stage3">
                <div class="font1">
                    <img src="@/assets/images/logozhiwei.png" alt="">
                    <h1>候选人报告</h1>
                    <p class="font-p">隐私及保密信息</p>
                    <div class="clear clearfloat">
                        <div class="changecad">
                            <Select v-model="candidate" size="small" style="width:100px">
                                <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                            </Select>
                            <p>0571-89301267</p>
                            <p>lcq8848rc.com</p>
                        </div>
                    </div>
                    <div class="title">
                        推荐信息
                        <span @click="message = true" type="text">
                            <Icon type="document-text"></Icon>编辑</span>
                    </div>
                    <ul class="message">
                        <li>
                            <span>推荐企业：</span>浙江千里马人力资源股份有限公司</li>
                        <li>
                            <span>推荐职位：</span>人力资源总监</li>
                        <li>
                            <span>姓名：</span>李先生</li>
                        <li>
                            <span>推荐企业：</span>年龄：44岁</li>
                        <li>
                            <span>户籍所在地：</span>浙江省杭州市下城区</li>
                        <li>
                            <span>居住地所在地：</span>浙江省杭区</li>
                        <li>
                            <span>最高学历：</span>MBA</li>
                    </ul>
                    <div class="title">
                        评估和执行内容（如遇项目紧急的特殊情况，顾问会将背调与推荐同时进行，之后及时反馈
                    </div>
                    <div class="assess">
                        <CheckboxGroup v-model="checkbox">
                            <Checkbox label="个人基本信息核实"></Checkbox>
                            <Checkbox label="教育背景核实"></Checkbox>
                            <Checkbox label="工作经验核实"></Checkbox>
                            <Checkbox label="初步沟通"></Checkbox>
                            <Checkbox label="人才意向确认"></Checkbox>
                            <Checkbox label="人岗匹配度评估"></Checkbox>
                            <Checkbox label="专业顾问面试"></Checkbox>
                            <Checkbox label="综合评估"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="title">
                        千里马推荐建议
                    </div>
                    <p class="mass">
                        1、17 年以上外企/集团公司/大型股份制企业人力资源及企业综合管理经验，经历 IT 电子商务/快递物流/ 金融投资/地产等多元行业，擅长集团化管控模式，根据企业运营模式和发展规划，建立健全人力资源管理体系， 包括招聘、绩效考核、薪酬激励、干部培养、劳动关系等，搭建核心高管团队。

                        <br/> 2、具有资深人力资源管理水平和综合管理能力，同时在企业综合治理方面拥有大量实战经验，涉及领域包 括人力资源、营销、客服、信息技术、采购行政、法务等。
                    </p>
                    <div class="title">
                        工作经历
                        <!-- <span @click="experience = true" type="text">
                                <Icon type="plus-circled"></Icon>新增</span> -->
                    </div>
                    <ul class="experience">
                        <li>杭州千里马信息科技有限公司 | 副总经理（行政人力中心）
                            <!-- <span class="change" @click="experience = true" type="text">
                                    <Icon type="document-text"></Icon>编辑</span> -->
                            <span>2017.06-2018.06</span>
                        </li>
                        <li>杭州千里马信息科技有限公司 | 副总经理（行政人力中心）
                            <!-- <span class="change" @click="experience = true" type="text">
                                    <Icon type="document-text"></Icon>编辑</span> -->
                            <span>2017.06-2018.06</span>
                        </li>
                    </ul>
                    <div class="title">
                        详细说明
                        <span @click="experience = true" type="text">
                            <Icon type="plus-circled"></Icon>添加</span>
                    </div>
                    <ul class="explain">
                        <li>
                            <p>杭州千里马信息科技有限公司 | 副总经理（行政人力中心）
                                <span class="change" @click="experience = true" type="text">
                                    <Icon type="document-text"></Icon>编辑</span>
                                <span>2017.06-2018.06</span>
                            </p>
                            <p>企业简介：韩资企业，互联网电商贸易，重点方向韩国电子商务女装网站。</p>
                            <p>汇报对象：董事长</p>
                            <p>下属人数：14人</p>
                            <p>工资职责：1、制定、组织、推动经营计划，实现业务目标。 2、负责主抓公司内部管理，分管人力资源、行政办公室、采购等部门的工作。 3、根据公司业务需求，重新确立和调整公司及办事处的组织机构，督导落实。 4、建立健全公司各项内部管理制度，包括人力资源招聘、考核、培训、薪酬以及各项行政规 章制度。 5、负责各项人事行政规章制度的实施和监督，充分激励员工积极性，提高工作效率。 6、定期组织召开管理层办公会和经营分析会，就相关重大问题进行讨论，并形成决议。 7、指导分支机构的筹划组建和变更撤消，包括北京、上海、天津、烟台等地。 8、参与策划品牌战略及电子商务发展策略，注册实施自有品牌。 9、负责协调内外部资源和公共关系，妥善处理经营中出现的各类事件。 10、协调与韩国电子商务女装网站的合作。 11、负责公司其他管理任务。
                            </p>
                            <p>离职原因：集团撤离中国市场</p>
                        </li>
                    </ul>
                    <div class="title">
                        教育经历
                        <span @click="education = true" type="text">
                            <Icon type="plus-circled"></Icon>添加</span>
                    </div>
                    <ul class="education">
                        <li>
                            浙江大学 | 计算机科学与技术 | 本科
                            <span class="change" @click="education = true" type="text">
                                <Icon type="document-text"></Icon>编辑</span>
                            <span>2017.06-2018.06</span>
                        </li>
                    </ul>
                    <div class="aside">
                        * 以星号（ ※ ）做出标记的部分所含的信息由候选人个人提供。<br> 本报告中所含的个人信息（“个人信息”）应当被严格保密。取得本报告的组织（“贵司”）在未取得千里马的书面同意前，不得向任何第三方出售、转让或披露个人信息，并且不得用于千里马许可之外的任何其他目的，否则贵司应赔偿千里马因此遭受的一切损失及损害。如果贵司从其他渠道取得本报告中的候选人信息，请于收到本报告之时起 48 小时内书面告知千里马，否则，该候选人应被认定为由千里马推荐。根据双方达成的协议，贵司或贵司的关联公司一旦雇佣本报告中的候选人，将视为千里马已成功推荐。
                    </div>
                    <div class="bottom">
                        www.8848rc.com
                        <span>浙江千里马人力资源 股份 有限公司</span>
                    </div>
                </div>
                <div class="save">
                    <Button type="primary">保存进草稿箱</Button>
                    <Button type="primary">发送给客户</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api";
import ls from "store2";
export default {
    name: "recommendreports",
    components: {},
    data() {
        return {
            stage1: true,
            stage2: false,
            stage3: false,
            message: false,
            experience: false,
            education: false,
            styles1: "active",
            styles2: "left",
            styles3: "left",
            candidate: "", //候选人
            addnum: 0,
            messageForm: {
                companyName: ""
            },
            checkbox: []
        };
    },
    methods: {
        // addexnum(){
        //     this.addnum+=1;
        // },
        // delexnum(){
        //     this.addnum+=1;
        // },
         gonext1() {
            this.stage1 = true;
            this.stage2 = false;
            this.stage3 = false;
            this.styles1 = "active";
            this.styles2 = "left";
            this.styles3 = "left";
        },
        gonext2() {
            this.stage1 = false;
            this.stage2 = true;
            this.stage3 = false;
            this.styles1 = "left";
            this.styles2 = "active";
            this.styles3 = "left";
        },
        gonext3() {
            this.stage1 = false;
            this.stage2 = false;
            this.stage3 = true;
            this.styles1 = "left";
            this.styles2 = "left";
            this.styles3 = "active";
        },
        ok() {
            this.$Message.info("Clicked ok");
        },
        cancel() {
            this.$Message.info("Clicked cancel");
        }
    },
    mounted() {
        this.$store.state.spinShow = false;
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.report1 {
    width: 100%;
    .zoom {
        width: 100%;
        padding: 10px 50px;
        background: rgba(249, 249, 249, 1);
        overflow: auto;
        li {
            width: 170px;
            float: left;
            margin: 0 80px;
            .left {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #ddd;
                text-align: center;
                line-height: 50px;
                color: white;
                font-size: 20px;
                font-weight: 900;
                float: left;
            }
            .active {
                background: #0066ff;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                text-align: center;
                line-height: 50px;
                color: white;
                font-size: 20px;
                font-weight: 900;
                float: left;
            }
            .right {
                float: right;
                .p1 {
                    margin-top: 7px;
                    font-weight: 900;
                }
            }
        }
    }
}
.clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}
.clearfloat {
    zoom: 1;
}
.stage {
    width: 100%;
    padding: 10px 0;
    margin-top: 10px;
    background: rgba(249, 249, 249, 1);
    .save {
        width: 100%;
        padding: 30px 450px;
        button {
            margin: 0 10px;
        }
    }
    .font1 {
        width: 770px;
        margin: 0 auto;
        padding: 10px;
        background: white;
        h1 {
            text-align: center;
        }
        .font-p {
            text-align: center;
            font-size: 14px;
            font-style: italic;
        }
        .clear {
            .changecad {
                width: 120px;
                float: right;
            }
        }
        .mass {
            line-height: 30px;
            font-weight: 900;
        }
        .aside {
            padding: 20px 0px 10px 0;
            border-top: 2px solid #dddddd;
            border-bottom: 1px solid #dddddd;
        }

        .bottom {
            padding: 5px 0;
            span {
                float: right;
                font-weight: 900;
            }
        }
        .title {
            border-left: 2px solid #0066ff;
            padding-left: 10px;
            overflow: auto;
            font-weight: 900;
            span {
                float: right;
                cursor: pointer;
                i {
                    margin-right: 5px;
                }
            }
        }
        .message {
            width: 100%;
            margin: 10px 0;
            li {
                padding: 5px 0;
                font-weight: 600;
                span {
                    color: #666666;
                }
            }
        }
        .experience {
            width: 100%;
            margin: 10px 0;
            li {
                padding: 5px 0;
                font-weight: 600;
                span {
                    float: right;
                    font-weight: 100;
                }
                .change {
                    font-weight: 900;
                    cursor: pointer;
                    margin-left: 10px;
                }
            }
        }
        .explain {
            width: 100%;
            margin: 10px 0;
            li {
                padding: 5px 0;
                font-weight: 600;
                p {
                    margin: 5px 0;
                    span {
                        float: right;
                        font-weight: 100;
                    }
                    .change {
                        font-weight: 900;
                        cursor: pointer;
                        margin-left: 10px;
                    }
                }
            }
        }
        .education {
            width: 100%;
            margin: 10px 0;
            li {
                padding: 5px 0;
                font-weight: 600;
                span {
                    float: right;
                    font-weight: 100;
                }
                .change {
                    font-weight: 900;
                    cursor: pointer;
                    margin-left: 10px;
                }
            }
        }
        .assess {
            width: 100%;
            margin: 10px 0;
            label {
                width: 150px;
                margin-top: 15px;
            }
        }
        .save {
            width: 100%;
            padding: 30px 260px;
            button {
                margin: 0 10px;
            }
        }
    }
}

.messagechange {
    overflow-y: auto;
    li {
        margin-bottom: 10px;
        float: left;
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
        .suggest {
            width: 600px;
            padding: 10px;
            float: right;
            margin-top: 10px;
            font-weight: 900;
            line-height: 30px;
            border: 1px solid #dddddd;
        }
        .ivu-input-wrapper {
            width: 300px;
        }
        .addNewContact {
            margin-left: 10px;
        }
    }
}
</style>
