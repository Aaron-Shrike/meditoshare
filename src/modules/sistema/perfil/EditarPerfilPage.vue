<template>
	<div class="seccion-crear-usuario">
		<b-container class="contenedor-crear-usuario">
            <b-card
                no-body
                tag="div"
                class="mb-2 card-formulario"
            >
                <b-card-body>
                    <div class="text-center">
                        <h1 class="titulo-formulario mb-5">Modificar datos</h1>
                        <h2 class="mb-4">{{usuario.nombre}} {{usuario.apellidoPaterno}} {{usuario.apellidoMaterno}}</h2>
                        <p class="mb-0"><b>DNI:</b> {{usuario.dni}}</p>
                        <p class="mb-4"><b>Fecha de nacimiento:</b> {{usuario.formatoFecha}}</p>
                    </div>
                    <b-form @submit.prevent="EnviarDatosUsuario">
                        <b-row cols="1" cols-lg="2">
                            <b-col class="form-datos-contacto">
                                <h4 class="text-center">Datos de Contacto</h4>
                                <b-form-group
                                    id="input-group-21"
                                    label="Departamento:"
                                    label-for="input-21"
                                >
                                    <b-form-select 
                                        id="input-21"
                                        v-model="datosUsuario.departamento" 
                                        :options="arregloDepartamentos"
                                        class="input-formulario"
                                        :state="EstadoValidacion('departamento')"
                                        @change="CargarProvincias"
                                    >
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>- Seleccionar -</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                    <b-form-invalid-feedback
                                        id="input-21-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.departamento.required">
                                            Debe seleccionar su departamento
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group
                                    id="input-group-22"
                                    label="Provincia:"
                                    label-for="input-22"
                                >
                                    <b-form-select 
                                        id="input-22"
                                        v-model="datosUsuario.provincia" 
                                        :options="arregloProvincias"
                                        class="input-formulario"
                                        :state="EstadoValidacion('provincia')"
                                        @change="CargarDistritos"
                                    >
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>- Seleccionar -</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                    <b-form-invalid-feedback
                                        id="input-22-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.provincia.required">
                                            Debe seleccionar su provincia
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group
                                    id="input-group-23"
                                    label="Distrito:"
                                    label-for="input-23"
                                >
                                    <b-form-select 
                                        id="input-23"
                                        v-model="datosUsuario.distrito" 
                                        :options="arregloDistritos"
                                        class="input-formulario"
                                        :state="EstadoValidacion('distrito')"
                                    >
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>- Seleccionar -</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                    <b-form-invalid-feedback
                                        id="input-23-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.distrito.required">
                                            Debe seleccionar su distrito
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group
                                    id="input-group-24"
                                    label="Derección:"
                                    label-for="input-24"
                                >
                                    <b-form-input
                                        id="input-24"
                                        v-model="datosUsuario.direccion"
                                        class="input-formulario"
                                        type="text"
                                        :state="EstadoValidacion('direccion')"
                                        placeholder="Dirección"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-24-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.direccion.required">
                                            Debe ingresar su dirección
                                        </div>
                                        <div v-if="!$v.datosUsuario.direccion.minLength">
                                            Dirección muy corta
                                        </div>
                                        <div v-if="!$v.datosUsuario.direccion.maxLength">
                                            Dirección demasiado larga
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group
                                    id="input-group-25"
                                    label="Teléfono:"
                                    label-for="input-25"
                                >
                                    <b-form-input
                                        id="input-25"
                                        v-model="datosUsuario.telefono"
                                        class="input-formulario"
                                        type="tel"
                                        :state="EstadoValidacion('telefono')"
                                        placeholder="Teléfono"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-25-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.telefono.required">
                                            Debe ingresar su número de teléfono
                                        </div>
                                        <div v-if="!$v.datosUsuario.telefono.minLength">
                                            Número de teléfono muy corto
                                        </div>
                                        <div v-if="!$v.datosUsuario.telefono.maxLength">
                                            Número de teléfono muy largo
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </b-col>
                            <b-col class="form-datos-usuario">
                                <h4 class="text-center">Datos de Cuenta</h4>
                                <b-form-group
                                    id="input-group-31"
                                    label="Correo:"
                                    label-for="input-31"
                                >
                                    <b-form-input
                                        id="input-31"
                                        v-model="datosUsuario.correo"
                                        class="input-formulario"
                                        type="email"
                                        :state="EstadoValidacion('correo')"
                                        placeholder="Correo"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-31-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.correo.required">
                                            Debe ingresar su correo
                                        </div>
                                        <div v-if="!$v.datosUsuario.correo.email">
                                            Correo electrónico no válido
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                
                                <b-form-group
                                    id="input-group-32"
                                    label="Repetir correo:"
                                    label-for="input-32"
                                >
                                    <b-form-input
                                        id="input-32"
                                        v-model="datosUsuario.correoRepetido"
                                        class="input-formulario"
                                        type="email"
                                        :state="EstadoValidacion('correoRepetido')"
                                        placeholder="Correo"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-32-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.correoRepetido.required">
                                            Debe volver a ingresar su correo
                                        </div>
                                        <div v-if="!$v.datosUsuario.correoRepetido.sameAs">
                                            Los correos no coinsiden
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                
                                <b-form-group
                                    id="input-group-33"
                                    label="Contraseña:"
                                    label-for="input-33"
                                >
                                    <b-form-input
                                        id="input-33"
                                        v-model="datosUsuario.contrasenia"
                                        class="input-formulario"
                                        type="password"
                                        :state="EstadoValidacion('contrasenia')"
                                        placeholder="Contraseña"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-33-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.contrasenia.required">
                                            Debe ingresar una contraseña
                                        </div>
                                        <div v-if="!$v.datosUsuario.contrasenia.minLength">
                                            Contraseña muy corta
                                        </div>
                                        <div v-if="!$v.datosUsuario.contrasenia.maxLength">
                                            Contraseña demasiado larga
                                        </div>
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                
                                <b-form-group
                                    id="input-group-34"
                                    label="Repetir Contraseña:"
                                    label-for="input-34"
                                >
                                    <b-form-input
                                        id="input-34"
                                        v-model="datosUsuario.contraseniaRepetida"
                                        class="input-formulario"
                                        type="password"
                                        :state="EstadoValidacion('contraseniaRepetida')"
                                        placeholder="Contraseña"
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        id="input-34-live-feedback"
                                    >
                                        <div v-if="!$v.datosUsuario.contraseniaRepetida.required">
                                            Debe volver a igressar una contraseña
                                        </div>
                                        <div v-if="!$v.datosUsuario.contraseniaRepetida.sameAs">
                                            Las contraseñas no coinciden
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
                                        Guardar cambios
                                    </b-button>
                                </b-overlay>
                            </b-col>
                            <b-col class="d-md-flex justify-content-center">
                                <div>
                                    <b-button
                                        block
                                        class="boton boton-principal mt-2"
                                        :to="{name: 'Perfil'}"
                                    >
                                        Cancelar
                                    </b-button>
                                </div>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-card-body>
            </b-card>
		</b-container>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
	data: () =>  ({
		efectoCargandoBoton: false,
		datosUsuario: {
            departamento: null,
            provincia: null,
            distrito: null,
            direccion: '',
            telefono: '',

            correo: '',
            correoRepetido: '',
            contrasenia: '',
            contraseniaRepetida: '',
		},
        arregloDepartamentos: [
            // { value: 'LAM', text: 'Lambayeque' },
        ],
        arregloProvincias: [
            // { value: 'CHI', text: 'Chiclayo' },
        ],
        arregloDistritos: [
            // { value: 'CHI', text: 'Chiclayo' },
        ],
	}),
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
	validations: {
		datosUsuario: {
			departamento: {
				required,
			},
			provincia: {
				required,
			},
			distrito: {
				required,
			},
			direccion: {
				required,
                minLength: minLength(10),
				maxLength: maxLength(50)
			},
			telefono: {
				required,
                minLength: minLength(6),
				maxLength: maxLength(9)
			},
			correo: {
				required,
                email
			},
			correoRepetido: {
                required,
                sameAs: sameAs(function () {
                    return this.datosUsuario.correo;
                }),
			},
			contrasenia: {
				required,
                minLength: minLength(8),
				maxLength: maxLength(20)
			},
			contraseniaRepetida: {
                required,
                sameAs: sameAs(function () {
                    return this.datosUsuario.contrasenia;
                }),
			},
		},
	},
    beforeMount(){
        this.CargarDepartamentos()
    },
    mounted(){
        this.CargarDatosUsuario()
        this.CargarProvincias()
        this.CargarDistritos()
    },
	methods: {
        ...mapMutations('autenticacion', ['EditarIniciarSesion']),
		EstadoValidacion(name) 
		{
			const { $dirty, $error } = this.$v.datosUsuario[name];
			return $dirty ? !$error : null;
		},
        CargarDatosUsuario()
        {
            this.datosUsuario = {
                departamento: this.usuario.codigoDepartamento,
                provincia: this.usuario.codigoProvincia,
                distrito: this.usuario.codigoDistrito,
                direccion: this.usuario.direccion,
                telefono: this.usuario.telefono,

                correo: this.usuario.correo,
            }
        },
        CargarDepartamentos()
        {
            axios.get('/api/obtener-departamentos')
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        let departamentos = []
                        data.forEach(element => {
                            let obj = {
                                value: element.codigoDepartamento, 
                                text: element.departamento
                            }
                            departamentos.push(obj)
                        });
                        this.arregloDepartamentos = departamentos
                    }
                    else
                    {
                        console.error("No se pudo cargar los departamentos.")
                    }
                })
                .catch(() => 
                {
                    console.error("No se pudo cargar los departamentos.")
                })
        },
        CargarProvincias()
        {
            axios.get('/api/obtener-provincias/' + this.datosUsuario.departamento)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        let array = []
                        data.forEach(element => {
                            let obj = {
                                value: element.codigoProvincia, 
                                text: element.provincia
                            }
                            array.push(obj)
                        });
                        this.arregloProvincias = array
                    }
                    else
                    {
                        console.error("No se pudo cargar las provincias.")
                    }
                })
                .catch(() => 
                {
                    console.error("No se pudo cargar las provincias.")
                })
        },
        CargarDistritos()
        {
            axios.get('/api/obtener-distritos/'+this.datosUsuario.provincia)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        let array = []
                        data.forEach(element => {
                            let obj = {
                                value: element.codigoDistrito, 
                                text: element.distrito
                            }
                            array.push(obj)
                        });
                        this.arregloDistritos = array
                    }
                    else
                    {
                        console.error("No se pudo cargar los distritos.")
                    }
                })
                .catch(() => 
                {
                    console.error("No se pudo cargar los distritos.")
                })
        },
		EnviarDatosUsuario()
		{
			this.$v.datosUsuario.$touch();

			if(!this.$v.datosUsuario.$anyError)
			{ 
                this.efectoCargandoBoton = true

                let usuario = this.datosUsuario;

                axios.post('/api/modificar-usuario/'+this.usuario.dni, usuario)
                    .then((respuesta) => 
                    {
                        let data = respuesta.data

                        if(respuesta.status == 200 && typeof data.error === 'undefined')
                        {
                            this.MensajeDeExito("Se guardaron los cambios.")
                            // this.$v.datosUsuario.$reset()
                            this.ObtenerDatosUsuario()
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
        ObtenerDatosUsuario()
        {
            let datos = {
                dni: this.usuario.dni
            }

            axios.post('/api/obtener-usuario', datos)
                .then((respuesta) => 
                {
                    let data = respuesta.data

                    if(respuesta.status == 200 && typeof data.error === 'undefined')
                    {
                        this.EditarIniciarSesion(data)
                    }
                })
                .catch(() => 
                {
                })
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
				icon: 'info',
				confirmButtonText: 'Aceptar',
			})
		},
        MensajeDeExito(mensaje)
        {
			this.$swal({
				title: mensaje,
				icon: 'success',
				confirmButtonText: 'Aceptar',
			}).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push({ name: "Perfil"})	
                }
            })
		},
	}
}
</script>

<style>
</style>