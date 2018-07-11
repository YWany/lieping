<template>
    <div class="jobDoing">
        <div class='currentNav'>当前位置: 用户管理 
        </div>
        <form class="searches">
            <div class="search">
                <Input v-model="form.searchVal" placeholder="请输入要搜索的内容...">
                <Select v-model="form.selVal" slot="prepend" class='search-sels' style="width:80px">
                    <Option value="职位名称">职位名称</Option>
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
                <Select v-model="form.sel2" class='sels-item' placeholder='角色' style="width:100px">
                    <Option value="客户行业1">BD</Option>
                    <Option value="客户行业2">BD负责人</Option>
                </Select>
                <Select v-model="form.sel3" class='sels-item' placeholder='部门' style="width:100px">
                    <Option value="客户来源1">董事长</Option>
                    <Option value="客户来源2">部门一</Option>
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
                <Button type="info" class='fr sels-item' @click="modal1 = true;local=true">新增用户</Button>
                <Modal
                    v-model="modal1"
                    title="新增用户"
                    @click="handleRender"
                    >
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="名字" prop="userName">
            <Input v-model="formValidate.userName" placeholder="请输入用户名字哦"></Input>
        </FormItem>
        
         <FormItem label="性别" prop="sex">
            <Select v-model="formValidate.sex" placeholder="请选择性别">
               
                <Option  value="1">男</Option>
                <Option  value="2">女</Option>
            </Select>
        </FormItem>
        <FormItem label="手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入手机号哦"></Input>
        </FormItem>
       <FormItem label="登陆账号" prop="account">
            <Input v-model="formValidate.account" placeholder="请输入登陆账号哦"></Input>
        </FormItem>
         <FormItem v-if="local" label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="请输入正确的密码"></Input>
        </FormItem> 
       
        <FormItem label="角色" prop="roleId">
            <Select v-model="formValidate.roleId"  placeholder="请给该账号赋予角色">
                <Option v-for="(item,index) in rolelist"  :value="item.id" :key='index'>{{item.roleName}}</Option>
                
            </Select>
        </FormItem>
         <FormItem label="部门" prop="deptId">
            <Select v-model="formValidate.deptId" placeholder="请给该账号赋予部门">
               
                <Option v-for="(item,index) in deptlist" :key='index' :value="item.id">{{item.departmentName}}</Option>
            </Select>
        </FormItem>
        <FormItem label="是否部门领导人" prop="isLeader">
            <Select v-model="formValidate.isLeader" placeholder="请选择是否部门领导人">
               
                <Option  value="1">是</Option>
                <Option  value="2">否</Option>
            </Select>
        </FormItem>
         <FormItem label="是否启用">
            <i-switch v-model="formValidate.locked" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
        </FormItem>
       
    </Form>
    <div slot="footer">
         
           <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空表格</Button>
      
        </div>
                </Modal>
            </div>
        </form>
        <div class="searchTable">
            <Table border ref="selection" :columns="tableHeader" :data="tableLists"></Table>
            <div class="tablePage fr">
                <Page :total='formPage.total' :page-size='formPage.pageSize' show-total @on-change='loadLists'></Page>
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
  name: "home",
  data() {
    return {
      modal1: false,
      local: true,
      id:'',
      pageNum:'1',
      pageSize:'10',
      rolelist: [],
      deptlist: [],
      formValidate: {
        password: "",
        userName: "",
        roleId: "",
        deptId: "",
        account: "",
        sex: "1",
        locked: true,
        isLeader: "2"
      },
      ruleValidate: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        account: [
          { required: true, message: "请输入登陆账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登陆密码.", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "不能少于6个字符",
            trigger: "blur"
          }
        ],

         sex: [
         
        ],
        isLeader: [
          
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        roleId: [{ required: true, message: "未赋予角色", trigger: "change" }],
        deptId: [{ required: true, message: "未赋予部门", trigger: "change" }],
        locked: [{ required: true, trigger: "change" }]
      },
      form: {
        searchVal: "",
        selVal: "职位名称",
        sel1: "",
        sel2: "",
        sel3: "",
        sel4: "",
        sel5: "",
        sel6: "",
        createDate: "",
        signDate: ""
      },
      formPage: {
        total: '',
        current: 1,
        pageSize: 10
      },
      tableHeader: [
        {
          title: "用户名称",
          key: "userName",
          sortable: true,
          ellipsis: true,
          width: 140,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.userName)
            ]);
          }
        },
        {
          title: "性别",
          key: "sex",
          width: 80,
          sortable: true,
          ellipsis: true,
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
          sortable: true,
          ellipsis: true,
          width: 150,
          align: "center"
        },
        {
          title: "登陆账号",
          key: "account",
          sortable: true,
          ellipsis: true,
          width: 150,
          align: "center"
        },
        {
          title: "角色",
          key: "roleName",
          width: 150,
          sortable: true,
          ellipsis: true,
          align: "center"
        },
        {
          title: "部门",
          key: "departmentName",
          sortable: true,
          ellipsis: true,
          width: 150,
          align: "center"
        },
        {
          title: "创建时间",
          key: "updateTime",
          width: 150,
          sortable: true,
          ellipsis: true,
          align: "center"
        },
        {
          title: "操作",
          key: "iii",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info", //primary、ghost、dashed、text、info、success、warning、error
                    size: "small"
                  },
                  style: {
                    marginRight: "6px"
                  },
                  on: {
                    click: () => {
                      this.modal1 = true
                      this.local = false
                      this.id=row.id
                     
                      api
                        .axs("post", "/user/queryLikeForPages", { id: row.id })
                        .then(({ data: { data, code } }) => {
                             console.log(data.list)
                          //   this.tableLists=data.list;
                          this.formValidate = data.list[0];

                          console.log(this.formValidate);
                        });
                      this.handleSubmit(name);
                      this.$Message.info("编辑!!!" + row.userName);
                    }
                  }
                },
                "编辑"
              ),
             
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "6px"
                  },
                  on: {
                    click: () => {
                      this.remove(
                        params.index,
                        params.row.id,
                        params.row.userName
                      );
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableLists: []
    };
  },
  components: {
    Menu,
    HelloWorld
  },
  methods: {
      Init:function (page) {
       var _this=this;

          api
      .axs("post", "/user/queryLikeForPages", {pageNum:page})
      .then(({ data: { data, code } }) => {
        console.log(data.list);
          _this.formPage.total=data.total
          _this.formPage.pageSize=data.pageSize
        // //   _this.formPage.current=data.pages
         _this.tableLists = data.list;
      });
    },
  
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formValidate);

          if(this.local==true){
             
            api
            .axs("post", "/user/save", {
              account: this.formValidate.account,
              password: this.formValidate.password,
              phone: this.formValidate.phone,
              sex: this.formValidate.sex,
              userName: this.formValidate.userName,
              roleId: this.formValidate.roleId,
              deptId: this.formValidate.deptId,
              locked: this.formValidate.locked,
              isLeader: this.formValidate.isLeader
            })
            .then(({ data: { data, code } }) => {
              if (code === "SUCCESS") {
                this.$Message.success("Success!");
                 this.modal1=false;
                this.Init(this.pageNum);
               
              } else if (code === "PHONE_REPEAT") {
                this.$Message.error(" 该手机账号已存在");
              }else if(code ==="ACCOUNT_EXIST"){
                 this.$Message.error(" 该登陆账号已存在");
              }
            });
          }else{
            api
            .axs("post", "/user/update", {
               id: this.id,
              account: this.formValidate.account,
              phone: this.formValidate.phone,
              sex: this.formValidate.sex,
              userName: this.formValidate.userName,
              roleId: this.formValidate.roleId,
              deptId: this.formValidate.deptId,
              locked: this.formValidate.locked,
              isLeader: this.formValidate.isLeader
            })
            .then(({ data: { data, code } }) => {
              if (code === "SUCCESS") {

                this.$Message.success("Success!");
                this.modal1=false;
                this.Init(this.pageNum);
                
              } else if (code === "PHONE_REPEAT") {
                this.$Message.error(" 该手机账号已存在");
              }
            });
          }
         
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    loadLists(page) {
        this.Init(page);
      this.$store.state.spinShow = true;
      this.$Message.info("当前页: " + page);
      setTimeout(() => {
        this.$store.state.spinShow = false;
      }, 1500);
    },
    reset(key) {
      Object.keys(this[key]).forEach(item => {
        this[key][item] = "";
      });
      this.form.selVal = "企业名称";
    },

    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    remove(index, id, name) {
      console.log(id);

      api
        .axs("post", "/user/delete", { id: id })
        .then(({ data: { data, code } }) => {
          if (code === "SUCCESS") {
            this.$Message.info("删除!!!" + name);
            this.tableLists.splice(index, 1);
          } else {
            this.$Message.info("删除!!!" + data.remark);
          }
        });
    }
  },

  mounted() {
      

        this.Init(this.pageNum);
  
  api.axs("post", "/role/info", {}).then(({ data: { data, code } }) => {
      this.rolelist = data;
    });
    api.axs("post", "/dept/info", {}).then(({ data: { data, code } }) => {
      // var _this=this;

      this.deptlist = data;
      console.log(this.deptlist);
    });

  
    setTimeout(() => {
      this.$Loading.finish();
      this.$store.state.spinShow = false;
    }, 1500);
  }
};
</script>

<style lang='less' scoped>
.jobDoing {
  .currentNav {
    .nums {
      display: flex;
      li {
        margin: 0 6px;
        text-shadow: 2px 2px 2px #ddd;
      }
    }
  }
}
</style>
