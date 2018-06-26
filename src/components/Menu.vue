<template>
<div class="menu">
	<Menu :theme="theme" accordion :active-name=$route.path @on-select='clickItem'>
        <MenuItem name="9999">&nbsp;</MenuItem>
        <router-link to='index'>
            <MenuItem name="/index">
            <Icon type="document-text"></Icon>
            导航菜单1
            </MenuItem>
        </router-link>
        <router-link to='about'>
            <MenuItem name="/about">
            <Icon type="chatbubbles"></Icon>
            导航菜单2
            </MenuItem>
        </router-link>
        <router-link to='about'>
            <MenuItem name="/index1">
            <Icon type="chatbubbles"></Icon>
            导航菜单3
            </MenuItem>
        </router-link>
        <router-link to='about'>
            <MenuItem name="/about2">
            <Icon type="chatbubbles"></Icon>
            导航菜单4
            </MenuItem>
        </router-link>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                财务 <Two></Two>
            </template>
            <MenuItem name="2-1">发票管理</MenuItem>
            <MenuItem name="2-2">付款通知书</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                管理
            </template>
            <MenuItem name="2-11">新增账号</MenuItem>
            <MenuItem name="2-21">权限管理</MenuItem>
            <MenuItem name="2-222">部门管理</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                审核
            </template>
            <MenuItem name="2-1">合同</MenuItem>
            <MenuItem name="2-2">订单</MenuItem>
            <MenuItem name="2-3">发票</MenuItem>
            <MenuItem name="2-4">所有审批</MenuItem>
            <!-- <Submenu name="3">
                <template slot="title">Submenu</template>
                <MenuItem name="3-1">Option 7</MenuItem>
                <MenuItem name="3-2">Option 8</MenuItem>
            </Submenu> -->
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="social-apple"></Icon>
                报表
            </template>
            <!-- <MenuItem name="2-7">Option 5</MenuItem> -->
            <Submenu name="3">
                <template slot="title">订单</template>
                <MenuItem name="3-1">个人报表</MenuItem>
                <MenuItem name="3-2">部门报表</MenuItem>
                <MenuItem name="3-3">所有报表</MenuItem>
            </Submenu>
            <Submenu name="4">
                <template slot="title">合同</template>
                <MenuItem name="4-1">个人报表</MenuItem>
                <MenuItem name="4-2">部门报表</MenuItem>
                <MenuItem name="4-3">所有报表</MenuItem>
            </Submenu>
             <Submenu name="5">
                <template slot="title">项目</template>
                <MenuItem name="5-1">个人报表</MenuItem>
                <MenuItem name="5-2">部门报表</MenuItem>
                <MenuItem name="5-3">所有报表</MenuItem>
            </Submenu>
             <Submenu name="6">
                <template slot="title">推荐人选</template>
                <MenuItem name="6-1">个人报表</MenuItem>
                <MenuItem name="6-2">部门报表</MenuItem>
                <MenuItem name="6-3">所有报表</MenuItem>
            </Submenu>
        </Submenu>
    </Menu>
</div>
</template>

<script>
// import { isWeiXin } from '@/utils'
import { iview } from "iview"
export default {
    name: 'allmenu',
    props: {
        msg: String
    },
    data() {
        return {
            theme: "dark"
        }
    },
    components: {
        iview
    },
    activated() {},
    methods: {
        clickItem() {
            this.$store.state.spinShow = true
        }
    },
    mounted() {}
}
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
            color:#495060;
        }
    }
    li {
        font-size: 14px;
        // color: #fff;
    }
}
</style>
