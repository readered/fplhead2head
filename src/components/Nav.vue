<template lang="html">
  <div v-if="loaded" class="form-inline">
    <div class="input-group">
      <input type="text" v-model="Code" class="form-control" name="navbar-search" placeholder="Code..." aria-label="Input league or team code">
      <div class="input-group-append">
        <button type="button" class="btn btn-outline-secondary dropdown-toggle search-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <!--<font-awesome-icon :icon="search"></font-awesome-icon>-->
          <i class="fa fa-search"></i>
        </button>
        <div class="dropdown-menu">
          <a id="nav-loadleague" href="#" class="dropdown-item" v-on:click="submit({code: Code, codeType: 'league'})">League</a>
          <a id="nav-loadteam" href="#" class="dropdown-item" v-on:click="submit({code: Code, codeType: 'team'})">Team</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  data: function() {
    return {
      Code: ''
    }
  },
  computed: mapGetters({
    'loaded': 'ready'
  }),
  methods: {
    ...mapActions({
      'submit': 'getData'
    })
  },
  components: {
  }
}
</script>
