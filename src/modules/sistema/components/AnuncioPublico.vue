<template>
    <b-card
        no-body
        style="max-width: 22rem;"
        class="card-formulario"
    >
        <b-card-body>
            <b-card-title>{{datos.nombre}} {{datos.apellidoPaterno}}</b-card-title>
            <b-card-text>
                {{datos.comentario}}
            </b-card-text>
        </b-card-body>

        <b-list-group flush>
            <b-list-group-item>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>

export default {
    name: "AnuncioPublicoComponente",
    data: () =>  ({
		
	}),
    props: ['datos'],
}
</script>

<style>
</style>