
export const AutenticacionStore = {
    namespaced: true,
    state: {
        autenticado: true,
        // usuario: {},
        usuario: {
            nombre: 'Aarón',
            apellidoPaterno: 'Rojas',
            apellidoMaterno: 'Vera',
			dni: '12345671',
            fechaNacimiento: '2000-12-23',
            formatoFechaNacimiento: '23/12/2000',

            departamento: 'Lambayeque',
            codigoDepartamento: '1',
            provincia: 'Chiclayo',
            codigoProvincia: '1',
            distrito: 'Chiclayo',
            codigoDistrito: '1',
            direccion: 'Av. Miguel Grau #124',
            telefono: '978488529',

            correo: 'aaronrv138@gmail.com',
        },
    },
    mutations: {
        EditarIniciarSesion(state, payload)
        {
            state.autenticado = true
            state.usuario = payload
        },
        EditarCerrarSesion(state)
        {
            state.autenticado = false
            state.usuario = null
        }
    },
    actions: {
        // ActionIniciarSesion({commit}){
        //     commit("EditarInicioSesion", response.data)
        // },
    },
}