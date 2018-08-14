const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  blob: {
    type: Sequelize.BLOB
  }
})

module.exports = Image