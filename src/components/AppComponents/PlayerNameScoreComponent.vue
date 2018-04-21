<template lang="html">
  <div class="container">
    <div class="row">
      <div :class="['col-md-8 col-sm-6 playerName', isHome ? 'justify-content-left' : 'justify-content-right']">
        {{playerName}}
      </div>
      <div :class="{'col-md-4':true, 'col-sm-6': true, 'order-first': !isHome}">
        {{playerLive.stats.total_points}}
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: [
    'player',
    'isHome'
  ],
  computed: {
    playerElement(){
      return this.$store.getters.getPlayerElement(this.player.element);
    },
    playerLive(){
      return this.$store.getters.getPlayerLive(this.player.element);
    },
    playerName(){
      return this.playerElement.first_name + " " + this.playerElement.second_name
    }
  }
}
</script>
