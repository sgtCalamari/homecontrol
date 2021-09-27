const axios = require('axios');
const app = require('express')();
require('dotenv').config();

const tokenId = process.env.API_TOKEN;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenId;

app.get('/', (req, res) => {
  axios.get(`https://api.smartthings.com/v1/devices/`)
    .then(r => res.json(r.data?.items?.map(r => ({deviceId: r.deviceId, roomId: r.roomId, name: r.label, isLight: r.components?.find(c => c.id === 'main')?.capabilities?.map(c => c.id)?.includes('switch')}))))
    .catch(err => res.json(err));
});

app.post('/:deviceId/turnOff', (req, res) => {
  axios.post(`https://api.smartthings.com/v1/devices/${req.params.deviceId}/commands`, formatOptions('off'))
    .then(r => res.json(r))
    .catch(r => res.json(r));
});

app.post('/:deviceId/turnOn', (req, res) => {
  axios.post(`https://api.smartthings.com/v1/devices/${req.params.deviceId}/commands`, formatOptions('on'))
    .then(r => res.json(r))
    .catch(r => res.json(r));
})

const formatOptions = (command) => {
  return {
    commands: [
      { capability: 'switch', command: command}
    ]
  }
};

module.exports = app;
