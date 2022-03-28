<template>
    <section class="seccion-calificaciones">
        <div class="text-center">
            <h3 class="mb-2">Calificaciones</h3>
            <h4 class="mb-4">
                <b-icon v-for="i in estrellasCompletas" :key="i" icon="star-fill" class="mx-1"></b-icon>
                <b-icon v-if="estrellaMedia" icon="star-half" class="my-1"></b-icon>
                <b-icon v-for="i in estrellasVacias" :key="i+5" icon="star" class="mx-1"></b-icon>
            </h4>
        </div>
        <p v-if="lista.length == 0" class="mensaje-error text-center">* {{mensajeError}} *</p>
        <b-row cols="1" cols-md="2" cols-lg="3">
            <b-col class="mb-4" v-for="datos in lista" :key="datos.codigoAnuncio">
                <calificacion :datos="datos"></calificacion>
            </b-col>
        </b-row>

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
import Calificacion from '@/modules/sistema/perfil/components/Calificacion.vue'
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios'

export default {
    name: "CalificacionesComponente",
    data: () =>  ({
        mensajeError: '',
        estrellasCompletas: 0,
        estrellasVacias: 0,
        estrellaMedia: false,
        calificacionPromedio: '0',
        noHayPaginas: false,
        idInfinito: '1',
        pagina: '1',
		lista: [
            // {
            //     dniSolicitante: '12345678',
            //     codigoAnuncio: '1',
            //     puntaje: '1',
            //     comentario: 'muy malo',
            //     nombre: 'Usuario',
            //     apellidoPaterno: '1'
            // },
            // {
            //     dniSolicitante: '12345678',
            //     codigoAnuncio: '2',
            //     puntaje: '1',
            //     comentario: 'muy malo',
            //     nombre: 'Usuario',
            //     apellidoPaterno: '1'
            // },
            // {
            //     dniSolicitante: '12345678',
            //     codigoAnuncio: '3',
            //     puntaje: '1',
            //     comentario: 'muy malo',
            //     nombre: 'Usuario',
            //     apellidoPaterno: '1'
            // },
        ],
	}),
    components: {
        Calificacion,
        InfiniteLoading,
    },
    beforeMount() {
        this.MostrarEstrellas()
    },
    methods: {
        SiguientePagina($state) 
        {
            this.ObtenerDatos($state)
        },
        ObtenerDatos($state)
        {
            let datos = {
                dniSolicitante: this.$route.params.dni,
            }

            axios.post('/api/obtener-calificaciones-solicitante?pagina='+this.pagina, datos)
                .then((respuesta) => 
                {
                    let dataCalificaciones = respuesta.data.solicitudes.calificaciones
                    let paginaActual = respuesta.data.pagina
                    let totalPaginas = respuesta.data.totalPaginas

                    if(respuesta.status == 200 && dataCalificaciones.length != 0)
                    {
                        this.lista = this.lista.concat(dataCalificaciones)
                        this.calificacionPromedio = respuesta.data.solicitudes.puntajePromedio
                        this.pagina++
                        if(paginaActual == totalPaginas)
                        {
                            this.noHayPaginas = true
                            $state.complete();
                        }
                        this.MostrarEstrellas()
                        $state.loaded();
                    }
                    else
                    {
                        $state.complete();
                        this.mensajeError = "No tiene calificaciones."
                        this.lista = []
                        this.noHayPaginas = true
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        MostrarEstrellas()
        {
            let calificacion = parseFloat(this.calificacionPromedio)

            if(calificacion <= 5)
            {
                this.estrellasCompletas = Math.floor(calificacion)
                this.estrellasVacias = 5 - this.estrellasCompletas

                if(Math.round(calificacion) > calificacion)
                {
                    this.estrellaMedia = true
                    this.estrellasVacias -= 1
                }
            }
            else{
                this.estrellasVacias = 5
            }
        }
    }
}
</script>

<style>
</style>