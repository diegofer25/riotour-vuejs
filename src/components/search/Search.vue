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
