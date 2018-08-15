const axios = require('axios')
const router = require('express').Router()
const path = require('path')

const googleResponse = require('./sampleResponse')
// Imports the Google Cloud client library.
const Storage = require('@google-cloud/storage')
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')
// const filename = '/Users/song/Workspace/images/bryant1.jpg'
const bucketName = 'whatsthat'

router.post('/getDataFromGoogleAPI', (req, res, next) => {
  console.log("hit post route")
  const client = new vision.ImageAnnotatorClient()
  const blob = req.body.base64

  var img = `data:image/png;base64,${blob}`
  let base64Data = img.replace(/^data:image\/png;base64,/, '')
  let binaryData = new Buffer.from(base64Data, 'base64').toString('binary')
  require('fs').writeFile('out.png', binaryData, 'binary', function(err) {
    console.log(err) // writes out file without error, but it's not a valid image
  })

  console.log("made it past require")
  const filename = path.join(__dirname + '../../../out.png');
  // const requestObj =
  client
    // .labelDetection(`gs://${bucketName}/demo-image.jpg`)

    .webDetection(filename)
    .then(results => {
      console.log(results)
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
  // res.send('get data from google API ...  ')
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
