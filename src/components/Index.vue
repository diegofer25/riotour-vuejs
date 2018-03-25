<template>
  <div id="index" class="container center white-text">
    <div class="row">
      <p>
        <img  width="210px" src="../assets/riotour-logo.png" />
        {{title}}<br>
      </p>
    </div>
    <div class="form-login">
      <form class="form center-align" @submit="login">
        <div class="input-field">
          <input type="email" v-model="formLogin.email" required>
          <label>E-mail</label>
        </div>
        <div class="input-field">
          <input type="password" v-model="formLogin.password" required>
          <label>Senha</label>
        </div>
        <div class="row">
          <button type="submit" class="btn waves-effect mt-2 col s6">Login</button>
          <router-link class="btn waves-effect waves-light cyan darken-3 mt-2 col s5 m4 l4 offset-s1 offset-m2 offset-l2 right" :to="'/register'">Registrar</router-link>
        </div>
      </form>
      <div class="row">
        <button @click="googleLogin()" class="btn tooltipped waves-effect waves-light col s12 m2 l2 offset-m2 offset-l2 deep-orange darken-4 mt-1"
        data-position="bottom" data-tooltip="Google +">
          <span class="fa fa-google-plus"></span>
        </button>
        <button @click="facebookLogin()" class="btn tooltipped col s12 m2 l2 offset-m1 offset-l1 light-blue darken-4 mt-1"
        data-position="bottom" data-tooltip="Facebook">
          <span class="fa fa-facebook"></span>
        </button>
        <button @click="twitterLogin()" class="btn tooltipped col s12 m2 l2 offset-m1 offset-l1 light-blue darken-1 mt-1"
        data-position="bottom" data-tooltip="Twitter">
          <span class="fa fa-twitter"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'Materialize-css'
import firebase from 'firebase'
import router from '../router/index.js'
import $ from 'jquery'

export default {
  name: 'Index',
  mounted () {
    $('.tooltipped').tooltip()
  },
  data () {
    return {
      title: 'Rio Tour',
      formLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login (e) {
      firebase.auth().signInWithEmailAndPassword(this.formLogin.email, this.formLogin.password)
        .then((user) => {
          sessionStorage.setItem('auth', true)
          router.push('/search')
        })
        .catch((e) => {
          console.log(e)
        })
      e.preventDefault()
    },
    googleLogin () {
      let googleLoginInstance = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(googleLoginInstance)
        .then((response) => {
          this.user = response.user
          this.processAutenticate()
        })
        .catch((e) => {
          console.log(e)
        })
    },
    processAutenticate () {
      this.user.sendEmailVerification()
      this.saveUser()
    },
    saveUser (user) {
      let strUser = JSON.stringify(this.user)
      sessionStorage.setItem('user', strUser)
      this.isAuthenticate()
    },
    isAuthenticate () {
      sessionStorage.setItem('auth', true)
      router.push('/search')
    },
    facebookLogin () {
      M.toast('Login Facebook não implementado', 3000)
      /*
      let facebookLoginInstance = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(facebookLoginInstance)
        .then((user) => {
          console.log(user)
        })
        .catch((e) => {
          console.log(e)
        })
        */
    },
    twitterLogin () {
      M.toast('Login Twitter não implementado', 3000)
      /*
      let twitterLoginInstance = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(twitterLoginInstance)
        .then((user) => {
          console.log(user)
        })
        .catch((e) => {
          console.log(e)
        })
        */
    }
  }
}
</script>

<style>
  html {
    width: 100%;
    height: 100%;
    background: url("../assets/background.jpg") no-repeat;
  }

  body {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  #index {
    padding-top: 1px;
  }

  .form-login {
    margin: 0 auto;
    padding: 0 20px 0 20px;
    width: 50%;
  }

  .mt-2 {
    margin-top: 20px;
  }

  .mt-1 {
    margin-top: 10px;
  }

  @media (max-width: 600px) {
    .form-login {
      margin: 0 auto;
      padding: 0 20px 0 20px;
      width: 90%;
    }
  }
</style>
