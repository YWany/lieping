<template>
    <div class='selProAndCity'>
        <Select v-model="proId" @on-change='getCities' :class="proId && cityId || proId && cities.length ? 'selw150':'selw300'">
            <Option value='653'>浙江</Option>
            <Option v-for="pro in provinces" :value="pro.id" :key="pro.id">{{ pro.name }}</Option>
        </Select>
        <Select v-model="cityId" v-if='proId && cityId || proId && cities.length' class='selw150'>
            <Option value='540' v-if='proId==653'>杭州</Option>
            <Option v-for="city in cities" :value="city.id" :key="city.id">{{ city.name }}</Option>
        </Select>
    </div>
</template>

<script>
import api from "@/api";
export default {
    name: "professPop",
    data() {
        return {
            provinces: [],
            cities: [],
            proId: "653",
            cityId: "540"
        };
    },
    props: ["professPop"],
    methods: {
        getProvinces() {
            api.axs("post", "/param/area/provinceList").then(({ data }) => {
                if (data.code === "SUCCESS") {
                    this.provinces = data.data;
                } else {
                    this.$Message.error(data.remark);
                }
            });
        },
        getCities() {
            this.cityId = ''
            api
                .axs("post", "/param/area/childList", { parentId: this.proId })
                .then(({ data }) => {
                    if (data.code === "SUCCESS") {
                        this.cities = data.data;
                    } else {
                        this.$Message.error(data.remark);
                    }
                });
        }
    },
    mounted() {
        this.getProvinces();
    }
};
</script>

<style lang="less">
.selProAndCity {
    display: inline-block;
    .selw300 {
        width: 300px;
    }
    .selw150 {
        width: 150px;
    }
}
</style>
