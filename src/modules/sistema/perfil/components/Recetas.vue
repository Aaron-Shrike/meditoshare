<template>
    <div class="seccion-recetas">
        <h3>Recetas médicas</h3>
        <p class="mensaje-error" v-if="datos.length == 0">* {{mensajeError}} *</p>
        <b-table class="tabla-recetas" v-else small :fields="columnasTabla" :items="datos" responsive="sm">
            <template #cell(nombre)="data">
                {{ data.item.nombreReceta }}
            </template>

            <template #cell(acciones)="data">
                <b-button
                    class="boton-principal"
                    @click="MostrarArchivo(data.item.nombreReceta, data.item.urlReceta)"
                >
                    Ver
                </b-button>
            </template>
        </b-table>

        <!-- MOSTRAR RECETA -->
        <b-modal 
            id="modal-lg" 
            size="lg" 
            :title="nombreReceta"
            centered
            v-model="mostrarModalArchivo"
            no-close-on-esc
            hide-footer
        >
            <b-img :src="urlReceta" fluid-grow></b-img>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "RecetasComponente",
    data: () =>  ({
        mensajeError: '',
        mostrarModalArchivo: false,
        nombreReceta: '',
        urlReceta: '',
		columnasTabla: [
            'nombre',
            'acciones',
        ],
        datos: [
            // { nombreReceta: 'paracetamol', urlReceta: 'paracetamol'},
            // { nombreReceta: 'paracetamol2', urlReceta: 'paracetamol'},
            // { nombreReceta: 'paracetamol3', urlReceta: 'paracetamol'},
            // { nombreReceta: 'paracetamol4', urlReceta: 'paracetamol'},
            // { nombreReceta: 'paracetamol4', urlReceta: 'paracetamol'},
            // { nombreReceta: 'paracetamol4', urlReceta: 'paracetamol'},
            // { nombreReceta: 'paracetamol4', urlReceta: 'paracetamol'},
            // { nombreReceta: 'paracetamol4', urlReceta: 'paracetamol'},
            // { nombreReceta: 'paracetamol4', urlReceta: 'paracetamol'},
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

            axios.post('/api/obtener-recetas-solicitante', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && data.length != 0)
                    {
                        this.datos = data
                    }
                    else
                    {
                        this.mensajeError = "No tiene recetas registradas."
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
            this.nombreReceta = nombre
            this.urlReceta = process.env.VUE_APP_API_URL + "/recetas/" + this.$route.params.dni + "/" + url
        },
    }
}
</script>

<style>
    .tabla-recetas .b-table thead{
        display: none;
    }
    .tabla-recetas{
        max-height: 210px;
        overflow-y: auto;
    }
</style>