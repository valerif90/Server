const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    followed: {type: Boolean, required: true},
    likesCount: {type: Number, required: true},
    fullName: {type: String, required: true},
    photoUrl: {type: String, required: true},
    age: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    info: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);