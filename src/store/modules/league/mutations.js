const mutations = {
  startDataRetrieval(state){
      state.loadComplete = false;
      state.loading = true;
  },

  finishDataRetrieval(state){
    state.loading = false;
    state.loadComplete = true;
  },

  updateLeagueData(state, data){
    console.log('updateLeagueData');
    console.log(data);
    commitLeagueData(state, data);
  },

  updateMainTeamData(state, data){
    console.log('updateMainTeamData');
    console.log(data);
    state.team = data;
  },

  apiCallError(state, error){
    console.log('apiCallError');
    console.log(error);
    state.errors.push(error);
  },

  updateCodeType(state, codeType){
    state.codeType = codeType;
  },

  updateLiveData(state, data){
    console.log('updateLiveData');
    console.log(data);
    state.live = data;
  },

  updatePickData(state, data){
    console.log('updatePickData');
    console.log(data);
    state.picksCache.push(data);
  },

  updateElementsData(state, data){
    console.log('updateElementsData');
    console.log(data);
    state.elements = data;
  }
}

function commitLeagueData(state, data){
  if(!Array.isArray(data)){
    data = [data];
  }
  for (var i = 0; i < data.length; i++) {
    state.leagues[data[i].league.id] = data[i];
  }
  state.leagues.data = data;
}

export {
  mutations
}
