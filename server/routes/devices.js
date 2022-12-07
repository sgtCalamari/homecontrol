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
    .catch(err => res.json(err));
});

app.post('/:deviceId/turnOn', (req, res) => {
  axios.post(`https://api.smartthings.com/v1/devices/${req.params.deviceId}/commands`, formatOptions('on'))
    .then(r => res.json(r))
    .catch(err => res.json(err));
})

app.get('/:deviceId/status', (req, res) => {
  axios.get(`https://api.smartthings.com/v1/devices/${req.params.deviceId}/components/main/status`)
    .then(r => {
      if (!r.data) res.json(r);
      const main = r.data;

      let now = new Date();
      let lastSwitchUpdate = new Date(main.switch.switch.timestamp);
      let timeDiff = Math.abs(lastSwitchUpdate.getTime() - now.getTime());
      let updatedToday = timeDiff / (1000*60*60*24) < 1;

      let healthCheck;
      if (main.healthCheck) {
        let status = main.healthCheck["DeviceWatch-DeviceStatus"].value;
        healthCheck = status === 'online';
      }

      let isPoweredOn = main.switch.switch.value === 'on';
      let isOnline = (isPoweredOn && updatedToday) || healthCheck;

      const status = {
        isOnline: isOnline,
        isPoweredOn: isPoweredOn
      };
      res.json(status);
    })
    .catch(err => res.json(err));
})

const formatOptions = (command) => {
  return {
    commands: [
      { capability: 'switch', command: command}
    ]
  }
};

module.exports = app;
