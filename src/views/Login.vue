<template>
    <div>
        <form @submit.prevent="iniciarSesion({email: email, pass: pass})">
            <h1 class="text-center">Gimnasio</h1>
            <h3>Email:</h3>
            <b-form-input type="email" v-model="email" placeholder="Ingresa tu email"></b-form-input>
            <h3>Password:</h3>
            <b-form-input type="password" v-model="pass" placeholder="Ingresa tu contraseña"></b-form-input>
            <div class="d-flex justify-content-end">
                <b-button type="submit" variant="secondary">Entrar</b-button>
            </div>
        </form>
    </div>
</template>



<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            pass: ''
        }
    },
    computed: {
        ...mapState(['usuario'])
    },
    methods: {
        ...mapActions(['iniciarSesion'])
    }
}
</script>



<style>
    h3 {
        margin-top: 20px;
    }
    button {
        margin-top: 20px;
    }
</style>