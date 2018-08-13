const User = require('./user')
const LandMark = require('./landmark')

// If we had any associations to make, this would be a great place to put them!
// e.g. BlogPost.belongsTo(User)

LandMark.belongsTo(User)
User.hasMany(LandMark)

// We'll export all of our models here, so that any time a module needs a model,
// usuage : const { User } = require('path~/db/models)
module.exports = {
  User,
  LandMark
}
