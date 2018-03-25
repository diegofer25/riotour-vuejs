<template>
  <div class="parallax">
    <layout :user="user"></layout>
  </div>
</template>

<script>
// import { tarefasRef } from '../../firebase'
// import userObject from '../user.js'
import Layout from './components/Layout'
import userObject from '../user.js'

export default {
  name: 'Search',
  data () {
    return {
      title: 'Buscar Local',
      user: userObject
    }
  },
  components: {
    layout: Layout
  }
}
</script>

<style scoped>
body, html {
  height: 100%;
}

.parallax {
  background-image: url('../../assets/background.jpg');
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
