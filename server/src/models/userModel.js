const mongoose = require('mongoose');

/**
 * Our User Model used for mongoDB {@link '../repository/userRepository.js'}.
 * @type {module:mongoose.Schema<any>}
 */
exports.userSchema = new mongoose.Schema({
    mail: {type: String, required: true, unique: true},
    pseudo: {type: String, unique: true, required:true},
    password: {type: String, required: true},
    type: {type: String, required: true}
});
