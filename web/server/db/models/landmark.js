const Sequelize = require('sequelize')
const db = require('../db')

const LandMark = db.define('landmark', {
  name: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER,
    validations: {
      max: 5,
      min: 1
    },
    default: 5 
  },
  comment: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.BLOB
  }
})

module.exports = LandMark