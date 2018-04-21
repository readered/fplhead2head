<template lang="html">
  <div class="container">
    <div class="row">
      <player-name-score-component v-for="player in playerList.picks" :player="player" :isHome="isHome"></player-name-score-component>
    </div>
  </div>


</template>

<script>
import _ from 'lodash';
import PlayerNameScoreComponent from './PlayerNameScoreComponent.vue';

export default {
  props: [
    'teamId',
    'isHome'
  ],
  computed: {
    playerList(){
      return this.$store.getters.getTeamPicks(this.teamId);
    }
  },
  components: {
    PlayerNameScoreComponent
  }
}
</script>
