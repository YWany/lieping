<template>
    <div id="main">
        <nav>
            <div class="logo">
                <img src="@/assets/images/logo.png" alt="">
            </div>
            <h3 class="sys-name">千里马猎头智慧系统</h3>
            <div class="loginp-msg">
                <div class="avatar fl">
                    <img src="@/assets/images/logo.png" alt="">
                </div>
                <Dropdown trigger="click" :transfer="true">
                    <a href="javascript:void(0)">
                        Adminnn
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <a href='javascript:;' @click='logout'>
                            <DropdownItem name='zhuxiao'>注销</DropdownItem>
                        </a>
                        <DropdownItem name='modpsd'>修改密码</DropdownItem>
                        <DropdownItem name='avatar'>上传头像</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </nav>
        <div class="allWrap">
            <Allmenu />
            <div class="content">
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
                <Spin size="large" fix v-if="$store.state.spinShow"></Spin>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api";
import "@/assets/css/reset.css";
import "@/assets/css/index.less";
import Allmenu from "@/components/Menu.vue";
export default {
    data() {
        return {
            theme: "dark" //dark-light
        };
    },
    components: {
        Allmenu
    },
    methods: {
        logout() {
            api.axs("post", "/loginOut").then(({ data }) => {
                if (data.code === "SUCCESS") {
                    window.location.href = "/#/login";
                } else {
                    this.$Message.error(data.remark);
                }
            });
        }
    },
    mounted() {
        //console.log(process.env.NODE_ENV)
    },
    watch: {
        $route() {}
    }
};
</script>

<style lang="less" scoped>
#main {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // color: #2c3e50;
    nav {
        position: fixed;
        top: 0;
        z-index: 901;
        display: flex;
        width: 100%;
        height: 49px;
        line-height: 49px;
        font-size: 14px;
        background-color: #fff; //#495060;
        color: #fff;
        box-shadow: 0 0 10px #ddd;
        .logo {
            height: 34px;
            margin-left: 14px;
            margin-top: 7px;
            display: inline-block;
            vertical-align: middle;
            img {
                height: 100%;
            }
        }
        .sys-name {
            font-size: 14px;
            color: #333;
            line-height: 64px;
            margin-left: 10px;
        }
        .loginp-msg {
            position: absolute;
            right: 14px;
            .avatar {
                width: 36px;
                height: 36px;
                margin-top: 6px;
                margin-right: 10px;
                border-radius: 50%;
                border: 1px solid #ccc;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .ivu-dropdown-rel a {
                font-weight: 500;
                color: #666; //#ff944d;
            }
        }
    }
    .allWrap {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        .content {
            position: relative;
            flex: 2;
            padding: 20px;
            padding-top: 65px;
            overflow-y: auto;
            background-color: #fff;
        }
    }
}
</style>
