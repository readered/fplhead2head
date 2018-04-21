<template>
  <input-component v-if='!loaded'></input-component>
  <result-component v-else></result-component>
</template>

<script>
import InputComponent from './AppComponents/InputComponent.vue'
import ResultComponent from './AppComponents/ResultsComponent.vue'
import {mapGetters} from 'vuex'

export default {
  computed: mapGetters({
    'loaded': 'ready'
  }),
  components: {
    InputComponent,
    ResultComponent
  }
}
</script>
