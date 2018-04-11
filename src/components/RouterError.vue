<template>
  <div class="row">
    <div class="col s12 center-align">
      <img src="../assets/error.png" alt="Página não encontrada">
    </div>
    <div class="col s12 center-align">
      <router-link
        class="btn waves-effect waves-light cyan darken-3 mt-2" :to="'/'">
        Voltar ao menu</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouterError'
}
</script>

<style>
  body {
    background-color: lightblue;
  }
</style>
