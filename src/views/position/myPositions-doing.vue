<template>
    <div class="jobDoingDetails">
        <div class='currentNav'>当前位置:
            <router-link to='/position/myPositions'>我的职位</router-link> > 职位运作</div>
        <div class="jodDesc">
            <h3>
                <router-link :to="'/position/myPositions/details?jodId='+this.jodId+'&&jobName='+this.jobName+'&&companyName='+this.companyName+'&&companyid='+this.companyid">{{ jobName }}</router-link>
                <Tag style="margin-left:10px;" type="border" color="blue">进行中</Tag>
                <Tag type="border" color="green">职位发布中</Tag>
                <span class="update fr">更新时间: 2018-02-22</span>
                <span class='fr'>&nbsp;&nbsp;&nbsp;</span>
                <span class="update fr">创建时间: 2018-02-22</span>
            </h3>
            <p class="company clearfix">
                <router-link class='fl' :to="'/customer/myCustomers/records?id=' + this.companyid">委托企业:{{ companyName }}</router-link>
                <!-- <span class='fl'>委托企业: 浙江千里马人力资源有股份有线公司</span> -->
                <span class="tip fr">投递: 100</span>
                <span class="tip fr">浏览: 235</span>
            </p>
            <div class="tags">
                <span>Business Development：
                    <a href="javascript:;">张浩(离职)</a>
                </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>Consultant：
                    <a href="javascript:;">浪潮群</a>
                </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>Assistant Consultant：
                    <a href="javascript:;">郎超群</a>
                </span>
                <span class="tip fr">
                    <Icon type="share"></Icon>
                    <Icon type="compose"></Icon>
                    <!-- <Icon type="ios-eye-outline"></Icon>
                    <Icon type="ios-loop-strong"></Icon>
                    <Icon type="android-arrow-dropright-circle"></Icon>
                    <Icon type="android-warning"></Icon> -->
                </span>
            </div>
        </div>
        <div class="searchTable">
            <div class="tabsTable">
                <Tabs value="jianli" :animated=false>
                    <TabPane label="简历" name="jianli">
                        <form class="searches" style='margin-bottom: 15px;'>
                            <div class="search">
                                <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                                <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                                    <Option value="候选人名">候选人名</Option>
                                    <Option value="公司名称">公司名称</Option>
                                </Select>
                                <Button slot="append" icon="ios-search"></Button>
                                </Input>
                            </div>
                            <div class="sels">
                                <Select v-model="form.sel1" class='sels-item' placeholder='BD负责人' style="width:100px">
                                    <Option value="部门归属1">部门归属1</Option>
                                    <Option value="部门归属2">部门归属2</Option>
                                </Select>
                                <Select v-model="form.sel2" class='sels-item' placeholder='职位状态' style="width:100px">
                                    <Option value="客户行业1">客户行业1</Option>
                                    <Option value="客户行业2">客户行业2</Option>
                                </Select>
                                <Select v-model="form.sel3" class='sels-item' placeholder='项目经理' style="width:100px">
                                    <Option value="客户来源1">客户来源1</Option>
                                    <Option value="客户来源2">客户来源2</Option>
                                </Select>
                                <div class="disInB sels-item">
                                    创建时间:
                                    <DatePicker type="date" v-model='form.createDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                                </div>
                                <div class="disInB sels-item">
                                    更新时间:
                                    <DatePicker type="date" v-model='form.signDate' placeholder="选择日期" style="width: 110px"></DatePicker>
                                </div>
                                <Button type="warning" class='fr sels-item' shape="circle" html-type='reset' @click="reset('form')" style='margin-right:0'>重置</Button>
                                <Button type="primary" class='fr sels-item' shape="circle" icon="ios-search">搜索</Button>
                            </div>
                        </form>
                        <div class="searchItem">
                            <Button type="ghost">他人推荐</Button>
                            <Button type="ghost">智能匹配</Button>
                            <div class="disInb fr">
                                <Button type="text">所有人选(1)</Button>
                                <Button type="text">预推荐(25)</Button>
                                <Button type="text">推荐(25)</Button>
                                <Button type="text">简历通过(25)</Button>
                                <Button type="text">面试(25)</Button>
                                <Button type="text">面试通过(25)</Button>
                                <Button type="text">意向录用(25)</Button>
                            </div>
                        </div>
                        <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
                        <div class="tablePage fr">
                            <Page :total='form.total' :page-size='form.pageSize' show-total @on-change='loadLists'></Page>
                        </div>
                        <Modal v-model="ranspond" title="转发简历">
                            <Form ref="" :model="transpondform" :label-width="80">

                                <FormItem label="顾问" prop="sex">
                                    <Select v-model="transpondform.refereeTo" placeholder="请选择顾问">

                                        <Option v-for="(item,index) in userlist" :key='index' :value="item.id">{{item.userName}}</Option>
                                    </Select>
                                </FormItem>

                            </Form>
                            <div slot="footer">

                                <Button @click="transmit" type="primary">保存</Button>
                                <!-- <Button type="ghost" @click="handleReset('ranspond')" style="margin-left: 8px">清空表格</Button> -->

                            </div>
                        </Modal>
                        <Modal v-model="retroaction" title="候选人报告企业反馈">
                            <div class="company-content">
                                <p class="pone">候选人：{{ this.retroactionform.candidateName }}</p>
                                <p class="pone">企业名称：{{ this.$route.query.companyName }}</p>
                                <p class="pone">职位名称： {{ this.$route.query.jobName }}</p>
                                <div class="company-li">
                                    <p>
                                        <span>*</span> 客户反馈：</p>
                                    <Input v-model='retroactionform.customerFeedback' placeholder="请输入" type="textarea" :rows="2"></Input>
                                </div>
                                <div class="company-li">
                                    <p>
                                        <span>*</span> 反馈结果：</p>
                                    <Select v-model='retroactionform.feedbackResult' style="width:300px" @on-change="showwing">
                                        <Option v-for="(feed,index) in this.$store.state.allTrees.feedback" :value="feed.code" :key='index'>{{feed.codeText}}</Option>
                                    </Select>
                                </div>
                                <div v-show="faceshow" class="clearfix">
                                    <div class="company-li">
                                        <p>
                                            <span></span> 安排面试：</p>
                                        <RadioGroup v-model="retroactionform.interviewStatus">
                                            <span @click="show = true;">
                                                <Radio label="1">是</Radio>
                                            </span>
                                            <span @click="show = false;">
                                                <Radio label="2">否</Radio>
                                            </span>
                                        </RadioGroup>
                                    </div>
                                    <div v-show="show" class="clearfix">
                                        <div class="company-li">
                                            <p>
                                                <span></span> 面试时间：</p>
                                            <DatePicker type="date" placeholder="选择面试时间" format="yyyy-MM-dd HH:mm:ss" v-model="retroactionform.interviewTime" @on-change='seltime'></DatePicker>
                                        </div>
                                        <div class="company-li">
                                            <p>
                                                <span></span> 面试地点：</p>
                                            <Input v-model='retroactionform.interviewAddr' placeholder="" placeholder="填写面试地点"></Input>

                                        </div>
                                        <div class="company-li">
                                            <p>
                                                <span></span> 面试流程：</p>
                                            <Input v-model='retroactionform.interviewProcess' placeholder="" type="textarea" :rows="2" placeholder="填写面试流程"></Input>

                                        </div>
                                        <div class="company-li">
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview1' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="primary" shape="circle" size='small' icon="plus" v-if='addPhoneBtn' @click='addPhones' class='addNewContact'></Button>
                                        </div>
                                        <div class="company-li" v-if='addPhone2'>
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview2' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>

                                        </div>
                                        <div class="company-li" v-if='addPhone3'>
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview3' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>

                                        </div>
                                        <div class="company-li" v-if='addPhone4'>
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview4' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>

                                        </div>
                                        <div class="company-li" v-if='addPhone5'>
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview5' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>

                                        </div>

                                        <div class="company-li">
                                            <p>
                                                <span></span> 我司陪面：</p>
                                            <Select v-model='retroactionform.myInterviewer' style="width:300px">
                                                <Option v-for="(user,index) in userlist" :key='index' :value="user.id">{{user.userName}}</Option>
                                            </Select>

                                        </div>
                                        <div class="company-li">
                                            <p>
                                                <span></span> 备注：</p>
                                            <Input v-model='retroactionform.remarks' placeholder="" type="textarea" :rows="2" placeholder="填写面试备注"></Input>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div slot='footer' style='text-align:center'>
                                <Button type='info' @click="savetickling">确定</Button>
                                <Button type='info' @click="handleReset">取消</Button>
                            </div>
                        </Modal>
                        <Modal v-model="arrangement" title="面试安排">
                            <div class="company-content">
                                <p class="pone">候选人：{{ this.retroactionform.candidateName }}</p>
                                <p class="pone">企业名称：{{ this.$route.query.companyName }}</p>
                                <p class="pone">职位名称： {{ this.$route.query.jobName }}</p>
                                <p class="pone">面试次数： {{ numangement }}</p>
                                <div class="clearfix">

                                    <div class="clearfix">
                                        <div class="company-li">
                                            <p>
                                                <span>*</span> 面试时间：</p>
                                            <DatePicker type="date" placeholder="选择面试时间" format="yyyy-MM-dd HH:mm:ss" v-model="retroactionform.interviewTime" @on-change='seltime'></DatePicker>
                                        </div>
                                        <div class="company-li">
                                            <p>
                                                <span>*</span> 面试地点：</p>
                                            <Input v-model='retroactionform.interviewAddr' placeholder="" placeholder="填写面试地点"></Input>

                                        </div>
                                        <div class="company-li">
                                            <p>
                                                <span></span> 面试流程：</p>
                                            <Input v-model='retroactionform.interviewProcess' placeholder="" type="textarea" :rows="2" placeholder="填写面试流程"></Input>

                                        </div>
                                        <div class="company-li">
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview1' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="primary" shape="circle" size='small' icon="plus" v-if='addPhoneBtn' @click='addPhones' class='addNewContact'></Button>
                                        </div>
                                        <div class="company-li" v-if='addPhone2'>
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview2' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>

                                        </div>
                                        <div class="company-li" v-if='addPhone3'>
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview3' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>

                                        </div>
                                        <div class="company-li" v-if='addPhone4'>
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview4' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>

                                        </div>
                                        <div class="company-li" v-if='addPhone5'>
                                            <p>
                                                <span></span> 企业面试官：</p>
                                            <Input v-model='interview5' placeholder="" placeholder="填写企业面试官"></Input>
                                            <Button type="error" shape="circle" size='small' icon="minus-round" @click='delPhones' class='addNewContact'></Button>

                                        </div>

                                        <div class="company-li">
                                            <p>
                                                <span></span> 我司陪面：</p>
                                            <Select v-model='retroactionform.myInterviewer' style="width:300px">
                                                <Option v-for="(user,index) in userlist" :key='index' :value="user.id">{{user.userName}}</Option>
                                            </Select>

                                        </div>
                                        <div class="company-li">
                                            <p>
                                                <span></span> 备注：</p>
                                            <Input v-model='retroactionform.remarks' placeholder="" type="textarea" :rows="2" placeholder="填写面试备注"></Input>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div slot='footer' style='text-align:center'>
                                <Button type='info' @click="savetickling2">确定</Button>
                                <Button type='info' @click="handleReset">取消</Button>
                            </div>
                        </Modal>
                        <Modal v-model="coupleback" title="面试反馈">
                            <div class="company-content">
                                <p class="pone">候选人：{{ this.interviewfalse.candidateName }}</p>
                                <p class="pone">企业名称：{{ this.$route.query.companyName }}</p>
                                <p class="pone">职位名称： {{ this.$route.query.jobName }}</p>
                                <p class="pone">面试次数： {{ numangement }}</p>
                                <p class="pone">面试时间： {{ interviewtime }}</p>
                                <p class="pone">面试地点： {{ interviewposition }}</p>
                                <p class="pone">面试流程： {{ interviewdes }}</p>
                                <p class="pone">企业面试官： {{ interviewcomper }}</p>
                                <p class="pone">我司陪面：{{ interviewmine }}</p>
                                <p class="pone">备注： {{ interremark }}</p>
                                <div v-show="faceshow" class="clearfix">
                                    <div class="company-li">
                                        <p>
                                            <span></span> 企业反馈：</p>
                                        <Input v-model='interviewfalse.companyFeedback	' placeholder="" type="textarea" :rows="2" placeholder="填写企业反馈"></Input>

                                    </div>

                                </div>
                                <div v-show="faceshow" class="clearfix">
                                    <div class="company-li">
                                        <p>
                                            <span></span> 入选反馈：</p>
                                        <Input v-model='interviewfalse.userFeedback' placeholder="" type="textarea" :rows="2" placeholder="填写入选反馈"></Input>

                                    </div>

                                </div>
                                <div class="company-li">
                                    <p>
                                        <span></span> 面试结果：</p>
                                    <Select v-model='interviewfalse.interviewResult' style="width:300px">
                                        <Option v-for="(result,index) in interviewResultlist" :key='index' :value="result.code">{{result.codeText}}</Option>
                                    </Select>

                                </div>
                            </div>
                            <div slot='footer' style='text-align:center'>
                                <Button type='info' @click="confirmed">确定</Button>
                                <Button type='info' @click="handleReset">取消</Button>
                            </div>
                        </Modal>
                        <Modal v-model="modal1" title="新增人才备注">
                            <ul class="company-content">
                                <li class="company-li">
                                    <p>
                                        <span>*</span> 人才姓名：</p>
                                    <Input disabled v-model='addremark.resumeName' placeholder="请输入"></Input>
                                </li>
                                <li class="company-li">
                                    <p>
                                        <span>*</span> 职位：</p>
                                    <Input disabled v-model='addremark.jobName' placeholder="请输入"></Input>
                                </li>
                                <li class="company-li">
                                    <p>
                                        <span></span> 创建人：</p>
                                    <Select style="width:300px" v-model="addremark.createName" placeholder="请选择创建人">
                                        <Option v-for="(item,index) in userlist" :key='index' :value="item.userName">{{item.userName}}</Option>
                                    </Select>
                                </li>
                                <li class="company-li">
                                    <p>
                                        <span>*</span> 记录内容：</p>
                                    <Input v-model='addremark.recordContent' placeholder="请输入" type="textarea" :rows="2"></Input>
                                </li>
                            </ul>
                            <div slot='footer' style='text-align:center'>
                                <Button type='info' @click='subSaveremark'>确定</Button>
                            </div>
                        </Modal>
                        <Modal v-model="undetermined" title="面试待定">
                            <div class="company-content">
                                <p v-for="(internum,index) in internumlist" :key='index' class="pone">面试：{{internum.interviewTime}} |
                                    <template v-if='internum.interviewNum'>
                                        {{ allTrees.interviewNum[ +internum.interviewNum-1 ].codeText }}
                                    </template>
                                    <template v-else>
                                        无
                                    </template>
                                </p>
                                <div class="company-li">
                                    <p>
                                        <span></span> 本次反馈：</p>
                                    <Select v-model='indeterminate.feedbackStatus' style="width:300px">
                                        <Option v-for="(result,index) in interviewResultlist" :key='index' :value="result.code">{{result.codeText}}</Option>
                                    </Select>

                                </div>
                            </div>
                            <div slot='footer' style='text-align:center'>
                                <Button type='info' @click="confirmed">确定</Button>
                                <Button type='info' @click="handleReset">取消</Button>
                            </div>
                        </Modal>
                    </TabPane>
                    <TabPane label="职位日志" name="xiangqing">
                        职位日志
                    </TabPane>
                    <TabPane label="跟进记录" name="rizhi">
                        跟进记录
                    </TabPane>
                    <TabPane label="文件" name="wenjian">
                        文件
                    </TabPane>
                    <TabPane label="团队" name="tuandui">
                        团队
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Menu from "@/components/Menu.vue";
import { UTC2Date } from "@/assets/js/utils.js";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    data() {
        return {
            jodId: this.$route.query.jodId,
            feedback: this.$store.state.allTrees.feedback,
            interviewResultlist: this.$store.state.allTrees.interviewResult,
            modal1: false, //新增备注
            addremark: {
                resumeId: ls.get("resumeid"),
                resumeName: ls.get("resumeName"),
                jobName:
                    this.$route.query.jobName +
                    "-" +
                    this.$route.query.companyName,
                recordContent: "",
                resumeStatus: "2",
                createName: ""
            },
            userlist: [],
            show: true,
            phoneNum: 1,
            addPhoneBtn: true,
            addPhone2: false,
            addPhone3: false,
            addPhone4: false,
            addPhone5: false,
            interview1: "",
            interview2: "",
            interview3: "",
            interview4: "",
            interview5: "",
            retroaction: false,
            arrangement: false, //安排面试按钮
            undetermined: false, //面试待定按钮
            internumlist: [], //面试list
            numangement: "", //第几次面试
            interviewtime: "", //面试时间
            interviewposition: "", //面试地点
            interviewdes: "", //面试流程
            interviewcomper: "", //企业面试官
            interviewmine: "", //我司面试官
            interremark: "", //面试备注
            coupleback: false, //面试反馈按钮
            faceshow: true,
            indeterminate:{
               candidateId:"" ,//
               feedbackStatus:"",
            },
            interviewfalse: {
                //面试反馈参数
                jobId: this.$route.query.jobId,
                jobName: this.$route.query.jobName,
                companyId: this.$route.query.companyid, //企业id
                companyName: this.$route.query.companyName, //公司名字
                candidateId: "", //候选人id
                candidateName: "", //候选人名字
                companyFeedback: "", //企业反馈
                userFeedback: "", //人才反馈
                interviewNum: "", //面试次数
                interviewResult: "" //面试结果
            },
            retroactionform: {
                jobId: this.$route.query.jobId,
                jobName: this.$route.query.jobName,
                candidateId: "", //候选人id
                candidateName: "", //候选人名字
                customerFeedback: "", //客户反馈
                feedbackResult: "1", //反馈结果
                interviewStatus: "1", //面试状态是否安排面试1是2否
                companyId: this.$route.query.companyid, //企业id
                companyName: this.$route.query.companyName, //公司名字
                interviewProcess: "", //面试流程
                interviewAddr: "", //面试地点
                interviewTime: "", //面试时间
                interviewer: "", //企业面试人
                myInterviewer: "", //我司陪面人
                remarks: "" //备zhu
            },
            form: {
                searchVal: "",
                selVal: "候选人名",
                sel1: "",
                sel2: "",
                sel3: "",
                sel4: "",
                sel5: "",
                sel6: "",
                orderBy: "",
                jobId: this.$route.query.jodId,
                createDate: "",
                signDate: "",
                total: 120,
                current: 1,
                pageSize: 20
            },
            ranspond: false,
            transpondform: {
                //转发简历参数
                refereeTo: "",
                id: ls.get("candidateId")
            },

            jodId: this.$route.query.jodId,
            companyName: this.$route.query.companyName,
            companyid: this.$route.query.companyid,
            jobName: this.$route.query.jobName,
            loading: false,
            tableHeader: [
                {
                    title: "姓名",
                    key: "name",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        var row = params.row;
                        return h(
                            "router-link",
                            {
                                attrs: {
                                    to:
                                        "/customer/jobDoing/personalDetails?id=" +
                                        row.resumeId +
                                        "&&resumeName=" +
                                        row.name +
                                        "&&jobName=" +
                                        this.$route.query.jobName +
                                        "&&companyName=" +
                                        this.$route.query.companyName
                                }
                            },
                            row.name
                        );
                    }
                },
                {
                    title: "性别",
                    key: "sex",
                    width: 45,
                    align: "center"
                },
                {
                    title: "目前公司",
                    key: "currentCompanyName",
                    ellipsis: true,
                    width: 140,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("span", row.currentCompanyName || "--");
                    }
                },
                {
                    title: "目前职位",
                    key: "ddd",
                    width: 100,
                    ellipsis: true,
                    align: "center"
                },
                {
                    title: "手机",
                    key: "bbb",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("span", row.mobile || "--");
                    }
                },
                {
                    title: "邮箱",
                    key: "email",
                    sortable: true,
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        return h("span", row.email || "--");
                    }
                },
                {
                    title: "候选人状态",
                    key: "candidateStatus",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;

                        if (
                            this.$store.state.allTrees.candidateStatus.length &&
                            this.$store.state.allTrees.candidateStatus[
                                +row.candidateStatus - 1
                            ]
                        ) {
                            return h(
                                "span",
                                this.$store.state.allTrees.candidateStatus[
                                    +row.candidateStatus - 1
                                ].codeText
                            );
                        }
                    }
                },
                {
                    title: "加入时间",
                    key: "createTime",
                    width: 80,
                    align: "center"
                },
                {
                    title: "更新时间",
                    key: "updateTime",
                    width: 80,
                    align: "center"
                },
                {
                    title: "操作",
                    key: "iii",
                    align: "center",
                    render: (h, params) => {
                        const row = params.row;
                        if (row.status == 1) {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "success", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "推荐反馈!!!" + row.name
                                                );
                                                this.retroaction = true;
                                                this.retroactionform.candidateId =
                                                    row.candidateId;
                                                this.retroactionform.candidateName =
                                                    row.name;
                                                api
                                                    .axs(
                                                        "post",
                                                        "/job/queryById",
                                                        { id: this.jodId }
                                                    )
                                                    .then(({ data }) => {
                                                        if (
                                                            data.code ===
                                                            "SUCCESS"
                                                        ) {
                                                            this.retroactionform.interviewProcess =
                                                                data.data.processDescriber;
                                                            this.$store.state.spinShow = false;
                                                        } else {
                                                            this.$Message.error(
                                                                data.remark
                                                            );
                                                        }
                                                    });
                                            }
                                        }
                                    },
                                    "推荐反馈"
                                ),
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId
                                        }
                                    },
                                    "推荐职位"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "转发简历!!!" + row.name
                                                );
                                                this.ranspond = true;
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                            }
                                        }
                                    },
                                    "转发简历"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                                ls.set(
                                                    "resumeid",
                                                    row.resumeId
                                                );
                                                ls.set("resumeName", row.name);
                                                this.modal1 = true;
                                            }
                                        }
                                    },
                                    "人才备注"
                                )
                            ]);
                        } else if (row.status == 99) {
                            return h("div", [
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "success", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId +
                                                "&&candidateId=" +
                                                row.candidateId +
                                                "&&status=" +
                                                row.status
                                        }
                                    },
                                    "继续推荐"
                                ),
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId
                                        }
                                    },
                                    "推荐职位"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "转发简历!!!" + row.name
                                                );
                                                this.ranspond = true;
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                            }
                                        }
                                    },
                                    "转发简历"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                                ls.set(
                                                    "resumeid",
                                                    row.resumeId
                                                );
                                                ls.set("resumeName", row.name);
                                                this.modal1 = true;
                                            }
                                        }
                                    },
                                    "人才备注"
                                )
                            ]);
                        } else if (row.status == 0) {
                            return h("div", [
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "success", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId +
                                                "&&candidateId=" +
                                                row.candidateId +
                                                "&&status=" +
                                                row.status
                                        }
                                    },
                                    "推荐企业"
                                ),
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId
                                        }
                                    },
                                    "推荐职位"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "转发简历!!!" + row.name
                                                );
                                                this.ranspond = true;
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                            }
                                        }
                                    },
                                    "转发简历"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                                ls.set(
                                                    "resumeid",
                                                    row.resumeId
                                                );
                                                ls.set("resumeName", row.name);
                                                this.modal1 = true;
                                            }
                                        }
                                    },
                                    "人才备注"
                                )
                            ]);
                        } else if (row.status == 2) {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "success", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "安排面试!!!" + row.name
                                                );
                                                this.arrangement = true;
                                                this.retroactionform.candidateId =
                                                    row.candidateId;
                                                this.retroactionform.candidateName =
                                                    row.name;
                                                api
                                                    .axs(
                                                        "post",
                                                        "/interview/queryLastData",
                                                        {
                                                            candidateId:
                                                                row.candidateId,
                                                            jobId: this.jodId,
                                                            companyId: this
                                                                .$route.query
                                                                .companyid
                                                        }
                                                    )
                                                    .then(({ data }) => {
                                                        if (
                                                            data.code ===
                                                            "SUCCESS"
                                                        ) {
                                                            // this.numangement=data.data.interviewNum
                                                            console.log(data);
                                                            if (
                                                                this.$store
                                                                    .state
                                                                    .allTrees
                                                                    .interviewNum
                                                                    .length &&
                                                                this.$store
                                                                    .state
                                                                    .allTrees
                                                                    .interviewNum[
                                                                    +data.data
                                                                        .interviewNum -
                                                                        1
                                                                ]
                                                            ) {
                                                                this.numangement = this.$store.state.allTrees.interviewNum[
                                                                    +data.data
                                                                        .interviewNum -
                                                                        1
                                                                ].codeText;
                                                            }
                                                            console.log(
                                                                this.numangement
                                                            );
                                                        } else {
                                                            this.$Message.error(
                                                                data.remark
                                                            );
                                                        }
                                                    });
                                                api
                                                    .axs(
                                                        "post",
                                                        "/job/queryById",
                                                        { id: this.jodId }
                                                    )
                                                    .then(({ data }) => {
                                                        if (
                                                            data.code ===
                                                            "SUCCESS"
                                                        ) {
                                                            this.retroactionform.interviewProcess =
                                                                data.data.processDescriber;
                                                            this.$store.state.spinShow = false;
                                                        } else {
                                                            this.$Message.error(
                                                                data.remark
                                                            );
                                                        }
                                                    });
                                            }
                                        }
                                    },
                                    "安排面试"
                                ),
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId
                                        }
                                    },
                                    "推荐职位"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "转发简历!!!" + row.name
                                                );
                                                this.ranspond = true;
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                            }
                                        }
                                    },
                                    "转发简历"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                                ls.set(
                                                    "resumeid",
                                                    row.resumeId
                                                );
                                                ls.set("resumeName", row.name);
                                                this.modal1 = true;
                                            }
                                        }
                                    },
                                    "人才备注"
                                )
                            ]);
                        } else if (row.status == 3) {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "success", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "面试反馈!!!" + row.name
                                                );
                                                this.coupleback = true;
                                                //    this.retroactionform.candidateId=row.candidateId

                                                this.interviewfalse.candidateId =
                                                    row.candidateId;
                                                this.interviewfalse.candidateName =
                                                    row.name;
                                                api
                                                    .axs(
                                                        "post",
                                                        "/interview/queryLastData",
                                                        {
                                                            candidateId:
                                                                row.candidateId,
                                                            jobId: this.jodId,
                                                            companyId: this
                                                                .$route.query
                                                                .companyid
                                                        }
                                                    )
                                                    .then(({ data }) => {
                                                        if (
                                                            data.code ===
                                                            "SUCCESS"
                                                        ) {
                                                            // this.numangement=data.data.interviewNum

                                                            if (
                                                                this.$store
                                                                    .state
                                                                    .allTrees
                                                                    .interviewNum
                                                                    .length &&
                                                                this.$store
                                                                    .state
                                                                    .allTrees
                                                                    .interviewNum[
                                                                    +data.data
                                                                        .interviewNum -
                                                                        1
                                                                ]
                                                            ) {
                                                                this.numangement = this.$store.state.allTrees.interviewNum[
                                                                    +data.data
                                                                        .interviewNum -
                                                                        1
                                                                ].codeText;
                                                            }
                                                            this.interviewtime =
                                                                data.data.interviewTime;
                                                            this.interviewposition =
                                                                data.data.interviewAddr;
                                                            this.interviewdes =
                                                                data.data.interviewProcess;
                                                            this.interviewcomper =
                                                                data.data.interviewer;
                                                            this.interviewmine =
                                                                data.data.myInterviewer;
                                                            this.interremark =
                                                                data.data.remarks;
                                                            this.interviewfalse.interviewNum =
                                                                data.data.interviewNum;
                                                            console.log(
                                                                this.numangement
                                                            );
                                                        } else {
                                                            this.$Message.error(
                                                                data.remark
                                                            );
                                                        }
                                                    });
                                            }
                                        }
                                    },
                                    "面试反馈"
                                ),
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId
                                        }
                                    },
                                    "推荐职位"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "转发简历!!!" + row.name
                                                );
                                                this.ranspond = true;
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                            }
                                        }
                                    },
                                    "转发简历"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                                ls.set(
                                                    "resumeid",
                                                    row.resumeId
                                                );
                                                ls.set("resumeName", row.name);
                                                this.modal1 = true;
                                            }
                                        }
                                    },
                                    "人才备注"
                                )
                            ]);
                        } else if (row.status == 4) {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "success", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "面试待定!!!" + row.name
                                                );
                                                this.undetermined = true;
                                                 this.indeterminate.candidateId =
                                                    row.candidateId;
                                                api
                                                    .axs(
                                                        "post",
                                                        "/interview/queryInterviewList",
                                                        {
                                                            candidateId:
                                                                row.candidateId,
                                                            jobId: this.jodId,
                                                            companyId: this
                                                                .$route.query
                                                                .companyid
                                                        }
                                                    )
                                                    .then(({ data }) => {
                                                        if (
                                                            data.code ===
                                                            "SUCCESS"
                                                        ) {
                                                            // this.numangement=data.data.interviewNum
                                                            console.log(data);
                                                            this.internumlist =
                                                                data.data;
                                                        } else {
                                                            this.$Message.error(
                                                                data.remark
                                                            );
                                                        }
                                                    });
                                            }
                                        }
                                    },
                                    "面试待定"
                                ),
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId
                                        }
                                    },
                                    "推荐职位"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "转发简历!!!" + row.name
                                                );
                                                this.ranspond = true;
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                            }
                                        }
                                    },
                                    "转发简历"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                                ls.set(
                                                    "resumeid",
                                                    row.resumeId
                                                );
                                                ls.set("resumeName", row.name);
                                                this.modal1 = true;
                                            }
                                        }
                                    },
                                    "人才备注"
                                )
                            ]);
                        } else if (row.status == 5) {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "success", //primary、ghost、dashed、text、info、success、warning、error
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "拟定offer!!!" + row.name
                                                );
                                               
                                            }
                                        }
                                    },
                                    "拟定offer"
                                ),
                                h(
                                    "router-link",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        attrs: {
                                            to:
                                                "/position/myPositions/recommendreports?srcId=" +
                                                row.srcId +
                                                "&&resumeId=" +
                                                row.resumeId
                                        }
                                    },
                                    "推荐职位"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Message.info(
                                                    "转发简历!!!" + row.name
                                                );
                                                this.ranspond = true;
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                            }
                                        }
                                    },
                                    "转发简历"
                                ),
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "6px"
                                        },
                                        on: {
                                            click: () => {
                                                ls.set(
                                                    "candidateId",
                                                    row.candidateId
                                                );
                                                ls.set(
                                                    "resumeid",
                                                    row.resumeId
                                                );
                                                ls.set("resumeName", row.name);
                                                this.modal1 = true;
                                            }
                                        }
                                    },
                                    "人才备注"
                                )
                            ]);
                        }
                    }
                }
            ],
            tableLists: [
                //职位下的人员列表
            ]
        };
    },
    components: {
        Menu,
        HelloWorld
    },
    computed: {
        allTrees() {
            return this.$store.state.allTrees;
        }
    },
    methods: {
        toLoading() {
            this.loading = true;
        },
        subSaveremark() {
            if (!this.addremark.recordContent) {
                this.$Message.error("请填写记录");
                return;
            }
            api
                .axs("post", "/talnetRemark/save", this.addremark)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.modal1 = false;
                        this.$store.state.spinShow = false;
                        this.$Message.success(data.remark);
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        showwing() {
            if (this.retroactionform.feedbackResult == 2) {
                this.retroactionform.interviewStatus = 2;
                this.faceshow = false;
            } else {
                this.retroactionform.interviewStatus = 1;
                this.faceshow = true;
            }
        },
        loadLists(page) {
            this.$store.state.spinShow = true;
            this.form.pageNum = page;
            api
                .axs("post", "/jobCandidate/myJoinJobs", this.form)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        console.log(data);
                        this.tableLists = data.data.list;
                        this.form.total = data.data.total;
                        this.$Loading.finish();
                        this.$store.state.spinShow = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
            this.form.selVal = "候选人名";
        },
        transmit() {
            api
                .axs("post", "/jobCandidate/redirectJob", this.transpondform)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.ranspond = false;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        addPhones() {
            this.phoneNum += 1;
            if (this.phoneNum > 4) this.addPhoneBtn = false;

            if (this.phoneNum == 2) this.addPhone2 = true;
            if (this.phoneNum == 3) this.addPhone3 = true;
            if (this.phoneNum == 4) this.addPhone4 = true;
            if (this.phoneNum == 5) this.addPhone5 = true;
        },
        delPhones() {
            this.phoneNum -= 1;
            if (this.phoneNum < 5) this.addPhoneBtn = true;
            if (this.phoneNum == 1) {
                this.addPhone2 = false;
                this.interview2 = "";
            } else if (this.phoneNum == 2) {
                this.addPhone3 = false;
                this.interview3 = "";
            } else if (this.phoneNum == 3) {
                this.addPhone4 = false;
                this.interview4 = "";
            } else if (this.phoneNum == 4) {
                this.addPhone5 = false;
                this.interview5 = "";
            }
        },
        seltime(date) {
            this.retroactionform.interviewTime = date;
        },
        confirmed(){//面试待定
            if (!this.indeterminate.feedbackStatus) {
                this.$Message.error("请选择本次反馈结果");
                return;
            } 
             api
                .axs("post", "/jobCandidate/updatenterviewStatus", this.indeterminate)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.undetermined = false;
                        this.loadLists();
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        interresult() {
            //面试反馈
            if (!this.interviewfalse.feedbackStatus) {
                this.$Message.error("请选择面试结果");
                return;
            }
            api
                .axs("post", "/interview/add", this.interviewfalse)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.coupleback = false;
                        this.loadLists();
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        savetickling2() {
            //安排面试
            if (!this.retroactionform.interviewTime) {
                this.$Message.error("请选择面试时间");
                return;
            }
            if (!this.retroactionform.interviewAddr) {
                this.$Message.error("请填写面试地点");
                return;
            }

            if (this.interview1) {
                this.retroactionform.interviewer = this.interview1;
                if (this.interview2) {
                    this.retroactionform.interviewer =
                        this.interview1 + "," + this.interview2;
                }
                if (this.interview3) {
                    this.retroactionform.interviewer =
                        this.interview1 +
                        "," +
                        this.interview2 +
                        "," +
                        this.interview3;
                }
                if (this.interview4) {
                    this.retroactionform.interviewer =
                        this.interview1 +
                        "," +
                        this.interview2 +
                        "," +
                        this.interview3 +
                        "," +
                        this.interview4;
                }
                if (this.interview5) {
                    this.retroactionform.interviewer =
                        this.interview1 +
                        "," +
                        this.interview2 +
                        "," +
                        this.interview3 +
                        "," +
                        this.interview4 +
                        "," +
                        this.interview5;
                }
            }
            api
                .axs("post", "/interview/add", this.retroactionform)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.arrangement = false;
                        this.loadLists();
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        savetickling() {
            if (!this.retroactionform.customerFeedback) {
                this.$Message.error("请填写客户反馈");
                return;
            }
            if (this.interview1) {
                this.retroactionform.interviewer = this.interview1;
                if (this.interview2) {
                    this.retroactionform.interviewer =
                        this.interview1 + "," + this.interview2;
                }
                if (this.interview3) {
                    this.retroactionform.interviewer =
                        this.interview1 +
                        "," +
                        this.interview2 +
                        "," +
                        this.interview3;
                }
                if (this.interview4) {
                    this.retroactionform.interviewer =
                        this.interview1 +
                        "," +
                        this.interview2 +
                        "," +
                        this.interview3 +
                        "," +
                        this.interview4;
                }
                if (this.interview5) {
                    this.retroactionform.interviewer =
                        this.interview1 +
                        "," +
                        this.interview2 +
                        "," +
                        this.interview3 +
                        "," +
                        this.interview4 +
                        "," +
                        this.interview5;
                }
            }
            api
                .axs("post", "/companyCandidate/add", this.retroactionform)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.$Message.success(data.remark);
                        this.retroaction = false;
                        this.loadLists();
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        },
        handleReset() {
            this.retroaction = false;
            this.arrangemen = false;
            this.coupleback = false;
        }
    },
    mounted() {
        this.loadLists();
        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
        api.axs("post", "/user/list").then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.userlist = data.data;
            } else {
                this.$Message.error(data.remark);
            }
        });
    },
    beforeRouteLeave(to, from, next) {
        ls.session("lastRouter", this.$route.fullPath);
        next();
    }
};
</script>

<style lang='less' scoped>
.jobDoingDetails {
    .jodDesc {
        border: 1px solid #eee;
        padding: 10px 15px;
        .name {
            vertical-align: text-top;
            margin-right: 5px;
        }
        h3 {
            font-size: 20px;
            .code,
            .update {
                font-size: 14px;
                color: #666;
                margin-right: 10px;
            }
        }
        .company {
            margin: 4px 0;
            font-size: 14px;
            .tip {
                margin: 0 10px;
            }
        }
        .tags {
            margin: 10px 0 0;
            .ivu-tag {
                height: 28px;
                line-height: 28px;
                padding: 0 15px;
            }
            span {
                padding: 0 5px;
                i {
                    font-size: 18px;
                    margin: 0 5px;
                    padding: 5px;
                }
            }
            a {
                color: #000;
            }
        }
    }
    .tabsTable {
        padding: 5px 10px;
        .searchItem {
            margin-bottom: 10px;
            button {
                margin-right: 10px;
            }
            .ivu-btn-text {
                color: #666 !important;
            }
        }
    }
    .jobtile {
        width: 100%;
        .left-box {
            float: left;
            width: 74%;
            // padding: 0.5rem;
            .detail-left {
                width: 100%;
                border: 1px solid #ddd;
                padding: 0.5rem;
                .resume-header {
                    width: 100%;
                    padding: 0.5rem;
                    background: rgba(245, 245, 245, 1);
                    .re-top {
                        width: 100%;
                        border-bottom: 1px dashed #ddd;
                        overflow: auto;
                        .re-jobname {
                            float: left;
                            .c-name {
                                font-size: 1.25rem;
                                span {
                                    font-size: 0.8rem;
                                    color: #999;
                                    margin-left: 0.3rem;
                                }
                            }
                            .c-money {
                                font-size: 1.25rem;
                                color: #ff3333;
                            }
                        }
                        .re-handle {
                            float: right;
                            .but1 {
                                margin-right: 0.3rem;
                            }
                        }
                    }
                    .re-up {
                        width: 100%;
                        .position {
                            padding: 0.5rem 0;
                            span {
                                font-size: 0.85rem;
                                margin-right: 0.5rem;
                            }
                        }
                        .condition {
                            span {
                                padding: 0 0.4rem;
                                border-right: 1px solid #ddd;
                            }
                        }
                    }
                }
                .describe {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    border-bottom: 1px solid #ddd;
                    .des-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    p {
                        color: #666666;
                    }
                }
                .information {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    border-bottom: 1px solid #ddd;
                    .info-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    .infolist {
                        width: 100%;
                        padding: 0 0.5rem;
                        overflow: auto;
                        li {
                            float: left;
                            width: 50%;
                            margin: 0.4rem 0;
                            color: #666666;
                        }
                    }
                }
                .salary {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    border-bottom: 1px solid #ddd;
                    .sal-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    .salarylist {
                        width: 100%;
                        padding: 0 0.5rem;
                        overflow: auto;
                        li {
                            float: left;
                            width: 50%;
                            margin: 0.4rem 0;
                            color: #666666;
                        }
                    }
                }
                .remarks {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    border-bottom: 1px solid #ddd;
                    .remarks-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    p {
                        color: #666666;
                    }
                }
                .profile {
                    width: 100%;
                    padding: 0.8rem 0.5rem;
                    // border-bottom: 1px solid #ddd;
                    .profile-title {
                        padding: 0 0.3rem;
                        margin: 0.5rem 0;
                        font-size: 0.85rem;
                        border-left: 3px solid #2d8cf0;
                    }
                    p {
                        color: #666666;
                    }
                }
            }
            .work-list {
                width: 100%;
                border: 1px solid #ddd;
                padding: 0.5rem;
                margin-top: 0.5rem;
                .list-title {
                    padding: 0 0.3rem;
                    margin: 0.5rem 0;
                    font-size: 0.85rem;
                    border-left: 3px solid #2d8cf0;
                }
                ul {
                    width: 100%;
                    padding: 0.5rem;
                    li {
                        width: 100%;
                        overflow: auto;
                        border-bottom: 1px solid #ddd;
                        padding: 0.75rem 0.5rem;
                        span {
                            float: left;
                            width: 33%;
                            margin: 0.2rem 0;
                        }
                        .bold {
                            font-weight: 700;
                        }
                        .color1 {
                            color: red;
                        }
                        .color2 {
                            color: #666666;
                        }
                    }
                }
            }
        }
        .detail-right {
            width: 25%;
            float: right;
            .promulgator {
                width: 100%;
                border: 1px solid #ddd;
                padding: 0.5rem;
                .pro-title {
                    padding: 0 0.3rem;
                    margin: 0.5rem 0;
                    font-size: 0.85rem;
                    border-left: 3px solid #2d8cf0;
                }
                .pro-box {
                    border-bottom: 1px dashed #ddd;
                    .gator-images {
                        width: 4rem;
                        height: 4rem;
                        margin: 0 auto;
                        border-radius: 100px;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .gator-name {
                        font-size: 0.85rem;
                        font-weight: 700;
                        width: 100%;
                        text-align: center;
                        margin: 0.5rem 0;
                    }
                    .gator-post {
                        font-size: 0.75rem;
                        color: #999;
                        width: 100%;
                        text-align: center;
                        margin: 0.5rem 0;
                    }
                    .operation {
                        margin: 0.5rem 0;
                        text-align: center;
                        button {
                            margin-left: 0.2rem;
                        }
                    }
                }
                .lv {
                    text-align: center;
                    padding: 0.4rem 0;
                }
            }
            .matching {
                width: 100%;
                border: 1px solid #ddd;
                padding: 0.5rem;
                margin-top: 0.5rem;
                .mat-title {
                    padding: 0 0.3rem;
                    margin: 0.5rem 0;
                    font-size: 0.85rem;
                    border-left: 3px solid #2d8cf0;
                }
                .mat-list {
                    width: 100%;
                    li {
                        width: 100%;
                        padding: 0.5rem;
                        border: 1px solid #ddd;
                        margin-top: 0.5rem;
                        p {
                            font-size: 0.85rem;
                            padding: 0.3rem 0;
                        }
                        .p1 {
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
}
.pone {
    padding-left: 20px;
    margin: 10px 0;
    line-height: 20px;
}
.company-content {
    max-height: 500px;
    overflow: auto;
    padding: 0px 0;
    .company-li {
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
