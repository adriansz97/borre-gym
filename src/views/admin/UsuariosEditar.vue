<template>
    <div>
        <form @submit.prevent="submit()">
            <h1>Editar Usuario</h1>
            <h4>Nombre:</h4>
            <input v-model="nombre" type="text" class="form-control mb-2" placeholder="Ingresa el nombre del usuario">
            <div v-if="tipo != 'admin'">
                <h4>Tipo:</h4>
                <b-form-select v-model="tipo" :options="options" class="mb-2"></b-form-select>
                <h4>Estado:</h4>
                <b-form-select v-model="estado" :options="options2" class="mb-2"></b-form-select>
            </div>
            <b-button variant="dark" class="btn-block" type="submit">Editar</b-button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Usuarioseditar',
    data() {
        return {
            id: this.$route.params.id,
            nombre: '',
            tipo: '',
            estado: '',
            options: [
                {value: 'cliente', text: "Cliente"},
                {value: 'entrenador', text: "Entrenador"}
            ],
            options2: [
                {value: 'true', text: "Habilitado"},
                {value: 'false', text: "Inhabilitado"}
            ]
        }
    },
    computed: {
        ...mapState(['usuarioEditar'])
    },
    methods: {
        ...mapActions(['getEditarUsuario', 'editarUsuario']),
        async crear() {
            await this.getEditarUsuario(this.id)
            this.nombre = this.usuarioEditar.nombre
            this.tipo = this.usuarioEditar.tipo
            this.estado = this.usuarioEditar.estado
        },
        submit() {
            if (this.tipo == 'admin') {
                this.editarUsuario({nombre: this.nombre, tipo: 'admin', estado: 'true', id: this.id})
            } else {
                this.editarUsuario({nombre: this.nombre, tipo: this.tipo, estado: this.estado, id: this.id})
            }
        }
    },
    created() {
        this.crear()
    }
}
</script>