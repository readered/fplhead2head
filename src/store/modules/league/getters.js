import _ from 'lodash';

const getters = {
  isLeagueLoaded: state => state.leagues.data.length !== 0,
  ready: state => (state.loadComplete && state.leagues.data.length !== 0),
  isLeague: state => state.codeType === 'league',
  mainTitle(state, getters){
    if(!getters.isLeagueLoaded) return '';
    if((getters.isLeague && state.leagues.data) || (!getters.isLeague && state.team.entry)) {
      return state.codeType.charAt(0).toUpperCase() + state.codeType.slice(1)
              + ": " + (getters.isLeague ?
                state.leagues.data[0].league.name :
                state.team.entry.name);
    }
    return '';
  },
  leagues: state => state.leagues,
  codeType: state => state.codeType,
  getTeamTotal(state, getters){
    return teamId => {
      if(!getters.getTeamPicks(teamId) || _.isEmpty(state.live.elements)) return 0;
      var total = 0;
      var picks = getters.getTeamPicks(teamId).picks;
      for (var i = 0; i < picks.length; i++) {
        var element = getters.getPlayerLive(picks[i].element);
        if(element && picks[i].position < 12){
          total += element.stats.total_points * picks[i].multiplier;
        }
      }
      return total;
    };
  },
  getPlayerLive: (state) => (playerId) => {
    if(_.isEmpty(state.live.elements) || !state.live.elements[playerId]) return null;
    return state.live.elements[playerId];
  },
  getCurrentGameWeek(state, getters){
      if(!getters.isLeagueLoaded) return '';
      return state.leagues.data[0].matches_this.results[0].event;
  },
  getPlayerElement: (state) => (id) => {
    return _.find(state.elements, function(element){
      return element.id == id;
    });
  },
  getTeamPicks: (state) => (teamId) => {
    return _.find(state.picksCache, function(picks){
      //console.log(picks.entry_history.entry);
      return picks.entry_history.entry == teamId;
    });
  }
}

export {
  getters
}
