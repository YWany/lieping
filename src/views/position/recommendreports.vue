<template>
    <div class="recommend">
        <div class='currentNav'>当前位置: 职位 >
            <router-link to='/position/myPositions'>职位进展</router-link> >
            <router-link to='/position/myPositions/doing'>职位运作</router-link> > 推荐企业</div>
        <div class="steps">
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
                        <span @click="messagechange()" type="text">
                            <Icon type="document-text"></Icon>编辑</span>
                    </div>
                    <ul class="message">
                        <li>
                            <span>推荐企业：</span>{{ jobcompanyname }}</li>
                        <li>
                            <span>推荐职位：</span>{{ jobname }}</li>
                        <li>
                            <span>姓名：</span>{{ resume.name }}</li>
                        <li>
                            <span>年龄：</span>{{ resume.age }}</li>
                        <li>
                            <span>户籍所在地：</span>{{ resume.address }}</li>
                        <li>
                            <span>居住地所在地：</span>{{ resume.address }}</li>
                        <li>
                            <span>最高学历：</span>{{ resume.education }}</li>
                        <li>
                            <span>第一学历：</span>{{ resume.education }}</li>
                    </ul>
                    <Modal width="820px" v-model="message" title="推荐信息" @on-ok="ok" @on-cancel="cancel">
                        <ul class="messagechange">
                            <li>
                                <p>
                                    <span>*</span> 推荐企业：</p>
                                <Input disabled v-model='messageForms.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 推荐职位：</p>
                                <Input disabled v-model='messageForms.position' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 姓名：</p>
                                <Input v-model='messageForms.name' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 年龄：</p>
                                <Input v-model='messageForms.age' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    户籍所在地：</p>
                                <Input v-model='messageForms.address' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    居住所在地：</p>
                                <Input v-model='messageForms.liveAddress' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    家庭情况：</p>
                                <Input v-model='messageForms.famliyCondition' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    目前薪酬：</p>
                                <Input v-model='messageForms.salaryNow' placeholder="月薪，如10k" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    期望薪酬：</p>
                                <Input v-model='messageForms.salaryExpect' placeholder="月薪，如10k" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    第一学历：</p>
                                <Select style="width:300px;" class='selpro' v-model="messageForms.firstEdu" placeholder="选择学历">
                                    <Option style="width:300px;" value="小学">小学</Option>
                                    <Option style="width:300px;" value="高中">高中</Option>
                                    <Option style="width:300px;" value="本科">本科</Option>
                                </Select>
                            </li>
                            <li>
                                <p>
                                    <span>*</span>最高学历：</p>
                                <Select style="width:300px;" class='selpro' v-model="messageForms.highEdu" placeholder="选择学历">
                                    <Option style="width:300px;" value="小学">小学</Option>
                                    <Option style="width:300px;" value="高中">高中</Option>
                                    <Option style="width:300px;" value="本科">本科</Option>
                                </Select>
                            </li>
                        </ul>
                        <div slot="footer">
                            <Button type="primary" @click="messageok()">保存</Button>
                            <Button type="ghost" @click="cancel()" style="margin-left: 8px">取消</Button>
                        </div>
                    </Modal>
                    <div class="title">
                        工作经历
                        <!-- <span @click="experience = true" type="text">
                                    <Icon type="plus-circled"></Icon>新增</span> -->
                    </div>
                    <ul class="experience">
                        <li v-for="(list,index) in experiencelist" :key='index'>{{ list.companyName }} | {{ list.jobTitle }}
                            <!-- <span class="change" @click="experience = true" type="text">
                                        <Icon type="document-text"></Icon>编辑</span> -->
                            <span>
                                <template v-if='list.startTime'>
                                    {{ list.startTime.substr(0, 10) }}
                                </template>

                                <template v-else>
                                    无
                                </template>-
                                <template v-if='list.endTime'>
                                    {{ list.endTime.substr(0, 10) }}
                                </template>

                                <template v-else>
                                    无
                                </template>
                            </span>
                        </li>
                    </ul>
                    <Modal width="820px" v-model="experience" title="工作经历（由近及远）" @on-ok="ok" @on-cancel="cancel">
                        <ul class="messagechange">
                            <li>
                                <p>
                                    <span>*</span> 工作时间：</p>
                                <DatePicker type="date" placeholder="Select date" v-model="experienceForms.companyName"></DatePicker>-
                                <DatePicker type="date" placeholder="Select date" v-model="experienceForms.companyName"></DatePicker>
                                <!-- <Button type="primary" shape="circle" size='small' icon="plus" class='addNewContact' @click='addexnum'></Button> -->
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 企业名称：</p>
                                <Input v-model='experienceForms.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 职位：</p>
                                <Input v-model='experienceForms.companyName' placeholder="" class='selpro'></Input>
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
                        <span @click="experienceadd()" type="text">
                            <Icon type="plus-circled"></Icon>添加</span>
                    </div>
                    <ul class="explain">
                        <li v-for="(list,index) in experiencelist" :key='index'>
                            <p>{{ list.companyName }} | {{ list.jobTitle }}
                                <span class="change" @click="experiencechange(index)" type="text">
                                    <Icon type="document-text"></Icon>编辑</span>
                                <span>
                                    <template v-if='list.startTime'>
                                        {{ list.startTime.substr(0, 10) }}
                                    </template>

                                    <template v-else>
                                        无
                                    </template>-
                                    <template v-if='list.endTime'>
                                        {{ list.endTime.substr(0, 10) }}
                                    </template>

                                    <template v-else>
                                        无
                                    </template>
                                </span>
                            </p>
                            <p>企业简介：韩资企业，互联网电商贸易，重点方向韩国电子商务女装网站。</p>
                            <p>汇报对象：董事长</p>
                            <p>下属人数：14人</p>
                            <p>工资职责：{{ list.description }}
                            </p>
                            <p>离职原因：{{ list.description }}</p>
                        </li>
                    </ul>
                    <Modal width="820px" v-model="experience" title="工作经历（由近及远）" @on-ok="ok" @on-cancel="cancel">
                        <ul class="messagechange">

                            <li>
                                <p>
                                    <span>*</span> 工作时间：</p>
                                <DatePicker v-model="experienceForms.startTime" type="date" placeholder="Select date" format="yyyy-MM-dd HH:mm:ss" @on-change='seltime1'></DatePicker>-
                                <DatePicker v-model="experienceForms.endTime" type="date" placeholder="Select date" format="yyyy-MM-dd HH:mm:ss" @on-change='seltime2'></DatePicker>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 企业名称：</p>
                                <Input v-model='experienceForms.companyName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 职位：</p>
                                <Input v-model='experienceForms.jobTitle' placeholder="" class='selpro'></Input>
                            </li>
                            <li style="width:100%;">
                                <p>
                                    <span></span> 企业介绍：</p>
                                <Input style="width:600px;" type="textarea" v-model='experienceForms.description' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 汇报对象：</p>
                                <Input v-model='experienceForms.reportTarget' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span></span> 下属人数：</p>
                                <Input v-model='experienceForms.subordinateNum' placeholder="" class='selpro'></Input>
                            </li>
                            <li style="width:100%;">
                                <p>
                                    <span>*</span> 工作职责：</p>
                                <Input style="width:600px;" type="textarea" v-model='experienceForms.workDuty' placeholder="" class='selpro'></Input>
                            </li>
                            <li style="width:100%;">
                                <p>
                                    <span></span> 工作业绩：</p>
                                <Input style="width:600px;" type="textarea" v-model='experienceForms.workAchievement' placeholder="" class='selpro'></Input>
                            </li>
                            <li style="width:100%;">
                                <p>
                                    <span></span> 离职原因：</p>
                                <Input style="width:600px;" type="textarea" v-model='experienceForms.leaveReason' placeholder="" class='selpro'></Input>
                            </li>
                        </ul>
                        <div slot="footer">
                            <Button type="primary" @click="experienceok()">保存</Button>
                            <Button type="ghost" @click="cancel()" style="margin-left: 8px">取消</Button>
                        </div>
                    </Modal>
                    <div class="title">
                        教育经历
                        <span @click="educationadd()" type="text">
                            <Icon type="plus-circled"></Icon>添加</span>
                    </div>
                    <ul class="education">
                        <li v-for="(list,index) in educationlist" :key='index'>
                            {{ list.schoolName }} | {{ list.majorName }} | {{ list.level }}
                            <span class="change" @click="educationchange(index)" type="text">
                                <Icon type="document-text"></Icon>编辑</span>
                            <span>
                                <template v-if='list.startTime'>
                                    {{ list.startTime.substr(0, 10) }}
                                </template>

                                <template v-else>
                                    无
                                </template>-
                                <template v-if='list.endTime'>
                                    {{ list.endTime.substr(0, 10) }}
                                </template>

                                <template v-else>
                                    无
                                </template>
                            </span>
                        </li>
                    </ul>
                    <Modal width="820px" v-model="education" title="教育经历" @on-ok="ok" @on-cancel="cancel">
                        <ul class="messagechange">
                            <li>
                                <p>
                                    <span>*</span> 起止时间：</p>
                                <DatePicker type="date" placeholder="Select date" format="yyyy-MM-dd HH:mm:ss" v-model="educationForm.startTime" @on-change='seltime3'></DatePicker>-
                                <DatePicker type="date" placeholder="Select date" format="yyyy-MM-dd HH:mm:ss" v-model="educationForm.endTime" @on-change='seltime4'></DatePicker>
                                <!-- <Button type="primary" shape="circle" size='small' icon="plus" class='addNewContact' @click='addexnum'></Button> -->
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 学校名称：</p>
                                <Input v-model='educationForm.schoolName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 专业名称：</p>
                                <Input v-model='educationForm.majorName' placeholder="" class='selpro'></Input>
                            </li>
                            <li>
                                <p>
                                    <span>*</span> 学历：</p>
                                <Input v-model='educationForm.level' placeholder="" class='selpro'></Input>
                            </li>
                        </ul>
                        <div slot="footer">
                            <Button type="primary" @click="educationok()">保存</Button>
                            <Button type="ghost" @click="cancel()" style="margin-left: 8px">取消</Button>
                        </div>
                    </Modal>
                    <div class="save">
                        <Button type="primary" @click="draftsok()">保存</Button>
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
                        <CheckboxGroup v-model="suggestForms.assessContent">
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
                        <li style="width:100%;">
                            <p>
                                <span>*</span> 推荐建议：</p>
                            <Input style="width:600px;" type="textarea" v-model='suggestForms.suggest' placeholder="" class='selpro'></Input>
                        </li>
                    </ul>
                    <div class="save">
                        <Button type="primary" @click="suggestok()">保存</Button>
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
                            <Select v-model="candidate" @change="changeone()" size="small" style="width:100px">
                                <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                                <Option value="1">郎超群</Option>
                                <Option value="2">郎超群</Option>
                            </Select>
                            <p>0571-89301267</p>
                            <p>lcq8848rc.com</p>
                        </div>
                    </div>
                    <div class="title">
                        推荐信息
                        <span @click="messagechange()" type="text">
                            <Icon type="document-text"></Icon>编辑</span>
                    </div>
                    <ul class="message">
                        <li>
                            <span>推荐企业：</span>{{ jobcompanyname }}</li>
                        <li>
                            <span>推荐职位：</span>{{ jobname }}</li>
                        <li>
                            <span>姓名：</span>{{ resume.name }}</li>
                        <li>
                            <span>年龄：</span>{{ resume.age }}</li>
                        <li>
                            <span>户籍所在地：</span>{{ resume.age }}</li>
                        <li>
                            <span>居住地所在地：</span>{{ resume.age }}</li>
                        <li>
                            <span>最高学历：</span>{{ resume.education }}</li>
                        <li>
                            <span>第一学历：</span>{{ resume.education }}</li>
                    </ul>
                    <div class="title">
                        评估和执行内容（如遇项目紧急的特殊情况，顾问会将背调与推荐同时进行，之后及时反馈
                    </div>
                    <div class="assess">
                        <CheckboxGroup v-model="suggestForms.assessContent">
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
                        <li style="width:100%;">
                            <p>
                                <span>*</span> 推荐建议：</p>
                            <Input style="width:600px;" type="textarea" v-model='suggestForms.suggest' placeholder="" class='selpro'></Input>
                        </li>
                    </ul>
                    <div class="title">
                        工作经历
                        <!-- <span @click="experience = true" type="text">
                                <Icon type="plus-circled"></Icon>新增</span> -->
                    </div>
                    <ul class="experience">
                        <li v-for="(list,index) in experiencelist" :key='index'>{{ list.companyName }}} | {{ list.jobTitle }}}
                            <!-- <span class="change" @click="experience = true" type="text">
                                    <Icon type="document-text"></Icon>编辑</span> -->
                            <span>
                                <template v-if='list.startTime'>
                                    {{ list.startTime.substr(0, 10) }}
                                </template>

                                <template v-else>
                                    无
                                </template>-
                                <template v-if='list.endTime'>
                                    {{ list.endTime.substr(0, 10) }}
                                </template>

                                <template v-else>
                                    无
                                </template>
                            </span>
                        </li>
                    </ul>
                    <div class="title">
                        详细说明
                        <span @click="experienceadd()" type="text">
                            <Icon type="plus-circled"></Icon>添加</span>
                    </div>
                    <ul class="explain">
                        <li v-for="(list,index) in experiencelist" :key='index'>
                            <p>{{ list.companyName }} | {{ list.jobTitle }}
                                <span class="change" @click="experiencechange(index)" type="text">
                                    <Icon type="document-text"></Icon>编辑</span>
                                <span>
                                    <template v-if='list.startTime'>
                                        {{ list.startTime.substr(0, 10) }}
                                    </template>

                                    <template v-else>
                                        无
                                    </template>-
                                    <template v-if='list.endTime'>
                                        {{ list.endTime.substr(0, 10) }}
                                    </template>

                                    <template v-else>
                                        无
                                    </template>
                                </span>
                            </p>
                            <p>企业简介：韩资企业，互联网电商贸易，重点方向韩国电子商务女装网站。</p>
                            <p>汇报对象：董事长</p>
                            <p>下属人数：14人</p>
                            <p>工资职责：{{ list.description }}
                            </p>
                            <p>离职原因：集团撤离中国市场</p>
                        </li>
                    </ul>
                    <div class="title">
                        教育经历
                        <span @click="educationadd()" type="text">
                            <Icon type="plus-circled"></Icon>添加</span>
                    </div>
                    <ul class="education">
                        <li v-for="(list,index) in educationlist" :key='index'>
                            {{ list.schoolName }} | {{ list.majorName }} | {{ list.level }}
                            <span class="change" @click="educationchange(index)" type="text">
                                <Icon type="document-text"></Icon>编辑</span>
                            <span>
                                <template v-if='list.startTime'>
                                    {{ list.startTime.substr(0, 10) }}
                                </template>

                                <template v-else>
                                    无
                                </template>-
                                <template v-if='list.jobTitle'>
                                    {{ list.jobTitle.substr(0, 10) }}
                                </template>

                                <template v-else>
                                    无
                                </template>
                            </span>
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
                    <Button type="primary" @click="sendreport()">发送给客户</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api";
