const axios = require('axios')
const router = require('express').Router()
module.exports = router
const googleResponse = require('./sampleResponse')
// Imports the Google Cloud client library.
const Storage = require('@google-cloud/storage')
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')
// const filename = '/Users/song/Workspace/images/bryant1.jpg'
const bucketName = 'whatsthat'

router.get('/', (req, res, next) => {
  console.log('testing')
  res.send('testing...  ')
  // res.json()
})

router.put('/', async (req, res, next) => {
  try {
    const response = await axios.put(
      'https://grace-star-shopper.herokuapp.com/api/stars/7',
      {owned: true}
    )
    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  //you better fucking change this back to post before you push
  try {
    // const res = await axios.post('', req.body)
    console.log('hello')
    console.log(req.body)
    const bestGuess = googleResponse.webDetection.bestGuessLabels[0].label //change googleResponse to actual Google response, when available
    res.send(bestGuess)
  } catch (err) {
    next(err)
  }
})

router.post('/getDataFromGoogleAPI', (req, res, next) => {
  const client = new vision.ImageAnnotatorClient()
  const blob = req.body.base64

  var img = `data:image/png;base64,${blob}`
  let base64Data = img.replace(/^data:image\/png;base64,/, '')
  let binaryData = new Buffer.from(base64Data, 'base64').toString('binary')
  require('fs').writeFile('out.png', binaryData, 'binary', function(err) {
    console.log(err) // writes out file without error, but it's not a valid image
  })

  const filename = "/Users/song/Workspace/FullstackAcademy/senior/whats-that/web/out.png"
  client
    // .labelDetection(`gs://${bucketName}/demo-image.jpg`)
    .labelDetection(filename)
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

router.post('/savePicToBucket', (req, res, next) => {
  // Creates a client
  const storage = new Storage()
  const blob = req.body.base64
  var img = `data:image/png;base64,${blob}`
  let base64Data = img.replace(/^data:image\/png;base64,/, '')
  let binaryData = new Buffer.from(base64Data, 'base64').toString('binary')
  require('fs').writeFile('out.png', binaryData, 'binary', function(err) {
    console.log(err) // writes out file without error, but it's not a valid image
  })

  const filename = "/Users/song/Workspace/FullstackAcademy/senior/whats-that/web/out.png"
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
