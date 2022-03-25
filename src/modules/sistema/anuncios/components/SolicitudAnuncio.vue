<template>
    <div>
        <b-card
            no-body
            class="card-formulario"
        >
            <b-card-body>
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <b-card-title>{{datos.nombre}} {{datos.apellidoPaterno}} {{datos.apellidoMaterno}}</b-card-title>
                    <b-button
                        class="boton boton-principal"
                        :to="{name: 'PerfilUsuario', params: {dni: datos.dniSolicitante, tipo: 'solicitante'}}"
                        exact
                    >
                        Ver Perfil
                    </b-button> 
                </div>
                
                <b-card-text>
                    <b-row cols="1">
                        <b-col>
                            <p class="mb-0">
                                <b-icon icon="calendar2-event"></b-icon> Recibida el: {{datos.formatoFechaSolicitud}}
                            </p>
                            <p class="mb-0">
                                Estado de la solicitud: {{datos.estado}}
                            </p>
                            <p v-if="datos.motivo != undefined" class="mb-0">
                                Motivo: {{datos.motivo}}
                            </p>
                        </b-col>
                    </b-row>
                </b-card-text>
            </b-card-body>
        
            <b-card-footer v-if="datos.codigoEstado != 3" class="px-3 py-2">
                <b-row v-if="datos.codigoEstado == 1" cols="1" cols-md="2" align-v="center" align-h="center">
                    <b-col class="d-md-flex justify-content-center">
                        <b-overlay
                            :show="efectoCargandoBoton"
                            rounded
                            opacity="0.6"
                        >
                            <b-button 
                                :disabled="efectoCargandoBoton"
                                block
                                class="boton boton-principal mb-2 mb-md-0"
                                @click="ConfirmarAprobarSolicitud"
                            >
                                Aprobar
                            </b-button>
                        </b-overlay>
                    </b-col>
                    <b-col class="d-md-flex justify-content-center">
                        <div>
                            <b-button 
                                block
                                class="boton boton-principal"
                                @click="MotivoRechazoSolicitud"
                            >
                                Rechazar
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
                <b-row v-if="datos.codigoEstado == 2" cols="1" align-v="center" align-h="center">
                    <b-col class="d-md-flex justify-content-center">
                        <b-overlay
                            :show="efectoCargandoBoton"
                            rounded
                            opacity="0.6"
                        >
                            <b-button 
                                :disabled="efectoCargandoBoton"
                                block
                                class="boton boton-principal"
                                @click="CalificarSolicitud"
                            >
                                Marcar como entregado
                            </b-button>
                        </b-overlay>
                    </b-col>
                </b-row>
            </b-card-footer>
        </b-card>
        <!-- RECHAZAR SOLICITUD -->
        <b-modal
            id="modal-prevent-closing"
            size="md" 
            centered
            v-model="mostrarModalRechazo"
            ref="modal-rechazo"
            @show="LimpiarFormularioRechazo"
            @hidden="LimpiarFormularioRechazo"
            @ok="RechazarSolicitud"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
            header-class="justify-content-center"
        >
            <!-- <template #modal-title>
                <div class="text-center">
                    Calificar entrega de<br>
                    {{$route.params.titulo}} <small>{{$route.params.subtitulo1}}, {{$route.params.subtitulo2}}</small><br>
                    a {{datos.nombre}} {{datos.apellidoMaterno}} {{datos.apellidoMaterno}}
                </div>
            </template> -->
            <template #modal-title>
                <div class="text-center">
                    Seleccione el motivo de rechazo<br>
                    de solicitud a {{datos.nombre}} {{datos.apellidoMaterno}} {{datos.apellidoMaterno}}
                </div>
            </template>

            <form ref="form">
                <b-form-group 
                    id="input-group-1"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
                >
                    <b-form-radio-group
                        size="md"
                        id="input-1"
                        v-model="datosRechazo.motivo"
                        :options="opcionesMotivo"
                        :aria-describedby="ariaDescribedby"
                        :state="EstadoValidacionRechazo('motivo')"
                        name="radios-stacked"
                        stacked
                        @change="LimpiarValidacionOtro"
                    ></b-form-radio-group>
                    <b-form-input
                        id="input-2"
                        v-model="motivoOtro"
                        :state="EstadoValidacion()"
                        class="input-formulario"
                        type="text"
                        placeholder="Otro"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        id="input-1-live-feedback"
                        :state="EstadoValidacionRechazo('motivo')"
                    >
                        <div v-if="!$v.datosRechazo.motivo.required">
                            Debe seleccionar el motivo
                        </div>
                    </b-form-invalid-feedback>
                    
                    <b-form-invalid-feedback
                        id="input-2-live-feedback"
                    >
                        <div v-if="!$v.motivoOtro.required">
                            Debe ingresar el motivo
                        </div>
                        <div v-if="!$v.motivoOtro.minLength">
                            Motivo de rechazo muy corto
                        </div>
                        <div v-if="!$v.motivoOtro.maxLength">
                            Motivo de rechazo demasiado largo
                        </div>
                    </b-form-invalid-feedback>
                </b-form-group>
            </form>

            <template #modal-footer="{ ok, cancel }">
                <b-overlay
                    :show="efectoCargandoBotonModal"
                    rounded
                    opacity="0.6"
                >
                    <b-button class="boton-principal" @click="ok()">
                        Finalizar
                    </b-button>
                </b-overlay>
                <b-button variant="danger" @click="cancel()">
                    Cancelar
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    name: "SolicitudAnuncioComponente",
    data: () =>  ({
        efectoCargandoBoton: false,
        efectoCargandoBotonModal: false,
        mostrarModalRechazo: false,
        opcionesMotivo: [
            { text: 'No cuenta con receta', value: 'No cuenta con receta' },
            { text: 'No cuenta con diagnóstico', value: 'No cuenta con diagnóstico' },
            { text: 'Información personal dudosa', value: 'Información personal dudosa' },
            { text: 'Malas calificaciones', value: 'Malas calificaciones' },
            { text: 'Ubicación muy lejana', value: 'Ubicación muy lejana' },
            { text: 'Otro: ', value: 'Otro' },
        ],
        motivoOtro: '',
        datosRechazo: {
            codigoAnuncio: '',
            dniSolicitante: '',
            motivo: '',
        },
        datosEntrega: {
            codigoAnuncio: '',
            dniSolicitante: '',
            puntaje: '',
            comentario: '',
        }
	}),
    props: ['datos'],
    methods: {
        LimpiarValidacionOtro()
        {
            this.$v.motivoOtro.$reset();
        },
        EstadoValidacionRechazo(name) 
		{
			const { $dirty, $error } = this.$v.datosRechazo[name];
			return $dirty ? !$error : null;
		},
        EstadoValidacion() 
		{
			const { $dirty, $error } = this.$v.motivoOtro;
			return $dirty ? !$error : null;
		},
        EstadoValidacionEntrega(name) 
		{
			const { $dirty, $error } = this.$v.datosEntrega[name];
			return $dirty ? !$error : null;
		},
        ConfirmarAprobarSolicitud()
        {
            this.MensajeDeAviso("Desea aprobar la solicitud.")
        },
        AprobarSolicitud()
        {
            let datos = {
                dniSolicitante: this.datos.dniSolicitante,
                codigoAnuncio: this.datos.codigoAnuncio,
            }

            this.efectoCargandoBoton = true

            axios.post('/api/aprobar-solicitud-anuncio', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        this.MensajeDeExito("La solicitud fue aprobada.")
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
        MotivoRechazoSolicitud()
        {
            this.mostrarModalRechazo = true
        },
        RechazarSolicitud(bvModalEvt)
        {
            bvModalEvt.preventDefault()

            this.$v.datosRechazo.$touch();
            if(this.datosRechazo.motivo == 'Otro'){
                this.$v.motivoOtro.$touch();
            }

			if(!this.$v.datosRechazo.$anyError && !this.$v.motivoOtro.$anyError)
			{ 
                let datos = {
                    dniSolicitante: this.datos.dniSolicitante,
                    codigoAnuncio: this.datos.codigoAnuncio,
                    motivo: this.datosRechazo.motivo
                }

                if(datos.motivo == 'Otro')
                {
                    datos.motivo = this.motivoOtro
                }

                this.efectoCargandoBotonModal = true

                axios.post('/api/rechazar-solicitud-anuncio', datos)
                    .then((respuesta) => 
                    {
                        let data = respuesta.data

                        if(respuesta.status == 200 && typeof data.error === 'undefined')
                        {
                            this.MensajeDeExito("La solicitud fue rechazada.")
                            this.LimpiarFormularioRechazo()
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
                        this.efectoCargandoBotonModal = false
                    });
            }
        },
        LimpiarFormularioRechazo()
        {
            this.datosRechazo = {
                codigoAnuncio: '',
                dniSolicitante: '',
                motivo: '',
            }
            this.motivoOtro = ''
            this.$v.datosRechazo.$reset()
            this.$v.motivoOtro.$reset()
        },
        CalificarSolicitud()
        {
            
        },
        MensajeDeError(mensaje = 'Error al conectar al servidor.')
		{
			this.$swal({
				title: mensaje,
				icon: 'error',
				confirmButtonText: 'Aceptar',
			})
		},
        MensajeDeAviso(mensaje)
        {
            this.$swal({
				title: mensaje,
				icon: 'warning',
				confirmButtonText: 'Aprobar',
				cancelButtonText: 'Cancelar',
                showCancelButton: true,
			}).then((result) => {
                if (result.isConfirmed) {
                    this.AprobarSolicitud()
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
    },
    validations: {
		datosRechazo: {
			motivo: {
				required,
			},
		},
        motivoOtro: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(70)
        },
	},
}
</script>

<style>
</style>