import {isEmpty} from 'lodash';

const getters = {
  isLeagueLoaded: state => state.leagues.data.length !== 0,

  ready: state => (state.loadComplete && state.leagues.data.length !== 0),

  isLeague: state => state.codeType === 'league',

  mainTitle: (state, getters) => {
    if(!getters.isLeagueLoaded) return '';
    if((getters.isLeague && state.leagues.data) || (!getters.isLeague && state.team.entry)) {
      return state.codeType.charAt(0).toUpperCase() + state.codeType.slice(1)
              + ": " + (getters.isLeague ?
                state.leagues.data[0].league.name :
                state.team.entry.name);
    }
    return '';
  },

  // Look to remove these as components should access the state directly if required
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
    if(isEmpty(state.live.elements) || !state.live.elements[playerId]) return null;
    return state.live.elements[playerId];
  },

  getLiveFixture: (state) => (id) => {
    return state.live.fixtures.find(function(fixture){
      return fixture.id == id;
    });
  },

  getPlayerLiveFixture: (state, getters) => (playerId) => {
    var live = getters.getPlayerLive(playerId);
    if(!live) return false;
    var fixtureId = live.explain[0][live.explain[0].length - 1];
    return getters.getLiveFixture(fixtureId);
  },

  getCurrentGameWeek(state, getters){
      if(!getters.isLeagueLoaded) return '';
      return state.leagues.data[0].matches_this.results[0].event;
  },

  getPlayerElement: (state) => (id) => {
    return state.elements.find(function(element){
      return element.id == id;
    });
  },

  getTeamPicks: (state) => (teamId) => {
    return state.picksCache.find(function(picks){
      //console.log(picks.entry_history.entry);
      return picks.entry_history.entry == teamId;
    });
  },

  isPlayerActive: (state, getters) => (playerId) => {
    // Used for testing only
    //return true;
    //
    var live = getters.getPlayerLive(playerId);
    var fixture = getters.getPlayerLiveFixture(playerId);

    if(!fixture.started) return false;
    if(fixture.finished) return false;
    if(live.stats.minutes === 0) return false;
    return true;
  },

  getPredictedPlayerBPS: (state, getters) => (playerId) => {
    if(!getters.isPlayerActive(playerId)) return 0;
    var livePlayer = getters.getPlayerLive(playerId);
    var liveFixture = getters.getPlayerLiveFixture(playerId);
    var bpsObj = liveFixture.stats.find((obj) => {
      return obj.hasOwnProperty('bps');
    });

    if(!bpsObj) return 0;

    var allBps = bpsObj.bps.a.concat(bpsObj.bps.h);
    allBps.sort((a,b) => {
      // order largest to smallest
      return b.value - a.value;
    });
    var index = allBps.findIndex((element) => {
      return livePlayer.stats.bps >= element.value;
    });
    if(index < 0) return 0;
    return Math.max(3-index, 0);
  }
}

export {
  getters
}
