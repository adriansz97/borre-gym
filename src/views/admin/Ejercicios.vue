<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h1>Ejercicios</h1>
            <b-button variant="dark" @click="goCrearEjercicio">Añadir ejercicio</b-button>
        </div>
        <b-list-group>
            <b-list-group-item v-for="ejercicio of ejercicios" :key="ejercicio.id">
                <span>{{ejercicio.nombre}}</span>
                <b-button class="btn-sm float-right" @click="goEditarEjercicio(ejercicio.id)">Editar</b-button>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../../router'

export default {
    name: 'Ejercicios',
    computed: {
        ...mapState(['ejercicios'])
    },
    methods: {
        ...mapActions(['getEjercicios']),
        goCrearEjercicio() {
            router.push('ejCrear')
        },
        goEditarEjercicio(id) {
            router.push({name: 'EjerciciosEditar', params: {id: id}})
        }
    },
    created() {
        this.getEjercicios()
    }
}
</script>