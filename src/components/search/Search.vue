<template>
  <div class="parallax">
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
    background-image: url('../../assets/background-fade.jpg') !important;
    height: 100% !important;
    background-attachment: fixed !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
</style>
