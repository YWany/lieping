<template>
    <div class="content">
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
                <TabPane label="中文简历" name="name1">
                    <div class="jl-c">
                        <div class="updata">
                          最后更新于 2018-06-16 20:12:00
                        </div>
                        <div class="header-c">
                           <h4>高三吉</h4>
                           <div class="header-name">
                              <span class="education"><Icon type="briefcase"></Icon>本科学历</span>
                              <span class="experience"><Icon type="briefcase"></Icon>12年经验</span>
                              <span class="site"><Icon type="briefcase"></Icon>杭州</span>
                              <span class="university"><Icon type="briefcase"></Icon>浙江教育学院</span>
                              <span class="purpose"><Icon type="briefcase"></Icon>我怼现在工作表满意，考虑跳槽</span>
                           </div>
                           <div class="header-img">
                             <img src="../assets/images/logo.png" alt="">
                           </div>
                        </div>
                        <div class="purpose-c">
                            <h4>求职意向</h4>
                            <div class="purpose-name">
                                <span class="education"><Icon type="briefcase"></Icon>杭州</span>
                                <span class="experience"><Icon type="briefcase"></Icon>10k-20k</span>
                            </div>
                        </div>
                        <div class="experience-c">
                            <h4>工作经历</h4>
                            <ul class="experience-name">
                                <li>
                                    <div class="ex-c">
                                        <span class="education"><Icon type="briefcase"></Icon>杭州</span>
                                        <span class="experience"><Icon type="briefcase"></Icon>10k-20k</span>
                                        <span class="education"><Icon type="briefcase"></Icon>杭州</span>
                                        <span class="experience"><Icon type="briefcase"></Icon>10k-20k</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="推荐报告" name="name2">推荐报告</TabPane>
                <TabPane label="背景核实" name="name3">背景核实</TabPane>
                <TabPane label="其他简历" name="name4">其他简历</TabPane>
            </Tabs>
          </div>
          
      </div>
      <div class="content-right"></div>
    </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api";
import ls from "store2";
import Menu from "@/components/Menu.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    Menu,
    HelloWorld
  },
  methods: {},

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
.content {
  padding: 0.5rem 0.2rem;
  display: flex;
  .content-left {
    width: 75%;
    padding: 0.2rem 0;
    // border: 1px solid #ddd;
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
        width: 80%;
        // border: 1px solid #ddd;

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
              img{
                  width: 100%;
              }
            }
          }
          .purpose-c{
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
          .experience-c{
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
                li{
                  padding: 0.5rem 0;
                }
            }
          }
        }
      }
    }
  }
  .content-right {
    flex: 1;
    padding: 0.2rem 0;
    border: 1px solid #ddd;
    float: right;
    box-sizing: border-box;
  }
}
</style>
