<template>
    <div>
        <form @submit.prevent="crearUsuario({nombre: nombre, tipo: tipo, email: email, password: pass})">
            <h1>Crear Usuario</h1>
            <h4>Nombre:</h4>
            <input v-model="nombre" type="text" class="form-control mb-2" placeholder="Ingresa el nombre del usuario">
            <h4>Email:</h4>
            <input v-model="email" type="text" class="form-control mb-2" placeholder="Ingresa el email del usuario">
            <h4>Password:</h4>
            <input v-model="pass" type="text" class="form-control mb-2" placeholder="Ingresa la contraseña del usuario">
            <h4>Tipo:</h4>
            <b-form-select v-model="tipo" :options="options" class="mb-2"></b-form-select>
            <b-button variant="dark" class="btn-block" type="submit">Añadir</b-button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'UsuariosCrear',
    data() {
        return {
            nombre: '',
            email: '',
            pass: '',
            tipo: 'cliente',
            options: [
                {value: 'cliente', text: "Cliente"},
                {value: 'entrenador', text: "Entrenador"}
            ]
        }
    },
    methods: {
        ...mapActions(['crearUsuario'])
    }
}
</script>