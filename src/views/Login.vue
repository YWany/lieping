<!--
<style lang="less">
  @import './login.less';
</style>
-->
<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in" title="欢迎登录千里马" :bordered="false">
				<div class="form-con">
					<login-form @on-success-valid="handleSubmit" ref='loginForm'></login-form>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
import api from "@/api"
import ls from 'store2'
import loginForm from "@/components/login-form/login-form.vue"
export default {
    components: {
        loginForm
    },
    methods: {
        handleSubmit({ userName, password }) {
            var datas = {
                account: userName,
                pwd: password,
                captchaCode: 123456
            }
            api.axs("post", "/login", datas)
            .then(({ data }) => {
                if (data.code === 'SUCCESS') {
                    ls.set('account', data.data.account)
                    ls.set('accid', data.data.id)
                    ls.set('phone', data.data.phone)
                    this.$router.push("index")
                    this.$Message.success('登录成功')
                } else {
                    this.$Message.error(data.remark)
                }
            })
        }
    }
};
</script>

<style lang='less' scoped>
.login {
    width: 100%;
    height: 100%;
    background-image: url("https://file.iviewui.com/iview-admin/login_bg.jpg");
    background-size: cover;
    background-position: center;
    position: absolute;
    &-con {
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header {
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con {
            padding: 10px 0 0;
        }
        .login-tip {
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
</style>
