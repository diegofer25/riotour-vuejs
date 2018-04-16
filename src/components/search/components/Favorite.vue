<template>
  <div class="text-black">
    <h4>Locais favoritos</h4>
    <button @click="teste()">click</button>
    <div class="col s10">
      <resultcars :placesDetails="favorites"></resultcars>
    </div>
  </div>
</template>

<script>
import {favoritesRef} from '../../../firebase'

export default {
  name: 'Favorite',
  data () {
    return {
      user: JSON.parse(sessionStorage.getItem('user'))
    }
  },

  firebase: function () {
    return {
      favorites: favoritesRef.once('value')
    }
  },

  methods: {
    teste () {
      console.log(this.user)
      console.log(this.favorites)
    }
  }
}
</script>
