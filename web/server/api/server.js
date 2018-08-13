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
