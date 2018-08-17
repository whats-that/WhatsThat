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
    defaultValue: 5
  },
  comment: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.BLOB
  }
})

module.exports = LandMark


/*
image: {
  type: Sequelize.BLOB
},
coordinates: {
  type: Sequelize.ARRAY(Sequelize.FLOAT)
}
})

module.exports = LandMark
*/
