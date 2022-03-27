<template>
    <section class="seccion-solicitudes-anuncio">
        <b-container>
            <h1 class="text-center mb-5">{{$route.params.titulo}} <small>{{$route.params.subtitulo1}}, {{$route.params.subtitulo2}}</small></h1>
            <div class="text-center" v-if="lista.length == 0">
                <p  class="mensaje-error">* {{mensajeError}} *</p>
                <b-button
                    class="boton boton-principal"
                    :to="{name: 'Anuncios'}"
                    exact
                >
                    Mis Anuncios
                </b-button>
            </div>
            <b-row cols="1">
                <b-col class="mb-4" v-for="datos in lista" :key="datos.codigoAnuncio">
                    <solicitud-anuncio :datos="datos"></solicitud-anuncio>
                </b-col>
            </b-row>
        </b-container>
        <div :class="{'ocultar-cargando': noHayPaginas}">
            <div 
                v-infinite-scroll="SiguientePagina" 
                infinite-scroll-disabled="noHayPaginas" 
                infinite-scroll-distance="10"
                infinite-scroll-throttle-delay="400"
            >
                <div class="d-flex justify-content-center mb-3">
                    <b-spinner label="Cargando..."></b-spinner>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SolicitudAnuncio from '@/modules/sistema/anuncios/components/SolicitudAnuncio.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: "SolicitudesUsuario",
    data: () =>  ({
        mensajeError: '',
        noHayPaginas: false,
        pagina: '1',
		lista: [
            // {
            //     codigoAnuncio: '1',
            //     dniSolicitante: '12312312',
            //     nombre: 'aaron',
            //     apellidoPaterno: 'rojas',
            //     apellidoMaterno: 'vera',
            //     fechaSolicitud: '2022-11-10',
            //     formatoFechaSolicitud: '10/11/2022',
            //     codigoEstado: '2',
            //     estado: 'Aprobada',
            // },
            // {
            //     codigoAnuncio: '2',
            //     dniSolicitante: '12312312',
            //     nombre: 'aaron',
            //     apellidoPaterno: 'rojas',
            //     apellidoMaterno: 'vera',
            //     fechaSolicitud: '2022-11-10',
            //     formatoFechaSolicitud: '10/11/2022',
            //     codigoEstado: '1',
            //     estado: 'Pendiente',
            // },
            // {
            //     codigoAnuncio: '3',
            //     dniSolicitante: '12312332',
            //     nombre: 'ver',
            //     apellidoPaterno: 'rojas',
            //     apellidoMaterno: 'vera',
            //     fechaSolicitud: '2022-11-10',
            //     formatoFechaSolicitud: '10/11/2022',
            //     codigoEstado: '3',
            //     estado: 'Rechazada',
            //     motivo: 'malas calificaciones'
            // },
        ],
	}),
    components: {
        SolicitudAnuncio,
    },
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
    mounted(){
        if(this.$route.params.codigo == undefined)
        {
            this.$router.go(-1)
        }
    },
    methods: {
        SiguientePagina() 
        {
            this.ObtenerSolicitudesAnuncio()
        },
        ObtenerSolicitudesAnuncio()
        {
            let datos = {
                codigoAnuncio: this.$route.params.codigo,
            }

            axios.post('/api/obtener-solicitudes-anuncio?pagina='+this.pagina, datos)
                .then((respuesta) => 
                {
                    let dataSolicitudes = respuesta.data.solicitudes
                    let paginaActual = respuesta.data.pagina
                    let totalPaginas = respuesta.data.totalPaginas

                    if(respuesta.status == 200 && dataSolicitudes.length != 0)
                    {
                        this.lista = this.lista.concat(dataSolicitudes)
                        this.pagina++
                        if(paginaActual == totalPaginas)
                        {
                            this.noHayPaginas = true
                        }
                    }
                    else
                    {
                        this.mensajeError = "No tiene solicitudes."
                        this.lista = []
                        this.noHayPaginas = true
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
    }
}
</script>

<style>
    .seccion-solicitudes-anuncio{
        padding: 30px;
    }
</style>