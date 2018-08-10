const axios = require('axios')
const router = require('express').Router()
module.exports = router
const googleResponse = require('./sampleResponse');

router.put('/', async (req, res, next) => {
  try {
    const response = await axios.put('https://grace-star-shopper.herokuapp.com/api/stars/7', {owned:true})
    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {       //you better fucking change this back to post before you push
  try {
    // const res = await axios.post('', req.body)
    const bestGuess = googleResponse.webDetection.bestGuessLabels[0].label;
    res.send(bestGuess);
  } catch (err) {
    next(err)
  }
})
