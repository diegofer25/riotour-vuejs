<template>
  <div>
    <div class="row">
      <form class="col s12 m8 l6 offset-l3 offset-m2 black-text" @submit="getPlaces()">
        <h2 class="center-align white-text">{{title}}</h2>
        <div class="row">
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
              <option value="false">Relevância</option>
              <option value="true">Distância</option>
            </select>
          </div>
        </div>
        <div class="row">
          <p class="range-field col s12 white-text">Raio de busca {{formSearch.radius}}m
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
            <input class="white-text" v-model="formSearch.textPlace" type="text">
            <label>Nome do local (Opcional)</label>
          </div>
        </div>
        <button type="submit" id="search" class="btn col s12 m6 l6 offset-m3 offset-l3">Buscar</button>
        <button v-if="false" id="more" class="btn waves-effect waves-light col s4 m4 l2 offset-s1 offset-m1 offset-l1">Mais
        </button>
      </form>
    </div>
    <resultcars></resultcars>
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
      userGeolocation: ''
    }
  },
  components: {
    resultcars: ResquestDetails
  },
  methods: {
    getPlaces () {
      this.getPosition()
    },
    getPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.userGeolocation = position
          console.log(this.userGeolocation)
          console.log(this.formSearch)
        })
      } else {
        console.log('error')
      }
    },
    requestPlaces () {
    }
  }
}
</script>

<style>
  select {
    width: 100%;
    padding: 5px;
    border: 1px solid rgba(43, 43, 43);
    border-radius: 5px;
    height: 3rem;
  }
</style>
