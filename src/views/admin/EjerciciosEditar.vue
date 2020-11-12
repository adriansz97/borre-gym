<template>
    <div>
        <form @submit.prevent="editarEjercicio({nombre: nombre, desc: desc, id: id})" class="mb-2">
            <h1>Editar Ejercicio</h1>
            <h4>Nombre:</h4>
            <input v-model="nombre" type="text" class="form-control mb-2" placeholder="Ingresa el nombre del usuario">
            <h4>Descripción:</h4>
            <b-form-textarea v-model="desc" placeholder="Introduce las instrucciones del ejercicio" rows="3" max-rows="6" class="mb-2"></b-form-textarea>
            <b-button variant="dark" class="btn-block" type="submit">Editar</b-button>
        </form>
        <b-button variant="danger" class="btn-block" @click="eliminarEjercicio(id)">Eliminar</b-button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'EjerciciosEditar',
    data() {
        return {
            id: this.$route.params.id,
            nombre: '',
            desc: ''
        }
    },
    computed: {
        ...mapState(['ejercicioEditar'])
    },
    methods: {
        ...mapActions(['getEditarEjercicio', 'editarEjercicio', 'eliminarEjercicio']),
        async crear() {
            await this.getEditarEjercicio(this.id)
            this.nombre = this.ejercicioEditar.nombre
            this.desc = this.ejercicioEditar.desc
        }
    },
    created() {
        this.crear()
    }
}
</script>