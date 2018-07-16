<template>
<div class="menu">
	<Menu :theme="theme" accordion :active-name="currentm" :open-names="[subm]" @on-select='clickItem'>
        <MenuItem name="9999">&nbsp;</MenuItem>
        <router-link to='/index'>
            <MenuItem name="/index">
            <Icon type="pie-graph"></Icon>
            工作台
            </MenuItem>
        </router-link>
        <Submenu name="customer">
            <template slot="title">
                <Icon type="person-stalker"></Icon>
                客户
            </template>
            <router-link to='/customer/cooperation'><MenuItem name="/customer/cooperation">合作中客户</MenuItem></router-link>
            <router-link to='/customer/contract'><MenuItem name="/customer/contract">客户合同</MenuItem></router-link>
            <router-link to='/customer/jobDoing'><MenuItem name="/customer/jobDoing">职位进展</MenuItem></router-link>
            <router-link to='/customer/myCustomers'><MenuItem name="/customer/myCustomers">我的客户</MenuItem></router-link>
            <router-link to='/customer/allCustomers'><MenuItem name="/customer/allCustomers">公海池</MenuItem></router-link>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                职位
            </template>
            <MenuItem name="2-1">职位11</MenuItem>
            <MenuItem name="2-2">职位22</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                人才
            </template>
            <MenuItem name="3-1">人才11</MenuItem>
            <MenuItem name="3-2">人才22</MenuItem>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                财务
            </template>
            <MenuItem name="4-1">发票管理</MenuItem>
            <MenuItem name="4-2">付款通知书</MenuItem>
        </Submenu>
        <Submenu name="manager">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                管理
            </template>
            <router-link to='/manager/addacc'><MenuItem name="/manager/addacc">新增账号</MenuItem></router-link>
            <router-link to='/manager/authority'><MenuItem name="/manager/authority">权限管理</MenuItem></router-link>
            <router-link to='/manager/department'><MenuItem name="/manager/department">部门管理</MenuItem></router-link>
        </Submenu>
        <Submenu name="5">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                审核
            </template>
            <MenuItem name="5-1">合同</MenuItem>
            <MenuItem name="5-2">订单</MenuItem>
            <MenuItem name="5-3">发票</MenuItem>
            <MenuItem name="5-4">所有审批</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="social-apple"></Icon>
                报表
            </template>
            <Submenu name="31">
                <template slot="title">订单</template>
                <MenuItem name="31-1">个人报表</MenuItem>
                <MenuItem name="31-2">部门报表</MenuItem>
                <MenuItem name="31-3">所有报表</MenuItem>
            </Submenu>
            <Submenu name="41">
                <template slot="title">合同</template>
                <MenuItem name="41-1">个人报表</MenuItem>
                <MenuItem name="41-2">部门报表</MenuItem>
                <MenuItem name="41-3">所有报表</MenuItem>
            </Submenu>
            <Submenu name="51">
                <template slot="title">项目</template>
                <MenuItem name="51-1">个人报表</MenuItem>
                <MenuItem name="51-2">部门报表</MenuItem>
                <MenuItem name="51-3">所有报表</MenuItem>
            </Submenu>
            <Submenu name="61">
                <template slot="title">推荐人选</template>
                <MenuItem name="61-1">个人报表</MenuItem>
                <MenuItem name="61-2">部门报表</MenuItem>
                <MenuItem name="61-3">所有报表</MenuItem>
            </Submenu>
        </Submenu>
    </Menu>
</div>
</template>

<script>
// import { isWeiXin } from '@/utils'
export default {
  name: "allmenu",
  props: {
    msg: String
  },
  data() {
    return {
      theme: "dark",
      subm: this.$route.path.split("/")[1]
    };
  },
  components: {},
  computed: {
    currentm() {
      var cur = this.$route.path.split("/");
      if (cur.length > 2) {
        return "/" + cur[1] + "/" + cur[2];
      } else {
        return this.$route.path;
      }
    }
  },
  activated() {},
  methods: {
    clickItem() {
        //this.$store.state.spinShow = true
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.menu {
  // background-color: #495060;
  flex: 0 0 200px;
  width: 200px;
  height: 100%;
  overflow-y: auto;
  text-align: left;
  .ivu-menu {
    width: 100% !important;
    height: 100%;
    a {
      color: #495060;
    }
  }
  li {
    font-size: 14px;
    // color: #fff;
  }
}
</style>
