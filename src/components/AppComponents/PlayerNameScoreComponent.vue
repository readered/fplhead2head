<template lang="html">
  <div class="container">
    <div :class="{'row playerNameRow': true, 'solid': (position === 11 || position === 15)}">
      <div :class="{'col-md-4 playerName d-flex justify-content-start': true, 'up': homePlayerUp, 'down': homePlayerDown}">
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
      <div :class="{'col-md-4 playerName d-flex justify-content-end': true, 'up': awayPlayerUp, 'down': awayPlayerDown}">
        {{awayPlayerName}}
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data: function(){
    return {
      homePlayerUp: false,
      homePlayerDown: false,
      awayPlayerUp: false,
      awayPlayerDown: false
    }
  },
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
    },
    formatPointChange(change, upBool, downBool){
      if(change === 0) return;
      if(change > 0){
        upBool = true;
        setTimeout(() => {
          upBool = false;
        }, 2000)
      }
      else {
        downBool = true;
        setTimeout(() => {
          downBool = false;
        }, 2000)
      }
    }
  },
  watch: {
    'homePlayerLive.stats.total_points': function(newVal, oldVal){
      this.formatPointChange(newVal - oldVal, this.homePlayerUp, this.homePlayerDown);
    },
    'awayPlayerLive.stats.total_points': function(newVal, oldVal){
      this.formatPointChange(newVal - oldVal, this.awayPlayerUp, this.awayPlayerDown);
    }
  }
}
</script>


