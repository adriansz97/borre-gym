<template>
    <div>
        <h1>Info de Rutina</h1>
        <h4>Nombre:</h4>
        <p>{{nombre}}</p>
        <h4>Descripción:</h4>
        <p>{{desc}}</p>
        <!-- LISTA DE EJERCICIOS SELECCIONADOS -->
        <b-list-group class="mb-2">
            <b-list-group-item v-for="(ejercicio, index) of listaEjercicios" :key="index" class="d-flex justify-content-between">
                <span>{{ejercicio.nombre}}</span>
                <span>{{ejercicio.series}} x {{ejercicio.reps}}</span>
            </b-list-group-item>
        </b-list-group>
        <!-- BOTON TERMINAR -->
        <b-button variant="danger" class="btn-block" @click="eliminarRutina(id)">Eliminar</b-button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'RutinasEditar',
    data() {
        return {
            id: this.$route.params.id,
            nombre: '',
            desc: '',
            listaEjercicios: []
        }
    },
    computed: {
        ...mapState(['rutinaEditar'])
    },
    methods: {
        ...mapActions(['getEditarRutina', 'eliminarRutina']),
        async crear() {
            await this.getEditarRutina(this.id)
            this.nombre = this.rutinaEditar.nombre
            this.desc = this.rutinaEditar.desc
            this.listaEjercicios = this.rutinaEditar.listaEjercicios
        }
    },
    created() {
        this.crear()
    }
}
</script>