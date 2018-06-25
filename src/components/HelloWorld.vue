<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!-- <div v-html='datas.content'></div> -->
        <template>
            <i-button type="primary" @click="info">显示普通提醒</i-button>
        </template>
        <template>
            <i-button @click="success">显示成功提示</i-button>
            <i-button @click="warning">显示警告提示</i-button>
            <i-button @click="error">显示错误提示</i-button>
        </template>
        <Modal title="普通的Modal对话框标题">
            <p>对话框内容</p>
            <p>对话框内容</p>
            <p>对话框内容</p>
        </Modal>
    </div>
    
</template>

<script>
import api from "@/api"
import { isWeiXin } from "@/utils"
import Modal from 'iview/src/components/modal'
export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    components: {
        Modal
    },
    data() {
        return {
            datas: {},
            modal1: true,
            iswx: isWeiXin()
        }
    },
    methods: {
        info() {
            this.$Message.info("这是一条普通的提醒")
        },
        success() {
            this.$Message.success("这是一条成功的提示")
        },
        warning() {
            this.$Message.warning("这是一条警告的提示")
        },
        error() {
            this.$Message.error("对方不想说话，并且向你抛出了一个异常")
        }
    },
    mounted() {
        api
            .axs("post", "getLatestNotice", { name: "lalal", age: 8 })
            .then(({ data: { data, code } }) => {
                if (code === 1001) {
                    this.datas = data
                }
            })

        this.$Message.success("哈哈哈啊哈哈哈")
        
        // this.$Message.info({
        //     content: 'Tips for manual closing',
        //     duration: 5,
        //     closable: true
        // })
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
    text-align: center
}
</style>
