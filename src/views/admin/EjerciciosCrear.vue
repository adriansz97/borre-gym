<template>
    <div>
        <form @submit.prevent="crearEjercicio({nombre: nombre, desc: desc})" class="mb-2">
            <h1>Crear Ejercicio</h1>
            <h4>Nombre:</h4>
            <input v-model="nombre" type="text" class="form-control mb-2" placeholder="Ingresa el nombre del usuario">
            <h4>Descripción:</h4>
            <b-form-textarea v-model="desc" placeholder="Introduce las instrucciones del ejercicio" rows="3" max-rows="6" class="mb-2"></b-form-textarea>
            <b-button variant="dark" class="btn-block" type="submit">Añadir</b-button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'EjerciciosCrear',
    data() {
        return {
            nombre: '',
            desc: ''
        }
    },
    methods: {
        ...mapActions(['crearEjercicio'])
    }
}
</script>