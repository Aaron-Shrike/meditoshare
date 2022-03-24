<template>
    <b-overlay
        :show="efectoCargando"
        opacity="1"
    >
        <div class="seccion-perfil">
            <b-container>
                <div class="text-center">
                    <h1 class="mb-5">Perfil del usuario</h1>
                    <h2 class="mb-4">{{datosSolicitante.nombre}} {{datosSolicitante.apellidoPaterno}} {{datosSolicitante.apellidoMaterno}}</h2>
                    <p class="mb-0"><b>DNI:</b> {{datosSolicitante.dni}}</p>
                    <p class="mb-4"><b>Fecha de nacimiento:</b> {{datosSolicitante.formatoFechaNacimiento}}</p>
                </div>
                <b-row>
                    <b-col>
                        <p><b>Departamento:</b> {{datosSolicitante.departamento}}</p>
                        <p><b>Provincia:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{datosSolicitante.provincia}}</p>
                        <p><b>Distrito:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{datosSolicitante.distrito}}</p>
                        <p><b>Dirección:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{datosSolicitante.direccion}}</p>
                    </b-col>
                    <b-col>
                        <p><b>Teléfono:</b> {{datosSolicitante.telefono}}</p>
                        <p><b>Correo:</b> &nbsp;&nbsp; {{datosSolicitante.correo}}</p>
                    </b-col>
                </b-row>
                <b-row v-if="datosSolicitante.nombre != undefined" class="mb-4" cols="1" cols-lg="2">
                    <b-col>
                        <recetas></recetas>
                    </b-col>
                    <b-col>
                        <diagnosticos></diagnosticos>
                    </b-col>
                </b-row>
                <calificaciones v-if="datosSolicitante.nombre != undefined"></calificaciones>
            </b-container>
        </div>
    </b-overlay>
</template>

<script>
import Recetas from '@/modules/sistema/perfil/components/Recetas.vue'
import Diagnosticos from '@/modules/sistema/perfil/components/Diagnosticos.vue'
import Calificaciones from '@/modules/sistema/perfil/components/Calificaciones.vue'

import { mapState } from 'vuex'
import axios from 'axios'

export default {
    data: () =>  ({
        efectoCargando: true,
		datosSolicitante: {}
	}),
    components: {
        Recetas,
        Diagnosticos,
        Calificaciones
    },
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
    beforeMount(){
        this.ObtenerDatosSolicitante()
    },
    methods: {
        ObtenerDatosSolicitante()
        {
            let datos = {
                dniUsuario: this.usuario.dni,
                dniSolicitante: this.$route.params.dni
            }

            axios.post('/api/obtener-perfil-solicitante', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        this.datosSolicitante = data
                        this.efectoCargando = false
                    }
                    else
                    {
                        this.$router.push({ name: "ErrorSistema"})
                    }
                })
                .catch(() => 
                {
                    this.$router.push({ name: "ErrorSistema"})
                })
        }
    }
}
</script>

<style>
</style>