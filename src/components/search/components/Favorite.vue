<template>
  <div class="text-black">
    <h4>Locais favoritos</h4>
    <button @click="teste()">teste</button>
    <div class="col s10">
      <resultcars :placesDetails="favorites"></resultcars>
    </div>
  </div>
</template>

<script>
import {favoritesRef} from '../../../firebase'
import ResquestDetails from './ResquestDetails'

export default {
  name: 'Favorite',
  data () {
    return {
      user: JSON.parse(sessionStorage.getItem('user'))
    }
  },

  computed: {
    favorites: function () {
      return favoritesRef
    }
  },

  methods: {
    teste () {
      console.log(this.favorites)
    }
  },

  components: {
    resultcars: ResquestDetails
  }
}
</script>
