<template>
    <section class="seccion-perfil">
        <b-container>
            <div class="text-center">
                <h1 class="mb-5">Mi perfil</h1>
                <h2 class="mb-4">{{usuario.nombre}} {{usuario.apellidoPaterno}} {{usuario.apellidoMaterno}}</h2>
                <p class="mb-0"><b>DNI:</b> {{usuario.dni}}</p>
                <p class="mb-4"><b>Fecha de nacimiento:</b> {{usuario.formatoFechaNacimiento}}</p>
            </div>
            <b-row>
                <b-col>
                    <p><b>Departamento:</b> {{usuario.departamento}}</p>
                    <p><b>Provincia:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{usuario.provincia}}</p>
                    <p><b>Distrito:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{usuario.distrito}}</p>
                    <p><b>Dirección:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{usuario.direccion}}</p>
                </b-col>
                <b-col>
                    <p><b>Teléfono:</b> {{usuario.telefono}}</p>
                    <p><b>Correo:</b> &nbsp;&nbsp; {{usuario.correo}}</p>
                </b-col>
            </b-row>
            <b-row align-h="center" align-v="center">
                <b-col class="d-md-flex justify-content-center">
                    <div>
                        <b-button
                            block
                            class="boton boton-principal mt-2"
                            :to="{name: 'EditarPerfil'}"
                        >
                            Modificar datos
                        </b-button>
                    </div>
                </b-col>
                
                <b-col class="d-md-flex justify-content-center">
                    <div>
                        <b-button
                            block
                            class="boton boton-principal mt-2"
                            :to="{name: 'VerificacionesPerfil'}"
                        >
                            Verficaciones
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data: () =>  ({
		
	}),
    computed:{
        ...mapState('autenticacion', ['usuario']),
    },
}
</script>

<style>
    .seccion-perfil{
        padding: 30px 0;
    }
</style>