<template>
    <div class="seccion-recetas">
        <div class="d-flex justify-content-between">
            <h3>Recetas médicas</h3>
            <b-button
                class="boton-principal"
                @click="mostrarModal = !mostrarModal"
            >
                Agregar
            </b-button>
        </div>

        <b-table class="tabla-recetas" small :fields="columnasTabla" :items="datosPrueba" responsive="sm">
            <template #cell(descripcion)="">
                <!-- {{ data.item.descripcion }} -->
                <p class="mensaje-error mb-0">* {{mensajeError}} *</p>
            </template>

            <template #cell(acciones)="">
                
            </template>
        </b-table>

        <b-table class="tabla-recetas" small :fields="columnasTabla" :items="datos" responsive="sm">
            <template #cell(descripcion)="data">
                {{ data.item.descripcion }}
            </template>

            <template #cell(acciones)="data">
                <b-button
                    class="boton-principal"
                    @click="MostrarArchivo(data.item.url_receta)"
                >
                    Ver
                </b-button>
            </template>
        </b-table>

        <!-- CREAR RECETA -->
        <b-modal
            id="modal-prevent-closing"
            v-model="mostrarModal"
            ref="modal"
            title="Registrar receta"
            ok-title="Registrar"
            cancel-title="Cerrar"
            @show="LimpiarFormulario"
            @hidden="LimpiarFormulario"
            @ok="EnviarDatos"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
        >
            <!-- <form ref="form" @submit.stop.prevent="EnviarDatos"> -->
            <form ref="form">
                <b-form-group
                    id="input-group-1"
                    label="Nombre:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="datosReceta.nombre"
                        class="input-formulario"
                        type="text"
                        :state="EstadoValidacion('nombre')"
                        placeholder="Nombre"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        id="input-1-live-feedback"
                    >
                        <div v-if="!$v.datosReceta.nombre.required">
                            Debe ingresar el nombre de la receta
                        </div>
                        <div v-if="!$v.datosReceta.nombre.minLength">
                            Nombre de la receta muy corto
                        </div>
                        <div v-if="!$v.datosReceta.nombre.maxLength">
                            Nombre de la receta demasiado largo
                        </div>
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    id="input-group-2"
                    label="Archivo:"
                    label-for="input-2"
                >
                    <b-form-file
                        id="input-2"
                        class="input-formulario"
                        v-model="datosReceta.archivo"
                        :state="EstadoValidacion('archivo')"
                        placeholder="Elija un archivo o suéltelo aquí..."
                        drop-placeholder="Suelta el archivo aquí..."
                        accept=".jpg, .jpeg"
                    ></b-form-file>
                    <b-form-invalid-feedback
                        id="input-2-live-feedback"
                    >
                        <div v-if="!$v.datosReceta.archivo.required">
                            Debe subir un archivo
                        </div>
                        <div v-if="!$v.datosReceta.archivo.esImagen">
                            Archivo no valido
                        </div>
                    </b-form-invalid-feedback>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
const esImagen = (value) => {
    if(value != null)
    {
        return (value.name.indexOf('.jpg') >= 0 || value.name.indexOf('.jpeg') >= 0)
    }
    else
    {
        return false
    }
    
}
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "RecetasComponente",
    data: () =>  ({
        mensajeError: '',
        efectoCargandoBoton: false,
        mostrarModal: false,
        datosReceta: {
            nombre: '',
            archivo: null,
        },
		columnasTabla: [
            'descripcion',
            'acciones',
        ],
        datos: [
            // { id_receta: '1', descripcion: 'paracetamol', url_receta: 'paracetamol'},
            // { id_receta: '2', descripcion: 'paracetamol2', url_receta: 'paracetamol'},
        ],
        datosPrueba: [
            { id_receta: '1', descripcion: '', url_receta: ''},
        ],
	}),
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
    beforeMount() {
        this.ObtenerDatos()
    },
    methods: {
        EstadoValidacion(name) 
		{
			const { $dirty, $error } = this.$v.datosReceta[name];
			return $dirty ? !$error : null;
		},
        ObtenerDatos()
        {
            axios.post('/api/obtener-recetas-usuario', this.$route.params.dni)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
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
        MostrarArchivo(url)
        {
            console.log(url)
        },
        EnviarDatos(bvModalEvt)
        {
            bvModalEvt.preventDefault()

            this.$v.datosReceta.$touch();

			if(!this.$v.datosReceta.$anyError)
			{ 
                this.efectoCargandoBoton = true

                let receta = this.datosReceta;

                axios.post('/api/crear-receta', receta)
                    .then((respuesta) => 
                    {
                        let data = respuesta.data

                        if(respuesta.status == 200 && typeof data.error === 'undefined')
                        {
                            this.MensajeDeExito("Se registro correctamente.")
                            // Hide the modal manually
                            this.$nextTick(() => {
                            this.$bvModal.hide('modal-prevent-closing')
                            })
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
        LimpiarFormulario() 
        {
            this.datosReceta = {
                nombre: '',
                archivo: null,
            }
            this.$v.datosReceta.$reset()
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
		datosReceta: {
			nombre: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(40)
			},
			archivo: {
				required,
                esImagen
			},
		},
	},
}
</script>

<style>
</style>