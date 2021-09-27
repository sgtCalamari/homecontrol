const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
require('dotenv').config(); // exposes process.env.CONFIG_VALUE
const app = express();

app.use(cors());

app.use('/rooms', routes.rooms);
app.use('/devices', routes.devices);

const appPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(appPath));
app.get('/*', (req, res) => {
  res.sendFile(path.join(appPath, 'index.html'));
});

app.listen(4000, () => {
  console.log('NodeJS Express server listening on http://localhost:4000');
})
