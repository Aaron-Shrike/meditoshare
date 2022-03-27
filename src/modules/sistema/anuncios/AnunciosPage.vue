<template>
    <section class="seccion-mis-anuncios">
        <b-container>
            <h1 class="text-center mb-5">Mis anuncios</h1>
            <div class="text-center" v-if="lista.length == 0">
                <p  class="mensaje-error">* {{mensajeError}} *</p>
                <b-button
                    class="boton boton-principal"
                    :to="{name: 'CrearAnuncio'}"
                    exact
                >
                    Nuevo Anuncio
                </b-button>
            </div>
            <b-row cols="1">
                <b-col class="mb-4" v-for="datos in lista" :key="datos.codigoAnuncio">
                    <anuncio-usuario :datos="datos"></anuncio-usuario>
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
import AnuncioUsuario from '@/modules/sistema/anuncios/components/AnuncioUsuario.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: "AnunciosUsuario",
    data: () =>  ({
        mensajeError: '',
        noHayPaginas: false,
        pagina: '1',
		lista: [
            // {
            //     codigoAnuncio: '1',
            //     nombre: 'Clorfenamina',
            //     descripcion: 'asdasdasdasdasd',
            //     concentracion: '100mg',
            //     presentacion: 'tabletas',
            //     cantidad: '20',
            //     requiereReceta: 1,
            //     requiereDiagnostico: 1,
            //     fechaVencimiento: '2022-11-10',
            //     formatoFechaVencimiento: '10/11/2022',
            //     fechaAnuncio: '2022-03-02',
            //     formatoFechaAnuncio: '02/03/2022',
            //     departamento: 'Lambayeque',
            //     distrito: 'Chiclayo',
            //     solicitudes: '10',
            //     activo: '1',
            // },
            // {
            //     codigoAnuncio: '2',
            //     nombre: 'Paracetamol',
            //     descripcion: 'asdasdasdasdasd',
            //     concentracion: '50mg',
            //     presentacion: 'tabletas',
            //     cantidad: '10',
            //     requiereReceta: 1,
            //     requiereDiagnostico: 0,
            //     fechaVencimiento: '2022-11-11',
            //     formatoFechaVencimiento: '11/11/2022',
            //     fechaAnuncio: '2022-02-20',
            //     formatoFechaAnuncio: '20/02/2022',
            //     departamento: 'Lambayeque',
            //     distrito: 'Chiclayo',
            //     solicitudes: '0',
            //     activo: '0',
            // },
        ],
	}),
    components: {
        AnuncioUsuario,
    },
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
    beforeMount(){
        this.lista = []
    },
    methods: {
        SiguientePagina() 
        {
            this.ObtenerDatos()
        },
        ObtenerDatos()
        {
            let datos = {
                dni: this.usuario.dni
            }
            axios.post('/api/obtener-anuncios-usuario?pagina='+this.pagina, datos)
                .then((respuesta) => 
                {
                    let dataAnuncios = respuesta.data.anuncios
                    let paginaActual = respuesta.data.pagina
                    let totalPaginas = respuesta.data.totalPaginas

                    if(respuesta.status == 200 && dataAnuncios.length != 0)
                    {
                        this.lista = this.lista.concat(dataAnuncios)
                        this.pagina++
                        if(paginaActual == totalPaginas)
                        {
                            this.noHayPaginas = true
                        }
                    }
                    else
                    {
                        this.mensajeError = "No tiene anuncios registrados."
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
    .seccion-mis-anuncios{
        padding: 30px;
    }
</style>