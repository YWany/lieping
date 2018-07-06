<template>
    <div class="jobDoing">
        <div class='currentNav'>当前位置: 部门管理 
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
                <Select v-model="form.sel2" class='sels-item' placeholder='项目状态' style="width:100px">
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
                <Button type="info" class='fr sels-item' @click="modal1 = true">新增用户</Button>
                <Modal
                    v-model="modal1"
                    title="新增用户"
                    @on-ok="ok"
                   @on-cancel="cancel"
                    >
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="名字" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入用户名字哦"></Input>
        </FormItem>
         <FormItem label="性别" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="1">男</Radio>
                <Radio label="2">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入手机号哦"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
       <FormItem label="登陆账号" prop="account">
            <Input v-model="formValidate.account" placeholder="请输入登陆账号哦"></Input>
        </FormItem>
         <FormItem label="密码" prop="password">
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
         <FormItem label="是否启用">
            <i-switch v-model="formValidate.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">清空表格</Button>
        </FormItem>
    </Form>
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
      rolelist: [],
      deptlist: [],
      formValidate: {
        password: "",
        name: "",
        mail: "",
        roleId: "",
        deptId: "",
        account: "",
        gender: "1",
        switch: true
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
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

        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱", trigger: "blur" }
        ],
        roleId: [{ required: true, message: "未赋予角色", trigger: "change" }],
        deptId: [{ required: true, message: "未赋予部门", trigger: "change" }],
        switch: [{ required: true, trigger: "change" }]
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
        total: 120,
        current: 1,
        pageSize: 20
      },
      tableHeader: [
        {
          title: "用户名称",
          key: "userName",
          width: 140,
          align: "center"
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
          width: 150,
          align: "center"
        },
        {
          title: "邮箱",
          key: "email",
          sortable: true,
          width: 150,
          align: "center"
        },
        {
          title: "登陆账号",
          key: "account",
          width: 100,
          align: "center"
        },
        {
          title: "角色",
          key: "roleId",
          width: 100,
          ellipsis: true,
          align: "center"
        },
        {
          title: "部门",
          key: "deptId",
          width: 100,
          align: "center"
        },
        {
          title: "创建时间",
          key: "updateTime",
          width: 150,
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
                      this.$Message.info("暂缓!!!" + row.name);
                    }
                  }
                },
                "暂缓"
              ),
              h(
                "Button",
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
                      this.$Message.info("终止!!!" + row.name);
                    }
                  }
                },
                "终止"
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
                      this.$Message.info("失效!!!" + row.name);
                    }
                  }
                },
                "失效"
              )
            ]);
          }
        }
      ],
      tableLists: [
        //     {
        //         name: "陈沉沉",
        //         sex: "男",
        //         phone: "15057653697",
        //         email: "15057653697@163.com",
        //         account: "admin",
        //         roleId: "BD负责人",
        //         deptId: "猎头一部",
        //         time: "1970-01-01 08:00:00",
        //     },
        //    {
        //         name: "陈沉沉",
        //         sex: "男",
        //         phone: "15057653697",
        //         email: "15057653697@163.com",
        //         account: "admin",
        //         roleId: "BD负责人",
        //         deptId: "猎头一部",
        //         time: "1970-01-01 08:00:00",
        //     }, {
        //         name: "陈沉沉",
        //         sex: "男",
        //         phone: "15057653697",
        //         email: "15057653697@163.com",
        //         account: "admin",
        //         roleId: "BD负责人",
        //         deptId: "猎头一部",
        //         time: "1970-01-01 08:00:00",
        //     }, {
        //         name: "陈沉沉",
        //         sex: "男",
        //         phone: "15057653697",
        //         email: "15057653697@163.com",
        //         account: "admin",
        //         roleId: "BD负责人",
        //         deptId: "猎头一部",
        //         time: "1970-01-01 08:00:00",
        //     },
      ]
    };
  },
  components: {
    Menu,
    HelloWorld
  },
  methods: {
    Init() {},
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          console.log(this.formValidate);
          api
            .axs("post", "/user/save", {
              account: this.formValidate.account,
              password: this.formValidate.password,
              phone: this.formValidate.phone,
              sex: this.formValidate.gender,
              userName: this.formValidate.name,
              roleId: this.formValidate.roleId,
              deptId: this.formValidate.deptId,
              locked: this.formValidate.switch,
              email: this.formValidate.mail
            })
            .then(({ data: { data, code } }) => {
              if (code === SUCCESS) {
                console.log(data);
                this.datas = data;
              }
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    loadLists(page) {
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
    }
  },

  mounted() {
    api.axs("post", "/role/info", {}).then(({ data: { data, code } }) => {
      this.rolelist = data;
    });
    api.axs("post", "/dept/info", {}).then(({ data: { data, code } }) => {
      // var _this=this;

      this.deptlist = data;
      console.log(this.deptlist);
    });
    api.axs("post", "/user/list", {}).then(({ data: { data, code } }) => {
      console.log(data)
      this.tableLists=data;
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
