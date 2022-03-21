<template>
    <div class="seccion-diagnosticos">
        <h3>Diagnosticos médicos</h3>
        <p class="mensaje-error" v-if="datos.length == 0">* {{mensajeError}} *</p>
        <b-table class="tabla-recetas" v-else small :fields="columnasTabla" :items="datos" responsive="sm">
            <template #cell(nombre)="data">
                {{ data.item.nombreDiagnostico }}
            </template>

            <template #cell(acciones)="data">
                <b-button
                    class="boton-principal"
                    @click="MostrarArchivo(data.item.nombreDiagnostico, data.item.urlDiagnostico)"
                >
                    Ver
                </b-button>
            </template>
        </b-table>

        <!-- MOSTRAR DIAGNOSTICO -->
        <b-modal 
            id="modal-lg" 
            size="lg" 
            :title="nombreDiagnostico"
            centered
            v-model="mostrarModalArchivo"
            no-close-on-esc
            hide-footer
        >
            <b-img :src="urlDiagnostico" fluid-grow></b-img>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "DiagnosticoComponente",
    data: () =>  ({
        mensajeError: '',
        mostrarModalArchivo: false,
        nombreDiagnostico: '',
        urlDiagnostico: '',
		columnasTabla: [
            'nombre',
            'acciones',
        ],
        datos: [
            // { nombreDiagnostico: 'paracetamol', urlDiagnostico: 'paracetamol'},
            // { nombreDiagnostico: 'paracetamol2', urlDiagnostico: 'paracetamol'},
            // { nombreDiagnostico: 'paracetamol3', urlDiagnostico: 'paracetamol'},
            // { nombreDiagnostico: 'paracetamol4', urlDiagnostico: 'paracetamol'},
        ]
	}),
    beforeMount() {
        this.ObtenerDatos()
    },
    methods: {
        ObtenerDatos()
        {
            let datos = {
                dni: this.$route.params.dni,
            }
            
            axios.post('/api/obtener-diagnosticos-solicitante', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && data.length != 0)
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
        MostrarArchivo(nombre, url)
        {
            this.mostrarModalArchivo = true
            this.nombreDiagnostico = nombre
            this.urlDiagnostico = process.env.VUE_APP_API_URL + "/diagnosticos/" + this.$route.params.dni + "/" + url
        },
    }
}
</script>

<style>
</style>