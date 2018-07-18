<template>
    <div class="personalDetails">
        <div class='currentNav'>当前位置:
            <router-link to='/customer/jobDoing'>职位进展</router-link> >
            <router-link :to='lastRouter'>职位运作</router-link> > 候选人详情</div>
        <div class="detailsWrap">
            <div class="content-left">
                <div class="mass">
                    <div class="mass-title">
                        推荐信息
                    </div>
                    <ul class="mass-ul">
                        <li>
                            <span>朗超群</span>
                            <span>2018-06-16推荐</span>
                            <span>浙江某建筑企业财务总监</span>
                            <span>财务总监</span>
                        </li>
                        <li>
                            <span>朗超群</span>
                            <span>2018-06-16推荐</span>
                            <span>浙江某建筑企业财务总监</span>
                            <span>财务总监</span>
                        </li>
                    </ul>
                    <div class="tip">
                        温馨提醒：录用未上岗（或上岗 未过保，或者上岗 已过保 或客户公司在职或客户公司已离职 可推荐）
                    </div>
                </div>
                <div class="detail-c">
                    <Tabs value="name1" class="tab">
                        <TabPane label="人才详情" name="name1">
                            <div class="jl-c">
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
                        </TabPane>
                        <TabPane label="推荐报告" name="name2">推荐报告</TabPane>
                        <TabPane label="背景核实" name="name3">背景核实</TabPane>
                        <TabPane label="其他简历" name="name4">其他简历</TabPane>
                    </Tabs>
                    <div class="buts">
                        <Button type="primary">和他聊聊</Button>
                        <Button type="primary">分组</Button>
                        <Button type="primary">加关注</Button>
                    </div>
                </div>

            </div>
            <div class="content-right">
                <div class="handle">
                    <Button class="bu1" type="text"> 推荐共享职位</Button>
                    <Button class="bu2" type="text">转发简历</Button>
                    <Button class="bu3" type="text">加入职位CallList</Button>
                    <Button class="bu4" type="text">导出推荐报告</Button>
                    <Button class="bu5" type="text">背景核实</Button>
                    <Button class="bu6" type="text">举报简历</Button>
                </div>
                <div class="remark">
                    <div class="re-title">
                        备注记录

                        <Button type="primary" shape="circle" icon="plus" @click="modal1 = true"></Button>
                        <Modal v-model="modal1" title="添加备注信息" @on-ok="ok" @on-cancel="cancel">
                            <p>Content of dialog</p>
                            <p>Content of dialog</p>
                            <p>Content of dialog</p>
                        </Modal>
                    </div>
                    <ul class="re-list">
                        <li>
                            <span>2018-05-01 于新华：</span> 说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话

                        </li>
                        <li>
                            <span>2018-05-01 于新华：</span> 说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话

                        </li>
                        <li>
                            <span>2018-05-01 于新华：</span> 说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话

                        </li>
                        <li>
                            <span>2018-05-01 于新华：</span> 说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话

                        </li>
                        <li>
                            <span>2018-05-01 于新华：</span> 说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话

                        </li>
                    </ul>
                    <Button class="more" type="ghost" long>查看更多</Button>
                </div>

                <div class="tickling">
                    <div class="ti-title">

                        客户反馈记录

                    </div>
                    <ul class="ti-list">
                        <li>
                            <span>杭州明白网络科技有限公司
                                <b>2018-05-01</b>
                            </span>
                            <p>说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话</p>
                            <a>面试反馈</a>
                        </li>
                        <li>
                            <span>杭州明白网络科技有限公司
                                <b>2018-05-01</b>
                            </span>
                            <p>说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话</p>
                            <a>面试反馈</a>
                        </li>
                        <li>
                            <span>杭州明白网络科技有限公司
                                <b>2018-05-01</b>
                            </span>
                            <p>说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话说的话</p>
                            <a>面试反馈</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Menu from "@/components/Menu.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "personalDetails",
    components: {
        Menu,
        HelloWorld
    },
    data() {
        return {
            modal1: false,
            lastRouter: ls.session.get("lastRouter")
        };
    },
    methods: {
        ok() {
            this.$Message.info("Clicked ok");
        },
        cancel() {
            this.$Message.info("Clicked cancel");
        }
    },

    mounted() {
        setTimeout(() => {
            this.$Loading.finish();
            this.$store.state.spinShow = false;
        }, 1500);
    },
    beforeDestroy() {}
};
</script>

