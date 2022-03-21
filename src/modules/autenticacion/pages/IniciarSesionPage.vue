<template>
	<div class="seccion-iniciar-sesion">
		<b-container class="contenedor-iniciar-sesion">
			<b-row class="contenedor-iniciar-sesion" align-v="center" align-h="center">
				<b-col cols="12">
					<b-card
						tag="div"
						class="mb-2 card-formulario card-formulario-ancho"
					>
						<div>
							<div class="logo-torsa logo-iniciar-sesion">
								<img src="@/assets/logo.png" alt="Torsa Perú">
							</div>
							<h2 class="titulo-formulario">MediToShare</h2>
							<b-form @submit.prevent="EnviarDatosIniciarSesion">
								<b-input-group
									id="input-group-1"
								>
									<b-input-group-prepend 
										is-text
										:class="{
											'is-invalid': $v.form.dni.$dirty && $v.form.dni.$error,
											'is-valid': $v.form.dni.$dirty && !$v.form.dni.$invalid
										}"
									>
										<b-icon icon="person-fill"></b-icon>
									</b-input-group-prepend>
									<b-form-input
										id="input-1"
										v-model="form.dni"
										class="input-formulario"
										type="number"
										:state="EstadoValidacion('dni')"
										placeholder="DNI"
									></b-form-input>
									<b-form-invalid-feedback
										id="input-1-live-feedback"
									>
										<div v-if="!$v.form.dni.required">
											Debe ingresar su número de DNI
										</div>
										<div v-if="!$v.form.dni.minLength">
											Número de DNI muy corto
										</div>
										<div v-if="!$v.form.dni.maxLength">
											Número de DNI demasiado largo
										</div>
									</b-form-invalid-feedback>
								</b-input-group>
							
								<b-input-group 
									id="input-group-2" 
								>
									<b-input-group-prepend 
										is-text
										:class="{
											'is-invalid': $v.form.contrasenia.$dirty && $v.form.contrasenia.$error,
											'is-valid': $v.form.contrasenia.$dirty && !$v.form.contrasenia.$invalid
										}"
									>
										<b-icon icon="lock-fill"></b-icon>
									</b-input-group-prepend>
									<b-form-input
										id="input-2"
										v-model="form.contrasenia"
										class="input-formulario"
										type="password"
										:state="EstadoValidacion('contrasenia')"
										placeholder="Contraseña"
									></b-form-input>
									<b-form-invalid-feedback
										id="input-1-live-feedback"
										
									>
										<div v-if="!$v.form.contrasenia.required">
											Debe ingresar su contraseña
										</div>
									</b-form-invalid-feedback>
								</b-input-group>
							
								<b-overlay
									:show="efectoCargandoBoton"
									rounded
									opacity="0.6"
									class="d-block"
								>
									<b-button 
										:disabled="efectoCargandoBoton"
										block 
										type="submit" 
										class="boton boton-principal mt-2"
									>
										Iniciar Sesión
									</b-button>
								</b-overlay>
							</b-form>
							<p class="subtitulo-formulario mt-3 mb-0">¿No estás registrado?</p>
							<div class="d-flex">
								<b-button
									:to="{name: 'CrearCuenta'}"
									variant="link"
									class="boton mx-auto"
								>
									Crear Cuenta
								</b-button>
							</div>
						</div>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'

import { mapMutations, mapState } from 'vuex'
export default {
	data: () =>  ({
		efectoCargandoBoton: false,
		form: {
			dni: '12345672',
			contrasenia: '12345678',
		},
	}),
	validations: {
		form: {
			dni: {
				required,
				minLength: minLength(8),
				maxLength: maxLength(8)
			},
			contrasenia: {
				required,
			},
		},
	},
	computed:{
        ...mapState('autenticacion', ['autenticado']),
    },
	methods: {
		...mapMutations('autenticacion', ['EditarIniciarSesion']),
		EstadoValidacion(name) 
		{
			const { $dirty, $error } = this.$v.form[name];
			return $dirty ? !$error : null;
		},
		EnviarDatosIniciarSesion()
		{
			this.$v.form.$touch();

			if(!this.$v.form.$anyError)
			{ 
				axios.get('/sanctum/csrf-cookie')
					.then(() => 
					{
						this.efectoCargandoBoton = true

						axios.post('/api/iniciar-sesion', this.form)
							.then((respuesta) => 
							{
								let data = respuesta.data

								if(respuesta.status == 200 && typeof data.error === 'undefined')
								{
									this.EditarIniciarSesion(data)
									this.$router.push({ name: "InicioSistema"})	
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
					})
					.catch(() => 
					{
						this.MensajeDeError()
					})
			}
		},
		MensajeDeError(mensaje = 'Error al conectar al servidor.')
		{
			this.$swal({
				title: mensaje,
				icon: 'error',
				confirmButtonText: 'Aceptar',
			})
		}
	}
}
</script>

<style>
	.seccion-iniciar-sesion{
		height: 100vh;
		min-height: 100vh;
		padding: 0 0 20px 0;
	}

	.contenedor-iniciar-sesion{
		height: 100%;
	}

	.logo-iniciar-sesion{
		max-width: 450px;
		margin: 0 auto;
	}

	.card.card-formulario,
	.card-formulario{
		background-color: var(--color-blanco);
		box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.1);
		border-radius: var(--redondeado-1);
		border: 0;
		margin: 0 auto;
	}
	.card-formulario-ancho{
		max-width: 465px;
		min-height: 364px;
	}
	.card-formulario .card-body{
		padding: 30px;
	}

	h2.titulo-formulario{
		font-size: 36px;
		text-align: center;
	}
	
	p.subtitulo-formulario{
		font-size: 21px;
		font-weight: 600;
		color: var(--color-subtitulo);
		text-align: center;
	}
</style>