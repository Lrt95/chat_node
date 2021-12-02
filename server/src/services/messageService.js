/**
 * @namespace Services
 */
/**
 * This Service file requires {@link module:../tools/services/responseHandler }, {@link module:../tools/token},
 * {@link module:../tools/repository/requestOperator} and {@link module:../repository/messageRepository}
 * @requires module:../tools/services/responseHandler
 * @requires module:../tools/token
 * @requires module:../tools/repository/requestOperator
 * @requires module:../repository/messageRepository
 */
const {getHandler} = require("../tools/Services/responseHandler");
const {setUpdateValue} = require('../tools/Services/requestOperator')
const {getMessageById, deleteMessageById, createMessage, updateMessageById} = require("../repository/messageRepository");


//region exported functions
//region get
/**
 * Get message's data.
 * @function
 * @memberOf Services
 * @name getUser
 * @param {object} message - message's data needed to signIn
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function getMessage(message) {
    const result = await getMessageById(message);
    return getHandler(result , "repository error", 404)
}
//endregion

//region post
/**
 * Create a new message, that will be add in database.
 * @function
 * @memberOf Services
 * @name addMessage
 * @param {object} message - message to add.
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function addMessage(message) {
    const result = await createMessage(message);
    return getHandler(result , "repository error", 404)
}
//endregion

//region patch
/**
 * Update current message, thanks to given data.
 * @function
 * @memberOf Services
 * @name updateMessage
 * @param {object} message - message's data
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: *}>}
 */
async function updateMessage(message) {
    const keysToUpdate = Object.keys(message).filter(word => ["message"].includes(word));
    const result = await updateMessageById(message, setUpdateValue(message, keysToUpdate));
    return getHandler(result , "repository error", 404)
}
//endregion

//region post
/**
 * Delete a message, that will be add in database.
 * @function
 * @memberOf Services
 * @name deleteMessage
 * @param {object} message - message to delete.
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function deleteMessage(message) {
    const result = await deleteMessageById(message);
    return getHandler(result , "repository error", 404)
}
//endregion

module.exports = {addMessage, getMessage, updateMessage, deleteMessage};
