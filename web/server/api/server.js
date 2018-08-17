const router = require('express').Router()
const path = require('path')
// Imports the Google Cloud client library.
const vision = require('@google-cloud/vision')
const { LandMark } = require('../db/models')

router.post('/getDataFromGoogleAPI', (req, res, next) => {
  const client = new vision.ImageAnnotatorClient()
  const blob = req.body.base64

  var img = `data:image/png;base64,${blob}`
  let base64Data = img.replace(/^data:image\/png;base64,/, '')
  let binaryData = new Buffer.from(base64Data, 'base64').toString('binary')
  require('fs').writeFile('out.png', binaryData, 'binary', function(err) {
    console.log(err) // writes out file without error, but it's not a valid image
  })

  const filename = path.join(__dirname, '../../out.png')
  client
    .webDetection(filename)
    .then(results => {
      console.log(results)
      //need a helper function for saving to database
      res.json(results)
      res.send("oops didn't hit")
    })

    // .labelDetection(filename)
    // .then(results => {
    //   const labels = results[0].labelAnnotations

    //   console.log('Results:', results)
    //   // labels.forEach(label => console.log(label.description))
    // })
    .catch(err => {
      console.error('ERROR:', err)
    })
})

router.post('/getDataFromGoogleAPI', (req, res, next) => {
  console.log("hit google api post route")
  const client = new vision.ImageAnnotatorClient()
  const blob = req.body.base64

  var img = `data:image/png;base64,${blob}`
  let base64Data = img.replace(/^data:image\/png;base64,/, '')
  let binaryData = new Buffer.from(base64Data, 'base64').toString('binary')
  require('fs').writeFile('out.png', binaryData, 'binary', function(err) {
    console.log(err) // writes out file without error, but it's not a valid image
  })

  console.log("made it past require")
  const filename = "/app/out.png"
  // const requestObj =
  client
    // .labelDetection(`gs://${bucketName}/demo-image.jpg`)

    .webDetection(filename)
    .then(results => {
      console.log(results)
      res.json("hello")
      res.send("oops didn't hit")
    })

    // .labelDetection(filename)
    // .then(results => {
    //   const labels = results[0].labelAnnotations

    //   console.log('Results:', results)
    //   // labels.forEach(label => console.log(label.description))
    // })
    .catch(err => {
      console.error('ERROR:', err)
    })
  // res.send('get data from google API ...  ')
})

router.get('/history', async (req, res, next) => {
  try {
    const landmarks = await LandMark.findAll({
      where: {
        userId: 1
      },
      attributes: ['id', 'name', 'rating', 'comment']
    })
    res.send(landmarks)
  } catch (error) {
    next(error)
  }
})

router.get('/history/:id', async (req, res, next) => {
  try {
    const landmark = await LandMark.findById(req.params.id)
    res.send(landmark)
  } catch (error) {
    next(error)
  }
})

module.exports = router
// router.get('/savePicToBucket', (req, res, next) => {
//   // Creates a client
//   const storage = new Storage()
//   // Uploads a local file to the bucket
//   storage
//     .bucket(bucketName)
//     .upload(filename, {
//       // Support for HTTP requests made with `Accept-Encoding: gzip`
//       gzip: true,
//       metadata: {
//         // Enable long-lived HTTP caching headers
//         // Use only if the contents of the file will never change
//         // (If the contents will change, use cacheControl: 'no-cache')
//         cacheControl: 'public, max-age=31536000'
//       }
//     })
//     .then(() => {
//       console.log(`${filename} uploaded to ${bucketName}.`)
//     })
//     .catch(err => {
//       console.error('ERROR:', err)
//     })
//   res.send('store picture to the bucket ...  ')
// })
