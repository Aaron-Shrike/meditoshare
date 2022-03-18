import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import { AutenticacionRoutes } from '@/modules/autenticacion/routes.js'
import { SistemaRoutes } from '@/modules/sistema/routes.js'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {name: 'IniciarSesion'}
    },
    ...AutenticacionRoutes,
    ...SistemaRoutes,
    { 
        path: '/:catchAll(.*)', 
        name: 'Error',
        redirect: {name: 'ErrorSistema'},
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiereAutenticacion)) 
    {
        if (store.state.autenticacion.autenticado) 
        {
            next();
        } 
        else 
        {
            next({ name: "IniciarSesion" });
        }
    } else 
    {
        next();
    }
});

export default router
