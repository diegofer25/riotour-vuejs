<template>
  <div class="container">
    <div class="cards-container" v-if="placesDetails">
      <div class="card hoverable" v-for="place in placesDetails" :key="place.place_id">
        <div class="card-image waves-effect waves-block" v-if="place.photos">
          <img width="100%" :src="place.photos[0].getUrl({'maxWidth': 600, 'maxHeight': 600})">
        </div>
        <div class="card-content">
          <div class="row">
            <span class="card-title grey-text text-darken-4">
              <strong>{{place.name}}</strong> -
              <img src="../../../assets/star.png" width="20px">
              {{place.rating ? place.rating : 'Não Avaliado'}}
              <a :href="'#' + place.place_id" class="btn btn-floating right pulse modal-trigger tooltipped"
                data-position="bottom" data-delay="20" data-tooltip="Ver detalhes">
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
          </div>
        </div>

        <div :id="place.place_id" class="modal bottom-sheet black-text">
          <div class="container modal-content">
            <div class="col s12 m10 l8 offset-m1 offset-l2">
              <span class="card-title grey-text text-darken-4">
                <strong>{{place.name}}</strong> -
                <img src="../../../assets/star.png" width="20px">
                {{place.rating ? place.rating : 'Não valiado'}}
                <button @click="closeModal(place.place_id)" class="btn btn-floating right modal-trigger">
                  <span class="fa fa-times"></span>
                </button>
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
                <a class="btn s4 offset-s1 center-align" :href="place.url" target="_blank">
                  <span class="fa fa-map-o"></span>
                </a>
                <a v-if="place.website" class="btn s4 offset-s2 center-align" :href="place.website" target="_blank">
                  <span class="fa fa-globe"></span>
                </a>
              </div>
              <h5>Comentários</h5>
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
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'ResultCards',

  props: {
    placesDetails: ''
  },

  updated () {
    $('.tooltipped').tooltip({delay: 50})
    $('.modal').modal()
    $('.slider').slider()
  },

  methods: {
    closeModal (id) {
      $('#' + id).modal('close')
    },

    accordionOpen (key) {
      $('.collapsible').collapsible('open', key)
    }
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
  max-height: 90%;
}
</style>
