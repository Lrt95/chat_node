/**
 * @namespace repository
 */
/**
 * This file requires {@link module:../models/messageModel}, {@link module:../tools/repository/userHelper}.
 * @requires module:../models/messageModel
 * @requires module:../tools/repository/userHelper
 */
const {messageSchema} = require("../models/messageModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const MessageModel = mongoose.model('messages', messageSchema)
const {updateRoomById} = require('../repository/roomRepository')


//region get
/**
 * Return a message by id.
 * @function
 * @memberOf repository
 * @name getMessageById
 * @param {object} messageData - data to search in database
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function getMessageById(messageData) {
    return await MessageModel.findOne({_id: messageData}, { "__v": 0} ).lean()
        .exec()
        .then(result => {return {success: result}})
        .catch(err => {return {error: err.errors}});
}
//endregion

//region post
/**
 * Add a new message in database, and return the result of this try
 * @function
 * @memberOf repository
 * @name createMessage
 * @param {object} messageData - user to add, should correspond to userModel {@link '../models/userModels'}.
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function createMessage(messageData) {
    const doc = new MessageModel(messageData);
    return await doc.save()
        .then(result => {
            updateRoomById({id: messageData.id_room}, { $push: {messages: ObjectId(result._id)}})
            return {success: result}
        })
        .catch(err => {
            return {error: err.errors}
        })
}
//endregion

//region patch
/**
 * A generic function used to update a message.
 * @function
 * @memberOf repository
 * @name updateMessage
 * @param {object} filter - object used by mongoDB to select corresponding documents in repository.
 * @param {object} update - object containing fields to set (ex: $set, or $push).
 * @returns {Promise<{success: Object}|{error}>}
 */
async function updateMessage(filter, update) {
    return await MessageModel
        .findOneAndUpdate(
            filter,
            update,
            {new: true, runValidators: true, context: "query"})
        .lean()
        .exec()
        .then((result) => {
            return {success: result}
        })
        .catch(err => {
            return {error: err.errors}
        });
}

/**
 * Update message's data depending on his ID and wanted fields to set
 * @function
 * @memberOf repository
 * @name updateMessageById
 * @param {object} data - user's data
 * @param {object} update - object containing fields to set (ex: $set, or $push).
 * @returns {Promise<{success: Object}|{error}>}
 */
async function updateMessageById(data, update) {
    try {
        return await updateMessage({_id: ObjectId(data.id)}, update)
    }
    catch (e) {
        return {error : "erreur lors de la mise à jour du message"}
    }
}
//endregion

//region delete
/**
 * Delete message by id.
 * @function
 * @memberOf repository
 * @name deleteMessageById
 * @param {object} messageData - data to search in database
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function deleteMessageById(messageData) {
    return await MessageModel.deleteOne({_id: messageData}, { "__v": 0} )
        .lean()
        .exec()
        .then(result => {
            return {success: result}
        })
        .catch(err => {return {error: err.errors}});
}
//endregion


module.exports = {getMessageById, createMessage, updateMessageById, deleteMessageById};
