<template>
    <div>
        <h1>Clientes</h1>
        <b-list-group>
            <b-list-group-item v-for="cliente of clientes" :key="cliente.id">
                <span>{{cliente.nombre}}</span>
                <b-button class="btn-sm float-right" @click="verCliente(cliente.id)">Ver</b-button>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { db } from '../../firebase'
import router from '../../router'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'ClientesVer',
    data() {
        return {
            clientes: []
        }
    },
    methods: {
        //CREATED
        async crear() {
            await this.getClientes()
        },
        //OBTENER CLIENTES (METHODS/CREAR)
        async getClientes() {
            const res = await db.collection('usuarios').get()
            res.forEach(doc => {
                let usuario = doc.data()
                usuario.id = doc.id
                if (usuario.tipo == 'cliente') {
                    this.clientes.push(usuario)
                }
            })
        },
        verCliente(id) {
            router.push({name: 'ClienteVer', params: {id: id}})
        }
    },
    created() {
        this.crear()
    }
}
</script>