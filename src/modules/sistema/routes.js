import Sistema from '@/modules/sistema/Sistema.vue'
import InicioPage from '@/modules/sistema/pages/InicioPage.vue'

import PerfilPage from '@/modules/sistema/perfil/PerfilPage.vue'
import VerificacionesPerfilPage from '@/modules/sistema/perfil/VerificacionesPerfilPage.vue'
import EditarPerfilPage from '@/modules/sistema/perfil/EditarPerfilPage.vue'
import PerfilUsuarioPage from '@/modules/sistema/perfil/PerfilUsuarioPage.vue'

import CrearAnuncioPage from '@/modules/sistema/pages/CrearAnuncioPage.vue'
import SolicitudesPage from '@/modules/sistema/pages/SolicitudesPage.vue'

import AnunciosPage from '@/modules/sistema/anuncios/AnunciosPage.vue'

export const SistemaRoutes = [
    {
        path: '/',
        component: Sistema,
        children: [
            { 
                path: 'inicio', 
                name: 'InicioSistema',
                component: InicioPage
            },
            { 
                path: 'mi-perfil', 
                name: 'Perfil',
                component: PerfilPage
            },
            { 
                path: 'verificaciones', 
                name: 'VerificacionesPerfil',
                component: VerificacionesPerfilPage
            },
            { 
                path: 'editar-perfil', 
                name: 'EditarPerfil',
                component: EditarPerfilPage
            },
            { 
                path: 'perfil/:dni', 
                name: 'PerfilUsuario',
                component: PerfilUsuarioPage
            },
            { 
                path: 'crear-anuncio', 
                name: 'CrearAnuncio',
                component: CrearAnuncioPage
            },
            { 
                path: 'anuncios', 
                name: 'Anuncios',
                component: AnunciosPage
            },
            { 
                path: 'solicitudes', 
                name: 'Solicitudes',
                component: SolicitudesPage
            },
        ],
    },
]