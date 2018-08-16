const router = require('express')
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    await axios.post('/', 'molinari-delicatessen-san-francisco')
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const query = req.body
    const response = await axios.get(`https://api.yelp.com/v3/businesses/search/${query}`)
    const id = response.businesses[0].id
    const restaurant = await axios.get(`https://api.yelp.com/v3/businesses/${id}`)
    res.json(restaurant)
  } catch (error) {
    next(error)
  }
})

module.exports = router