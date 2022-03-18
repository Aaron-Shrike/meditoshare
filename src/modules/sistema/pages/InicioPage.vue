<template>
    <div>
        <b-container>
            <h1>Bienvenido al Sistema</h1>
            <p>{{usuario.nombre}} {{usuario.apellidoPaterno}} {{usuario.apellidoMaterno}} - DNI: {{usuario.dni}}</p>
        </b-container>
    </div>
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
    
</style>