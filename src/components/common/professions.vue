<template>
    <div class="professPop" style='position:relative;z-index:99999'>
        <Modal v-model='professPop' :closable='false' :mask-closable='false' width='650px' style='z-index:1999'>
            <div slot='header' style='text-align:center;font-size:14px;color:#444'>
                选择行业分类
                <a href="javascript:;" @click="$parent.professPop=false">
                    <Icon type="close" class='fr'></Icon>
                </a>
            </div>
            <ul class="profess-content">
                <li v-for='list in proLists' :key='list.id'>
                    <div class="name">
                        {{list.name}}
                    </div>
                    <div class="sels">
                        <RadioGroup v-model="professVal">
                            <Radio v-for='item in list.children' :label="item.id+'&'+item.name" :key='item.id'>{{item.name}}</Radio>
                        </RadioGroup>
                    </div>
                </li>
            </ul>

            <div slot='footer' style='text-align:center'>
                <Button type='info' @click="$emit('selPro')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import api from "@/api";
export default {
    name: "professPop",
    data() {
        return {
            proLists: [],
            professVal: ''
        };
    },
    props: ["professPop"],
    computed: {
        jobTrees() {
            return this.$store.state.jobTrees
        }
    },
    methods: {
        getProfess() {
            this.proLists = this.jobTrees
            // api.axs("post", "/param/industry/tree").then(({ data }) => {
            //     if (data.code === "SUCCESS") {
            //         this.proLists = data.data;
            //     } else {
            //         this.$Message.error(data.remark);
            //     }
            // });
        }
    },
    mounted() {
        this.getProfess()
    }
};
</script>

<style lang="less">
.profess-content {
    max-height: 360px;
    overflow-y: auto;
    li {
        display: flex;
        border: 1px solid #eee;
        padding: 10px;
        .name {
            flex: 0 0 30%;
            font-weight: bold;
            padding: 5px;
        }
        .sels {
            .ivu-radio-wrapper {
                width: 45%;
                padding: 5px;
            }
        }
    }
}
</style>
