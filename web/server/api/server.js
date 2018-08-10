const axios = require('axios')

const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  console.log("testing")
  res.json()
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

router.post('/', async (req, res, next) => {
  try {
    // const res = await axios.post('', req.body)
  } catch (err) {
    next(err)
  }
})
