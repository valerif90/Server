const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messageText: {type: String, required: true},
    created: {type: String}
});

module.exports = mongoose.model('Message', messageSchema);