<template>
  <div>
    <layout></layout>
  </div>
</template>

<script>
import Layout from './components/Layout'

export default {
  name: 'Search',
  data () {
    return {
      title: 'Buscar Local'
    }
  },
  components: {
    layout: Layout
  }
}
</script>

<style>
  body {
    background-image: url('../../assets/background-fade.jpg');
    height: 100%;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
