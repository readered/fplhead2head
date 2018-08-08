const path = require('path'),
  express = require('express'),
  api = require('./server/backend-api.js');

var DIST_DIR = path.join(__dirname, 'build'),
  port = 3000,
  app = express();

app.use(express.static(DIST_DIR));
app.use('/api', api);

app.get('/', function(req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(port, () => console.log('Server listening on port ' + port));
