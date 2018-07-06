<template>
    <div class="attePop">
        <Modal v-model="attePop" :closable='false' :mask-closable='false' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                跟进提醒
                <a href="javascript:;" @click='$parent.attePop=false'><Icon type="close" class='fr'></Icon></a>
            </div>
            <ul class="atte-content">
                <li>
                    <p><span>*</span> 客户名称：</p>
                    <Input placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 标题：</p>
                    <Input placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 跟进人：</p>
                    <Input placeholder=""></Input>
                </li>
                <li>
                    <p><span>*</span> 跟进时间：</p>
                    <DatePicker type="date" placeholder="Select date"></DatePicker>
                </li>
                
                <li>
                    <p><span>*</span> 提醒：</p>
                    <Input type="textarea" :rows="4" placeholder=""></Input>
                </li>
            </ul>
            <div slot='footer' style='text-align:center'><Button type='info'>保存</Button></div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api"
export default {
    name: "addAttePop",
    props: ['attePop'],
    components: {},
    data() {
        return {}
    },
    methods: {
        info() {
            this.$Message.info("这是一条普通的提醒")
        }
    },
    mounted() {
        
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"> 
.atte-content {
    li {
        margin-bottom: 10px;
        p {
            display: inline-block;
            width: 80px;
            line-height: 32px;
            text-align: right;
            color: #444;
            margin-right: 10px;
            span {
                color: #ff8686
            }
        }
        .ivu-input-wrapper {
            width: 300px;
        }
    }
}
</style>
