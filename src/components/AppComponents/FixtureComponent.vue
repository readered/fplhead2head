<template lang="html">
  <div class="card">
    <div class="card-header" :id="headerId">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" :data-target="'#'+bodyId"
                aria-expanded="false" :aria-controls="bodyId">
          <div class="row">
            <div class="col-md-5 col-sm-6 home">
              {{fixture.entry_1_name}}
            </div>
            <div class="col-md-1 col-sm-6 score">
              {{homeTeamTotal}}
            </div>
            <div class="col-md-1 order-md-7 col-sm-6 order-sm-12 score">
              {{awayTeamTotal}}
            </div>
            <div class="col-md-5 col-sm-6 away">
              {{fixture.entry_2_name}}
            </div>
          </div>
        </button>
      </h5>
    </div>
    <div :id="bodyId" class="collapse collapsed" :aria-labelledby="headerId" data-parent="#results-accordian">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <player-list-component :homeTeamId="fixture.entry_1_entry" :awayTeamId="fixture.entry_2_entry"></player-list-component>
            </div>
          </div>
          <div class="row">
            <div :class="['col-md-4 playerName d-flex justify-content-start']">
              Total
            </div>
            <div :class="['col-md-2 d-flex justify-content-center']">
              {{homeTeamTotal}}
            </div>
            <div :class="['col-md-2 d-flex justify-content-center']">
              {{awayTeamTotal}}
            </div>
            <div :class="['col-md-4 playerName d-flex justify-content-end']">
              Total
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import PlayerListComponent from './PlayerListComponent.vue';

export default {
  props: ['fixture'],
  computed: {
    headerId: function(){
      return 'head-'+this.fixture.id;
    },
    bodyId: function(){
      return 'body-'+this.fixture.id;
    },
    homeTeamTotal(){
      return this.$store.getters.getTeamTotal(this.fixture.entry_1_entry);
    },
    awayTeamTotal(){
      return this.$store.getters.getTeamTotal(this.fixture.entry_2_entry);
    }
  },
  components: {
    PlayerListComponent
  }
}
</script>
