/**
 * @namespace repository
 */
/**
 * This file requires {@link module:../models/roomModel}.
 * @requires module:../models/roomModel
 */
const {roomSchema} = require("../models/roomModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const RoomModel = mongoose.model('rooms', roomSchema)

//region get
/**
 * Return room by id.
 * @function
 * @memberOf repository
 * @name getRoomById
 * @param {object} roomData - data to search in database
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function getRoomById(roomData) {
    return await RoomModel.findOne({_id: roomData}, { "__v": 0} )
        .populate({path: 'messages', match: {id_room: roomData}})
        .lean()
        .exec()
        .then(result => {
            return {success: result}
        })
        .catch(err => {return {error: err.errors}});
}

/**
 * Return all rooms.
 * @function
 * @memberOf repository
 * @name getAllRoom
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function getAllRoom() {
    return await RoomModel.find({}, { "__v": 0} )
        .lean()
        .exec()
        .then(result => {
            return {success: result}
        })
        .catch(err => {return {error: err.errors}});
}
//endregion

//region post
/**
 * Add a new room in database, and return the result of this try
 * @function
 * @memberOf repository
 * @name createRoom
 * @param {object} roomData - user to add, should correspond to roomModel {@link '../models/roomModels'}.
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function createRoom(roomData) {
    const doc = new RoomModel(roomData);
    return await doc.save()
        .then(result => {
            return {success: result}
        $})
        .catch(err => {
            console.log(err)
            return {error: err.errors}})
}
//endregion

//region patch
/**
 * A generic function used to update a room.
 * @function
 * @memberOf repository
 * @name updateRoom
 * @param {object} filter - object used by mongoDB to select corresponding documents in repository.
 * @param {object} update - object containing fields to set (ex: $set, or $push).
 * @returns {Promise<{success: Object}|{error}>}
 */
async function updateRoom(filter, update) {
    return await RoomModel
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
 * Update room's data depending on his ID and wanted fields to set
 * @function
 * @memberOf repository
 * @name updateRoomById
 * @param {object} data - user's data
 * @param {object} update - object containing fields to set (ex: $set, or $push).
 * @returns {Promise<{success: Object}|{error}>}
 */
async function updateRoomById(data, update) {
    try {
        return await updateRoom({_id: ObjectId(data.id)}, update)
    }
    catch (e) {
        return {error : "erreur lors de la mise à jour de la room"}
    }
}
//endregion

//region delete
/**
 * Delete room by id.
 * @function
 * @memberOf repository
 * @name deleteRoomById
 * @param {object} roomData - data to search in database
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function deleteRoomById(roomData) {
    return await RoomModel.deleteOne({_id: roomData}, { "__v": 0} )
        .lean()
        .exec()
        .then(result => {
            return {success: result}
        })
        .catch(err => {return {error: err.errors}});
}
//endregion


module.exports = {getAllRoom, getRoomById, createRoom, updateRoomById, deleteRoomById};
