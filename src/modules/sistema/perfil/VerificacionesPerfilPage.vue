<template>
    <b-overlay
        :show="efectoCargando"
        opacity="1"
    >
        <div class="seccion-perfil">
            <b-container>
                <div class="text-center">
                    <h1 class="mb-5">Verificacin del usuario</h1>
                    <h2 class="mb-4">{{usuario.nombre}} {{usuario.apellidoPaterno}} {{usuario.apellidoMaterno}}</h2>
                    <p class="mb-0"><b>DNI:</b> {{usuario.dni}}</p>
                    <p class="mb-4"><b>Fecha de nacimiento:</b> {{usuario.formatoFechaNacimiento}}</p>
                </div>
                <b-row class="mb-4" cols="1" cols-lg="2">
                    <b-col>
                        <crear-recetas></crear-recetas>
                    </b-col>
                    <b-col>
                        <crear-diagnosticos></crear-diagnosticos>
                    </b-col>
                </b-row>
                <b-row align-h="center" align-v="center">
                    <b-col class="d-md-flex justify-content-center">
                        <div>
                            <b-button
                                block
                                class="boton boton-principal mt-2"
                                :to="{name: 'Perfil'}"
                            >
                                Guardar cambios
                            </b-button>
                        </div>
                    </b-col>
                    
                    <b-col class="d-md-flex justify-content-center">
                        <div>
                            <b-button
                                block
                                class="boton boton-principal mt-2"
                                :to="{name: 'Perfil'}"
                            >
                                Cancelar
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </b-overlay>
</template>

<script>
import CrearRecetas from '@/modules/sistema/perfil/components/CrearRecetas.vue'
import CrearDiagnosticos from '@/modules/sistema/perfil/components/CrearDiagnosticos.vue'

import { mapState } from 'vuex'
import axios from 'axios'

export default {
    data: () =>  ({
        efectoCargando: false,
		datosUsuario: {}
	}),
    components: {
        CrearRecetas,
        CrearDiagnosticos,
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