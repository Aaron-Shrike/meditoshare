<template>
	<div class="seccion-crear-usuario">
		<b-container class="contenedor-crear-usuario">
            <b-card
                no-body
                tag="div"
                class="mb-2 card-formulario"
            >
                <b-card-body>
                    <h1 class="text-center titulo-formulario mb-5">Nuevo anuncio</h1>
                    <b-form @submit.prevent="EnviarDatosAnuncio">
                        <b-row cols="1" cols-lg="2" class="justify-content-center">
                            <b-col cols="12">
                                <b-form-group
                                    id="input-group-1"
                                    label="Nombre:"
                                    label-for="input-1"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="datosAnuncio.nombre"
                                        class="input-formulario"
                                        type="text"
                                        :state="EstadoValidacion('nombre')"
                                        placeholder="Nombre del medicamento"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-1-live-feedback"
                                    >
                                        <div v-if="!$v.datosAnuncio.nombre.required">
                                            Debe ingresar el nombre del medicamento
                                        </div>
                                        <div v-if="!$v.datosAnuncio.nombre.minLength">
                                            Nombre del medicamento muy corto
                                        </div>
                                        <div v-if="!$v.datosAnuncio.nombre.maxLength">
                                            Nombre del medicamento demasiado largo
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <b-row cols="1" cols-lg="3">
                            <b-col >
                                <b-form-group
                                    id="input-group-2"
                                    label="Presentación:"
                                    label-for="input-2"
                                >
                                    <b-form-input
                                        id="input-2"
                                        v-model="datosAnuncio.presentacion"
                                        class="input-formulario"
                                        type="text"
                                        :state="EstadoValidacion('presentacion')"
                                        placeholder="Presentación"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-2-live-feedback"
                                    >
                                        <div v-if="!$v.datosAnuncio.presentacion.required">
                                            Debe ingresar la presentación del medicamento
                                        </div>
                                        <div v-if="!$v.datosAnuncio.presentacion.minLength">
                                            Presentación del medicamento muy corta
                                        </div>
                                        <div v-if="!$v.datosAnuncio.presentacion.maxLength">
                                            Presentación del medicamento demasiado larga
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group
                                    id="input-group-3"
                                    label="Concentración:"
                                    label-for="input-3"
                                >
                                    <b-form-input
                                        id="input-3"
                                        v-model="datosAnuncio.concentracion"
                                        class="input-formulario"
                                        type="text"
                                        :state="EstadoValidacion('concentracion')"
                                        placeholder="Concentración del medicamento"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-3-live-feedback"
                                    >
                                        <div v-if="!$v.datosAnuncio.concentracion.required">
                                            Debe ingresar la concentración del medicamento
                                        </div>
                                        <div v-if="!$v.datosAnuncio.concentracion.minLength">
                                            Concentración del medicamento muy corto
                                        </div>
                                        <div v-if="!$v.datosAnuncio.concentracion.maxLength">
                                            Concentración del medicamento demasiado largo
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group
                                    id="input-group-4"
                                    label="Fecha de Vencimiento:"
                                    label-for="input-4"
                                >
                                    <b-form-datepicker 
                                        id="input-4" 
                                        v-model="datosAnuncio.fechaVencimiento" 
                                        class="input-formulario mb-2"
                                        :state="EstadoValidacion('fechaVencimiento')"
                                        :min="fechaMinima"
                                        placeholder="Seleccionar fecha"
                                    ></b-form-datepicker>
                                    <b-form-invalid-feedback
                                        id="input-4-live-feedback"
                                    >
                                        <div v-if="!$v.datosAnuncio.fechaVencimiento.required">
                                            Debe ingresar la fecha de vencimiento
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group
                                    id="input-group-5"
                                    label="Cantidad:"
                                    label-for="input-5"
                                >
                                    <b-form-input
                                        id="input-5"
                                        v-model="datosAnuncio.cantidad"
                                        class="input-formulario"
                                        type="number"
                                        :state="EstadoValidacion('cantidad')"
                                        placeholder="Cantidad"
                                        min="1"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-5-live-feedback"
                                    >
                                        <div v-if="!$v.datosAnuncio.cantidad.required">
                                            Debe ingresar la cantidad del medicamento
                                        </div>
                                        <div v-if="!$v.datosAnuncio.cantidad.numeric">
                                            Cantidad del medicamento negativa
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col >
                                <b-form-group
                                    id="input-group-6"
                                    label="Receta:"
                                    label-for="input-6"
                                >
                                    <b-form-checkbox 
                                        id="input-6"
                                        class="input-formulario"
                                        v-model="datosAnuncio.requiereReceta"
                                        :state="EstadoValidacion('requiereReceta')"
                                        switch
                                        size="lg"
                                    >
                                        Requiere receta
                                    </b-form-checkbox>
                                    <b-form-invalid-feedback
                                        id="input-6-live-feedback"
                                    >
                                        <div v-if="!$v.datosAnuncio.requiereReceta.required">
                                            Debe seleccionar si requiere receta
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group
                                    id="input-group-7"
                                    label="Diagnóstico:"
                                    label-for="input-7"
                                >
                                    <b-form-checkbox 
                                        id="input-7"
                                        class="input-formulario"
                                        v-model="datosAnuncio.requiereDiagnostico"
                                        :state="EstadoValidacion('requiereDiagnostico')"
                                        switch
                                        size="lg"
                                    >
                                        Requiere diagnóstico
                                    </b-form-checkbox>
                                    <b-form-invalid-feedback
                                        id="input-7-live-feedback"
                                    >
                                        <div v-if="!$v.datosAnuncio.requiereDiagnostico.required">
                                            Debe seleccionar si requiere diagnostico
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>

                        <b-row cols="1" cols-lg="2" class="justify-content-center">
                            <b-col cols-sm="6">
                                <b-form-group
                                    id="input-group-8"
                                    label="Descripción (opcional):"
                                    label-for="input-8"
                                >
                                    <b-form-textarea
                                        id="input-8"
                                        v-model="datosAnuncio.descripcion"
                                        class="input-formulario"
                                        :state="EstadoValidacion('descripcion')"
                                        placeholder="Descripción"
                                    ></b-form-textarea>
                                    <b-form-invalid-feedback
                                        id="input-8-live-feedback"
                                    >
                                        <div v-if="!$v.datosAnuncio.descripcion.maxLength">
                                            Descripción muy larga
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        
                        <b-row align-v="center" align-h="center">
                            <b-col class="d-md-flex justify-content-center">
                                <b-overlay
                                    :show="efectoCargandoBoton"
                                    rounded
                                    opacity="0.6"
                                    class="mt-2"
                                >
                                    <b-button 
                                        :disabled="efectoCargandoBoton"
                                        type="submit" 
                                        block
                                        class="boton boton-principal"
                                    >
                                        Guardar anuncio
                                    </b-button>
                                </b-overlay>
                            </b-col>
                            <!-- <b-col class="d-md-flex justify-content-center">
                                <div>
                                    <b-button
                                        block
                                        class="boton boton-principal mt-2"
                                        :to="{name: 'Perfil'}"
                                    >
                                        Cancelar
                                    </b-button>
                                </div>
                            </b-col> -->
                        </b-row>
                    </b-form>
                </b-card-body>
            </b-card>
		</b-container>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
	data: () =>  ({
		efectoCargandoBoton: false,
        fechaMinima: '',
		datosAnuncio: {
            dniDonante: '',
            nombre: '',
            descripcion: '',
            concentracion: '',
            presentacion: '',
            cantidad: '',
            requiereReceta: false,
            requiereDiagnostico: false,
            fechaVencimiento: null,
		},
	}),
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
	mounted(){
        this.CargarFecha()
    },
	methods: {
        CargarFecha()
        {
            let hoy = new Date();
            let anio = hoy.getFullYear()
            let mes = `${(hoy.getMonth()+1)}`.padStart(2,'0')
            let dia = `${(hoy.getDate())}`.padStart(2,'0')
            
            let fecha = `${anio}-${mes}-${dia}`
            this.fechaMinima = fecha
        },
		EstadoValidacion(name) 
		{
			const { $dirty, $error } = this.$v.datosAnuncio[name];
			return $dirty ? !$error : null;
		},
		EnviarDatosAnuncio()
		{
			this.$v.datosAnuncio.$touch();

			if(!this.$v.datosAnuncio.$anyError)
			{ 
                this.efectoCargandoBoton = true

                this.datosAnuncio.dniDonante = this.usuario.dni

                axios.post('/api/crear-anuncio', this.datosAnuncio)
                    .then((respuesta) => 
                    {
                        let data = respuesta.data

                        if(respuesta.status == 200 && typeof data.error === 'undefined')
                        {
                            this.MensajeDeExito("Nuevo anuncio guardado.")
                            this.LimpiarDatosAnuncio()
                        }
                        else
                        {
                            this.MensajeDeError(data.mensaje)
                        }
                    })
                    .catch(() => 
                    {
                        this.MensajeDeError()
                    })
                    .finally(() => {
                        this.efectoCargandoBoton = false
                    });
			}
		},
        LimpiarDatosAnuncio()
        {
            this.$v.datosAnuncio.$reset()

            this.datosAnuncio = {
                dniDonante: '',
                nombre: '',
                descripcion: '',
                concentracion: '',
                presentacion: '',
                cantidad: '',
                requiereReceta: false,
                requiereDiagnostico: false,
                fechaVencimiento: null,
            }
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
	},
    validations: {
		datosAnuncio: {
			nombre: {
				required,
                minLength: minLength(3),
				maxLength: maxLength(20)
			},
			descripcion: {
				maxLength: maxLength(255)
			},
			concentracion: {
				required,
                minLength: minLength(3),
				maxLength: maxLength(20)
			},
			presentacion: {
				required,
                minLength: minLength(3),
				maxLength: maxLength(20)
			},
			cantidad: {
				required,
                numeric
			},
            requiereReceta: {
				required,
			},
            requiereDiagnostico: {
				required,
			},
            fechaVencimiento: {
				required,
			},
		},
	},
}
</script>

<style>
</style>