import ls from "store2";
import { UTC2Date } from "@/assets/js/utils.js";
export default {
    name: "recommendreports",
    components: {},
    data() {
        return {
            id: this.$route.query.resumeId,
            status: this.$route.query.status,
            candidateId: this.$route.query.candidateId,
            srcId: this.$route.query.srcId,
            jobname: ls.get("jobname"),
            jobcompanyname: ls.get("jobcompanyname"),
            stage1: true,
            stage2: false,
            stage3: false,
            message: false,
            experience: false,
            experiencestate: "1", //判断经验新增或者编辑
            educationstate: "1", //判断教育新增或者编辑
            education: false,
            styles1: "active",
            styles2: "left",
            styles3: "left",
            candidate: "1", //候选人
            resume: {}, //基本信息
            experiencelist: [], //工作经验
            educationlist: [], //学历经验
            experiencearr: [], //保存工作id
            educationarr: [], //保存学历id
            addnum: 0,
            messageForm: {
                companyName: ""
            },
            messageForms: {
                id: "",
                srcId: this.$route.query.srcId, //平台源编码
                companyName: ls.get("jobcompanyname"),
                name: "", //候选人名字
                // sex: this.resume.name, //性别
                age: "", //年龄
                position: ls.get("jobname"), //职位
                famliyCondition: "", //家庭情况
                address: "", //户籍所在地
                salaryExpect: "", //期望薪资
                salaryNow: "", //目前薪资
                firstEdu: "", //第一学历
                highEdu: "", //最高学历
                liveAddress: "" //居住地所在地
            },
            experienceForms: {
                id: "",
                srcId: this.$route.query.srcId, //平台源编码
                companyName: "", //企业名称
                jobTitle: "", //职位
                description: "", //企业简介
                subordinateNum: "", //下属人数
                reportTarget: "", //汇报对象
                workDuty: "", //工作职责
                workAchievement: "", //工作业绩
                leaveReason: "", //离职原因
                startTime: "", //工作时间开始
                endTime: "" //工作时间结束
            },
            educationForm: {
                id: "",
                srcId: this.$route.query.srcId, //平台源编码
                eduId: "", //教育经历id
                level: "", //学历
                majorName: "", //专业名称
                schoolName: "", //学校名称
                startTime: "", //工作时间开始
                endTime: "" //工作时间结束
            },
            suggestForms: {
                srcId: this.$route.query.srcId, //平台源编码
                assessContent: [],
                suggest: ""
            }
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
            if (
                this.experiencearr.length == 0 ||
                this.educationarr.length == 0
            ) {
                for (var i = 0; i < this.experiencelist.length; i++) {
                    this.experiencearr.push(this.experiencelist[i].id);
                }
                for (var i = 0; i < this.educationlist.length; i++) {
                    this.educationarr.push(this.educationlist[i].id);
                }
                this.experiencearr = JSON.stringify(this.experiencearr);
                this.educationarr = JSON.stringify(this.educationarr);
            }

            api
                .axs("post", "/resumeReport/saveCandidate", {
                    candidateId: this.candidateId,
                    workExperienceId: this.experiencearr,
                    eduId: this.educationarr
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        this.$Message.success("编辑成功!");
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                        this.stage1 = false;
                        this.stage2 = true;
                        this.stage3 = false;
                        this.styles1 = "left";
                        this.styles2 = "active";
                        this.styles3 = "left";
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        gonext3() {
            if (!this.suggestForms.suggest) {
                this.$Message.error("请填写推荐建议");
                return;
            }
            this.suggestForms.assessContent = JSON.stringify(
                this.suggestForms.assessContent
            );
            api
                .axs(
                    "post",
                    "/resumeReport/saveCandidateReport",
                    this.suggestForms
                )
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        this.$Message.success("编辑成功!");
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                        this.stage1 = false;
                        this.stage2 = false;
                        this.stage3 = true;
                        this.styles1 = "left";
                        this.styles2 = "left";
                        this.styles3 = "active";
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        seltime1(date) {
            this.experienceForms.startTime = date;
        },
        seltime2(date) {
            this.experienceForms.endTime = date;
        },
         seltime3(date) {
            this.educationForm.startTime = date;
        },
        seltime4(date) {
            this.educationForm.endTime = date;
        },
        messagechange() {
            this.message = true;
            this.messageForms.name = this.resume.name;
            this.messageForms.age = this.resume.age;
            this.messageForms.address = this.resume.address;
            this.messageForms.highEdu = this.resume.education;
        },
        experienceadd() {
            this.experiencestate = "1";
            this.experience = true;
        },
        experiencechange(data) {
            this.experiencestate = "2";
            this.experience = true;
            this.experienceForms.id = this.experiencelist[data].id;
            this.experienceForms.startTime = this.experiencelist[
                data
            ].startTime;
            this.experienceForms.endTime = this.experiencelist[data].endTime;
            this.experienceForms.companyName = this.experiencelist[
                data
            ].companyName;
            this.experienceForms.jobTitle = this.experiencelist[data].jobTitle;

            this.experienceForms.description = this.experiencelist[
                data
            ].description;
            this.experienceForms.subordinateNum = this.experiencelist[
                data
            ].subordinateNum;
            this.experienceForms.reportTarget = this.experiencelist[
                data
            ].reportTarget;
            this.experienceForms.workDuty = this.experiencelist[data].workDuty;
            this.experienceForms.workAchievement = this.experiencelist[
                data
            ].workAchievement;
            this.experienceForms.leaveReason = this.experiencelist[
                data
            ].leaveReason;
        },

        messageok() {
            //基本信息修改。增加
            console.log(this.messageForms);
            api
                .axs("post", "/resumeReport/queryBasicInfo", {
                    srcId: this.srcId
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        if (data.data.id) {
                            this.messageForms.id = data.data.id;
                            api
                                .axs(
                                    "post",
                                    "/resumeReport/updateBasicInfo",
                                    this.messageForms
                                )
                                .then(({ data }) => {
                                    if (data.code === "SUCCESS") {
                                        console.log(data);
                                        this.message = false;
                                        this.$Loading.finish();
                                        this.$Message.success("编辑成功!");
                                        this.$store.state.spinShow = false;
                                    } else {
                                        this.$Message.error(data.remark);
                                    }
                                });
                        } else {
                            api
                                .axs(
                                    "post",
                                    "/resumeReport/saveBasicInfo",
                                    this.messageForms
                                )
                                .then(({ data }) => {
                                    if (data.code === "SUCCESS") {
                                        console.log(data);
                                        this.message = false;
                                        this.$Message.success("新增成功!");
                                        this.$Loading.finish();
                                        this.$store.state.spinShow = false;
                                    } else {
                                        this.$Message.error(data.remark);
                                    }
                                });
                        }
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },

        experienceok() {
            if (!this.experienceForms.startTime) {
                this.$Message.error("请选择工作开始时间");
                return;
            }
            if (!this.experienceForms.endTime) {
                this.$Message.error("请选择工作结束时间");
                return;
            }

            if (!this.experienceForms.companyName) {
                this.$Message.error("请输入公司名称");
                return;
            }
            if (!this.experienceForms.jobTitle) {
                this.$Message.error("请输入职位名称");
                return;
            }
            if (!this.experienceForms.reportTarget) {
                this.$Message.error("请输入汇报对象");
                return;
            }
            if (!this.experienceForms.workDuty) {
                this.$Message.error("请输入工作职责");
                return;
            }
            if (this.experiencestate == 1) {
                console.log(this.experienceForms);
                api
                    .axs(
                        "post",
                        "/resumeReport/saveWorkExperienceReport",
                        this.experienceForms
                    )
                    .then(({ data }) => {
                        if (data.code === "SUCCESS") {
                            console.log(data);
                            this.$Message.success("新增成功!");
                            this.$Loading.finish();
                            this.$store.state.spinShow = false;
                        } else {
                            this.$Message.error(data.remark);
                        }
                    });
            } else {
                console.log(this.experienceForms);
                this.experienceForms.startTime = UTC2Date(
                    this.experienceForms.startTime
                );
                this.experienceForms.endTime = UTC2Date(
                    this.experienceForms.endTime
                );
                api
                    .axs(
                        "post",
                        "/resumeReport/updateWorkExperienceReport",
                        this.experienceForms
                    )
                    .then(({ data }) => {
                        if (data.code === "SUCCESS") {
                            console.log(data);
                            this.$Message.success("编辑成功!");
                            this.$Loading.finish();
                            this.$store.state.spinShow = false;
                        } else {
                            this.$Message.error(data.remark);
                        }
                    });
            }
        },

        educationadd() {
            this.education = true;
            this.educationstate = "1";
        },
        educationchange(data) {
            this.education = true;
            this.educationstate = "2";
            this.educationForm.id = this.educationlist[data].id;
            this.educationForm.level = this.educationlist[data].level;
            this.educationForm.majorName = this.educationlist[data].majorName;
            this.educationForm.schoolName = this.educationlist[data].schoolName;
            this.educationForm.startTime = this.educationlist[data].startTime;
            this.educationForm.endTime = this.educationlist[data].endTime;
        },
        educationok() {
            //  if (!this.educationForm.startTime) {
            //     this.$Message.error("请选择开始时间");
            //     return;
            // }
            if (this.educationstate == 1) {
                api
                    .axs(
                        "post",
                        "/resumeReport/saveEducationExperienceReport",
                        this.educationForm
                    )
                    .then(({ data }) => {
                        if (data.code === "SUCCESS") {
                            console.log(data);
                            this.$Message.success("新增成功!");
                            this.$Loading.finish();
                            this.$store.state.spinShow = false;
                        } else {
                            this.$Message.error(data.remark);
                        }
                    });
            } else {
                this.educationForm.startTime = UTC2Date(
                    this.educationForm.startTime
                );
                this.educationForm.endTime = UTC2Date(
                    this.educationForm.endTime
                );
                api
                    .axs(
                        "post",
                        "/resumeReport/updateEducationExperienceReport",
                        this.educationForm
                    )
                    .then(({ data }) => {
                        if (data.code === "SUCCESS") {
                            console.log(data);
                            this.$Message.success("编辑成功!");
                            this.$Loading.finish();
                            this.$store.state.spinShow = false;
                        } else {
                            this.$Message.error(data.remark);
                        }
                    });
            }
        },
        draftsok() {
            if (
                this.experiencearr.length == 0 ||
                this.educationarr.length == 0
            ) {
                for (var i = 0; i < this.experiencelist.length; i++) {
                    this.experiencearr.push(this.experiencelist[i].id);
                }
                for (var i = 0; i < this.educationlist.length; i++) {
                    this.educationarr.push(this.educationlist[i].id);
                }
                this.experiencearr = JSON.stringify(this.experiencearr);
                this.educationarr = JSON.stringify(this.educationarr);
            }

            api
                .axs("post", "/resumeReport/saveCandidate", {
                    candidateId: this.candidateId,
                    workExperienceId: this.experiencearr,
                    eduId: this.educationarr
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        this.$Message.success("编辑成功!");
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        suggestok() {
            if (!this.suggestForms.suggest) {
                this.$Message.error("请填写推荐建议");
                return;
            }
            this.suggestForms.assessContent = JSON.stringify(
                this.suggestForms.assessContent
            );
            api
                .axs(
                    "post",
                    "/resumeReport/saveCandidateReport",
                    this.suggestForms
                )
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        this.$Message.success("编辑成功!");
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        sendreport() {
            api
                .axs("post", "/resumeReport/sendReportToCustomer", {
                    candidateId: this.candidateId
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success("发送成功!");
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        changeone() {
            alert(1);
        },
        ok() {
            this.$Message.info("Clicked ok");
        },
        cancel() {
            this.message = false;
            this.$Message.info("Clicked cancel");
        }
    },
    mounted() {
        if (this.status == 99) {
            api
                .axs("post", "/resumeReport/queryResumeReportInfo", {
                    srcId: this.srcId
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        this.resume = data.data.resume;
                        this.experiencelist = data.data.work;
                        this.educationlist = data.data.education;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        } else {
            api
                .axs("post", "/resume/info", {
                    id: this.id
                })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        this.resume = data.data.resume;
                        this.experiencelist = data.data.work;
                        this.educationlist = data.data.education;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        }

        this.$store.state.spinShow = false;
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.steps {
    width: 100%;
    .zoom {
        width: 100%;
        padding: 20px 50px;
        background: #f5fbff;
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
                background: #4ca6fa;
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
    background: #f5fbff;
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
        box-shadow: 0 0 5px #eee;
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
