import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import league from './modules/league.js';

Vue.use(Vuex);
Vue.use(VueResource);

Vue.config.devtools = true;

export default new Vuex.Store({
  modules: {
    league
  }
})
