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
        <button @click="googleLogin()" class="btn waves-effect waves-light col s12 m2 l2 offset-m2 offset-l2 deep-orange darken-4 mt-1">
          <span class="fa fa-google-plus"></span>
        </button>
        <button @click="facebookLogin()" class="btn col s12 m2 l2 offset-m1 offset-l1 light-blue darken-4 mt-1">
          <span class="fa fa-facebook"></span>
        </button>
        <button @click="twitterLogin()" class="btn col s12 m2 l2 offset-m1 offset-l1 light-blue darken-1 mt-1">
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
          this.user = user
          this.processAutenticate()
        })
        .catch((e) => {
          if (e.code === 'auth/wrong-password') {
            M.toast('Senha inválida', 3000)
          } else if (e.code === 'auth/user-not-found') {
            M.toast('Usuário não encontrado', 3000)
          }
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
      let facebookLoginInstance = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(facebookLoginInstance)
        .then((response) => {
          console.log(response)
          this.user = response.user
          this.processAutenticate()
        })
        .catch((e) => {
          console.log(e)
        })
    },

    twitterLogin () {
      let twitterLoginInstance = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(twitterLoginInstance)
        .then((response) => {
          console.log(response)
          this.user = response.user
          this.processAutenticate()
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style>
  body {
    background-image: url('../assets/background-fade.jpg');
    height: 100%;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
