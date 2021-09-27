const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config(); // exposes process.env.CONFIG_VALUE
const app = express();

app.use(cors());

app.use('/rooms', routes.rooms);
app.use('/devices', routes.devices);

app.get('*', (req, res) => {
  res.send("Hello, world!");
});

app.listen(4000, () => {
  console.log('NodeJS Express server listening on http://localhost:4000');
})
