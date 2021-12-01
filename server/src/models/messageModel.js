const mongoose = require('mongoose');

/**
 * Our Message Model used for mongoDB {@link '../repository/messageRepository.js'}.
 * @type {module:mongoose.Schema<any>}
 */
exports.messageSchema = new mongoose.Schema({
    pseudo: {type: String, required: true},
    message: {type: String, required:true},
    id_room: {type: String, required:true}
});
