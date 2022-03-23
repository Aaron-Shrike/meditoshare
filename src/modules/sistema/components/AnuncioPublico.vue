<template>
    <b-card
        no-body
        class="card-formulario"
    >
        <b-card-body>
            <b-card-title>{{datos.nombre}} <small>{{datos.presentacion}}, {{datos.concentracion}}</small></b-card-title>

            <b-card-text>
                <b-row cols="1" cols-sm="2">
                    <b-col v-if="datos.descripcion != null && datos.descripcion != ''">
                        <p class="mb-1">Descripción: {{datos.descripcion}}</p>
                    </b-col>
                    <b-col>
                        <p class="mb-0">
                            <b-icon icon="calendar2-event"></b-icon> Vence: {{datos.formatoFechaVencimiento}}
                        </p>
                        <p class="mb-1">
                            <b-icon icon="box-seam"></b-icon> {{datos.cantidad}} {{datos.presentacion}}
                        </p>
                    </b-col>
                    <b-col>
                        <p class="mb-0" v-if="datos.requiereReceta == 1">
                            <b-icon icon="check-square"></b-icon> Requiere receta
                        </p>
                        <p class="mb-0" v-else>
                            <b-icon icon="x-square"></b-icon> No requiere receta
                        </p>
                        <p class="mb-0" v-if="datos.requiereDiagnostico == 1">
                            <b-icon icon="check-square"></b-icon> Requiere diagnostico
                        </p>
                        <p class="mb-0" v-else>
                            <b-icon icon="x-square"></b-icon> No requiere diagnostico
                        </p>
                    </b-col>
                    <b-col :class="{'fila-completa': filaCompleta}" cols="12">
                        <p class="mb-0 mt-1">
                            <b-icon icon="calendar-check"></b-icon> Publicado: {{datos.formatoFechaAnuncio}}
                        </p>
                        <p class="mb-0">
                            <b-icon icon="geo-alt"></b-icon> {{datos.distrito}}, {{datos.departamento}}
                        </p>
                    </b-col>
                </b-row>
            </b-card-text>

            <b-list-group flush>
                <b-list-group-item>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </b-list-group-item>
            </b-list-group>
        </b-card-body>
    </b-card>
</template>

<script>

export default {
    name: "AnuncioPublicoComponente",
    data: () =>  ({
		filaCompleta: false,
	}),
    props: ['datos'],
    mounted(){
        if(this.datos.descripcion == null || this.datos.descripcion == ''){
            this.filaCompleta = true
        }
    },
}
</script>

<style>
</style>