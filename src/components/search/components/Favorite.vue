<template>
  <div class="text-black">
    <h4>Locais Favoritos</h4>
    <div class="col s10">
      <resultcars :isFavorite="true" :placesDetails="favorites"></resultcars>
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

  firebase: {
    favorites: favoritesRef
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
