const express = require('express'),
    rp = require('request-promise-native'),
    fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    DataStore = require('@google-cloud/datastore');

var api = express.Router();

const localSavePath = 'C:/temp/fpl',
    devMode = process.env.NODE_ENV !== 'production',
    saveToDb = true,
    datastore = new DataStore({
      projectID: 'fplhead2head',
    });


//Get requests for FPL getData

//Required to allow for async/await use in routing
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

api.get('/league/:code', asyncMiddleware(async (req, res, next) => {
  console.log('League data requested');
  console.log(req.params);
  const data = await getLeagueData(req.params.code)
  if(devMode) saveToFile('league_'+ req.params.code, data);
  res.json(data);
}));

api.get('/team/:code', asyncMiddleware(async (req, res, next) => {
  console.log('Team data requested');
  console.log(req.params);
  var response = {
    team: {},
    h2hleagues: []
  }
  response.team = await getTeamData(req.params.code, res);
  if(devMode) saveToFile('team_'+ req.params.code, response.team);
  var leagues = response.team.leagues.h2h.filter(league => !league.is_cup);
  console.log(leagues);
  for (var i = 0; i < leagues.length; i++) {
    response.h2hleagues.push(await getLeagueData(leagues[i].id)); 
  }
  if(devMode) saveToFile('leagues_'+ req.params.code, response.h2hleagues);

  res.json(response);
}));

api.get('/picks/:code/:gameweek', asyncMiddleware(async (req, res, next) => {
  console.log('Picks data requested');
  console.log(req.params);
  const data = await getPicksData(req.params);
  if(devMode) saveToFile('picks_' + req.params.code, data);
  res.json(data);
}));

api.get('/live/:code', asyncMiddleware(async (req, res, next) => {
  console.log('Live data requested');
  console.log(req.params);
  const data = await getLiveData(req.params.code);
  if(devMode) saveToFile('live', data);
  res.json(data);
}));

api.get('/elements', asyncMiddleware(async (req, res, next) =>{
  console.log('Elements data requested');
  const data = await getElementsData();
  if(devMode) saveToFile('elements', data);
  res.json(data);
}));

function coreFplApiRequest(url){
  return rp({
    uri: url,
    json: true
  });
}

function getLeagueData(leagueCode){
  var url = 'https://fantasy.premierleague.com/drf/leagues-h2h-standings/' + leagueCode;
  return coreFplApiRequest(url);
}

function getTeamData(teamCode){
  var url = 'https://fantasy.premierleague.com/drf/entry/' + teamCode;
  return coreFplApiRequest(url);
}

function getLiveData(gameweek){
  var url = `https://fantasy.premierleague.com/drf/event/${gameweek}/live`;
  return coreFplApiRequest(url);
}

function getPicksData(params){
  var url = `https://fantasy.premierleague.com/drf/entry/${params.code}/event/${params.gameweek}/picks`
  return coreFplApiRequest(url);
}

function getElementsData(){
  var url = 'https://fantasy.premierleague.com/drf/elements';
  return coreFplApiRequest(url);
}

function saveToFile(type, data){
  if(!data){
    console.log(`data for type ${type} is null`);
  }
  if(!fs.existsSync(localSavePath)){
    fs.mkdirSync(localSavePath);
  }
  const fileName = type + "_" + moment().format('YYYYMMDD_HH_mm_ss') + '.json';
  fs.writeFile(path.join(localSavePath, fileName), JSON.stringify(data), err => {
    if(err){
        console.log(err);
    }
  });

  if(!(saveToDb && data)) return;
  var key = datastore.key(type);
  const entity = {
    key: key,
    data: data
  };
  datastore.save(entity)
    .then(() => {
      console.log(`Saved entity of kind: ${entity.key.kind}`);
    })
    .catch(err => {
      console.log('Error saving to datastore: ' + JSON.stringify(err));
    })
}

//

module.exports = api;
