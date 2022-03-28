<template>
    <div>
        <b-navbar toggleable="md" type="dark" class="barra-navegacion">
            <b-navbar-toggle v-b-toggle.sidebar-backdrop class="icono-menu d-md-none" target="none"></b-navbar-toggle>

            <b-navbar-nav class="contenedor-busqueda mx-auto d-md-none">
                <b-nav-form @submit.prevent="RealizarBusqueda">
                    <b-form-input 
                        v-model="textoBuscar"
                        class="mr-2 input-formulario wrap-nowrap" 
                        placeholder="Buscar"
                    ></b-form-input>
                    <b-button 
                        size="sm" 
                        class="my-2 my-sm-0" 
                        type="submit"
                    >
                        Buscar
                    </b-button>
                </b-nav-form>
            </b-navbar-nav>

            <b-navbar-brand :to="{name: 'InicioSistema'}" class="ml-4">MediToShare</b-navbar-brand>

            <b-collapse class="d-md-none" id="nav-collapse" is-nav>
                <b-navbar-nav class="mx-auto">
                    <!-- <b-nav-form @submit.prevent="RealizarBusqueda" @EventoRealizarBusqueda=""> -->
                    <b-nav-form @click.prevent="RealizarBusqueda">
                        <b-form-input 
                            v-model="textoBuscar"
                            class="mr-2 input-formulario" 
                            placeholder="Buscar"
                        ></b-form-input>
                        <b-button 
                            size="sm" 
                            class="my-2 my-sm-0" 
                            type="submit"
                        >
                            Buscar
                        </b-button>
                    </b-nav-form>
                    <!-- <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    

                    <b-nav-item-dropdown right>
                        <template #button-content>
                            <em>{{usuario.nombre}} {{usuario.apellidoPaterno}} {{usuario.apellidoMaterno}}</em>
                        </template>
                        <b-dropdown-item :to="{name: 'Perfil'}">Mi perfil</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item :to="{name: 'CrearAnuncio'}">Nuevo anuncio</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'Anuncios'}">Mis anuncios</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'Solicitudes'}">Mis solicitudes</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click.prevent="CerrarSesion">Cerrar sesión</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-sidebar
            id="sidebar-backdrop"
            :title="this.usuario.nombre + ' ' + this.usuario.apellidoPaterno + ' ' + this.usuario.apellidoMaterno"
            backdrop-variant="dark"
            backdrop
            shadow
        >
            <div class="py-2">
                <b-list-group flush>
                    <b-list-group-item :to="{name: 'InicioSistema'}">
                        Inicio
                    </b-list-group-item>

                    <b-list-group-item :to="{name: 'Perfil'}">
                        Mi perfil
                    </b-list-group-item>

                    <b-list-group-item :to="{name: 'CrearAnuncio'}">
                        Nuevo anuncio
                    </b-list-group-item>
                    <b-list-group-item :to="{name: 'Anuncios'}">
                        Mis anuncios
                    </b-list-group-item>
                    <b-list-group-item :to="{name: 'Solicitudes'}">
                        Mis solicitudes
                    </b-list-group-item>
                    <!-- <b-list-group-item active>Dapibus ac facilisis in</b-list-group-item> -->
                    <b-list-group-item button @click.prevent="CerrarSesion">
                        Cerrar Sesión
                    </b-list-group-item>
                </b-list-group>
            </div>
        </b-sidebar>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'ModuloSistema',
    data: () =>  ({
		textoBuscar: '',
	}),
    computed:{
        ...mapState('autenticacion', ['usuario']),
        ...mapState('sistema', ['busqueda']),
    },
    methods: {
        ...mapMutations('autenticacion', ['EditarCerrarSesion']),
        ...mapMutations('sistema', ['EditarBusqueda']),
        RealizarBusqueda()
        {
            this.EditarBusqueda(this.textoBuscar)

            if(this.$route.name != 'InicioSistema'){
                this.$router.push({ name: "InicioSistema"})
            }
        },
        CerrarSesion()
        {
            this.EditarCerrarSesion();
            this.$router.push({ name: "IniciarSesion"})
        }
    }
}
</script>
<style>
    .barra-navegacion{
        background-color: var(--color-principal);

    }
    .contenedor-busqueda{
        order: 2;
        margin-top: 8px;
    }
    @media (min-width: 561px) {
        .contenedor-busqueda{
            order: unset;
            margin-top: 0;
        }
    }
    .contenedor-busqueda form.form-inline{
        flex-wrap: nowrap;
    }
    .icono-menu{
        display: block !important;
    }
</style>