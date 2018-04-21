<template>
  <div class="container">
    <div class="row">
      <h1 class="results-title">{{mainTitle}}</h1>
    </div>
    <div class="row">
      <div class="container">
        <div class="row">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a v-for="(league, index) in leagues.data" :key="league.league.id" :id="'head'+league.league.id"
                  :class="['nav-item nav-link', index === 1 ? 'active' : '']"
                  :href="'#tab-'+league.league.id" :aria-controls="'tab-'+league.league.id"
                  role="tab" :aria-selected="index === 1">{{league.league.name}}</a>
            </div>
          </nav>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="tab-content" id="nav-tabContent">
            <div v-for="(league, index) in leagues.data" :class="['tab-pane fade', index===0 ? 'show active':'']"
                :id="'tab-'+league.league.id" role="tabpanel" :aria-labelledby="'head'+league.league.id">
              <league-result-component :league="league"></league-result-component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import LeagueResultComponent from './LeagueResultComponent.vue';

export default {
  computed: {
    ...mapGetters([
      'isLeague',
      'mainTitle',
      'codeType',
      'leagues'
    ])
  },
  methods: {

  },
  components: {
    LeagueResultComponent
  }
}

</script>
