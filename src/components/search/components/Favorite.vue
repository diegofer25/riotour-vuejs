<template>
  <div class="text-black">
    <h4>Locais Favoritos</h4>
    <div class="col s10" v-if="favorites.length > 0">
      <resultcars :isFavorite="true" :placesDetails="favorites"></resultcars>
    </div>
    <div class="col s10" v-else>
      <h5>Você ainda não favoritou nenhum local, faça uma busca e favorite os locais que mais gostou :)</h5>
    </div>
  </div>
</template>

<script>
import {db} from '../../../firebase'
import ResquestDetails from './ResquestDetails'

export default {
  name: 'Favorite',

  firebase: {
    favorites: db.ref('users/' + (JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).uid : '@nonimus') + '/favorites')
  },

  components: {
    resultcars: ResquestDetails
  }
}
</script>
