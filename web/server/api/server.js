const axios = require('axios')
const router = require('express').Router()
const { LandMark } = require('../db')
const googleResponse = require('./sampleResponse');

module.exports = router

router.get('/', async (req, res, next) => { //will access list of past landmarks
  try {
    const landmarks = await LandMark.findAll({
      where: {
        userId: req.user.id
      }
    }) 
    res.json(landmarks)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => { //will access single past landmark
  try {
    const landmark = await LandMark.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id
      }
    })
    res.json(landmark)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {       //you better fucking change this back to post before you push
  try {
    // const res = await axios.post('', req.body)
    const bestGuess = googleResponse.webDetection.bestGuessLabels[0].label; //change googleResponse to actual Google response, when available
    res.send(bestGuess);
  } catch (err) {
    next(err)
  }
})
