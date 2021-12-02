/**
 * @namespace Services
 */
/**
 * This Service file requires {@link module:../tools/services/responseHandler }, {@link module:../tools/token},
 * {@link module:../tools/repository/requestOperator} and {@link module:../repository/roomRepository}
 * @requires module:../tools/services/responseHandler
 * @requires module:../tools/token
 * @requires module:../tools/repository/requestOperator
 * @requires module:../repository/messageRepository
 */
const {getHandler} = require("../tools/Services/responseHandler");
const {setUpdateValue} = require('../tools/Services/requestOperator')
const {getAllRoom, getRoomById, createRoom, deleteRoomById, updateRoomById} = require("../repository/roomRepository");


//region exported functions
//region get
/**
 * Get room's data.
 * @function
 * @memberOf Services
 * @name getRoom
 * @param {object} room - room's data needed to signIn
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function getRoom(room) {
    const result = await getRoomById(room);
    return getHandler(result , "repository error", 404)
}

/**
 * Get all room's data.
 * @function
 * @memberOf Services
 * @name getAllRooms
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function getAllRooms() {
    const result = await getAllRoom();
    return getHandler(result , "repository error", 404)
}
//endregion

//region post
/**
 * Create a new room, that will be add in database.
 * @function
 * @memberOf Services
 * @name addRoom
 * @param {object} room - room to add, should be really similar to RoomModel {@link '../models/userModel'}.
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function addRoom(room) {
    const result = await createRoom(room);
    return getHandler(result , "repository error", 404)
}
//endregion

//region patch
/**
 * Update current room, thanks to given data.
 * @function
 * @memberOf Services
 * @name updateRoom
 * @param {object} room - room's data
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: *}>}
 */
async function updateRoom(room) {
    const keysToUpdate = Object.keys(room).filter(word => ["name"].includes(word));
    const result = await updateRoomById(room, setUpdateValue(room, keysToUpdate));
    return getHandler(result , "repository error", 404)
}
//endregion

//region post
/**
 * Delete a room, that will be add in database.
 * @function
 * @memberOf Services
 * @name deleteMessage
 * @param {object} room - room to delete.
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function deleteRoom(room) {
    const result = await deleteRoomById(room);
    return getHandler(result , "repository error", 404)
}
//endregion

module.exports = {getAllRooms, getRoom, addRoom, updateRoom, deleteRoom};
