<template lang="html">
  <div class="container">
    <div class="row">
      <div id="results-accordian">
        <fixture-component v-for="fixture in league.matches_this.results" :fixture="fixture">
        </fixture-component>
      </div>
    </div>
  </div>
</template>

<script>
import FixtureComponent from './FixtureComponent.vue';

export default {
  props:[
    'league'
  ],
  components: {
    FixtureComponent
  }
}
</script>
