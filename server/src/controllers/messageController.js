/**
 * @namespace Controllers
 */
/**
 * This Controller file requires {@link module:../services/messageService }  and
 * {@link module:../tools/Controller/controllerHelper}.
 * @requires module:../services/messageService
 * @requires module:../tools/Controller/controllerHelper
 */
const {addMessage, getMessage, updateMessage, deleteMessage} = require("../services/messageService");
const {emptyRequest} = require("../tools/Controller/controllerHelper");
const types = require("@withvoid/make-validation/lib/validationTypes");
const makeValidation = require("@withvoid/make-validation");

const checksMessage= {
    id: {type: types.string, options: {empty: false}},
    message: {type: types.string, options: {empty: false}},
    pseudo: {type: types.string, options: {empty: false}},
    id_room: {type: types.string, options: {empty: false}},
};

const checksCreateMessage= {
    message: {type: types.string, options: {empty: false}},
    pseudo: {type: types.string, options: {empty: false}},
    id_room: {type: types.string, options: {empty: false}},
};

const checksDeleteMessage = {
    id: {type: types.string, options: {empty: false}},
};

//region get
/**
 * Get Message on our app, saved in mongoDb
 * @function
 * @memberOf Controllers
 * @name getMessage
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.getMessage = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksMessage
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const message = req.body;
    const response = emptyRequest(message) ? emptyRequest(message) : await getMessage(message)
    return res.status(response.code).send(response.body)
};

//region get

//region post
/**
 * Create a new Message on our app, saved in mongoDb
 * @function
 * @memberOf Controllers
 * @name createMessage
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.createMessage = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksCreateMessage
        });
    });
    if (!validation.success) return res.status(400).json(validation);

    const message = req.body;
    const response = emptyRequest(message) ? emptyRequest(message) : await addMessage(message)
    return res.status(response.code).send(response.body)
};
//endregion


//region patch
/**
 * Update a message depending on request data.
 * @function
 * @memberOf Controllers
 * @name updateMessage
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.updateMessage = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksMessage
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const message = req.body;
    const response = emptyRequest(message) ? emptyRequest(message) : await updateMessage(message)
    return res.status(response.code).send(response.body)
};

//endregion

//region delete
/**
 * delete a message depending on request data.
 * @function
 * @memberOf Controllers
 * @name deleteMessage
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.deleteMessage = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksDeleteMessage
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const message = req.body;
    const response = emptyRequest(message) ? emptyRequest(message) : await deleteMessage(message)
    return res.status(response.code).send(response.body)
};

//endregion


