const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    date: { type: String },
    city: { type: String },
    weather: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
module.exports = mongoose.model('History', historySchema);