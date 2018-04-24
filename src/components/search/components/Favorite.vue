<template>
  <div class="text-black">
    <h4>Locais Favoritos</h4>
    <div class="col s10">
      <resultcars :isFavorite="true" :placesDetails="favorites"></resultcars>
    </div>
  </div>
</template>

<script>
import {db} from '../../../firebase'
import ResquestDetails from './ResquestDetails'

export default {
  name: 'Favorite',

  firebase: function () {
    return {
      favorites: db.ref('users/' + (JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).uid : '@nonimus') + '/favorites')
    }
  },

  components: {
    resultcars: ResquestDetails
  }
}
</script>
