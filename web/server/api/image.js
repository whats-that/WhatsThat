const router = require('express').Router
const { Image } = require('../db')

module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const image = await Image.findOne({
      where: {
        landmarkId: req.params.id
      }
    })
    res.send(image.blob)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const image = await Image.create(req.body)
    res.send(image)
  } catch (error) {
    next(error)
  }
})