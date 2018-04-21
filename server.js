const path = require('path'),
  express = require('express'),
  opn = require('opn'),
  rp = require('request-promise-native'),
  webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware');

var DIST_DIR = path.join(__dirname, 'build'),
  port = 3000,
  app = express(),
  api = express.Router();

const config = require('./webpack.config.js'),
  compiler = webpack(config);

app.use(express.static(DIST_DIR));
app.use('/api', api);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
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
  var leagues = response.team.leagues.h2h.filter(league => !league.is_cup);
  console.log(leagues);
  for (var i = 0; i < leagues.length; i++) {
    response.h2hleagues.push(await getLeagueData(leagues[i].id));
  }

  res.json(response);
}));

api.get('/picks/:code/:gameweek', asyncMiddleware(async (req, res, next) => {
  console.log('Picks data requested');
  console.log(req.params);
  const data = await getPicksData(req.params);
  res.json(data);
}));

api.get('/live/:code', asyncMiddleware(async (req, res, next) => {
  console.log('Live data requested');
  console.log(req.params);
  const data = await getLiveData(req.params.code);
  res.json(data);
}));

api.get('/elements', asyncMiddleware(async (req, res, next) =>{
  console.log('Elements data requested');
  const data = await getElementsData();
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

//

app.listen(port, () => console.log('Server listening on port ' + port));

opn('http://localhost:'+port);
