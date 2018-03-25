<template>
  <div>
    <div class="row">
      <form class="col s12 m8 l6 offset-l3 offset-m2">
        <h3 class="center-align"></h3>
        <div class="row">
          <div class="input-field col s6">
            <select>
              <option value="" selected>O que procura?</option>
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
          <div class="input-field col s6">
            <select>
              <option value="" selected>Ordenar Por</option>
              <option value="false">Relevância</option>
              <option value="true">Distância</option>
            </select>
          </div>
        </div>
        <div class="row">
          <p class="range-field col s12">Raio de busca (
            <span></span>m)
            <input type="range" min="0" max="20000" />
          </p>
        </div>
        <div class="row">
          <div class="col s8 offset-s2">
            <div class="switch">
              <label>
                <input type="checkbox">
                <span class="lever"></span>Apenas locais com foto
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text">
          </div>
        </div>
        <button id="search" class="btn waves-effect waves-light col s4 m4 l2 offset-s2 offset-m2 offset-l4">Buscar</button>
        <button id="more" class="btn waves-effect waves-light col s4 m4 l2 offset-s1 offset-m1 offset-l1">Mais
        </button>
      </form>
  </div>

  <resultcars></resultcars>

</div>
</template>

<script>
import ResquestDetails from './ResquestDetails'

export default {
  name: 'RequestPlaces',
  data () {
    return {
      title: 'Rio Tour'
    }
  },
  components: {
    resultcars: ResquestDetails
  }
}
</script>

<style>

</style>
