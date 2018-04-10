<template>
  <div class="white-text">
    <div class="row">
      <div v-if="userGeolocation === ''" class="col s6 offset-s3 center-align">
        <span class="black-text mt-3 white-text">Aguarde, estamos obtendo sua localização</span>
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <div class="col s12 m8 l6 offset-l3 offset-m2">
        <h2 class="center-align">{{title}}</h2>
        <div class="row black-text">
          <div class="col s6">
            <select v-model="formSearch.place" class="browser-default">
              <option value="" disabled selected>O que procura?</option>
              <option value="lodging">Hoteis</option>
              <option value="subway_station">Estação de Metrô</option>
              <option value="train_station">Estação de Trem</option>
              <option value="restaurant">Restaurantes</option>
              <option value="bar">Bares</option>
              <option value="police">Polícia</option>
              <option value="hospital">Hospitais</option>
              <option value="zoo">Zoologico</option>
            </select>
          </div>
          <div class="col s6">
            <select v-model="formSearch.orderBy" class="browser-default">
              <option value="" disabled selected>Ordenar Por</option>
              <option :value="false">Relevância</option>
              <option :value="true">Distância</option>
            </select>
          </div>
        </div>

        <div class="row">
          <p class="range-field col s12">Raio de busca (metros)
            <input v-model="formSearch.radius" type="range" min="0" max="10000" />
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
        <button v-if="userGeolocation !== ''" @click="validateRequest()" id="search" class="btn col s12 m5 l5 mt-2">Buscar</button>
        <button v-show="moreButton" id="more" class="btn col s12 m5 l5 offset-m1 offset-l1 mt-2">Mais</button>
      </div>
      <div class="row"></div>
    </div>
    <div class="col s10">
      <resultcars :placesDetails="placesList"></resultcars>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import ResquestDetails from './ResquestDetails'

export default {
  name: 'RequestPlaces',
  data () {
    return {
      title: 'Rio Tour',
      formSearch: {
        place: '',
        orderBy: '',
        radius: 1000,
        isPhoto: '',
        textPlace: ''
      },
      userGeolocation: '',
      map: '',
      moreButton: false,
      placesList: []
    }
  },

  mounted () {
    this.getPosition()
  },

  components: {
    resultcars: ResquestDetails
  },

  methods: {
    validateRequest () {
      if (this.formSearch.place) {
        this.requestPlaces()
      } else {
        alert('Por favor escolha um tipo de local para buscar')
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
        places.forEach(place => {
          if (this.formSearch.isPhoto) {
            if (place.photos) {
              service.getDetails({placeId: place.place_id}, this.getPlacesDetails)
            }
          } else {
            service.getDetails({placeId: place.place_id}, this.getPlacesDetails)
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
      alert('Sua busca não trouxe nenhum resultado, experimente aumentar o raio de busca')
    },

    getPlacesDetails (place, status) {
      const google = window.google
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.placesList.push(place)
        console.log(this.placesList)
      }
    },

    getPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.userGeolocation = position
        })
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
