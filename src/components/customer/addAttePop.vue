<template>
    <div class="attePop">
        <Modal v-model="attePop" :closable='false' :mask-closable='false' style='text-align:center'>
            <div slot='header' style='font-size:14px;color:#444'>
                跟进提醒
                <a href="javascript:;" @click='closePop'>
                    <Icon type="close" class='fr'></Icon>
                </a>
            </div>
            <ul class="atte-content">
                <li>
                    <p>
                        <span>*</span> 客户名称：</p>
                    <Input :readonly='true' :value='atteCompanyName'></Input>
                </li>
                <li>
                    <p>
                        <span>*</span> 标题：</p>
                    <Input v-model='atteForm.title' placeholder=""></Input>
                </li>
                <li>
                    <p>
                        <span>*</span> 跟进人：</p>
                    <Select v-model="atteForm.followUserId" placeholder="跟进人" style="width:300px">
                        <Option v-for="(item,index) in userlist" :key='index' :value="item.id">{{item.userName}}</Option>
                    </Select>
                </li>
                <li>
                    <p>
                        <span>*</span> 跟进时间：</p>
                    <DatePicker :value='atteForm.followTime' format="yyyy-MM-dd HH:mm:ss" @on-change='seltime' type="date" placeholder="Select date"></DatePicker>
                </li>
                <li>
                    <p>
                        <span>*</span> 提醒时间：</p>
                    <DatePicker :value='atteForm.remindBefore' format="yyyy-MM-dd HH:mm:ss" @on-change='seltime1' type="date" placeholder="Select date"></DatePicker>
                </li>
                <li>
                    <p>
                        <span>*</span> 提醒：</p>
                    <Input v-model='atteForm.remark' type="textarea" :rows="4" placeholder=""></Input>
                </li>

            </ul>
            <div slot='footer' style='text-align:center'>
                <Button type='info' @click='subSave'>保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api";
import { UTC2Date } from "@/assets/js/utils.js";
export default {
    name: "addAttePop",
    props: ["attePop", "atteCompanyId", "atteCompanyName"],
    components: {},
    data() {
        return {
            subFlag: true,
            userlist: [],
            id: "",
            company: "",
            atteForm: {
                companyId: "",
                title: "",
                followUserId: "",
                followTime: UTC2Date(new Date()),
                remindBefore: UTC2Date(new Date()),
                remark: ""
            },
            atteFormError: {
                companyId: "客户名称",
                title: "标题",
                followUserId: "跟进人",
                followTime: "跟进时间",
                remindBefore: "提醒时间",
                remark: "提醒内容"
            }
        };
    },
    methods: {
        subSave() {
            var forms = this.atteForm;
            this.atteForm.companyId = this.companyId;
            //    date = this.atteForm.followTime.replace("Z", " UTC");
            //    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS Z");
            for (var companyId in forms) {
                if (!forms[companyId]) {
                    this.$Message.error(
                        this.atteFormError[companyId] + ": 请填写完整!"
                    );
                    return;
                }
            }
            if (this.subFlag) this.subFlag = false;
            else return;
            api
                .axs("post", "/followRemind/save", this.atteForm)
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.datas = data;
                        this.$Message.success("新增成功!");
                        this.$parent.attePop = false;
                    } else {
                        this.$Message.error(data.remark);
                        this.subFlag = true;
                    }
                });
        },
        seltime(date) {
            this.atteForm.followTime = date;
        },
        seltime1(date) {
            this.atteForm.followTime = date;
        },
        closePop() {
            this.$parent.attePop = false;
            this.atteForm.companyName = "";
            this.atteForm.title = "";
            this.atteForm.remindUser = "";
            this.atteForm.remark = "";
        },
        reset(key) {
            Object.keys(this[key]).forEach(item => {
                this[key][item] = "";
            });
        }
    },
    mounted() {
        api.axs("post", "/user/list").then(({ data }) => {
            if (data.code === "SUCCESS") {
                this.userlist = data.data;
            } else {
                this.$Message.error(data.remark);
            }
        });
    }
};
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
                color: #ff8686;
            }
        }
        .ivu-input-wrapper {
            width: 300px;
        }
    }
}
</style>
