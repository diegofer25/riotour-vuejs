<template>
  <div class="mb-5">
    <div class="cards-container">
      <div class="row" v-for="p in placesDetails" :key="p['.key']" v-if="placesDetails">
        <div class="col s12 m10 l10 offset-m1 offset-l1">
          <div class="card hoverable">
            <div class="card-image waves-effect waves-block">
              <img width="100%" src="">
            </div>
            <div class="card-content white-text">
              <div class="row">
                <span class="card-title grey-text text-darken-4">
                  <strong>{{p.test}}</strong>
                  <button class="btn btn-floating right pulse">
                  </button>
                </span>
              </div>
              <div class="row center-align">
                <p>
                  <a class="btn col s4 offset-s1 center-align tooltipped" href="" target="_blank" data-position="top" data-delay="50" data-tooltip="Ver no mapa">
                    <span class="fa fa-map-o"></span>
                  </a>
                  <a class="btn col s4 offset-s2 center-align tooltipped" href="" target="_blank" data-position="top" data-delay="50" data-tooltip="Visite o site">
                    <span class="fa fa-globe"></span>
                  </a>
                </p>
              </div>
            </div>

            <div id="" class="modal bottom-sheet">
              <div class="modal-content">
                <div class="col s12 m10 l8 offset-m1 offset-l2">
                  <span class="card-title grey-text text-darken-4">
                    <strong></strong>
                    <a class="btn btn-floating right pulse"></a>
                  </span>
                  <div class="slider">
                    <ul class="slides">
                      <li>
                        <img src="">
                      </li>
                    </ul>
                  </div>
                  <div class="caption center-align">Endereço:
                    <span></span>
                    <br>Telefone:
                    <span></span>
                    <br>Avaliação:
                    <span></span>
                  </div>
                  <div class="row">
                    <a class="btn s4 offset-s1 center-align" href="" target="_blank"></a>
                    <a class="btn s4 offset-s2 center-align" href="" target="_blank"></a>
                  </div>
                  <h5>Comentários</h5>
                  <p>
                    <ul class="collapsible popout" data-collapsible="accordion">
                      <li>
                        <div class="collapsible-header">
                          <img width="50px" height="50px" src="" /> deu nota:
                          <strong></strong>
                        </div>
                        <div class="collapsible-body">
                          <span>
                            <p>
                              <br>
                              <span class="right"></span>
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
    </div>
    <div id="map"></div>
  </div>
</template>

<script>

export default {
  name: 'ResultCards',
  data () {
    return {
      placesDetails: this.places
    }
  }
}
</script>

<style>
  .mb-5 {
    margin-bottom: 50px;
  }

  .cards-container {
    -webkit-column-break-inside: avoid;
  }
  .cards-container .card {
    /*display: inline-block;*/
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
</style>
