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
                    <!-- <b-col class="d-md-flex justify-content-center">
                        <div>
                            <b-button
                                block
                                class="boton boton-principal mt-2"
                                :to="{name: 'Perfil'}"
                            >
                                Guardar cambios
                            </b-button>
                        </div>
                    </b-col> -->
                    
                    <b-col class="d-md-flex justify-content-center">
                        <div>
                            <b-button
                                block
                                class="boton boton-principal mt-2"
                                :to="{name: 'Perfil'}"
                            >
                                Regresar
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

export default {
    data: () =>  ({
	}),
    components: {
        CrearRecetas,
        CrearDiagnosticos,
    },
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
    methods: {
        
    }
}
</script>

<style>
</style>