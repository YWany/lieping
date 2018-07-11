import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        spinShow: true,
        selTrees: '12340000'
    },
    mutations: {
        selTrees(state, data) {},
    },
    actions: {
        async selTrees({ commit }) {
            console.log('你请求了这个接口..')
            const { data } = await api.axs('post', '/param/dic/tree')
            if (data) commit('selTrees', data)
        }
    }
})