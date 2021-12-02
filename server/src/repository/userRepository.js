/**
 * @namespace repository
 */
/**
 * This file requires {@link module:../models/userModel}, {@link module:../tools/repository/userHelper}.
 * @requires module:../models/userModel
 * @requires module:../tools/repository/userHelper
 */
const {userSchema} = require("../models/userModel");
const {filterPassword} = require("../tools/DB/userHelper");
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const {generate, verify} = require("password-hash");
const UserModel = mongoose.model('users', userSchema)


//region get
/**
 * Check if user's data are in database and check if password is correct,
 * depending on login value, and return the result of this try.
 * Login could be mail or pseudo.
 * @function
 * @memberOf repository
 * @name signIn
 * @param {object} userData - data to search in database
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function signIn(userData) {
    return await UserModel.findOne({  $or: [
            { pseudo: userData.login  },
            { mail: userData.login },
        ]}, { "__v": 0} ).lean()
        .exec()
        .then(result => {
            return result===null ? {error: "login incorrect"}
                : verify(userData.password, result.password) ? {success: filterPassword(result)}
                    : {error: "mot de passe incorrect"}
        })
        .catch(err => {return {error: err.errors}});
}
//endregion

//region post
/**
 * Add a new user in database, and return the result of this try
 * @function
 * @memberOf repository
 * @name signUp
 * @param {object} userData - user to add, should correspond to userModel {@link '../models/userModels'}.
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function signUp(userData) {
    userSchema.plugin(uniqueValidator)
    const doc = new UserModel(userData);
    doc.password = generate(userData.password)
    return await doc.save()
        .then(result => {return {success: filterPassword(result)}})
        .catch(err => {return {error: err.errors}})
}
//endregion

//region patch
/**
 * A generic function used to update a user.
 * @function
 * @memberOf repository
 * @name updateUser
 * @param {object} filter - object used by mongoDB to select corresponding documents in repository.
 * @param {object} update - object containing fields to set (ex: $set, or $push).
 * @returns {Promise<{success: Object}|{error}>}
 */
async function updateUser(filter, update) {
    return await UserModel
        .findOneAndUpdate(
            filter,
            update,
            {new: true, runValidators: true, context: "query"})
        .lean()
        .exec()
        .then((result) => {
            return {success: filterPassword(result)}
        })
        .catch(err => {
            return {error: err.errors}
        });
}

/**
 * Update user's data depending on his ID and wanted fields to set
 * @function
 * @memberOf repository
 * @name updateUserById
 * @param {object} data - user's data
 * @param {object} update - object containing fields to set (ex: $set, or $push).
 * @returns {Promise<{success: Object}|{error}>}
 */
async function updateUserById(data, update) {
    try {
        userSchema.plugin(uniqueValidator)
        return await updateUser({_id: ObjectId(data.id)}, update)
    }
    catch (e) {
        return {error : "erreur lors de la mise à jour de l'utilisateur"}
    }
}
//endregion

//region get
/**
 * Delete room by id.
 * @function
 * @memberOf repository
 * @name deleteUserById
 * @param {object} userData - data to search in database
 * @returns {Promise<{success: *}|{error: Error.ValidationError | {[p: string]: ValidatorError | CastError} | number}>}
 */
async function deleteUserById(userData) {
    return await UserModel.deleteOne({_id: userData.id}, { "__v": 0} )
        .lean()
        .exec()
        .then(result => {
            return {success: result}
        })
        .catch(err => {return {error: err.errors}});
}
//endregion


module.exports = {signUp, signIn, updateUserById, deleteUserById};
