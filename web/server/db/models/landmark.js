const Sequelize = require('sequelize')
const db = requrire('../db')

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
  }
})

module.exports(LandMark)