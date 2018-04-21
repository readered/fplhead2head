import api from '../../api';

const actions = {
  async getData(context, params){
    context.commit('startDataRetrieval');

    try{
      var elementsResponse = await api.get(`/api/elements`);
      console.log(elementsResponse);
      context.commit('updateElementsData', elementsResponse);
    }
    catch(error){
      context.commit('apiCallError', {error: 'FPL data not available at the moment'});
      return;
    }

    try{
      var mainResponse = await api.get(`/api/${params.codeType}/${params.code}`);
      console.log(mainResponse);
    }
    catch(error){
      context.commit('apiCallError', {error: `Unknown code type: ${error}`});
      return;
    }

    switch(params.codeType){
      case 'league':
        context.commit('updateCodeType', params.codeType);
        context.commit('updateLeagueData', mainResponse);
        break;

      case 'team':
        context.commit('updateCodeType', params.codeType);
        context.commit('updateMainTeamData', mainResponse.team);
        context.commit('updateLeagueData', mainResponse.h2hleagues);
        break;

      default:
        context.commit('apiCallError', {error: `Unknown code type: ${params.codeType}`});
    }

    try{
      var liveResponse = await api.get('/api/live/' + context.getters.getCurrentGameWeek);
      console.log(liveResponse);
    }
    catch(error){
      context.commit('apiCallError', {error: error});
      return;
    }
    context.commit('updateLiveData', liveResponse);

    for (var i = 0; i < context.state.leagues.data.length; i++) {
      for (var j = 0; j < context.state.leagues.data[i].standings.results.length; j++) {
        var teamId = context.state.leagues.data[i].standings.results[j].entry;
        if(!context.state.picksCache[teamId]){
          try{
            var pickResponse = await api.get(`/api/picks/${teamId}/${context.getters.getCurrentGameWeek}`);
          }
          catch(error){
            context.commit('apiCallError', {error: error});
          }
          context.commit('updatePickData', pickResponse);
        }
      }
    }

    console.log("Submitted code "+ params.code +" with code type " + params.codeType);
    context.commit('finishDataRetrieval');
  }
}

export {
  actions
}
