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
          <button type="submit" class="btn waves-effect mt-2 col s5 m4 l4">Login</button>
          <router-link class="btn waves-effect waves-light cyan darken-3 mt-2 col s5 m4 l4 offset-s1 right" :to="'/register'">Registrar</router-link>
        </div>
      </form>
      <div class="row">
        <button @click="googleLogin()" class="btn waves-effect waves-light btn-facebook col s12  m10 l8 offset-m1 offset-l2 deep-orange darken-4">
          <span class="fa fa-google-plus"></span> Login com Google
        </button>
        <button @click="facebookLogin()" class="btn btn-facebook col s12  m10 l8 offset-m1 offset-l2 light-blue darken-4 mt-1">
          <span class="fa fa-facebook"></span> Login com Facebook
        </button>
        <button @click="twitterLogin()" class="btn btn-facebook col s12  m10 l8 offset-m1 offset-l2 light-blue darken-1 mt-1">
          <span class="fa fa-twitter"></span> Login com Twitter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'Materialize-css'
import firebase from 'firebase'
import router from '../router/index.js'

export default {
  name: 'Index',
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
        .then((user) => {
          sessionStorage.setItem('auth', true)
          router.push('/search')
        })
        .catch((e) => {
          console.log(e)
        })
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
