const router = require('express').Router()
const axios = require('axios')

router.post('/', async (req, res, next) => {
  // const latitude = req.body.latitude;
  // const longitude = req.body.longitude;
  // const distance = req.body.distance;

  try {
    let result = await axios.get(`https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=${process.env.geocoderAppId}&app_code=${process.env.geocoderAppCode}&mode=retrieveLandmarks&prox=${req.body.latitude},${req.body.longitude},${req.body.distance}`);
    res.send(result.data.Response.View[0]);
  } catch (err) {
    console.warn('error', err);
  }
});

module.exports = router;


