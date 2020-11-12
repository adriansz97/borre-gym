<template>
    <div>
        <h1>{{rutina.nombre}}</h1>
        <h5>{{rutina.desc}}</h5>
        <b-list-group class="mb-2">
            <b-list-group-item v-for="(ejercicio, index) of rutina.listaEjercicios" :key="index">
                <span>{{ejercicio.nombre}} - {{ejercicio.series}}x{{ejercicio.reps}}</span>
            </b-list-group-item>
        </b-list-group>
        <b-button variant="danger" class="btn-sm btn-block" @click="eliminarRutina">Eliminar Rutina</b-button>
    </div>
</template>

<script>
import { db } from '../../firebase'
import router from '../../router'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'ClienteVerRutina',
    data() {
        return {
            id: this.$route.params.id,
            idCliente: this.$route.params.idCliente,
            rutina: ''
        }
    },
    methods: {
        async crear() {
            await this.getRutina()
        },
        async getRutina() {
            try {
                let res = await db.collection('rutinasPersonalizadas').doc(this.id).get()
                res = res.data()
                this.rutina = res
            } catch (error) { console.log(error) }
        },
        async eliminarRutina() {
            await db.collection('rutinasPersonalizadas').doc(this.id).delete()
            router.push({name: 'ClienteVer', params: {id: this.idCliente}})
        }
    },
    created() {
        this.crear()
    }

}
</script>