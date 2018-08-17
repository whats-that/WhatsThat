const router = require('express').Router()
const path = require('path')
// Imports the Google Cloud client library.
const vision = require('@google-cloud/vision')
const { Landmark } = require('../db/models')

router.post('/getDataFromGoogleAPI', (req, res, next) => {
  const client = new vision.ImageAnnotatorClient()
  const blob = req.body.base64

  let binaryData = new Buffer.from(blob, 'base64').toString('binary')
  require('fs').writeFile('out.png', binaryData, 'binary', function(err) {
    console.log(err) // writes out file without error, but it's not a valid image
  })
  // const filename =
  //   '/Users/song/Workspace/FullstackAcademy/senior/whats-that/web/out.png'

  console.log('Start Google Vision API... ')
  const filename = path.join(__dirname, '../../out.png')


  client
    .landmarkDetection(filename)
    .then(results => {
      const landmarks = results[0].landmarkAnnotations
      console.log('Landmarks:')
      landmarks.forEach(landmark => {
        console.log(landmark)
        console.log(landmark.description)
        console.log(landmark.locations[0].latLng) // e.g. {latitude: 40.718639, longitude: -74.013519}
        res.setHeader("Content-Type", "text/html");
        // res.write('Process Completed...')
        const returnObj = {
          name: landmark.description,
          image: blob,
          coordinates: [landmark.locations[0].latLng.latitude, landmark.locations[0].latLng.longitude]
        }
        landmark.description ? res.send(returnObj) : res.send("no data")
        res.redirect('/')
        res.end()
      })
    .catch(err => {
      // console.log('Process Completed... ')
      console.error('Process Completed...', err)
      // console.error('ERROR..:', err)
    })
    // client
  //   .webDetection(filename)
  //   .then(results => {
  //     console.log(results)
  //     //need a helper function for saving to database
  //     res.json(results)
  //     res.send("oops didn't hit")

  // .labelDetection(filename)
  // .then(results => {
    //   const labels = results[0].labelAnnotations
    //   console.log('Results:', results)
    //   // labels.forEach(label => console.log(label.description))
    // })

  })
})



/* =========================================================== */

/* to test Google API */
router.get('/getDataFromGoogleAPI', (req, res, next) => {
  const client = new vision.ImageAnnotatorClient()
  const filename =
    '/Users/song/Workspace/FullstackAcademy/senior/whats-that/web/img1.jpg'

  client
    .landmarkDetection(filename)
    .then(results => {
      const landmarks = results[0].landmarkAnnotations
      console.log('Landmarks:')
      landmarks.forEach(landmark => {
        console.log(landmark)
        console.log(landmark.description)
        console.log(landmark.locations[0].latLng) // e.g. {latitude: 40.718639, longitude: -74.013519}
        res.send(landmark.description)
      })
    })
        .catch(err => {
          console.error('ERROR:', err)

    // .labelDetection(filename)
    // .then(results => {
    //   const labels = results[0].labelAnnotations

    //   console.log('Results:', results)
    //   // labels.forEach(label => console.log(label.description))
    // })
  })
})

router.get('/history', async (req, res, next) => {
  try {
    console.log('user is...!:', req.user)
    const landmarks = await Landmark.findAll({
      where: {
        userId: req.user
      },
      // attributes: ['id', 'name', 'rating', 'comment']
    })
    res.send(landmarks)
  } catch (error) {
    next(error)
  }
})

router.get('/history/:id', async (req, res, next) => {
  try {
    const landmark = await Landmark.findById(req.params.id)
    res.send(landmark)
  } catch (error) {
    next(error)
  }
})

module.exports = router
