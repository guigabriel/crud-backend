const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 3001;

const app = express();
app.use((req, res, nexts) => {
  res.header('X-Powered-By', 'Express');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST, DELETE');

  app.use(cors());
  nexts();
});
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log('server started at http://localhost:3001'));
