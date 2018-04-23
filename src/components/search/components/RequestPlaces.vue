<template>
  <div class="white-text">
    <div class="row">
      <div v-if="!userGeolocation" class="col s6 offset-s3 center-align">
        <span class="black-text mt-3 white-text">Aguarde, estamos obtendo sua localização</span>
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
        <span class="black-text mt-3 white-text" >Caso esteja demorando clique <a class="white-text" href="/">AQUI</a></span>
      </div>
      <div class="col s12 m8 l6 offset-l3 offset-m2">
        <h2 class="center-align">{{title}}</h2>
        <div class="row">
          <div class="input-field col s6">
            <select id="place">
              <option value="" disabled selected>O que procura?</option>
              <option v-for="option in ordenedOptions" :key="option['.key']" :value="option.name">
                <span :class="'fa fa-' + option.icon"></span> {{option.alias}}
              </option>
            </select>
          </div>
          <div class="input-field col s6">
            <select id ="orderBy">
              <option value="" disabled selected>Ordenar Por</option>
              <option :value="false"><span class="fa fa-star"></span> Relevância</option>
              <option :value="true"><span class="fa fa-bullseye"></span> Distância</option>
            </select>
          </div>
        </div>

        <div class="row">
          <p class="range-field col s12">Raio de busca (metros)
            <input v-model="formSearch.radius" type="range" min="0" max="50000" />
          </p>
        </div>
        <div class="row">
          <div class="col s8 offset-s2">
            <div class="switch">
              <label>
                <input v-model="formSearch.isPhoto" type="checkbox">
                <span class="lever"></span>Apenas locais com foto (Opcional)
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input v-model="formSearch.textPlace" type="text">
            <label>Nome do local (Opcional)</label>
          </div>
        </div>
        <button v-if="userGeolocation" @click="validateRequest()" id="search" class="btn col s12 m5 l5 mt-2">Buscar</button>
        <button v-show="moreButton" id="more" class="btn col s12 m5 l5 offset-m1 offset-l1 mt-2">Mais</button>
      </div>
      <div class="row"></div>
    </div>
    <div class="row">
      <resultcars :placesDetails="placesList"></resultcars>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import M from 'Materialize-css'
import ResquestDetails from './ResquestDetails'

