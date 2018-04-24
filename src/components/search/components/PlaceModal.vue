<template>
  <div v-if="!isFavorite" :id="place.place_id" class="modal bottom-sheet black-text">
    <div class="container modal-content">
      <div class="col s12 m10 l8 offset-m1 offset-l2">
        <span class="card-title grey-text text-darken-4">
          <div class="row">
            <strong>{{place.name}}</strong> -
            <img src="../../../assets/star.png" width="20px">
            {{place.rating ? place.rating : 'Não valiado'}}
            <button @click="closeModal(place.place_id)" class="btn btn-floating right">
              <span class="fa fa-times"></span>
            </button>
          </div>
        </span>
        <div class="slider" v-if="place.photos">
          <ul class="slides">
            <li v-for="photo in place.photos" :key="photo['.key']">
              <img :src="photo.getUrl({'maxWidth': 1024, 'maxHeight': 512})">
            </li>
          </ul>
        </div>
        <div class="caption center-align">Endereço:
          <span>{{place.vicinity}}</span>
          <br>Telefone:
          <span>{{place.formatted_phone_number ? place.formatted_phone_number : 'Não Informado'}}</span>
          <br>Avaliação:
          <span>{{place.rating ? place.rating : 'Não Avaliado'}}</span>
        </div>
        <div class="row">
          <a class="btn col s2 tooltipped" :href="place.url" target="_blank"
            data-position="bottom" data-delay="20" data-tooltip="Mapa">
            <span class="fa fa-map-o"></span>
          </a>
          <a v-if="place.website" class="btn col s2 offset-s1 tooltipped" :href="place.website" target="_blank"
            data-position="bottom" data-delay="20" data-tooltip="Site">
            <span class="fa fa-globe"></span>
          </a>
          <a class="btn col s2 offset-s5 floating right tooltipped" @click="saveFavorite(place)"
            data-position="bottom" data-delay="20" data-tooltip="Favoritar">
            <span class="fa fa-star"></span>
          </a>
        </div>
        <div class="row" v-if="place.reviews">
          <h5>Veja os comentários sobre lugar</h5>
          <p>
            <ul class="collapsible popout" data-collapsible="accordion">
              <li v-for="review in place.reviews" :key="review['.key']">
                <div class="collapsible-header" @click="accordionOpen(review.author_name)">
                  <img width="50px" height="50px" :src="review.profile_photo_url" />
                  {{review.author_name}} deu nota:
                  <strong>{{review.rating}}</strong>
                </div>
                <div class="collapsible-body">
                  <span>
                    <p>{{review.text}}
                      <br>
                      <span class="right">{{review.relative_time_description}}</span>
                    </p>
                  </span>
                </div>
              </li>
            </ul>
          </p>
        </div>
      </div>
      <div class="modal-footer">
        <div class="row"></div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'Materialize-css'
import $ from 'jquery'
import {db} from '../../../firebase'

export default {
  name: 'PlaceModal',

  data () {
    return {
      user: ''
    }
  },

  props: {
    place: '',
    isFavorite: false
  },

  beforeMount () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  },

  firebase: function () {
    return {
      favorites: db.ref('users/' + (JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).uid : '@nonimus') + '/favorites')
    }
  },

  methods: {
    closeModal (id) {
      $('#' + id).modal('close')
    },

    accordionOpen (key) {
      $('.collapsible').collapsible('open', key)
    },

    saveFavorite (place) {
      let isNotFavorite = true
      this.favorites.forEach(favorite => {
        if (favorite.place_id === place.place_id) {
          isNotFavorite = false
        }
      })
      if (isNotFavorite) {
        db.ref('users/' + (this.user ? this.user.uid : '@nonimus') + '/favorites').push({
          'place_id': place.place_id,
          'name': place.name ? place.name : '',
          'vicinity': place.vicinity ? place.vicinity : '',
          'formatted_phone_number': place.formatted_phone_number ? place.formatted_phone_number : '',
          'rating': place.rating ? place.rating : '',
          'url': place.url,
          'website': place.website ? place.website : '',
          'photos': place.photos ? place.photos[0].getUrl({'maxWidth': 600, 'maxHeight': 600}) : ''
        })
        this.closeModal(place.place_id)
        M.toast(place.name + ' salvo nos seus favoritos com sucesso', 3000)
      } else {
        M.toast(place.name + ' já está salvo em seus favoritos', 3000)
      }
    }
  }
}
</script>
