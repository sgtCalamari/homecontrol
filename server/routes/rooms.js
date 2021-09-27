const axios = require('axios');
const app = require('express')();
require('dotenv').config();

const tokenId = process.env.API_TOKEN;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenId;

app.get('/', (req, res) => {
  const locationId = process.env.LOCATION_ID;
  axios.get(`https://api.smartthings.com/v1/locations/${locationId}/rooms`)
    .then(r => res.json(r.data?.items?.map(r => ({roomId: r.roomId, name: r.name}))))
    .catch(err => res.json(err));
});

module.exports = app;
