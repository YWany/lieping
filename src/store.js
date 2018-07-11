import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        spinShow: true,
        selTrees: [],
        roles: [],
        users: []
    },
    mutations: {
        selTrees(state, data) {
            state.selTrees = data
        },
        roles(state, data) {
            state.roles = data
        },
        users(state, data) {
            state.users = data
        },
    },
    actions: {
        async selTrees({ commit }) {
            console.log('你请求了这个接口..')
            const { data } = await api.axs('post', '/param/dic/tree')
            if (data) commit('selTrees', data)
        },
        async getRoles({ commit }) {
            const { data } = await api.axs("post", "/role/info")
            if (data) commit('roles', data.data)
        },
        async getUsers({ commit }) {
            const { data } = await api.axs("post", "/user/queryLikeForPages", { pageSize: 200 })
            if (data) commit('users', data.data.list)
        }
    }
})