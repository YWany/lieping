<template>
    <div class="customer">
        <h1>新增账号.....</h1>
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
            <Select v-model="formValidate.roleId" placeholder="请给该账号赋予角色">
                <Option value="1">New York</Option>
                <Option value="2">London</Option>
                <Option value="3">Sydney</Option>
                <Option value="4">BD</Option>
            </Select>
        </FormItem>
         <FormItem label="部门" prop="deptId">
            <Select v-model="formValidate.deptId" placeholder="请给该账号赋予部门">
               
                <Option value="1">一部</Option>
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
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
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
  data() {
    // const validatePhone = (rule, value, callback) => {
    //     if (value === '') {
    //         callback(new Error('Please enter your password again'));
    //     } else if (value !== this.ruleValidate.phone) {
    //         callback(new Error('The two input passwords do not match!'));
    //     } else {
    //         callback();
    //     }
    // };
    return {
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
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
          console.log(this.formValidate);
          api
            .axs("post", "user/save", {
              account: this.formValidate.account,
              password: this.formValidate.password,
              phone: this.formValidate.phone,
               sex: this.formValidate.gender,
              userName: this.formValidate.name,
              roleId: this.formValidate.roleId,
               deptId: this.formValidate.deptId,
              locked: this.formValidate.switch,
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
form {
  width: 50%;
}
</style>
