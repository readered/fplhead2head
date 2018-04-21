<template>
<div id='input-component-container' class="container">
  <div class='row align-items-center'>
    <div class="col-md-12">
      <div class="row justify-content-center">
        <h1 class="main-title">FPLHead2Head</h1>
      </div>
      <div class="row justify-content-center main-subtitle">
        <h5>Please enter league or team code below:</h5>
      </div>
      <div class="row justify-content-center">
        <div id="code-input" class="input-group">
          <input type="text" v-model="Code" name="code-input" placeholder="Enter league or team code" class="form-control" aria-label="Enter league or team code">
          <div class="input-group-append">
            <button type="button" v-on:click="submit({code: Code, codeType: SelectedCodeType.toLowerCase()})" name="submit-button" class="btn btn-outline-secondary">{{SelectedCodeType}}</button>
            <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu">
              <a href="#" class="dropdown-item" v-for="codeType in CodeTypes" v-on:click="UpdateCodeType(codeType)">{{codeType}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data: function() {
    return {
      CodeTypes: ['League', 'Team'],
      SelectedCodeType: 'League',
      Code: ''
    }
  },
  methods: {
    UpdateCodeType: function(codeType){
      this.SelectedCodeType = codeType
    },
    ...mapActions({
      'submit': 'getData'
    })
  }

}
</script>