<style lang='less' scoped>
.personalDetails {
    .detailsWrap {
        padding: 0 0.2rem 0.5rem;
        display: flex;
    }
    .content-left {
        width: 75%;
        padding: 0.2rem 0; // border: 1px solid #ddd;
        float: left;
        box-sizing: border-box;
        margin-right: 0.5rem;
        .mass {
            width: 100%;
            padding: 0.3rem 0.4rem;
            box-sizing: border-box;
            border: 1px solid #ddd;
            margin-bottom: 0.5rem;
            overflow: auto;
            .mass-title {
                float: left;
                margin-top: 0.5rem;
                font-size: 0.9rem;
            }
            .mass-ul {
                float: left;
                margin-left: 0.9rem;
                li {
                    margin-top: 0.5rem;
                    span {
                        margin-right: 0.8rem;
                    }
                }
            }
            .tip {
                float: left;
                margin-top: 0.5rem;
                color: red;
            }
        }
        .detail-c {
            width: 100%;
            overflow: auto;
            border: 1px solid #ddd;
            padding: 0.4rem;
            .tab {
                width: 80%; // border: 1px solid #ddd;
                float: left;
                .jl-c {
                    width: 100%;
                    border: 1px solid #ddd;
                    padding: 0.8rem 0.5rem;
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
    }
    .content-right {
        flex: 1;
        padding: 0.2rem 0;
        float: right;
        box-sizing: border-box;
        .handle {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd; // overflow: auto;
            button {
                width: 50%;
                height: 4rem; // color: #333333;
                // float: left;
                line-height: 5rem;
                i {
                    float: left;
                }
            }
            .bu1 {
                background: url(../../assets/images/give.png) no-repeat center
                    8px;
                background-size: 18%;
            }
            .bu2 {
                background: url(../../assets/images/share.png) no-repeat center
                    8px;
                background-size: 18%;
            }
            .bu3 {
                background: url(../../assets/images/add.png) no-repeat center
                    8px;
                background-size: 18%;
            }
            .bu4 {
                background: url(../../assets/images/daochu.png) no-repeat center
                    8px;
                background-size: 18%;
            }
            .bu5 {
                background: url(../../assets/images/queren.png) no-repeat center
                    8px;
                background-size: 18%;
            }
            .bu6 {
                background: url(../../assets/images/jubao.png) no-repeat center
                    8px;
                background-size: 18%;
            }
        }
        .remark {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            margin-top: 0.5rem;
            .re-title {
                border-left: 0.3rem solid #2d8cf0;
                text-align: left;
                padding-left: 0.5rem;
                font-size: 0.75rem;
                font-weight: 900;
                height: 1.5rem;
                line-height: 1.5rem;
                button {
                    height: 1.5rem;
                    float: right;
                    font-size: 1rem;
                    cursor: pointer;
                    width: 1.5rem;
                }
            }
            .re-list {
                width: 100%;
                li {
                    width: 100%;
                    padding: 0.3rem;
                    background: #ddd;
                    margin-top: 0.75rem;
                    height: 3rem;
                    line-height: 1.3rem;
                    overflow: hidden;
                    text-overflow: ellipsis; //文本溢出显示省略号
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical; // background-color:cornflowerblue;
                    span {
                        font-weight: 900;
                        text-align: left;
                    }
                }
            }
            .more {
                margin-top: 0.5rem;
            }
        }
        .tickling {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            margin-top: 0.5rem;
            .ti-title {
                border-left: 0.3rem solid #2d8cf0;
                text-align: left;
                padding-left: 0.5rem;
                font-size: 0.75rem;
                font-weight: 900;
                height: 1.5rem;
                line-height: 1.5rem;
                button {
                    height: 1.5rem;
                    float: right;
                    font-size: 1rem;
                    cursor: pointer;
                    width: 1.5rem;
                }
            }
            .ti-list {
                width: 100%;
                li {
                    width: 100%;
                    padding: 0.3rem;
                    border: 1px solid #ddd;
                    margin-top: 0.75rem;
                    span {
                        display: block;
                        width: 100%;
                        font-weight: 900;
                        text-align: left;
                        margin-top: 0.4rem;
                        b {
                            color: #333;
                            float: right;
                        }
                    }
                    p {
                        height: 2.5rem;
                        line-height: 1.3rem;
                        overflow: hidden;
                        text-overflow: ellipsis; //文本溢出显示省略号
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    a {
                        display: block;
                        margin-top: 5px;
                        margin-right: 5px;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>
