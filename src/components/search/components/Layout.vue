<template>
  <div class="fade white-text">
    <header>
      <div class="navbar-fixed">
        <nav class="teal darken-1">
          <div class=" container nav-wrapper">
            <button data-activates="slide-out" class="left btn button-collapse">
              <span class="fa fa-bars"></span>
            </button>
            <div class="brand-logo center">
              <img class="grey-text text-lighten-4 pt-05" width="120px" src="../../../assets/riotour-logo.png" />
            </div>
          </div>
        </nav>
      </div>
    </header>

    <ul id="slide-out" class="side-nav teal darken-4 ml-2 center-align">
      <li>
        <h4>{{title}}</h4>
      </li>
      <li>
        <img :src="user.photoURL ? user.photoURL : ''" width="70px" class="circle responsive-img">
      </li>
      <li>
        <span>
          Bem vindo(a) {{user.displayName}}
         </span>
      </li>
      <li></li>
      <li></li>
      <li>
        <a class="sidenav-close">
          <button class="btn" @click="logoff()">
            <span class="fa fa-power-off"></span> Sair
          </button>
        </a>
      </li>
    </ul>

    <formsearch></formsearch>

    <footer class="page-footer teal darken-2">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Rio Tour</h5>
            <p class="grey-text text-lighten-4">O seu guia turístico</p>
          </div>
        </div>
      </div>
      <div class="footer-copyright teal darken-3">
        <div class="container">© 2018 Diego Lamarão
          <img class="grey-text text-lighten-4 right" width="80px" src="../../../assets/riotour-logo.png" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import router from '../../../router/index.js'
import RequestPlaces from './RequestPlaces'
import $ from 'jquery'

export default {
  name: 'Layout',
  data () {
    return {
      title: 'Rio Tour',
      user: ''
    }
  },
  beforeMount () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  },
  mounted () {
    $('select').material_select()
    $('.collapsible').collapsible()
    $('.button-collapse').sideNav()
    $('.modal').modal()
  },
  components: {
    formsearch: RequestPlaces
  },
  methods: {
    logoff () {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('auth')
      router.push('/')
    }
  }
}
</script>

<style>
.fade {
  background-color: rgba(0, 0, 0, 0.6);
}

ul li span, ul li a {
  font-size: 1.1em;
  color: white !important;
}

.pt-05 {
  padding-top: 5px;
}
</style>
