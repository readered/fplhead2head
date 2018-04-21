import './styles/main.scss';
import Vue from 'vue';
import App from './components/App.vue';
import store from './store';

//dependencies

import 'bootstrap';

//

Vue.config.devtools = true;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
