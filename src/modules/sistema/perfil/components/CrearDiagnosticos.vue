<template>
    <div class="seccion-recetas">
        <div class="d-flex justify-content-between">
            <h3>Diagnosticos médicos</h3>
            <b-button
                class="boton-principal"
                @click="mostrarModal = !mostrarModal"
            >
                Agregar
            </b-button>
        </div>

        <b-table v-if="datos.length == 0" class="tabla-recetas" small :fields="columnasTabla" :items="datosPrueba" responsive="sm">
            <template #cell(nombreDiagnostico)="">
                <!-- {{ data.item.nombreDiagnostico }} -->
                <p class="mensaje-error mb-0">* {{mensajeError}} *</p>
            </template>
        </b-table>

        <b-table v-else class="tabla-recetas" small :fields="columnasTabla" :items="datos" responsive="sm">
            <template #cell(nombreDiagnostico)="data">
                {{ data.item.nombreDiagnostico }}
            </template>

            <template #cell(acciones)="data">
                <div class="d-flex justify-content-around">
                    <b-button
                        class="boton-principal"
                        @click="MostrarArchivo(data.item.nombreDiagnostico, data.item.urlDiagnostico)"
                    >
                        Ver
                    </b-button>
                    <b-button
                        class="boton-principal"
                        @click="EliminarDiagnostico(data.item.codigoDiagnostico, data.item.urlDiagnostico)"
                    >
                        Borrar
                    </b-button>
                </div>
            </template>
        </b-table>

        <!-- CREAR DIAGNOSTICO -->
        <b-modal
            id="modal-prevent-closing"
            v-model="mostrarModal"
            ref="modal"
            title="Registrar diagnostico"
            @show="LimpiarFormulario"
            @hidden="LimpiarFormulario"
            @ok="EnviarDatos"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
        >
            <!-- <form ref="form" @submit.stop.prevent="EnviarDatos"> -->
            <form ref="form" enctype="multipart/form-data">
                <b-form-group
                    id="input-group-1"
                    label="Nombre:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="datosDiagnostico.nombre"
                        class="input-formulario"
                        type="text"
                        :state="EstadoValidacion('nombre')"
                        placeholder="Nombre"
                    ></b-form-input>
                    <b-form-invalid-feedback
                        id="input-1-live-feedback"
                    >
                        <div v-if="!$v.datosDiagnostico.nombre.required">
                            Debe ingresar el nombre de su diagnostico
                        </div>
                        <div v-if="!$v.datosDiagnostico.nombre.minLength">
                            Nombre del diagnostico muy corto
                        </div>
                        <div v-if="!$v.datosDiagnostico.nombre.maxLength">
                            Nombre del diagnostico demasiado largo
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
                        v-model="datosDiagnostico.archivo"
                        :state="EstadoValidacion('archivo')"
                        placeholder="Elija un archivo o suéltelo aquí..."
                        drop-placeholder="Suelta el archivo aquí..."
                        accept=".jpg, .jpeg"
                    ></b-form-file>
                    <b-form-invalid-feedback
                        id="input-2-live-feedback"
                    >
                        <div v-if="!$v.datosDiagnostico.archivo.required">
                            Debe subir un archivo
                        </div>
                        <div v-if="!$v.datosDiagnostico.archivo.esImagen">
                            Archivo no válido
                        </div>
                    </b-form-invalid-feedback>
                </b-form-group>
            </form>

            <template #modal-footer="{ ok, cancel }">
                <b-overlay
                    :show="efectoCargandoBoton"
                    rounded
                    opacity="0.6"
                >
                    <b-button class="boton-principal" @click="ok()">
                        Registrar
                    </b-button>
                </b-overlay>
                <b-button variant="danger" @click="cancel()">
                    Cerrar
                </b-button>
            </template>
        </b-modal>

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
    name: "DiagnosticosComponente",
    data: () =>  ({
        mensajeError: 'No tiene diagnostios registrados.',
        efectoCargandoBoton: false,
        mostrarModal: false,
        mostrarModalArchivo: false,
        nombreDiagnostico: '',
        urlDiagnostico: '',
        datosDiagnostico: {
            nombre: '',
            archivo: null,
        },
		columnasTabla: [
            'nombreDiagnostico',
            'acciones',
        ],
        datos: [
            // { idDiagnostico: '1', nombreDiagnostico: 'paracetamol', urlDiagnostico: 'paracetamol'},
            // { idDiagnostico: '2', nombreDiagnostico: 'paracetamol2', urlDiagnostico: 'paracetamol'},
        ],
        datosPrueba: [
            { idDiagnostico: '1', nombreDiagnostico: '', urlDiagnostico: ''},
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
			const { $dirty, $error } = this.$v.datosDiagnostico[name];
			return $dirty ? !$error : null;
		},
        ObtenerDatos()
        {
            let datos = {
                dni: this.usuario.dni
            }
            
            axios.post('/api/obtener-diagnosticos', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && data.length != 0)
                    {
                        this.datos = data
                    }
                    else
                    {
                        this.mensajeError = "No tiene diagnostios registrados."
                    }
                })
                .catch(() => 
                {
                    this.mensajeError = "Error al conectar al servidor."
                })
        },
        MostrarArchivo(Nombre, url)
        {
            this.mostrarModalArchivo = true
            this.nombreDiagnostico = Nombre
            this.urlDiagnostico = process.env.VUE_APP_API_URL + "/diagnosticos/" + this.usuario.dni + "/" + url
        },
        DatosFormulario()
        {
            let data = new FormData()

            data.append('nombre', this.datosDiagnostico.nombre)
            data.append('archivo', this.datosDiagnostico.archivo)
            data.append('dniUsuario', this.usuario.dni)

            return data
        },
        EnviarDatos(bvModalEvt)
        {
            bvModalEvt.preventDefault()

            console.log(this.datosDiagnostico)

            this.$v.datosDiagnostico.$touch();

			if(!this.$v.datosDiagnostico.$anyError)
			{ 
                this.efectoCargandoBoton = true

                let datos = this.DatosFormulario()

                axios.post('/api/crear-diagnostico', datos)
                    .then((respuesta) => 
                    {
                        let data = respuesta.data

                        if(respuesta.status == 200 && typeof data.error === 'undefined')
                        {
                            let nuevoDiagnostico = {
                                nombreDiagnostico: this.datosDiagnostico.nombre,
                                urlDiagnostico: data.urlDiagnostico,
                            }
                            //agregar diagnostico a la tabla
                            this.datos.push(nuevoDiagnostico)
                            this.MensajeDeExito("Su diagnostico se registro correctamente.")
                            this.LimpiarFormulario()


                            // Hide the modal manually
                            // this.$nextTick(() => {
                            //     this.$bvModal.hide('modal-prevent-closing')
                            // })
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
        EliminarDiagnostico(codigo, url)
        {
            let datos = {
                codigoDiagnostico: codigo,
                dniUsuario: this.usuario.dni,
                urlArchivo: url,
            }

            axios.post('/api/borrar-diagnostico', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        //eliminar diagnostico a la tabla
                        let index = -1
                        this.datos.forEach((e, i) => {
                            if(e.codigoDiagnostico == datos.codigoDiagnostico)
                            {
                                index = i
                            }
                        })

                        this.datos.splice(index,1)
                        this.MensajeDeExito("Su diagnostico se elimino correctamente.")
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
        },
        LimpiarFormulario() 
        {
            this.datosDiagnostico = {
                nombre: '',
                archivo: null,
            }
            this.$v.datosDiagnostico.$reset()
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
		datosDiagnostico: {
			nombre: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(70)
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