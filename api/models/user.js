const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: String,
    photoUrl: String
});

module.exports = mongoose.model('User', userSchema);