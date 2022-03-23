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
    </section>
</template>

<script>
import Calificacion from '@/modules/sistema/perfil/components/Calificacion.vue'
import axios from 'axios'

export default {
    name: "CalificacionesComponente",
    data: () =>  ({
        mensajeError: '',
        estrellasCompletas: 0,
        estrellasVacias: 0,
        estrellaMedia: false,
        calificacionPromedio: '0',
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
    },
    beforeMount() {
        this.ObtenerDatos()
        this.MostrarEstrellas()
    },
    methods: {
        ObtenerDatos()
        {
            let datos = {
                dniSolicitante: this.$route.params.dni,
            }

            axios.post('/api/obtener-calificaciones-solicitante', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && data.calificaciones.length != 0)
                    {
                        this.lista = data.calificaciones
                        this.calificacionPromedio = data.calificacionPromedio
                        this.MostrarEstrellas()
                    }
                    else
                    {
                        this.mensajeError = "No tiene calificaciones."
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