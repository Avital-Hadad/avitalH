const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String },
    password: { type: String },
    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }]
})
module.exports = mongoose.model('User', userSchema);