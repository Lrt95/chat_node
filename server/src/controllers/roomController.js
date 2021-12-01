/**
 * @namespace Controllers
 */
/**
 * This Controller file requires {@link module:../services/roomService }  and
 * {@link module:../tools/Controller/controllerHelper}.
 * @requires module:../services/roomService
 * @requires module:../tools/Controller/controllerHelper
 */
const {addRoom, getAllRooms, getRoom, updateRoom, deleteRoom} = require("../services/roomService");
const {emptyRequest} = require("../tools/Controller/controllerHelper");
const types = require("@withvoid/make-validation/lib/validationTypes");
const makeValidation = require("@withvoid/make-validation");

const checksRoom= {
    id: {type: types.string, options: {empty: false}},
};

const checksCreateRoom= {
    name: {type: types.string, options: {empty: false}},
};

const checksUpdateRoom = {
    id: {type: types.string, options: {empty: false}},
    name: {type: types.string, options: {empty: false}},
};

//region get
/**
 * Get all rooms on our app, saved in mongoDb
 * @function
 * @memberOf Controllers
 * @name getAllRooms
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.getAllRooms = async (req, res, next) => {
    const response = await getAllRooms()
    return res.status(response.code).send(response.body)
};

/**
 * Get room on our app, saved in mongoDb
 * @function
 * @memberOf Controllers
 * @name getRoom
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.getRoom = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksRoom
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const room = req.body;
    const response = emptyRequest(room) ? emptyRequest(room) : await getRoom(room)
    return res.status(response.code).send(response.body)
};

//region get

//region post
/**
 * Create a new room on our app, saved in mongoDb
 * @function
 * @memberOf Controllers
 * @name createRoom
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.createRoom = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksCreateRoom
        });
    });
    if (!validation.success) return res.status(400).json(validation);

    const room = req.body;
    const response = emptyRequest(room) ? emptyRequest(room) : await addRoom(room)
    return res.status(response.code).send(response.body)
};
//endregion


//region patch
/**
 * Update a room depending on request data.
 * @function
 * @memberOf Controllers
 * @name updateRoom
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.updateRoom = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksUpdateRoom
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const room = req.body;
    const response = emptyRequest(room) ? emptyRequest(room) : await updateRoom(room)
    return res.status(response.code).send(response.body)
};

//endregion

//region delete
/**
 * delete a room depending on request data.
 * @function
 * @memberOf Controllers
 * @name deleteRoom
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.deleteRoom = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksRoom
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const room = req.body;
    const response = emptyRequest(room) ? emptyRequest(room) : await deleteRoom(room)
    return res.status(response.code).send(response.body)
};

//endregion


