<template>  
    <div>
        <h1>Entrenador</h1>
        <div class="tarjeta tj-usuarios" @click="goClientes">
            <h5>Clientes asignados</h5>
            <p>Aquí puedes ver los clientes que tienes asignados y crearle una o varias rutinas.</p>
        </div>
    </div>
</template>

<script>
import router from '../../router'
import { mapState } from 'vuex'

export default {
    name: 'InicioEntrenador',
    methods: {
        goClientes() {
            router.push('/clientesAsignados')
        }
    }
}
</script>




<style>
    .tarjeta {
        height: 150px;
        width: auto;
        margin: 15px auto;
        padding: 8px;
        border: 1px solid rgb(50, 50, 50);
        border-radius: 8px;
        background-size: cover;
        background-position: 50% 20%;
        color: white;
        font-weight: 700;
        cursor: pointer;
    }
    .tj-usuarios {
        background-image: url('https://diabeticmuscleandfitness.com/wp-content/uploads/2017/05/Diabetic-Mass-Banner.jpg');
    }
    .tj-rutinas{
        background-image: url('https://workoutmx.com/wp-content/uploads/2019/04/universal-physique-gym-banner-1.jpg');
    }
    .tj-ejercicios {
        background-image: url('https://images.squarespace-cdn.com/content/v1/5602f32ae4b0dd583faee255/1443043900734-7UQB0Y6C39J00E95BMVH/ke17ZwdGBToddI8pDm48kGERn2N2qY0C7_91AG2cqF8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcK0gdKZ4shs6K02V4AZZ7QsQBOXSlkJbjr3i_PLelN9nhp7wDltvhrK9fUq6xCsLc/Store_Banner.jpg?format=2500w');
    }
</style>