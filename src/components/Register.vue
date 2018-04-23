<template>
  <div id="register" class="container center white-text">
    <div class="row">
      <img  width="210px" src="../assets/riotour-logo.png" />
      <h3>Rio Tour</h3>
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
          <router-link class="btn waves-effect waves-light cyan darken-3 mt-2 col s4 m3 l3" :to="'/'">Voltar</router-link>
          <button type="submit" class="btn mt-2 col s6 offset-s2 offset-m3 offset-l3">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '../router/index.js'
import M from 'Materialize-css'

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
      user: ''
    }
  },
  methods: {
    register (e) {
      if (this.formRegister.password.length >= 6) {
        firebase.auth().createUserWithEmailAndPassword(this.formRegister.email, this.formRegister.password)
          .then((user) => {
            this.user = user
            this.processAutenticate()
            this.isAuthenticate()
          })
          .catch((e) => {
            if (e.code === 'auth/invalid-email') {
              M.toast('Formato de e-mail inválido', 4000)
            }
          })
      } else {
        M.toast('Sua senha deve conter pelo menos 6 digitos', 4000)
      }
      e.preventDefault()
    },
    processAutenticate () {
      this.user.updateProfile({
        displayName: this.formRegister.name ? this.formRegister.name : null,
        phoneNumber: this.formRegister.phone ? this.formRegister.phone : null
      })
      this.user.sendEmailVerification()
    },
    isAuthenticate () {
      sessionStorage.setItem('auth', true)
      sessionStorage.setItem('user', JSON.stringify(this.user))
      router.push('/search')
    }
  }
}
</script>

<style>
  html {
    width: 100%;
    height: 100%;
    background: url("../assets/background-fade.jpg") no-repeat;
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
