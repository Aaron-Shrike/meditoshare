
export const SistemaStore = {
    namespaced: true,
    state: {
        busqueda: '',
    },
    mutations: {
        EditarBusqueda(state, payload)
        {
            state.busqueda = payload
        },
        EditarLimpiarBusqueda(state)
        {
            state.busqueda = ''
        }
    },
    actions: {
        // ActionIniciarSesion({commit}){
        //     commit("EditarInicioSesion", response.data)
        // },
    },
}