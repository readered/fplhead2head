<template lang="html">
  <div class="container">
    <div class="row">
      <player-name-score-component v-for="index in 15" :homePlayer="homeTeamPlayer(index)"
          :awayPlayer="awayTeamPlayer(index)" :position="index"></player-name-score-component>
    </div>
  </div>


</template>

<script>
import PlayerNameScoreComponent from './PlayerNameScoreComponent.vue';

export default {
  props: [
    'homeTeamId',
    'awayTeamId'
  ],
  methods: {
    homeTeamPlayer(position) {
      return this.$store.getters.getTeamPicks(this.homeTeamId).picks[position - 1];
    },
    awayTeamPlayer(position) {
      return this.$store.getters.getTeamPicks(this.awayTeamId).picks[position - 1];
    }
  },
  components: {
    PlayerNameScoreComponent
  }
}
</script>
