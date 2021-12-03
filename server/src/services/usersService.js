/**
 * @namespace Services
 */
/**
 * This Service file requires {@link module:../tools/services/responseHandler }, {@link module:../tools/token},
 * {@link module:../tools/repository/requestOperator} and {@link module:../repository/userRepository}
 * @requires module:../tools/services/responseHandler
 * @requires module:../tools/token
 * @requires module:../tools/repository/requestOperator
 * @requires module:../repository/userRepository
 */
const {getHandler, updateDbHandler} = require("../tools/Services/responseHandler");
const {generateAccessToken} = require("../tools/token")
const {setUpdateValue} = require('../tools/Services/requestOperator')
const {signUp, updateUserByEmail, signIn, updateUserById, deleteUserById} = require("../repository/userRepository");


//region exported functions
//region get
/**
 * Get user's data if a user with corresponding pseudo/mail and password exist.
 * @function
 * @memberOf Services
 * @name getUser
 * @param {object} user - user's data needed to signIn
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function getUser(user) {
    const userData = await signIn(user);
    return closeUserAction(userData,"Any account found with this login/password" ,false)
}
//endregion

//region post
/**
 * Create a new user, that will be add in database.
 * @function
 * @memberOf Services
 * @name addUser
 * @param {object} user - user to add, should be really similar to UserModel {@link '../models/userModel'}.
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function addUser(user) {
    const result = await signUp(user);
    return closeUserAction(result)
}
//endregion

//region patch
/**
 * Update current user, thanks to given data. Only authorize to set Pseudo, mail and avatar.
 * @function
 * @memberOf Services
 * @name updateUser
 * @param {object} user - user's data
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: *}>}
 */
async function updateUser(user) {
    const keysToUpdate = Object.keys(user).filter(word => ["pseudo", "mail"].includes(word));
    const userData = await updateUserById(user, setUpdateValue(user, keysToUpdate));
    return closeUserAction(userData, "Can't update this user: any corresponding account found")
}

async function updatePasswordByEmail(mail, password) {
    const userData = await updateUserByEmail({mail, password}, {$set: {password}});
    return closeUserAction(userData, "Can't update this user: any corresponding account found")
}

//endregion

//endregion

//region not exported function
/**
 * This function is used to close action. We generate a new token
 * and return a http code status and body.
 * @function
 * @memberOf Services
 * @name closeUserAction
 * @param {object} userData - user's data from a response
 * @param {string } [msg= "repository error"] - message to send in body if there is an issue
 * @param {boolean} isSetDb - true if the action should have set repository
 * @returns {{code: number, body: {error: string}}|{code: number, body: *}}
 */
function closeUserAction(userData,  msg="repository error", isSetDb=true){
    generateAccessToken(userData);
    return ( isSetDb ? updateDbHandler(userData , msg, 500) : getHandler(userData , msg, 404)  )
}
//endregion

//region post
/**
 * Delete a user, that will be add in database.
 * @function
 * @memberOf Services
 * @name deleteUser
 * @param {object} user - user to delete, should be really similar to UserModel {@link '../models/userModel'}.
 * @returns {Promise<{code: number, body: {error: string}}|{code: number, body: {error: *}}|{code: number, body: *}>}
 */
async function deleteUser(user) {
    const result = await deleteUserById(user);
    return getHandler(result , "repository error", 404)
}
//endregion

module.exports = {addUser, updatePasswordByEmail, getUser, updateUser, deleteUser};
