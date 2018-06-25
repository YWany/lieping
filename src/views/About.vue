<template>
    <div class="about">
        <h1>This is an about pageeeeee</h1>
        <div id="mainChart" style="width: 600px;height:400px;margin:80px auto"></div>
        <div class="pages fr">
            <Page :total="200"></Page>
        </div>
    </div>
</template>

<script>
import Echarts from "echarts";
import Menu from "@/components/Menu.vue";

export default {
    name: "about",
    components: {
        Menu
    },
    mounted() {
        this.$store.state.spinShow = false;

        setTimeout(() => {
            this.$Loading.finish();
        }, 2000);

        var myChart = Echarts.init(
            document.getElementById("mainChart"),
            "light"
        );
        myChart.showLoading();
        setTimeout(() => {
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: "访问统计Test",
                    subtext: "Test11111111",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: "访问来源11",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            { value: 335, name: "直接访问" },
                            { value: 310, name: "邮件营销" },
                            { value: 234, name: "联盟广告" },
                            { value: 135, name: "视频广告" },
                            { value: 800, name: "搜索引擎" }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            };

            myChart.hideLoading()

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option)
        }, 3000)
    }
};
</script>
<style lang='less' scoped>
.about {
    padding-top: 1.5rem;
}
</style>



