<template>
  <div id="app">
    <!-- NAVBAR ADMIN -->
      <b-navbar toggleable="lg" type="dark" variant="dark" class="mb-3" v-if="usuario != ''">
        <b-container>
          <b-navbar-brand>{{usuario.email}} <i class="fas fa-dumbbell"></i></b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/" v-if="infoUsuario.tipo == 'admin'">Inicio</b-nav-item>
              <b-nav-item to="/entrenador" v-if="infoUsuario.tipo == 'entrenador'">Inicio</b-nav-item>
              <b-nav-item to="/cliente" v-if="infoUsuario.tipo == 'cliente'">Inicio</b-nav-item>
              <b-nav-item @click="cerrarSesion" v-if="usuario != ''">Cerrar Sesión</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>

    <!-- CONTENIDO -->
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['usuario', 'infoUsuario'])
  },
  methods: {
    ...mapActions(['cerrarSesion', 'getInfoUsuario'])
  },
  created() {
    this.getInfoUsuario()
    console.log('ddedede');
  }
}
</script>

<style>

.navbar-toggler  {
  padding: 0px;
}

</style>
