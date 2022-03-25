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

        <b-table v-if="datos.length == 0" class="tabla-recetas" small :fields="columnasTabla" :items="datosPrueba" responsive="sm">
            <template #cell(nombreReceta)="">
                <!-- {{ data.item.nombreReceta }} -->
                <p class="mensaje-error mb-0">* {{mensajeError}} *</p>
            </template>
        </b-table>

        <b-table v-else class="tabla-recetas" small :fields="columnasTabla" :items="datos" responsive="sm">
            <template #cell(nombreReceta)="data">
                {{ data.item.nombreReceta }}
            </template>

            <template #cell(acciones)="data">
                <div class="d-flex justify-content-around">
                    <b-button
                        class="boton-principal"
                        @click="MostrarArchivo(data.item.nombreReceta, data.item.urlReceta)"
                    >
                        Ver
                    </b-button>
                    <b-button
                        class="boton-principal"
                        @click="EliminarReceta(data.item.codigoReceta, data.item.urlReceta)"
                    >
                        Borrar
                    </b-button>
                </div>
            </template>
        </b-table>

        <!-- CREAR RECETA -->
        <b-modal
            id="modal-prevent-closing"
            v-model="mostrarModal"
            ref="modal"
            title="Registrar receta"
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
        mensajeError: 'No tiene recetas registradas.',
        efectoCargandoBoton: false,
        mostrarModal: false,
        mostrarModalArchivo: false,
        nombreReceta: '',
        urlReceta: '',
        datosReceta: {
            nombre: '',
            archivo: null,
        },
		columnasTabla: [
            'nombreReceta',
            'acciones',
        ],
        datos: [
            // { idReceta: '1', nombreReceta: 'paracetamol', urlReceta: 'paracetamol'},
            // { idReceta: '2', nombreReceta: 'paracetamol2', urlReceta: 'paracetamol'},
        ],
        datosPrueba: [
            { idReceta: '1', nombreReceta: '', urlReceta: ''},
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
            let datos = {
                dni: this.usuario.dni
            }
            
            axios.post('/api/obtener-recetas', datos)
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
            this.urlReceta = process.env.VUE_APP_API_URL + "/recetas/" + this.usuario.dni + "/" + url
        },
        DatosFormulario()
        {
            let data = new FormData()

            data.append('nombre', this.datosReceta.nombre)
            data.append('archivo', this.datosReceta.archivo)
            data.append('dniUsuario', this.usuario.dni)

            return data
        },
        EnviarDatos(bvModalEvt)
        {
            bvModalEvt.preventDefault()

            this.$v.datosReceta.$touch();

			if(!this.$v.datosReceta.$anyError)
			{ 
                this.efectoCargandoBoton = true

                let datos = this.DatosFormulario()

                axios.post('/api/crear-receta', datos)
                    .then((respuesta) => 
                    {
                        let data = respuesta.data

                        if(respuesta.status == 200 && typeof data.error === 'undefined')
                        {
                            let nuevaReceta = {
                                codigoReceta: data.codigoReceta,
                                nombreReceta: this.datosReceta.nombre,
                                urlReceta: data.urlReceta,
                            }
                            //agregar receta a la tabla
                            this.datos.push(nuevaReceta)
                            this.MensajeDeExito("Su receta se registro correctamente.")
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
        EliminarReceta(codigo, url)
        {
            let datos = {
                codigoReceta: codigo,
                dniUsuario: this.usuario.dni,
                urlArchivo: url,
            }

            axios.post('/api/borrar-receta', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        //eliminar receta a la tabla
                        let index = -1
                        this.datos.forEach((e, i) => {
                            if(e.codigoReceta == datos.codigoReceta)
                            {
                                index = i
                            }
                        })

                        this.datos.splice(index,1)
                        this.MensajeDeExito("Su receta se elimino correctamente.")
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