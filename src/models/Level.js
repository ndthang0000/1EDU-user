const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Level = new Schema({
  tittle: { type: String, required: true, unique: true }
}, { timestamps: true })

module.exports = mongoose.model('Level', Level)
