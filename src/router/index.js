import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  //ADMIN///////////////////////////////////////////////////////////////
  {
    path: '/',
    name: 'Inicio',
    component: () => import('../views/Inicio.vue'),
    meta: {requiresAuth: true}
  },
  //USUARIOS
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('../views/admin/Usuarios.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/usCrear',
    name: 'UsuariosCrear',
    component: () => import('../views/admin/UsuariosCrear.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/usEditar/:id',
    name: 'UsuariosEditar',
    component: () => import('../views/admin/UsuariosEditar.vue'),
    meta: {requiresAuth: true}
  },
  //EJERCICIOS
  {
    path: '/ejercicios',
    name: 'Ejercicios',
    component: () => import('../views/admin/Ejercicios.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/ejCrear',
    name: 'EjerciciosCrear',
    component: () => import('../views/admin/EjerciciosCrear.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/ejEditar/:id',
    name: 'EjerciciosEditar',
    component: () => import('../views/admin/EjerciciosEditar.vue'),
    meta: {requiresAuth: true}
  },
  //RUTINAS
  {
    path: '/rutinas',
    name: 'Rutinas',
    component: () => import('../views/admin/Rutinas.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/ruCrear',
    name: 'RutinasCrear',
    component: () => import('../views/admin/RutinasCrear.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/ruEditar',
    name: 'RutinasEditar',
    component: () => import('../views/admin/RutinasEditar.vue'),
    meta: {requiresAuth: true}
  },
  //LOGIN
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  //ENTRENADOR///////////////////////////////////////////////////////////////
  {
    path: '/entrenador',
    name: 'InicioEntrenador',
    component: () => import('../views/entrenador/InicioEntrenador.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/clientesAsignados',
    name: 'ClientesVer',
    component: () => import('../views/entrenador/ClientesVer.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/clienteVer/:id',
    name: 'ClienteVer',
    component: () => import('../views/entrenador/ClienteVer.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/clientesCrearRutina/:id',
    name: 'ClientesCrearRutina',
    component: () => import('../views/entrenador/ClientesCrearRutina.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/clienteVerRutina/:id',
    name: 'ClienteVerRutina',
    component: () => import('../views/entrenador/ClienteVerRutina.vue'),
    meta: {requiresAuth: true}
  },
  //CLIENTE///////////////////////////////////////////////////////////////
  {
    path: '/cliente',
    name: 'InicioCliente',
    component: () => import('../views/cliente/InicioCliente.vue'),
    meta: {requiresAuth: true}
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const usuario = auth.currentUser
    if (!usuario) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
