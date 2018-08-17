const router = require('express').Router()
const path = require('path')
// Imports the Google Cloud client library.
const vision = require('@google-cloud/vision')
const { LandMark } = require('../db/models')

router.post('/getDataFromGoogleAPI', (req, res, next) => {
  const client = new vision.ImageAnnotatorClient()
  const blob = req.body.base64

  let binaryData = new Buffer.from(blob, 'base64').toString('binary')
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

router.get('/history', async (req, res, next) => {
  try {
    const landmarks = await LandMark.findAll({
      where: {
        userId: 1
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
    const landmark = await LandMark.findById(req.params.id)
    res.send(landmark)
  } catch (error) {
    next(error)    
  }
})

module.exports = router