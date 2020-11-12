<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h1>Usuarios</h1>
            <b-button variant="dark" @click="goCrearUsuario">Agregar Usuario</b-button>
        </div>
        <b-list-group>
            <b-list-group-item v-for="usuario of usuarios" :key="usuario.id">
                <span>{{usuario.nombre}}</span><span v-if="usuario.tipo == 'admin'"> - {{usuario.tipo}}</span>
                <b-button class="btn-sm float-right" @click="goEditarUsuario(usuario.id)">Editar</b-button>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../../router'

export default {
    name: 'Usuarios',
    computed: {
        ...mapState(['usuarios'])
    },
    methods: {
        ...mapActions(['getUsuarios']),
        goCrearUsuario() {
            router.push('usCrear')
        },
        goEditarUsuario(id) {
            router.push({name: 'UsuariosEditar', params: {id: id}})
        }
    },
    created() {
        this.getUsuarios()
    }
}
</script>