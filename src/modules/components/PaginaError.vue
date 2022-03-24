<template>
    <div class="pagina-error">
        <b-container class="text-center">
            <div>
                <small class="pagina-error__subtitulo">Error</small>
                <h2 class="pagina-error__titulo">404</h2>
            </div>
            <p>Oops... Página no encontrada</p>
            <b-button
                class="boton boton-principal"
                :to="{name: 'InicioSistema'}"
                exact
            >
                Inicio
            </b-button>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "PaginaDeError",
        data: () => ({
            
        })
    }
</script>

<style>
    .pagina-error{
        padding: 80px 0;
    }
    .pagina-error__subtitulo{
        font-size: 40px;
        font-family: var(--fuente-principal);
    }
    .pagina-error__titulo{
        line-height: .8;
        font-size: 45vw;
    }
    @media (min-width: 600px) {
        .pagina-error__titulo{
            font-size: 140px;
        }
    }
</style>