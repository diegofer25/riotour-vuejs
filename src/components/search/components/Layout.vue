<template>
  <div class="fade white-text">
    <header>
      <div class="navbar-fixed">
        <nav class="teal darken-1">
          <div class="container nav-wrapper">
            <button data-activates="slide-out" class="rounded button-collapse btn">
              <span class="fa fa-bars"></span>
            </button>
            <div class="brand-logo center">
              <img class="grey-text text-lighten-4 pt-05" width="110px" src="../../../assets/riotour-logo.png" />
            </div>
          </div>
        </nav>
      </div>
    </header>

    <ul id="slide-out" class="side-nav">
      <li><div class="user-view">
        <div class="background">
          <img src="../../../assets/rio.jpg" width="100%">
        </div>
        <a href="#user" v-if="user.photoURL"><img class="circle" :src="user.photoURL"></a>
        <a href="#user" v-else><img class="circle" src="../../../assets/profile.jpg"></a>
        <a href="#name"><span class="white-text name">{{user.displayName}}</span></a>
        <a href="#email"><span class="white-text email">{{user.email}}</span></a>
      </div></li>
      <li><a href="#">{{title}}</a></li>
      <li><div class="divider"></div></li>
      <li>
        <a class="modal-trigger" href="#favorites">Favoritos</a>
      </li>
      <li>
        <a class="waves-effect" @click="logoff()" href="#!">
            <span class="fa fa-power-off"></span> Logoff
          </a>
        </li>
    </ul>

    <!-- Modal Structure -->
    <div id="favorites" class="modal">
      <div class="modal-content black-text">
        <favorites></favorites>
      </div>
      <div class="modal-footer">
        <a style="cursor: pointer" class="modal-action modal-close btn btn-flat grey lighten-5 hoverable">Fechar</a>
      </div>
    </div>

    <formsearch></formsearch>

    <footer class="page-footer teal darken-2 mt-5">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Rio Tour</h5>
            <p class="grey-text text-lighten-4">O seu guia turístico</p>
          </div>
        </div>
      </div>
      <div class="footer-copyright teal darken-3">
        <div class="container">© 2018 Lamarão Softwares
          <img class="grey-text text-lighten-4 right" width="80px" src="../../../assets/riotour-logo.png" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import router from '../../../router/index.js'
import RequestPlaces from './RequestPlaces'
import Favorites from './Favorite'
import $ from 'jquery'

export default {
  name: 'Layout',
  data () {
    return {
      title: 'Bem vindo(a) ao Rio Tour',
      user: ''
    }
  },

  beforeMount () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  },

  mounted () {
    $('.collapsible').collapsible()
    $('.button-collapse').sideNav()
    $('.modal').modal()
  },

  components: {
    formsearch: RequestPlaces,
    favorites: Favorites
  },

  methods: {
    logoff () {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('auth')
      $('.button-collapse').sideNav('destroy')
      router.push('/')
    }
  }
}
</script>

<style>
  body {
    background-image: url('../../../assets/background-fade.jpg');
    min-height: 100%;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .pt-05 {
    padding-top: 5px;
  }

  .mt-5 {
    margin-top: 50px;
  }
</style>
