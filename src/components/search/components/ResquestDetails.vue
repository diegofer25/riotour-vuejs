<template>
  <div class="container">
    <div :class="isFavorite ? '' : 'cards-container'" v-if="placesDetails">
      <div class="card hoverable" v-for="place in placesDetails" :key="place.place_id">
        <div class="card-image waves-effect waves-block" v-if="place.photos && !isFavorite">
          <img width="100%" :src="place.photos[0].getUrl({'maxWidth': 600, 'maxHeight': 600})">
        </div>
        <div class="card-image waves-effect waves-block" v-else>
          <img width="100%" :src="place.photos">
        </div>
        <div class="card-content">
          <div class="row">
            <span class="card-title grey-text text-darken-4">
              <strong>{{place.name}}</strong> -
              <img src="../../../assets/star.png" width="20px">
              {{place.rating ? place.rating : 'Não Avaliado'}}
              <a v-if="!isFavorite" :href="'#' + place.place_id" class="btn btn-floating right pulse modal-trigger tooltipped"
                data-position="bottom" data-delay="20" data-tooltip="Detalhes">
                <span class="fa fa-search-plus"></span>
              </a>
            </span>
          </div>
          <div class="row center-align">
            <p>
              <a class="btn col s4 offset-s1 center-align tooltipped" :href="place.url" target="_blank" data-position="bottom" data-delay="20" data-tooltip="Ver no mapa">
                <span class="fa fa-map-o"></span>
              </a>
              <a v-if="place.website" class="btn col s4 offset-s2 center-align tooltipped" :href="place.website" target="_blank" data-position="bottom" data-delay="20" data-tooltip="Visite o site">
                <span class="fa fa-globe"></span>
              </a>
            </p>
            <div class="row"></div>
            <p v-if="isFavorite">
              <span>{{place.vicinity}}</span>
              <br>Telefone:
              <span>{{place.formatted_phone_number ? place.formatted_phone_number : 'Não Informado'}}</span>
              <br><br>
              <button class="btn hoverable" @click="removeFavorite(place, place['.key'])">Remover</button>
            </p>
          </div>
        </div>
        <placemodal :isFavorite="isFavorite" :place="place"></placemodal>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'Materialize-css'
import {db} from '../../../firebase'
import $ from 'jquery'
import PlaceModal from './PlaceModal'

export default {
  name: 'ResultCards',

  data () {
    return {
      user: ''
    }
  },

  mounted () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  },

  props: {
    placesDetails: '',
    isFavorite: ''
  },

  updated () {
    $('.tooltipped').tooltip({delay: 50})
    $('.modal').modal()
  },

  methods: {
    removeFavorite (place, key) {
      M.toast(place.name + ' removido dos favoritos', 3000)
      db.ref('users/' + (this.user ? this.user.uid : '@nonimus') + '/favorites').child(key).remove()
    }
  },

  components: {
    placemodal: PlaceModal
  }
}
</script>

<style>
  .mb-5 {
    margin-bottom: 50px;
  }

.divider {
  background-color: rgba(255,255,255,0.3);
}

.cards-container {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}
.cards-container .card {
  display: inline-block;
  overflow: visible;
}

.card .card-reveal{
  padding: 10px;
}

@media only screen and (max-width: 600px) {
  .cards-container {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
  }
}

@media only screen and (max-width: 705px) {
  #app{
    width: 100%;
  }
}
@media only screen and (min-width: 601px) {
  .cards-container {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
}
@media only screen and (min-width: 993px) {
  .cards-container {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }
}
@media only screen and (min-width : 600px) {
  #toast-container {
    min-width: 8% !important;
    top: 80% !important;
    right: 42% !important;
  }
}

.text-center {
  text-align: center;
}

.input-field input[type=date]:focus + label,
.input-field input[type=text]:focus + label,
.input-field input[type=email]:focus + label,
.input-field input[type=password]:focus + label {
  color: #e91e63;
}

.input-field input[type=date]:focus,
.input-field input[type=text]:focus,
.input-field input[type=email]:focus,
.input-field input[type=password]:focus {
  border-bottom: 2px solid #e91e63;
  box-shadow: none;
}

.panel{
  display: inline-block;
  padding: 32px 48px 0px 48px;
  border: 1px solid #EEE;
  border-radius: 3px;
}

.modal, .bottom-sheet{
  max-height: 90% !important;
}
</style>
