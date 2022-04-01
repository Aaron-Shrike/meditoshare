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
        
        <div :class="{'ocultar-cargando': noHayPaginas}">
            <infinite-loading
                @infinite="SiguientePagina"
                :identifier="idInfinito"
            >
                <!-- <div slot="spinner">Loading...</div>
                <div slot="no-more">No more message</div>
                <div slot="no-results">No results message</div> -->
            </infinite-loading>
        </div>
    </div>
</template>
<script>
import AnuncioPublico from '@/modules/sistema/components/AnuncioPublico.vue'
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: "InicioSistema",
    data: () =>  ({
        mensajeError: '',
        formaOrdenar: '1',
        idInfinito: '1',
        noHayPaginas: false,
        pagina: '1',
        arregloFormaOrden: [
            {value: '1', text: 'Más reciente'},
            {value: '2', text: 'Más antiguo'},
            {value: '3', text: 'Requiere receta'},
            {value: '4', text: 'No requiere receta'},
            {value: '5', text: 'Requiere diagnostico'},
            {value: '6', text: 'No requiere diagnostico'},
        ],
		lista: [
            // {
            //     codigoAnuncio: '1',
            //     nombre: 'Clorfenamina2',
            //     descripcion: 'asdasdasdasdasd',
            //     concentracion: '100mg',
            //     presentacion: 'tabletas',
            //     cantidad: '20',
            //     requiereReceta: 1,
            //     requiereDiagnostico: 1,
            //     fechaVencimiento: '2022-11-10',
            //     formatoFechaVencimiento: '10/11/2022',
            //     fechaAnuncio: '2022-03-02',
            //     formatoFechaAnuncio: '02/03/2022',
            //     departamento: 'Lambayeque',
            //     distrito: 'Chiclayo',
            // },
            // {
            //     codigoAnuncio: '2',
            //     nombre: 'Paracetamol',
            //     descripcion: 'asdasdasdasdasd',
            //     concentracion: '50mg',
            //     presentacion: 'tabletas',
            //     cantidad: '10',
            //     requiereReceta: 1,
            //     requiereDiagnostico: 0,
            //     fechaVencimiento: '2022-11-11',
            //     formatoFechaVencimiento: '11/11/2022',
            //     fechaAnuncio: '2022-02-20',
            //     formatoFechaAnuncio: '20/02/2022',
            //     departamento: 'Lambayeque',
            //     distrito: 'Chiclayo',
            // },
        ],
	}),
    components: {
        AnuncioPublico,
        InfiniteLoading,
    },
    computed:{
        ...mapState('autenticacion', ['usuario']),
        ...mapState('sistema', ['busqueda']),
    },
    beforeMount() {
        this.lista = []
    },
    watch: {
        // busqueda: function(newValue, oldValue) {
        busqueda: function() {
            // console.log(newValue, oldValue)
            // if(newValue != oldValue || this.lista.length == 0)
            // {
                this.LimpiarBusquedaAnuncios()
            // }
        }
    },
    methods: {
        SiguientePagina($state) 
        {
            switch(this.formaOrdenar){
                case '1': this.ObtenerDatos($state); break;
                case '2': this.AnunciosFechaAscendente($state); break;
                case '3': this.AnunciosRequiereReceta(1,$state); break;
                case '4': this.AnunciosRequiereReceta(0,$state); break;
                case '5': this.AnunciosRequiereDiagnostico(1,$state); break;
                case '6': this.AnunciosRequiereDiagnostico(0,$state); break;
            }
        },
        ObtenerDatos($state)
        {
            axios.get('/api/obtener-anuncios?pagina='+this.pagina+"&busqueda="+this.busqueda)
                .then((respuesta) => 
                {
                    let dataAnuncios = respuesta.data.anuncios
                    let paginaActual = respuesta.data.pagina
                    let totalPaginas = respuesta.data.totalPaginas

                    if(respuesta.status == 200 && dataAnuncios.length != 0)
                    {
                        this.lista = this.lista.concat(dataAnuncios)
                        this.pagina++
                        if(paginaActual == totalPaginas)
                        {
                            this.noHayPaginas = true
                            $state.complete();
                        }
                        $state.loaded();
                    }
                    else
                    {
                        $state.complete();
                        this.mensajeError = "No hay anuncios."
                        this.lista = []
                        this.noHayPaginas = true
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        LimpiarBusquedaAnuncios()
        {
            this.pagina = '1'
            this.noHayPaginas = false
            this.idInfinito++
            this.lista = []
        },
        OrdenarPor()
        {
            this.LimpiarBusquedaAnuncios()
        },
        AnunciosFechaAscendente($state)
        {
            axios.get('/api/obtener-anuncios-ascendente?pagina='+this.pagina+"&busqueda="+this.busqueda)
                .then((respuesta) => 
                {
                    let dataAnuncios = respuesta.data.anuncios
                    let paginaActual = respuesta.data.pagina
                    let totalPaginas = respuesta.data.totalPaginas

                    if(respuesta.status == 200 && dataAnuncios.length != 0)
                    {
                        this.lista = this.lista.concat(dataAnuncios)
                        this.pagina++
                        if(paginaActual == totalPaginas)
                        {
                            this.noHayPaginas = true
                            $state.complete();
                        }
                        $state.loaded();
                    }
                    else
                    {
                        $state.complete();
                        this.mensajeError = "No hay anuncios."
                        this.lista = []
                        this.noHayPaginas = true
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        AnunciosRequiereReceta(requiere, $state)
        {
            axios.get('/api/obtener-anuncios-requiere-receta/' + requiere + '?pagina='+this.pagina+"&busqueda="+this.busqueda)
                .then((respuesta) => 
                {
                    let dataAnuncios = respuesta.data.anuncios
                    let paginaActual = respuesta.data.pagina
                    let totalPaginas = respuesta.data.totalPaginas

                    if(respuesta.status == 200 && dataAnuncios.length != 0)
                    {
                        this.lista = this.lista.concat(dataAnuncios)
                        this.pagina++
                        if(paginaActual == totalPaginas)
                        {
                            this.noHayPaginas = true
                            $state.complete();
                        }
                        $state.loaded();
                    }
                    else
                    {
                        $state.complete();
                        this.mensajeError = "No hay anuncios."
                        this.lista = []
                        this.noHayPaginas = true
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        AnunciosRequiereDiagnostico(requiere, $state)
        {
            axios.get('/api/obtener-anuncios-requiere-diagnostico/' + requiere + '?pagina='+this.pagina+"&busqueda="+this.busqueda)
                .then((respuesta) => 
                {
                    let dataAnuncios = respuesta.data.anuncios
                    let paginaActual = respuesta.data.pagina
                    let totalPaginas = respuesta.data.totalPaginas

                    if(respuesta.status == 200 && dataAnuncios.length != 0)
                    {
                        this.lista = this.lista.concat(dataAnuncios)
                        this.pagina++
                        if(paginaActual == totalPaginas)
                        {
                            this.noHayPaginas = true
                            $state.complete();
                        }
                        $state.loaded();
                    }
                    else
                    {
                        $state.complete();
                        this.mensajeError = "No hay anuncios."
                        this.lista = []
                        this.noHayPaginas = true
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
    .ocultar-cargando{
        display: none;
    }
</style>