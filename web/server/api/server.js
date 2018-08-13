<<<<<<< HEAD
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
=======
const axios = require('axios')
const router = require('express').Router()
module.exports = router
const googleResponse = require('./sampleResponse');
// Imports the Google Cloud client library.
const Storage = require('@google-cloud/storage')
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')
const filename = '/Users/song/Workspace/images/bryant1.jpg'
const bucketName = 'whatsthat'


router.get('/', (req, res, next) => {
  console.log("testing")
  res.send("testing...  ")
  // res.json()
})

router.put('/', async (req, res, next) => {
  try {
    const response = await axios.put('https://grace-star-shopper.herokuapp.com/api/stars/7', {owned:true})
    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {       //you better fucking change this back to post before you push
  try {
    // const res = await axios.post('', req.body)
    console.log("hello")
    const bestGuess = googleResponse.webDetection.bestGuessLabels[0].label; //change googleResponse to actual Google response, when available
    console.log(req.body)
    res.send(bestGuess);
  } catch (err) {
    next(err)
  }
})

router.get('/getDataFromGoogleAPI', (req, res, next) => {
  const client = new vision.ImageAnnotatorClient()
  client
  .labelDetection(`gs://${bucketName}/demo-image.jpg`)
  .then(results => {
    const labels = results[0].labelAnnotations

    console.log('Labels:')
    labels.forEach(label => console.log(label.description))
  })
  .catch(err => {
    console.error('ERROR:', err)
  })
  res.send('get data from google API ...  ')
})


router.get('/savePicToBucket', (req, res, next) => {
  // Creates a client
  const storage = new Storage()
  // Uploads a local file to the bucket
  storage
    .bucket(bucketName)
    .upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000'
      }
    })
    .then(() => {
      console.log(`${filename} uploaded to ${bucketName}.`)
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
  res.send('store picture to the bucket ...  ')
})
>>>>>>> 1dd3d3427a3cea5f831933646fb95772de4584a4
