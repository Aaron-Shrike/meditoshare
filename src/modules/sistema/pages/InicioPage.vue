<template>
    <div>
        <b-container>
            <h1>Bienvenido al Sistema</h1>
            <p>{{usuario.nombre}} {{usuario.apellidoPaterno}} {{usuario.apellidoMaterno}} - DNI: {{usuario.dni}}</p>
        </b-container>
        <section class="seccion-anuncios">
            <b-container>
                <h3 class="mb-2">Anuncios recientes</h3>
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
        mensajeError: '',
		lista: [
            {
                codigoAnuncio: '1',
                nombre: 'Clorfenamina',
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

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        this.lista = data
                    }
                    else
                    {
                        this.mensajeError = "No hay anuncios."
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
    
</style>