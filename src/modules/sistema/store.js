
export const SistemaStore = {
    namespaced: true,
    state: {
        busqueda: '',
        listaAnuncios: []
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
        // ActionRealizaBusqueda({commit})
        // {
        //     axios.get('/api/obtener-anuncios?pagina=1&busqueda='+state.busqueda)
        //         .then((respuesta) => 
        //         {
        //             let dataAnuncios = respuesta.data.anuncios
        //             let paginaActual = respuesta.data.pagina
        //             let totalPaginas = respuesta.data.totalPaginas

        //             if(respuesta.status == 200 && dataAnuncios.length != 0)
        //             {
        //                 state.listaAnuncios = state.listaAnuncios.concat(dataAnuncios)
        //                 this.pagina++
        //                 if(paginaActual == totalPaginas)
        //                 {
        //                     state.hayDatos = true
        //                 }
        //             }
        //             else
        //             {
        //                 this.mensajeError = "No hay anuncios."
        //                 this.lista = []
        //                 this.hayDatos = true
        //             }
        //         })
        //         .catch(() => 
        //         {
        //             this.mensajeError = "Error al conectar al servidor."
        //         })
        // }
    },
}