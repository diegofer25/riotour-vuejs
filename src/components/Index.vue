<template>
  <div class="container">
    <h1>{{welcome}}</h1>
    <div class="row">
      <router-link :to="'Search'" class="btn btn-primary">Buscar</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      welcome: 'Vue + Vue-router'
    }
  }
}
</script>

<style>

</style>
