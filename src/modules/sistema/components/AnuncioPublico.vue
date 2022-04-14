<template>
    <b-card
        no-body
        class="card-anuncio"
    >
        <b-card-body>
            <b-card-title>{{datos.nombre}} <small>{{datos.presentacion}}, {{datos.concentracion}}</small></b-card-title>

            <b-card-text>
                <b-row cols="1" cols-sm="2">
                    <b-col v-if="datos.descripcion != null && datos.descripcion != ''">
                        <p class="mb-1">Descripción: {{datos.descripcion}}</p>
                    </b-col>
                    <b-col>
                        <p class="mb-0">
                            <b-icon icon="calendar2-event"></b-icon> Vence: {{datos.formatoFechaVencimiento}}
                        </p>
                        <p class="mb-1">
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
                    <b-col :class="{'fila-completa': filaCompleta}" cols="12">
                        <p class="mb-0 mt-1">
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
            <b-row cols="1" align-v="center" align-h="center">
                <b-col class="d-md-flex justify-content-end">
                    <b-overlay
                        :show="efectoCargandoBoton"
                        rounded
                        opacity="0.6"
                    >
                        <b-button 
                            :disabled="efectoCargandoBoton"
                            block
                            class="boton boton-principal"
                            @click="ConfirmarSolicitarMedicamento(datos.codigoAnuncio)"
                        >
                            Solicitar medicamento
                        </b-button>
                    </b-overlay>
                </b-col>
            </b-row>
        </b-card-footer>
    </b-card>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: "AnuncioPublicoComponente",
    data: () =>  ({
        efectoCargandoBoton: false,
		filaCompleta: false,
        datosSolicitud: {
            dniSolicitante: '',
            codigoAnuncio: '',
            urgente: false
        }
	}),
    props: ['datos'],
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
    mounted(){
        if(this.datos.descripcion == null || this.datos.descripcion == ''){
            this.filaCompleta = true
        }
    },
    methods: {
        ConfirmarSolicitarMedicamento(codigo)
        {
            this.$swal({
				title: "¿Tipo de Solicitud?",
				icon: 'question',
				confirmButtonText: 'Urgente',
				denyButtonText: 'Normal',
				cancelButtonText: 'Cancelar',
                showDenyButton: true,
                showCancelButton: true,
                customClass: {
                    popup: 'alerta-ancha'
                },
			}).then((result) => {
                if (result.isConfirmed) 
                {
                    this.datosSolicitud.urgente = true
                    this.SolicitarMedicamento(codigo)
                }
                else if (result.isDenied) 
                {
                    this.datosSolicitud.urgente = false
                    this.SolicitarMedicamento(codigo)
                }
            })
        },
        SolicitarMedicamento(codigo)
        {
            this.efectoCargandoBoton = true

            this.datosSolicitud.dniSolicitante = this.usuario.dni
            this.datosSolicitud.codigoAnuncio = codigo

            axios.post('/api/crear-solicitud-anuncio', this.datosSolicitud)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        this.MensajeDeExito("Su solicitud fue registrada.")
                    }
                    else
                    {
                        this.MensajeDeError(data.mensaje);
                    }
                })
                .catch(() => 
                {
                    this.MensajeDeError()
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
</style>