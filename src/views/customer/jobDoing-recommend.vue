<template>
    <div class="jobDoingRecommend">
        <div class='currentNav'>当前位置: 客户 >
            <router-link to='/customer/jobDoing'>职位进展</router-link> > 
            <router-link :to="'/customer/jobDoing/job?jodId='+jodId">职位运作</router-link> > 
            <router-link :to="'/customer/jobDoing/details?jodId='+jodId">职位详情</router-link> > 
            推荐人选
        </div>
        <div class="steps">
            <ul class="zoom">
                <li>
                    <div class='left' :class="stage1 ? 'active' : ''">
                        01
                    </div>
                    <div class="right">
                        <p class="p1">信息校对</p>
                        <p class="p2">校对简历信息准确性</p>
                    </div>
                </li>
                <li>
                    <div class='left' :class="stage2 ? 'active' : ''">
                        02
                    </div>
                    <div class="right">
                        <p class="p1">推荐报告</p>
                        <p class="p2">填选人选推荐报告</p>
                    </div>
                </li>
                <li>
                    <div class='left' :class="stage3 ? 'active' : ''">
                        03
                    </div>
                    <div class="right">
                        <p class="p1">预览确认</p>
                        <p class="p2">预览人选推荐报告</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="item-tab" v-if='stage1 && !stage2 && !stage3'>
            <div class="search">
                <Input v-model="keyword" @on-enter='searchKey' placeholder="请输入姓名、公司名、职位等关键词搜索简历、空格分离">
                    <Button slot="append" icon="ios-search" @click='searchKey'></Button>
                </Input>
            </div>
            <ul class="reLists">
                <li>
                    <div class="avatar">
                        <img src="@/assets/images/logo.png">
                    </div>
                    <div class="content">
                        <h4>李小龙-某千里马有限公司</h4>
                        <p class="desc">男 | 30 | 杭州 | 本科 | 15年经验 | 财务总监</p>
                    </div>
                    <div class="btn fr">
                        <Button type="primary" @click='steps1'>推荐</Button>
                    </div>
                </li>
                <li>
                    <div class="avatar">
                        <img src="@/assets/images/logo.png">
                    </div>
                    <div class="content">
                        <h4>李小龙-某千里马有限公司</h4>
                        <p class="desc">男 | 30 | 杭州 | 本科 | 15年经验 | 财务总监</p>
                    </div>
                    <div class="btn fr">
                        <Button type="primary">推荐</Button>
                    </div>
                </li>
                <li>
                    <div class="avatar">
                        <img src="@/assets/images/logo.png">
                    </div>
                    <div class="content">
                        <h4>李小龙-某千里马有限公司</h4>
                        <p class="desc">男 | 30 | 杭州 | 本科 | 15年经验 | 财务总监</p>
                    </div>
                    <div class="btn fr">
                        <Button type="primary">推荐</Button>
                    </div>
                </li>
            </ul>
            <div class="tablePage fr">
                <Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
            </div>
        </div>
        <div class="item-tab" v-else-if='stage1 && stage2 && !stage3'>
            <div class="detail-person">
                <div class="updata">
                    最后更新于 2018-06-16 20:12:00
                </div>
                <div class="header-c">
                    <h4>高三吉</h4>
                    <div class="header-name">
                        <span class="education">
                            <Icon type="briefcase"></Icon>本科学历</span>
                        <span class="experience">
                            <Icon type="briefcase"></Icon>12年经验</span>
                        <span class="site">
                            <Icon type="briefcase"></Icon>杭州</span>
                        <span class="university">
                            <Icon type="briefcase"></Icon>浙江教育学院</span>
                        <span class="purpose">
                            <Icon type="briefcase"></Icon>我怼现在工作表满意，考虑跳槽</span>
                    </div>
                    <div class="header-img">
                        <img src="@/assets/images/logo.png" alt="">
                    </div>
                </div>
                <div class="purpose-c">
                    <h4>求职意向</h4>
                    <div class="purpose-name">
                        <span class="education">
                            <Icon type="briefcase"></Icon>杭州</span>
                        <span class="experience">
                            <Icon type="briefcase"></Icon>10k-20k</span>
                    </div>
                </div>
                <div class="experience-c">
                    <h4>工作经历</h4>
                    <ul class="experience-name">
                        <li>
                            <div class="ex-c">
                                <span class="company">杭州千里马科技有限公司</span>
                                <span class="job">UI设计师</span>
                                <span class="money">4000-6000/月</span>
                                <span class="time">2017.6~2018.6</span>
                            </div>
                            <p class="ex-de">
                                圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课

                            </p>
                        </li>
                    </ul>
                </div>
                <div class="project-c">
                    <h4>项目经历</h4>
                    <ul class="project-name">
                        <li>
                            <div class="pr-c">
                                <span class="project">蚂蚁金服</span>
                                <span class="time">2017.6~2018.6</span>
                            </div>
                            <p class="pr-de">
                                圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课

                            </p>
                        </li>

                    </ul>
                </div>
                <div class="education-c">
                    <h4>教育经历</h4>
                    <ul class="education-name">
                        <li>
                            <div class="ed-c">
                                <span class="company">武汉生物工程学院</span>
                                <span class="job">计算机科学与技术</span>
                                <span class="money">本科</span>
                                <span class="time">2017.6~2018.6</span>
                            </div>

                        </li>
                    </ul>
                </div>
                <div class="personal-c">
                    <h4>自我评价</h4>
                    <p class="pe-de">
                        圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课 圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课圣诞节不上课
                    </p>
                </div>
            </div>
            <div class="btns">
                <Button type="info" @click='steps2(-1)'>重新选择</Button>
                <Button type="success" @click='steps2'>下一步</Button>
            </div>
        </div>
        <div class="item-tab item-report" v-else-if='stage1 && stage2 && stage3'>
            <div class="title"><h4>填写推荐报告</h4></div>
            <div class="clearfix">
                <div class="selInp fl">
                    <h5><strong>*</strong>人选意向: </h5>
                    <Select v-model="reForm.yix" style="width:400px">
                        <Option value='对公司感兴趣, 希望进一步沟通'>对公司感兴趣, 希望进一步沟通</Option>
                        <Option value='了解职位信息后，表示可以考虑贵公司'>了解职位信息后，表示可以考虑贵公司</Option>
                    </Select>
                </div>
                <div class="selInp fr">
                    <h5><strong>*</strong>工作状态: </h5>
                    <Select v-model="reForm.status" style="width:400px">
                        <Option value='离职, 急需新机会'>离职, 急需新机会</Option>
                        <Option value='在职, 准备换工作'>在职, 准备换工作</Option>
                        <Option value='在职, 在看机会'>在职, 在看机会</Option>
                    </Select>
                </div>
            </div>
            <div class="selInp">
                <h5><strong>*</strong>人选优势: </h5>
                <Input v-model="reForm.renx" type="textarea" :rows="4" :maxlength='500' placeholder="请填写人选的核心优势" style="width:905px"></Input>
            </div>
            <div class="selInp">
                <h5><strong>*</strong>独立项目: </h5>
                <Input v-model="reForm.renx" type="textarea" :rows="4" :maxlength='500' placeholder="请填写该人选独立负责的项目而不是参与的项目名称，如：xx项目" style="width:905px"></Input>
            </div>
            <div class="selInp">
                <h5>薪资构成: </h5>
                <Input v-model="reForm.renx" type="textarea" :rows="4" :maxlength='500' placeholder="请填写人选目前薪资构成，如：月薪15k+奖金/期权/补贴等（选填）" style="width:905px"></Input>
            </div>
            <div class="btns">
                <Button type="info" @click='steps3(-1)'>上一步</Button>
                <Button type="success" @click='steps3'>推荐人选</Button>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
