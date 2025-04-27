const mongoose = require('mongoose')

// to create club schema
const clubSchema = new mongoose.Schema({
    name: String,
    logo: String,
    description: String,
    mission: String,
    vision: String,
    leaders: Array,
    events: Array,
    gallery: Array
  });

// to create club model
//clubinfo is the name of collection in mongodb
const ClubModel = mongoose.model('clubinfos', clubSchema)

// to use this schema in other file
module.exports = ClubModel