import Autenticacion from '@/modules/autenticacion/Autenticacion.vue'
import IniciarSesionPage from '@/modules/autenticacion/pages/IniciarSesionPage.vue'
import CrearCuentaPage from '@/modules/autenticacion/pages/CrearCuentaPage.vue'

export const AutenticacionRoutes = [
    {
        path: '/',
        component: Autenticacion,
        children: [
            { 
                path: 'iniciar-sesion', 
                name: 'IniciarSesion',
                component: IniciarSesionPage
            },
            { 
                path: 'crear-cuenta', 
                name: 'CrearCuenta',
                component: CrearCuentaPage
            },
        ],
    },
]