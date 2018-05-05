import './styles/main.scss';
import Vue from 'vue';
import App from './components/App.vue';
import Nav from './components/Nav.vue';
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

new Vue({
  el: '#nav',
  store,
  render: h => h(Nav)
});
