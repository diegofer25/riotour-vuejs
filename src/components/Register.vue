<template>
  <div id="register" class="container center white-text">
    <div class="row">
      <p>
        <img  width="210px" src="../assets/riotour-logo.png" />
        {{title}}<br>
      </p>
    </div>
    <div class="form-login">
      <form class="form center-align" @submit="register">
        <div class="input-field">
          <input type="text" v-model="formRegister.name" required>
          <label>Nome</label>
        </div>
        <div class="input-field">
          <input type="email" v-model="formRegister.email" required>
          <label>E-mail</label>
        </div>
        <div class="input-field">
          <input type="password" v-model="formRegister.password" required>
          <label>Senha</label>
        </div>
        <div class="row">
          <router-link class="btn waves-effect waves-light cyan darken-3 mt-2 col s3" :to="'/'">Voltar</router-link>
          <button type="submit" class="btn waves-effect mt-2 col s6 offset-s3">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router/index.js'
import userObject from './user.js'

export default {
  name: 'Register',
  data () {
    return {
      title: 'Rio Tour',
      formRegister: {
        name: '',
        email: '',
        password: ''
      },
      userInfo: {}
    }
  },
  methods: {
    register (e) {
      firebase.auth().createUserWithEmailAndPassword(this.formRegister.email, this.formRegister.password)
        .then((user) => {
          userObject.profile = user
          this.processAutenticate()
          this.isAuthenticate()
        })
        .catch((e) => {
          console.log(e)
        })
      e.preventDefault()
    },
    processAutenticate () {
      userObject.profile.updateProfile({
        displayName: this.formRegister.name ? this.formRegister.name : '',
        phoneNumber: this.formRegister.phone ? this.formRegister.phone : ''
      })
      userObject.profile.sendEmailVerification()
    },
    isAuthenticate () {
      sessionStorage.setItem('auth', true)
      console.log(userObject.profile)
      router.push('/search')
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

  .toast {
    transition: ease-in 0.5ms
  }

  body {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  #register {
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

  @media (max-width: 600px) {
    .form-login {
      margin: 0 auto;
      padding: 0 20px 0 20px;
      width: 90%;
    }
  }
</style>
