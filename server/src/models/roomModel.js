const mongoose = require('mongoose');

/**
 * Our Room Model used for mongoDB {@link '../repository/roomRepository.js'}.
 * @type {module:mongoose.Schema<any>}
 */
exports.roomSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    messages: [{type: mongoose.Types.ObjectId, ref: 'messages' }],
});
