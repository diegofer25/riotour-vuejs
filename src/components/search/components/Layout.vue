<template>
  <div class="fade white-text">
    <header>
      <nav class="teal darken-1">
        <div class="nav-wrapper">
          <button data-activates="slide-out" class="left btn button-collapse">
            <span class="fa fa-bars"></span>
          </button>
          <div>
            <img class="grey-text text-lighten-4 right" width="80px" src="../../../assets/riotour-logo.png" />
            <span>{{title}}</span>
          </div>
        </div>
      </nav>
    </header>

    <ul id="slide-out" class="side-nav teal darken-4">
      <li class="center-align">
        <h4>Bem Vindo</h4>
      </li>
      <li>
        <span>{{user.displayName}}</span>
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
import RequestPlaces from './RequestPlaces'
import $ from 'jquery'

export default {
  name: 'Layout',
  props: {
    user: ''
  },
  mounted () {
    $('select').material_select()
    $('.collapsible').collapsible()
    $('.button-collapse').sideNav()
    $('.modal').modal()
  },
  data () {
    return {
      title: 'Rio Tour'
    }
  },
  components: {
    formsearch: RequestPlaces
  }
}
</script>

<style>
.fade {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
