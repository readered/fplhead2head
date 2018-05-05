<template lang="html">
  <div class="container">
    <div :class="{'row playerNameRow': true, 'solid': (position === 11 || position === 15)}">
      <div :class="['col-md-4 playerName d-flex justify-content-start']">
        {{homePlayerName}}
      </div>
      <div :class="['col-md-2 d-flex justify-content-center']">
        {{homePlayerLive.stats.total_points}}
        <span v-if="isBPSVisible(homePlayer.element)" class="">
          ({{predictedPlayerBPS(homePlayer.element)}})
        </span>
      </div>
      <div :class="['col-md-2 d-flex justify-content-center']">
        <span v-if="isBPSVisible(awayPlayer.element)" class="">
          ({{predictedPlayerBPS(awayPlayer.element)}})
        </span>
        {{awayPlayerLive.stats.total_points}}
      </div>
      <div :class="['col-md-4 playerName d-flex justify-content-end']">
        {{awayPlayerName}}
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: [
    'homePlayer',
    'awayPlayer',
    'position'
  ],
  computed: {
    homePlayerElement(){
      return this.$store.getters.getPlayerElement(this.homePlayer.element);
    },
    homePlayerLive(){
      return this.$store.getters.getPlayerLive(this.homePlayer.element);
    },
    homePlayerName(){
      return this.homePlayerElement.first_name + " " + this.homePlayerElement.second_name
    },
    awayPlayerElement(){
      return this.$store.getters.getPlayerElement(this.awayPlayer.element);
    },
    awayPlayerLive(){
      return this.$store.getters.getPlayerLive(this.awayPlayer.element);
    },
    awayPlayerName(){
      return this.awayPlayerElement.first_name + " " + this.awayPlayerElement.second_name
    }
  },
  methods: {
    isBPSVisible(playerId){
      return this.$store.getters.isPlayerActive(playerId);
    },
    predictedPlayerBPS(playerId){
      return this.$store.getters.getPredictedPlayerBPS(playerId);
    }
  }
}
</script>
