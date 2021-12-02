/**
 * @namespace Controllers
 */

//region get
/**
 * Get Me on our app
 * @function
 * @memberOf Controllers
 * @name getMe
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */

//region get
exports.getMe = async (req, res, next) => {
    return res.status(200).send("Je suis loggé :)")
};





