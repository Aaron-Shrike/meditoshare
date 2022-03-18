<template>
    <b-overlay
        :show="efectoCargando"
        opacity="1"
    >
        <div class="seccion-perfil">
            <b-container>
                <div class="text-center">
                    <h1 class="mb-5">Perfil del usuario</h1>
                    <h2 class="mb-4">{{datosUsuario.nombre}} {{datosUsuario.apellidoPaterno}} {{datosUsuario.apellidoMaterno}}</h2>
                    <p class="mb-0"><b>DNI:</b> {{datosUsuario.dni}}</p>
                    <p class="mb-4"><b>Fecha de nacimiento:</b> {{datosUsuario.formatoFechaNacimiento}}</p>
                </div>
                <b-row>
                    <b-col>
                        <p><b>Departamento:</b> {{datosUsuario.departamento}}</p>
                        <p><b>Provincia:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{datosUsuario.provincia}}</p>
                        <p><b>Distrito:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{datosUsuario.distrito}}</p>
                        <p><b>Dirección:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{datosUsuario.direccion}}</p>
                    </b-col>
                    <b-col>
                        <p><b>Teléfono:</b> {{datosUsuario.telefono}}</p>
                        <p><b>Correo:</b> &nbsp;&nbsp; {{datosUsuario.correo}}</p>
                    </b-col>
                </b-row>
                <b-row class="mb-4" cols="1" cols-lg="2">
                    <b-col>
                        <recetas></recetas>
                    </b-col>
                    <b-col>
                        <diagnosticos></diagnosticos>
                    </b-col>
                </b-row>
                <calificaciones></calificaciones>
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
		datosUsuario: {}
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
        this.ObtenerDatosUsuario(this.$route.params.dni)
    },
    methods: {
        ObtenerDatosUsuario(dni)
        {
            axios.post('/api/obtener-datos-usuario', dni)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        this.datosUsuario = data
                        this.efectoCargando = false
                    }
                    else
                    {
                        // this.$router.push({ name: "InicioSistema"})
                    }
                })
                .catch(() => 
                {
                    // this.$router.push({ name: "InicioSistema"})
                })
        }
    }
}
</script>

<style>
</style>