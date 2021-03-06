import api from '../../api';

function addFormation (context, picksResponse) {
  var formation = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0
  }

  for (var i = 0; i < 11; i++) {
    var position = context.getters.getPlayerElement(picksResponse.picks[i].element);
    formation[position]++
  }

  picksReponse["formation"] = formation;
  return;
}

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
    }

    try{
      var mainResponse = await api.get(`/api/${params.codeType}/${params.code}`);
      console.log(mainResponse);
    }
    catch(error){
      context.commit('apiCallError', {error: `Unknown code type: ${JSON.stringify(error)}`});
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
    }
    try{
      context.commit('updateLiveData', liveResponse);
    }
    catch(error){
      context.commit('apiCallError', {error: error});
    }    

    for (var i = 0; i < context.state.leagues.data.length; i++) {
      for (var j = 0; j < context.state.leagues.data[i].standings.results.length; j++) {
        var teamId = context.state.leagues.data[i].standings.results[j].entry;
        if(!context.state.picksCache[teamId]){
          try{
            var pickResponse = await api.get(`/api/picks/${teamId}/${context.getters.getCurrentGameWeek}`);
            addFormation(context, pickResponse);
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
