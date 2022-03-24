<template>
    <b-card
        no-body
        class="card-formulario"
    >
        <b-card-body>
            <b-card-title>{{datos.nombre}} <small>{{datos.presentacion}}, {{datos.concentracion}}</small></b-card-title>
            
            <b-card-text>
                <b-row cols="1" cols-sm="2" cols-lg="4">
                    <b-col v-if="datos.descripcion != null && datos.descripcion != ''">
                        <p class="mb-1 mb-lg-0">Descripción: {{datos.descripcion}}</p>
                    </b-col>
                    <b-col>
                        <p class="mb-0">
                            <b-icon icon="calendar2-event"></b-icon> Vence: {{datos.formatoFechaVencimiento}}
                        </p>
                        <p class="mb-1 mb-lg-0">
                            <b-icon icon="box-seam"></b-icon> {{datos.cantidad}} {{datos.presentacion}}
                        </p>
                    </b-col>
                    <b-col>
                        <p class="mb-0" v-if="datos.requiereReceta == 1">
                            <b-icon icon="check-square"></b-icon> Requiere receta
                        </p>
                        <p class="mb-0" v-else>
                            <b-icon icon="x-square"></b-icon> No requiere receta
                        </p>
                        <p class="mb-0" v-if="datos.requiereDiagnostico == 1">
                            <b-icon icon="check-square"></b-icon> Requiere diagnostico
                        </p>
                        <p class="mb-0" v-else>
                            <b-icon icon="x-square"></b-icon> No requiere diagnostico
                        </p>
                    </b-col>
                    <b-col>
                        <p class="mb-0 mt-1 mt-lg-0">
                            <b-icon icon="calendar-check"></b-icon> Publicado: {{datos.formatoFechaAnuncio}}
                        </p>
                        <p class="mb-0">
                            <b-icon icon="geo-alt"></b-icon> {{datos.distrito}}, {{datos.departamento}}
                        </p>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card-body>

        <b-card-footer class="px-3 py-2">
            <b-row cols="1" cols-lg="3" align-v="center" align-h="center">
                <b-col v-if="datos.activo == 1 && anuncioActivo == true">
                    <p v-if="datos.solicitudes > 0" class="mb-1 mb-lg-0">
                        Tiene {{datos.solicitudes}} solicitudes. x aún están pendientes.
                    </p>
                    <p v-else class="mb-1 mb-lg-0">Aún no tiene solicitudes de contacto.</p>
                </b-col>
                <b-col v-else>
                    <p class="mensaje-error mb-1 mb-lg-0">Anuncio finalizado.</p>
                </b-col>
                <b-col class="d-lg-flex justify-content-start">
                    <b-button 
                        block
                        class="boton boton-principal mb-2 mb-lg-0"
                        :to="{name: 'InicioSistema'}"
                    >
                        Ver solicitudes
                    </b-button>
                </b-col>
                <b-col class="d-lg-flex justify-content-end">
                    <b-overlay
                        :show="efectoCargandoBoton"
                        rounded
                        opacity="0.6"
                        v-if="datos.activo == 1 && anuncioActivo == true"
                    >
                        <b-button 
                            :disabled="efectoCargandoBoton"
                            block
                            class="boton boton-principal"
                            @click="ConfirmarFinalizarAnuncio(datos.codigoAnuncio)"
                        >
                            Finalizar anuncio
                        </b-button>
                    </b-overlay>
                </b-col>
            </b-row>
        </b-card-footer>
    </b-card>
</template>

<script>
import axios from 'axios'

export default {
    name: "AnuncioUsuarioComponente",
    data: () =>  ({
        efectoCargandoBoton: false,
        anuncioActivo: null,
        // anuncioFinalizado: false,
	}),
    props: ['datos'],
    mounted(){
        this.anuncioActivo = (this.datos.activo == 1) ? true : false
    },
    methods: {
        ConfirmarFinalizarAnuncio(codigo)
        {
            this.MensajeDeAviso("Desea finalizar su anuncio.", codigo)
        },
        FinalizarAnuncio(codigo)
        {
            let datos = {
                codigoAnuncio: codigo
            }

            this.efectoCargandoBoton = true

            axios.post('/api/finalizar-anuncio', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        this.MensajeDeExito("Su anuncio finalizo.")
                        this.anuncioActivo = false
                    }
                    else
                    {
                        this.MensajeDeError();
                    }
                })
                .catch(() => 
                {
                    this.MensajeDeError();
                })
                .finally(() => {
                    this.efectoCargandoBoton = false
                });
        },
        MensajeDeError(mensaje = 'Error al conectar al servidor.')
		{
			this.$swal({
				title: mensaje,
				icon: 'error',
				confirmButtonText: 'Aceptar',
			})
		},
        MensajeDeAviso(mensaje, codigo)
        {
            this.$swal({
				title: mensaje,
				icon: 'info',
				confirmButtonText: 'Sí',
				cancelButtonText: 'Cerrar',
                showCancelButton: true,
			}).then((result) => {
                if (result.isConfirmed) {
                    this.FinalizarAnuncio(codigo)
                }
            })
		},
        MensajeDeExito(mensaje)
        {
			this.$swal({
				title: mensaje,
				icon: 'success',
				confirmButtonText: 'Aceptar',
			})
		},
    }
}
</script>

<style>
    .fila-completa.col-12 {
        flex: 0 0 100%;
        max-width: 100%;
    }
</style>