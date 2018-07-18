<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
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
        // api.put("post", "/sw/general/getLatestNotice", { name: "lalal", age: 8 })
        // .then(({ data: { data, code } }) => {
        //     if (code === 1001) {
        //         this.datas = data
        //     }
        // })

        // this.$Message.info({
        //     content: 'Tips always here ~ ~',
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
