<template>
    <div class="seccion-diagnosticos">
        <h3>Diagnosticos médicos</h3>
        <p class="mensaje-error" v-if="datos.length == 0">* {{mensajeError}} *</p>
        <b-table class="tabla-recetas" v-else small :fields="columnasTabla" :items="datos" responsive="sm">
            <template #cell(descripcion)="data">
                {{ data.item.descripcion }}
            </template>

            <template #cell(acciones)="data">
                <b-button
                    class="boton-principal"
                    @click="MostrarArchivo(data.item.url_diagnostico)"
                >
                    Ver
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "DiagnosticoComponente",
    data: () =>  ({
        mensajeError: '',
		columnasTabla: [
            'descripcion',
            'acciones',
        ],
        datos: [
            // { id_receta: '1', descripcion: 'paracetamol', url_diagnostico: 'paracetamol'},
            // { id_receta: '2', descripcion: 'paracetamol2', url_diagnostico: 'paracetamol'},
            // { id_receta: '3', descripcion: 'paracetamol3', url_diagnostico: 'paracetamol'},
            // { id_receta: '4', descripcion: 'paracetamol4', url_diagnostico: 'paracetamol'},
        ]
	}),
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
    beforeMount() {
        this.ObtenerDatos()
    },
    methods: {
        ObtenerDatos()
        {
            axios.post('/api/obtener-diagnosticos-usuario', this.$route.params.dni)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        this.datos = data
                    }
                    else
                    {
                        this.mensajeError = "No tiene diagnosticos registradas."
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        MostrarArchivo(url)
        {
            console.log(url)
        },
    }
}
</script>

<style>
</style>