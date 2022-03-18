import Vue from 'vue'
import Vuex from 'vuex'

import { AutenticacionStore } from '@/modules/autenticacion/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        autenticacion: { ...AutenticacionStore }
    }
})
