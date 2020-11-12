<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h1>Rutinas</h1>
            <b-button variant="dark" @click="goCrearRutina">Añadir rutina</b-button>
        </div>
        <b-list-group>
            <b-list-group-item v-for="rutina of rutinas" :key="rutina.id">
                <span>{{rutina.nombre}}</span>
                <b-button class="btn-sm float-right" @click="goEditarRutina(rutina.id)">Ver</b-button>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../../router'

export default {
    name: 'Rutinas',
    computed: {
        ...mapState(['rutinas'])
    },
    methods: {
        ...mapActions(['getRutinas']),
        goCrearRutina() {
            router.push('ruCrear')
        },
        goEditarRutina(id) {
            router.push({name: 'RutinasEditar', params: {id: id}})
        }
    },
    created() {
        this.getRutinas()
    }
}
</script>