<template>
    <div>
        <h3>{{usuarioEditar.nombre}}</h3>
        <b-button class="btn-block btn-sm mb-2" @click="goCrearRutina(id)">Crear Rutina</b-button>
        <h5>Rutinas</h5>
        <b-list-group>
            <b-list-group-item v-for="rutina of rutinas" :key="rutina.id">
                <span>{{rutina.nombre}}</span>
                <b-button class="btn-sm float-right" @click="verClienteRutina(rutina.id)">Ver</b-button>
            </b-list-group-item>
        </b-list-group>


    </div>
</template>

<script>
import { db } from '../../firebase'
import router from '../../router'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'ClienteVer',
    data() {
        return {
            id: this.$route.params.id,
            usuarioEditar: '',
            rutinas: [],
        }
    },
    methods: {
        //CREAR LA VIEW (CREATED)
        async crear() {
            this.getUsuarioEditar()
        },
        //OBTENER INFORMACION DEL USUARIO (METHODS/CREAR)
        async getUsuarioEditar() {
            var res = await db.collection('usuarios').doc(this.id).get()
            this.usuarioEditar = res.data()
            var res2 = await db.collection('rutinasPersonalizadas').get()
            var datos = []
            res2.forEach(doc => {
                var datos2 = doc.data()
                if (datos2.cliente == this.id) {
                    datos2.id = doc.id
                    this.rutinas.push(datos2)
                }
            })
        },
        //CREAR UNA RUTINA PERSONALIZADA PARA EL CLIENTE
        goCrearRutina(id) {
            router.push({name: 'ClientesCrearRutina', params: {id: id}})
        },
        //VER LA RUTINA SELECCIONADA
        verClienteRutina(id) {
            router.push({name: 'ClienteVerRutina', params: {id: id, idCliente: this.id}})
        }
    },
    created() {
        this.crear()
    }
}
</script>