export default {
  name: 'RequestPlaces',
  data () {
    return {
      title: 'Rio Tour',
      formSearch: {
        place: '',
        orderBy: '',
        radius: 10000,
        isPhoto: '',
        textPlace: ''
      },
      userGeolocation: '',
      map: '',
      moreButton: false,
      placesList: [],
      placesOpstions: [
        {name: 'bar', alias: 'Bares', icon: 'beer'},
        {name: 'subway_station', alias: 'Estação de Metrô', icon: 'subway'},
        {name: 'train_station', alias: 'Estação de Trem', icon: 'train'},
        {name: 'lodging', alias: 'Hoteis', icon: 'bed'},
        {name: 'bank', alias: 'Bancos', icon: 'university'},
        {name: 'hospital', alias: 'Hospitais', icon: 'hospital-o'},
        {name: 'restaurant', alias: 'Restaurantes', icon: 'cutlery'},
        {name: 'police', alias: 'Polícia', icon: 'shield'},
        {name: 'zoo', alias: 'Zoologico', icon: 'paw'},
        {name: 'bus_station', alias: 'Estações de onibus', icon: 'bus'},
        {name: 'campground', alias: 'Area de Camping', icon: 'tree'},
        {name: 'car_rental', alias: 'Aluguel de Carro', icon: 'car'},
        {name: 'embassy', alias: 'Embaixadas', icon: 'university'},
        {name: 'fire_station', alias: 'Corpo de Bombeiros', icon: 'fire-extinguisher'},
        {name: 'gas_station', alias: 'Posto de Gasolina', icon: 'fire'},
        {name: 'movie_theater', alias: 'Cinemas', icon: 'ticket'},
        {name: 'museum', alias: 'Museu', icon: 'university'},
        {name: 'night_club', alias: 'Boates', icon: 'glass'},
        {name: 'park', alias: 'Parques', icon: 'fort-awesome'},
        {name: 'parking', alias: 'Estacionamentos', icon: 'car'},
        {name: 'pharmacy', alias: 'Farmacias', icon: 'medkit'},
        {name: 'shopping_mall', alias: 'Shoppings', icon: 'shopping-bag'},
        {name: 'stadium', alias: 'Estádios', icon: 'dribbble'},
        {name: 'point_of_interest', alias: 'Pontos Turísticos', icon: 'binoculars'}
      ]
    }
  },

  computed: {
    ordenedOptions () {
      let list = this.placesOpstions
      return list.sort((a, b) => {
        let minor = a.alias.length < b.alias.length ? a.alias : b.alias
        for (let i = 0; i < minor.length; i++) {
          if (a.alias.charCodeAt(i) !== b.alias.charCodeAt(i)) {
            return a.alias.charCodeAt(i) - b.alias.charCodeAt(i)
          }
        }
        return 1
      })
    }
  },

  mounted () {
    this.getPosition()
    $('select').material_select()
  },

  components: {
    resultcars: ResquestDetails
  },

  methods: {
    validateRequest () {
      let form = this.formSearch
      form.place = $('#place').val()
      form.orderBy = $('#orderBy').val()
      if (!form.place) {
        M.toast('Por favor escolha um tipo de local para buscar', 3000)
      } else if (form.orderBy === '') {
        M.toast('Por favor escolha um tipo de ordenação para buscar', 3000)
      } else {
        this.requestPlaces()
      }
    },

    requestPlaces () {
      const google = window.google
      let position = this.userGeolocation.coords
      this.map = new google.maps.Map(document.querySelector('#map'), {
        center: {lat: position.latitude, lng: position.longitude},
        zoom: 17
      })
      var service = new google.maps.places.PlacesService(this.map)
      let form = this.formSearch
      service.nearbySearch({
        location: {lat: position.latitude, lng: position.longitude},
        radius: form.orderBy ? 0 : form.radius,
        type: form.place,
        name: this.formSearch.textPlace,
        rankBy: form.orderBy ? google.maps.places.RankBy.DISTANCE : google.maps.places.RankBy.PROMINENCE
      }, this.processResults)
    },

    processResults (places, status, pagination) {
      if (places.length === 0) {
        this.noResults()
      }
      const google = window.google
      const service = new google.maps.places.PlacesService(this.map)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.moreButton = pagination.hasNextPage
        this.placesList = []
        places.forEach((place, index) => {
          if (this.formSearch.isPhoto) {
            if (place.photos) {
              service.getDetails({placeId: place.place_id}, this.getPlacesDetails)
            }
          } else {
            service.getDetails({placeId: place.place_id}, this.getPlacesDetails)
          }
          if (index === (places.length - 1)) {
            let time = setInterval(() => {
              $('.slider').slider()
              clearInterval(time)
            }, 1500)
          }
        })
        if (this.moreButton) {
          this.nextPage(pagination)
        }
      }
    },

    nextPage (pagination) {
      var moreButton = document.querySelector('#more')
      moreButton.addEventListener('click', function () {
        pagination.nextPage()
      })
    },

    noResults () {
      M.toast('Sua busca não trouxe nenhum resultado, experimente aumentar o raio de busca', 3000)
    },

    getPlacesDetails (place, status) {
      const google = window.google
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.placesList.push(place)
      }
    },

    getPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.userGeolocation = position
        })
      } else {
        M.toast('Não foi possível obeter sua localização, tente um navegador mais atualizado', 3000)
      }
    }
  }
}
</script>

<style>
  .mt-2 {
    margin-top: 20px;
  }
</style>
