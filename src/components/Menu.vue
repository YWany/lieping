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
                Navigation Two
            </template>
                    <MenuItem name="2-1">Option 5</MenuItem>
            <MenuItem name="2-2">Option 6</MenuItem>
            <Submenu name="3">
                <template slot="title">Submenu</template>
                <MenuItem name="3-1">Option 7</MenuItem>
                <MenuItem name="3-2">Option 8</MenuItem>
            </Submenu>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                Navigation Three
            </template>
            <MenuItem name="2-11">Option 5</MenuItem>
            <MenuItem name="2-21">Option 6</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                Navigation Two
            </template>
            <MenuItem name="2-1">Option 5</MenuItem>
            <MenuItem name="2-2">Option 6</MenuItem>
            <Submenu name="3">
                <template slot="title">Submenu</template>
                <MenuItem name="3-1">Option 7</MenuItem>
                <MenuItem name="3-2">Option 8</MenuItem>
            </Submenu>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                Navigation Three
            </template>
            <MenuItem name="2-11">Option 5</MenuItem>
            <MenuItem name="2-21">Option 6</MenuItem>
        </Submenu>
    </Menu>
</div>
</template>

<script>
// import { isWeiXin } from '@/utils'
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
    components: {},
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
