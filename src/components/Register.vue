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

export default {
  name: 'Register',
  data () {
    return {
      title: 'Rio Tour',
      formRegister: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.formRegister.email, this.formRegister.password)
        .then((user) => {
          user.updateProfile({displayName: this.formRegister.name})
          user.sendEmailVerification()
          sessionStorage.setItem('auth', true)
          router.push('/search')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style>
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
