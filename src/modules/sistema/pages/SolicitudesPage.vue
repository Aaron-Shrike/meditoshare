<template>
    <section class="seccion-mis-solicitudes">
        <b-container>
            <h1 class="text-center mb-5">Mis solicitudes</h1>
            <div class="text-center" v-if="lista.length == 0">
                <p  class="mensaje-error">* {{mensajeError}} *</p>
                <b-button
                    class="boton boton-principal"
                    :to="{name: 'InicioSistema'}"
                    exact
                >
                    Solicitar anuncio
                </b-button>
            </div>
            <b-row cols="1">
                <b-col class="mb-4" v-for="datos in lista" :key="datos.codigoAnuncio">
                    <solicitud-usuario :datos="datos"></solicitud-usuario>
                </b-col>
            </b-row>
        </b-container>

        <div :class="{'ocultar-cargando': noHayPaginas}">
            <infinite-loading
                @infinite="SiguientePagina"
                :identifier="idInfinito"
            >
            </infinite-loading>
        </div>
    </section>
</template>

<script>
import SolicitudUsuario from '@/modules/sistema/components/SolicitudUsuario.vue'
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: "SolicitudesUsuario",
    data: () =>  ({
        mensajeError: '',
        noHayPaginas: false,
        pagina: '1',
        idInfinito: '1',
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
                
            //     dniDonante: '12345672',
            //     codigoEstado: '2',
            //     motivo: 'asd'
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

            //     dniDonante: '12345672',
            //     codigoEstado: '3',
            //     motivo: 'Baja calificacion'
            // },
        ],
	}),
    components: {
        SolicitudUsuario,
        InfiniteLoading,
    },
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
    methods: {
        SiguientePagina($state) 
        {
            this.ObtenerDatos($state)
        },
        ObtenerDatos($state)
        {
            let datos = {
                dni: this.usuario.dni
            }
            axios.post('/api/obtener-solicitudes?pagina='+this.pagina, datos)
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
                            $state.complete();
                        }
                        $state.loaded();
                    }
                    else
                    {
                        $state.complete();
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
    .seccion-mis-solicitudes{
        padding: 30px;
    }
</style>