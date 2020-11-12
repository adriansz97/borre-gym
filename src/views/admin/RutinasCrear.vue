<template>
    <div>
        <form @submit.prevent="crearRutina({nombre: nombre, desc: desc, listaEjercicios: listaEjercicios})" class="mb-2">
            <h1>Crear Rutina</h1>
            <h4>Nombre:</h4>
            <input v-model="nombre" type="text" class="form-control mb-2" placeholder="Ingresa el nombre de la rutina">
            <h4>Descripción:</h4>
            <b-form-textarea v-model="desc" placeholder="Descripcion de la rutina" rows="3" max-rows="6" class="mb-2"></b-form-textarea>
            <!-- LISTA DE EJERCICIOS SELECCIONADOS -->
            <b-list-group class="mb-2">
                <b-list-group-item v-for="(ejercicio, index) of listaEjercicios" :key="index" class="d-flex justify-content-between">
                    <span>{{ejercicio.nombre}}</span>
                    <span>{{ejercicio.series}} x {{ejercicio.reps}}</span>
                </b-list-group-item>
            </b-list-group>
            
            <!-- ESPACIO PARA LLENAR EJERCICIO, SERIES Y REPS -->
            <div v-if="aniadir == true" class="aniadirEj mb-2">
                <b-row class="mb-2">
                    <b-col cols="12">
                        <b-form-select v-model="ejercicio" :options="options"></b-form-select>
                    </b-col>
                </b-row>
                <b-row class="d-flex justify-content-around mb-2">
                    <b-col cols="3">
                        <span>Series</span>
                        <input v-model="series" type="number" class="form-control input-sm">
                    </b-col>
                    <b-col cols="3">
                        <span>Reps</span>
                        <input v-model="reps" type="number" class="form-control">
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-button variant="primary" @click="aniadirEjercicio" class="btn-block">Añadir</b-button>
                    </b-col>
                </b-row>
            </div>
            <!-- BOTON AÑADIR EJERCICIO -->
            <b-button @click="aniadir = !aniadir" v-if="aniadir == false" variant="light" class="btn-block" type="submit">+ Añadir ejercicio +</b-button>
            <!-- BOTON TERMINAR -->
            <b-button variant="dark" class="btn-block" type="submit">Terminar</b-button>

        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'RutinasCrear',
    data() {
        return {
            nombre: '',
            desc: '',
            ejercicio: '',
            series: '',
            reps: '',
            listaEjercicios: [],
            aniadir: false,
            options: [{value: '', text: 'Elige un ejercicio', disabled: true}]
        }
    },
    computed: {
        ...mapState(['ejercicios'])
    },
    methods: {
        ...mapActions(['crearRutina', 'getEjercicios']),
        async crear() {
            await this.getEjercicios()
            this.ejercicios.forEach(ejercicio => {
                var obj = {
                    value: ejercicio.id,
                    text: ejercicio.nombre
                }
                this.options.push(obj)
            })
        },
        aniadirEjercicio() {
            if (this.ejercicio != '' && this.series != '' && this.reps != '') {
                let nombre = ''
                this.ejercicios.forEach(ejercicio => {
                    if (this.ejercicio == ejercicio.id) { nombre = ejercicio.nombre }
                })
                let obj = {
                    id: this.ejercicio,
                    nombre: nombre,
                    series: this.series,
                    reps: this.reps
                } 
                this.listaEjercicios.push(obj)
                this.ejercicio = ''
                this.series = ''
                this.reps = ''
                this.aniadir = false
            }
        }
    },
    created() {
        this.crear()
    }
}
</script>

<style>
    .aniadirEj {
        background-color: gray;
        padding: 1rem;
        border-radius: 5px;
    }
</style>