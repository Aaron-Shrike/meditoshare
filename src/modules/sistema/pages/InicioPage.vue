<template>
    <div class="seccion-inicio-sistema">
        <div class="mb-3">
            <b-container>
                <b-row cols="1" cols-xl="2" align-h="between" align-v="center">
                    <b-col class="mb-2">
                        <h3 class="mb-0" v-if="busqueda != ''">Resultados para "{{busqueda}}"</h3>
                        <h3 class="mb-0" v-else>Realice una busqueda</h3>
                    </b-col>
                    <b-col class="d-flex justify-content-end align-items-center">
                        <p class="mb-0 mr-2 ancho-maximo">Ordenar por:</p>
                        <b-form-select 
                            id="input-21"
                            v-model="formaOrdenar" 
                            :options="arregloFormaOrden"
                            class="input-formulario input-ordenar-por"
                            @change="OrdenarPor"
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>- Seleccionar -</b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <section class="seccion-anuncios">
            <b-container>
                <h4 v-if="busqueda == ''" class="mb-2">Anuncios recientes</h4>
                <p v-if="lista.length == 0" class="mensaje-error text-center">* {{mensajeError}} *</p>
                <b-row cols="1" cols-lg="2">
                    <b-col class="mb-4" v-for="datos in lista" :key="datos.codigoAnuncio">
                        <anuncio-publico :datos="datos"></anuncio-publico>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>
<script>
import AnuncioPublico from '@/modules/sistema/components/AnuncioPublico.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: "InicioSistema",
    data: () =>  ({
        formaOrdenar: null,
        mensajeError: '',
        arregloFormaOrden: [
            {value: '1', text: 'Más reciente'},
            {value: '2', text: 'Más antiguo'},
            {value: '3', text: 'Requiere receta'},
            {value: '4', text: 'No requiere receta'},
            {value: '5', text: 'Requiere diagnostico'},
            {value: '6', text: 'No requiere diagnostico'},
        ],
		lista: [
            {
                codigoAnuncio: '1',
                nombre: 'Clorfenamina2',
                descripcion: 'asdasdasdasdasd',
                concentracion: '100mg',
                presentacion: 'tabletas',
                cantidad: '20',
                requiereReceta: 1,
                requiereDiagnostico: 1,
                fechaVencimiento: '2022-11-10',
                formatoFechaVencimiento: '10/11/2022',
                fechaAnuncio: '2022-03-02',
                formatoFechaAnuncio: '02/03/2022',
                departamento: 'Lambayeque',
                distrito: 'Chiclayo',
            },
            {
                codigoAnuncio: '2',
                nombre: 'Paracetamol',
                descripcion: 'asdasdasdasdasd',
                concentracion: '50mg',
                presentacion: 'tabletas',
                cantidad: '10',
                requiereReceta: 1,
                requiereDiagnostico: 0,
                fechaVencimiento: '2022-11-11',
                formatoFechaVencimiento: '11/11/2022',
                fechaAnuncio: '2022-02-20',
                formatoFechaAnuncio: '20/02/2022',
                departamento: 'Lambayeque',
                distrito: 'Chiclayo',
            },
        ],
	}),
    components: {
        AnuncioPublico,
    },
    computed:{
        ...mapState('autenticacion', ['usuario']),
        ...mapState('sistema', ['busqueda']),
    },
    beforeMount() {
        this.ObtenerDatos()
    },
    methods: {
        ObtenerDatos()
        {
            axios.get('/api/obtener-anuncios')
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && data.length != 0)
                    {
                        this.lista = data
                    }
                    else
                    {
                        this.mensajeError = "No hay anuncios."
                        this.lista = []
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        OrdenarPor()
        {
            console.log(this.formaOrdenar)
            switch(this.formaOrdenar){
                case '1': this.ObtenerDatos(); break;
                case '2': this.AnunciosFechaAscendente(); break;
                case '3': this.AnunciosRequiereReceta(1); break;
                case '4': this.AnunciosRequiereReceta(0); break;
                case '5': this.AnunciosRequiereDiagnostico(1); break;
                case '6': this.AnunciosRequiereDiagnostico(0); break;
                default: this.ObtenerDatos(); break;
            }
        },
        AnunciosFechaAscendente()
        {
            axios.get('/api/obtener-anuncios-ascendente')
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && data.length != 0)
                    {
                        this.lista = data
                    }
                    else
                    {
                        this.mensajeError = "No hay anuncios."
                        this.lista = []
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        AnunciosRequiereReceta(requiere)
        {
            axios.get('/api/obtener-anuncios-requiere-receta/' + requiere)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && data.length != 0)
                    {
                        this.lista = data
                    }
                    else
                    {
                        this.mensajeError = "No hay anuncios."
                        this.lista = []
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        AnunciosRequiereDiagnostico(requiere)
        {
            axios.get('/api/obtener-anuncios-requiere-diagnostico/' + requiere)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && data.length != 0)
                    {
                        this.lista = data
                    }
                    else
                    {
                        this.mensajeError = "No hay anuncios."
                        this.lista = []
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
    .seccion-inicio-sistema{
        padding: 30px;
    }
    .ancho-maximo{
        /* max-width: max-content; */
        white-space: nowrap;
    }
    .input-ordenar-por{
        max-width: 220px;
    }
</style>