<template>
    <b-card
        no-body
        style="max-width: 22rem;"
        class="card-formulario"
    >
        <b-card-body>
            <div class="mb-3 d-flex justify-content-between align-items-center">
                <b-card-title class="mb-0">{{datos.nombre}} {{datos.apellidoPaterno}}</b-card-title>
                <p class="mb-0">{{datos.puntaje}} <b-icon icon="star-fill"></b-icon></p>
            </div>
            <b-card-text>
                {{datos.comentario}}
            </b-card-text>
        </b-card-body>
    </b-card>
</template>

<script>

export default {
    name: "CalificacionComponente",
    data: () =>  ({
		
	}),
    props: ['datos'],
}
</script>

<style>
</style>