export default {
    name: "home",
    data() {
        return {
            jodId: this.$route.query.jodId,
            stage1: true,
            stage2: false,
            stage3: false,
            keyword: '',
            formPage: {
                total: 120,
                current: 1,
                pageSize: 20
            },
            reForm: {
                yix: '',
                status: '',
                renx: ''
            }
        };
    },
    methods: {
        searchKey() {
            this.$Message.info('搜索:'+this.keyword)
        },
        loadLists() {},
        steps1() {
            this.stage2 = true
        },
        steps2(tag) {
            if(tag === -1) this.stage2 = false
            else this.stage3 = true
        },
        steps3(tag) {
            if(tag === -1) this.stage3 = false
        }
    },
    mounted() {
        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
    }
};
</script>

<style lang='less' scoped>
.jobDoingRecommend {
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
    .reLists {
        li {
            width: 100%;
            display: flex;
            font-size: 14px;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                box-shadow: 0 0 3px #eee;
                vertical-align: middle;
                margin: 0 15px;
                margin-left: 10px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .content {
                h4 {
                    font-size: 15px;
                    color: #000;
                    padding: 3px 0;
                }
            }
            .btn {
                flex: 2;
                text-align: right;
                button {
                    margin: 10px;
                }
            }
        }
    }
    .detail-person {
        width: 80%;
        overflow: auto;
        border: 1px solid #ddd;
        padding: 0.4rem;
        margin: 0 auto;
        .updata {
            color: #999999;
            text-align: left;
        }
        .header-c {
            padding: 0.8rem 0.5rem;
            border-bottom: 1px solid #ddd;
            overflow: auto;
            h4 {
                width: 75%;
                font-size: 1.2rem;
                text-align: left;
                float: left;
            }
            .header-name {
                width: 75%;
                overflow: auto;
                float: left;
                span {
                    display: block;
                    width: 25%;
                    text-align: left;
                    float: left;
                    margin-top: 0.8rem;
                    i {
                        padding-right: 0.3rem;
                    }
                }
                .purpose {
                    width: 100%;
                }
            }
            .header-img {
                width: 6rem;
                height: 6rem;
                overflow: hidden;
                float: right;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                margin-top: -1.2rem;
                img {
                    width: 100%;
                }
            }
        }
        .purpose-c {
            padding: 0.8rem 0.5rem;
            border-bottom: 1px solid #ddd;
            overflow: auto;
            h4 {
                width: 100%;
                font-size: 1.2rem;
                text-align: left;
                float: left;
            }
            .purpose-name {
                width: 75%;
                overflow: auto;
                float: left;
                span {
                    display: block;
                    width: 25%;
                    text-align: left;
                    float: left;
                    margin-top: 0.8rem;
                    i {
                        padding-right: 0.3rem;
                    }
                }
            }
        }
        .experience-c {
            padding: 0.8rem 0.5rem;
            border-bottom: 1px solid #ddd;
            overflow: auto;
            h4 {
                width: 100%;
                font-size: 1.2rem;
                text-align: left;
                float: left;
            }
            .experience-name {
                width: 100%;
                overflow: auto;
                float: left;
                li {
                    padding: 0.5rem 0;
                    .ex-c {
                        width: 100%;
                        float: left;
                        span {
                            display: block;
                            width: 25%;
                            text-align: left;
                            float: left;
                            margin-top: 0.8rem;
                            font-weight: 700;
                            i {
                                padding-right: 0.3rem;
                            }
                        }
                        .job {
                            text-align: center;
                            border-left: 1px solid #ddd;
                        }
                        .money {
                            text-align: center;
                            border-left: 1px solid #ddd;
                        }
                        .time {
                            text-align: right;
                            color: #999999;
                        }
                    }
                    .ex-de {
                        float: left;
                        text-align: left;
                        padding: 0.5rem 0;
                    }
                }
            }
        }
        .purpose-c {
            padding: 0.8rem 0.5rem;
            border-bottom: 1px solid #ddd;
            overflow: auto;
            h4 {
                width: 100%;
                font-size: 1.2rem;
                text-align: left;
                float: left;
            }
            .purpose-name {
                width: 75%;
                overflow: auto;
                float: left;
                span {
                    display: block;
                    width: 25%;
                    text-align: left;
                    float: left;
                    margin-top: 0.8rem;
                    i {
                        padding-right: 0.3rem;
                    }
                }
            }
        }
        .project-c {
            padding: 0.8rem 0.5rem;
            border-bottom: 1px solid #ddd;
            overflow: auto;
            h4 {
                width: 100%;
                font-size: 1.2rem;
                text-align: left;
                float: left;
            }
            .project-name {
                width: 100%;
                overflow: auto;
                float: left;
                li {
                    padding: 0.5rem 0;
                    .pr-c {
                        width: 100%;
                        float: left;
                        span {
                            display: block;
                            width: 25%;
                            text-align: left;
                            float: left;
                            margin-top: 0.8rem;
                            font-weight: 700;
                            i {
                                padding-right: 0.3rem;
                            }
                        }
                        .time {
                            float: right;
                            text-align: right;
                            color: #999999;
                        }
                    }
                    .pr-de {
                        float: left;
                        text-align: left;
                        padding: 0.5rem 0;
                    }
                }
            }
        }
        .education-c {
            padding: 0.8rem 0.5rem;
            border-bottom: 1px solid #ddd;
            overflow: auto;
            h4 {
                width: 100%;
                font-size: 1.2rem;
                text-align: left;
                float: left;
            }
            .education-name {
                width: 100%;
                overflow: auto;
                float: left;
                li {
                    padding: 0.5rem 0;
                    .ed-c {
                        width: 100%;
                        float: left;
                        span {
                            display: block;
                            width: 25%;
                            text-align: left;
                            float: left;
                            margin-top: 0.8rem;
                            font-weight: 700;
                        }
                    }
                    .ed-de {
                        float: left;
                        text-align: left;
                        padding: 0.5rem 0;
                    }
                }
            }
        }
        .personal-c {
            padding: 0.8rem 0.5rem;
            border-bottom: 1px solid #ddd;
            overflow: auto;
            h4 {
                width: 100%;
                font-size: 1.2rem;
                text-align: left;
                float: left;
            }
            .pe-de {
                margin-top: 0.3rem;
                float: left;
                text-align: left;
                padding: 0.5rem 0;
            }
        }
        .buts {
            width: 15%;
            float: right;
            margin-top: 2.5rem;
            button {
                width: 5rem; // float: left;
                margin-top: 0.3rem;
                .i1 {
                    width: 2rem;
                    float: left;
                }
            }
        }
    }
    .search {
        margin-bottom: 20px;
    }
    .item-tab {
        margin: 15px 0;
    }
    .item-report {
        width: 85%;
        margin: 0 auto;
        padding: 20px;
        font-size: 14px;
        .title {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
            h4 {
                border-left: 4px solid #4ca6fa;
                padding: 0 8px;
            }
        }
        .selInp {
            padding: 10px 0;
            h5 {
                display: inline-block;
                width: 75px;
            }
            strong {
                color: #ff7d7d
            }
        }
    }

    .btns {
        text-align:center;
        margin: 20px 0;
        button {
            margin: 0 20px;
        }
    }
}
</style>
