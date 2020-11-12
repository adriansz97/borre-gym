import Vue from 'vue'
import Vuex from 'vuex'
import {auth, auth2, db} from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //usuario iniciado
        usuario: '',
        infoUsuario: '',
        msj: '',
        //ADMIN
        usuarios: [],
        usuarioEditar: '',
        ejercicios: [],
        ejercicioEditar: '',
        rutinas: [],
        rutinaEditar: ''
    },
    mutations: {
    },
    actions: {
        //LOGIN
        //INICIAR SESION (LOGIN.VUE submit)
        async iniciarSesion({state}, usuario) {
            try {
                const res = await auth.signInWithEmailAndPassword(usuario.email, usuario.pass)
                const user = { uid: res.user.uid, email: res.user.email }
                state.usuario = user
                const res2 = await db.collection('usuarios').doc(res.user.email).get()
                state.infoUsuario = res2.data()
                if (state.infoUsuario.tipo == 'admin') {
                    router.push('/')
                } else if (state.infoUsuario.tipo == 'entrenador') {
                    router.push('/entrenador')
                } else if (state.infoUsuario.tipo == 'cliente') {
                    router.push('/cliente')
                }
            } catch (error) { console.log(error) }
        },
        async getInfoUsuario({state}) {
            const res2 = await db.collection('usuarios').doc(state.usuario.email).get()
            state.infoUsuario = res2.data()
            if (state.infoUsuario.tipo == 'admin') {
                router.push('/')
            } else if (state.infoUsuario.tipo == 'entrenador') {
                router.push('/entrenador')
            } else if (state.infoUsuario.tipo == 'cliente') {
                router.push('/cliente')
            }
        },
        //CERRAR SESION (APP.VUE click)
        async cerrarSesion({state}) {
            try {
                await auth.signOut()
                router.push('/login')
            } catch (error) { console.log(error) }
        },


        //USUARIOS
        //OBTENER USUARIOS (/ADMIN/USUARIOS.VUE created)
        async getUsuarios({state}) {
            try {
                var usuarios = []
                var result = await db.collection('usuarios').get()
                result.forEach( usuario => {
                    var user = usuario.data()
                    user.id = usuario.id
                    usuarios.push(user)
                })
                state.usuarios = usuarios
            } catch (error) { console.log(error) }
        },
        //CREAR USUARIOS (/ADMIN/USUARIOSCREAR.VUE submit)
        async crearUsuario({commit}, usuario) {
            try {
                await auth2.createUserWithEmailAndPassword(usuario.email, usuario.password)
                await db.collection('usuarios').doc(usuario.email).set({ nombre: usuario.nombre, tipo: usuario.tipo, estado: 'true' })
                await auth2.signOut()
                router.push('/usuarios')
            } catch (error) { console.log(error) }
        },
        //OBTENER EL USUARIO PARA EDITAR (/ADMIN/USUARIOSEDITAR.VUE created)
        async getEditarUsuario({state}, id) {
            try {
                var res = await db.collection('usuarios').doc(id).get()
                state.usuarioEditar = res.data()
            } catch (error) { console.log(error) }
        },
        //EDITAR EL USUARIO SELECCIONADO (/ADMIN/USUARIOSEDITAR.VUE submit)
        async editarUsuario({commit}, usuario) {
            try {
                await db.collection('usuarios').doc(usuario.id).update({ nombre: usuario.nombre, tipo: usuario.tipo, estado: usuario.estado })
                router.push('/usuarios')
            } catch (error) { console.log(error) }
        },


        //EJERCICIOS
        //OBTENER EJERCICIOS (/ADMIN/EJERCICIOS.VUE created)
        async getEjercicios({state}) {
            try {
                var ejercicios = []
                var result = await db.collection('ejercicios').get()
                result.forEach( ejercicio => {
                    var exer = ejercicio.data()
                    exer.id = ejercicio.id
                    ejercicios.push(exer)
                })
                state.ejercicios = ejercicios
            } catch (error) { console.log(error) }
        },
        //CREAR UN NUEVO EJERCICIO (/ADMIN/EJERCICIOSCREAR.VUE)
        async crearEjercicio({commit}, ejercicio) {
            try {
                await db.collection('ejercicios').add({ nombre: ejercicio.nombre, desc: ejercicio.desc })
                router.push('/ejercicios')
            } catch (error) { console.log(error) }
        },
        //OBTENER EL EJERCICIO PARA EDITAR (/ADMIN/EJERCICIOSEDITAR.VUE created)
        async getEditarEjercicio({state}, id) {
            try {
                var res = await db.collection('ejercicios').doc(id).get()
                state.ejercicioEditar = res.data()
            } catch (error) { console.log(error) }
        },
        //EDITAR EL EJERCICIO SELECCIONADO (/ADMIN/EJERCICIOSEDITAR.VUE submit)
        async editarEjercicio({commit}, ejercicio) {
            try {
                await db.collection('ejercicios').doc(ejercicio.id).update({ nombre: ejercicio.nombre, desc: ejercicio.desc })
                router.push('/ejercicios')
            } catch (error) { console.log(error) }
        },
        //ELIMINAR EL EJERCICIO SELECCIONADO (/ADMIN/EJERCICIOSEDITAR.VUE submit)
        async eliminarEjercicio({commit}, id) {
            try {
                await db.collection('ejercicios').doc(id).delete()
                router.push('/ejercicios')
            } catch (error) { console.log(error) }
        },
        //DETECTAR USUARIO (MAIN)
        detectarUsuario({state}, usuario) {
            state.usuario = usuario
        },


        //RUTINAS
        //OBTENER RUTINAS
        async getRutinas({state}) {
            var rutinas = []
            var result = await db.collection('rutinas').get()
            result.forEach(rutina => {
                var rut = rutina.data()
                rut.id = rutina.id
                rutinas.push(rut)
            })
            state.rutinas = rutinas
        },
        //CREA UNA RUTINA
        async crearRutina({commit}, rutina) {
            try {
                await db.collection('rutinas').add({ nombre: rutina.nombre, desc: rutina.desc, listaEjercicios: rutina.listaEjercicios })
                router.push('/rutinas')
            } catch (error) { console.log(error) }
        },
        //OBTENER UNA RUTINA PARA EDITARLA O ELIMINARLA
        async getEditarRutina({state}, id) {
            try {
                let result = await db.collection('rutinas').doc(id).get()
                var obj = result.data()
                obj.id = result.id
                state.rutinaEditar = obj
            } catch (error) { console.log(error) }
        },
        //ELIMINAR LA RUTINA SELECCIONADA
        async eliminarRutina({commit}, id) {
            await db.collection('rutinas').doc(id).delete()
            router.push('rutinas')
        }
    },
    modules: {
    }
})
