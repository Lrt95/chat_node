/**
 * @namespace Controllers
 */
/**
 * This Controller file requires {@link module:../services/usersService }  and
 * {@link module:../tools/Controller/controllerHelper}.
 * @requires module:../services/usersService
 * @requires module:../tools/Controller/controllerHelper
 */
const { addUser, updatePasswordByEmail, getUser, updateUser, deleteUser } = require("../services/usersService");
const { emptyRequest } = require("../tools/Controller/controllerHelper");
const types = require("@withvoid/make-validation/lib/validationTypes");
const makeValidation = require("@withvoid/make-validation");
const nodemailer = require('nodemailer');
const { generate } = require("password-hash");
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'freddy.ledner12@ethereal.email',
        pass: 'tr8NXUWQUhCPEw17RD'
    }
});

const checksSignUp = {
    pseudo: {type: types.string, options: {empty: false}},
    mail: {type: types.string, options: {empty: false}},
    password: {type: types.string, options: {empty: false}},
    type: {type: types.enum, options: {enum: "ADMIN USER", empty: false}}
};

const checksSignIn = {
    login: {type: types.string, options: {empty: false}},
    password: {type: types.string, options: {empty: false}},
};

const checksUpdate = {
    pseudo: {type: types.string, options: {empty: false}},
    mail: {type: types.string, options: {empty: false}},
};

const checksDelete = {
    id: {type: types.string, options: {empty: false}},
};

const checksForgotPassword = {
    mail: { type: types.string, options: { empty: false } },
};

//region post
/**
 * Create a new account on our app, saved in mongoDb
 * @function
 * @memberOf Controllers
 * @name signUp
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.signUp = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksSignUp
        });
    });
    if (!validation.success) return res.status(400).json(validation);

    const user = req.body;
    const response = emptyRequest(user) ? emptyRequest(user) : await addUser(user)
    res.cookie('token-user', response.body.token , {maxAge: 9000000, httpOnly: true})
    return res.status(response.code).send(response.body)
};

exports.sendMail = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksForgotPassword
        });
    });
    const {mail} = req.body;
    const randomPassword = Math.random().toString(36).slice(-8);
    if (!validation.success) return res.status(400).json(validation);
    try {
        await transporter.sendMail({
            from: 'freddy.ledner12@ethereal.email',
            to: mail,
            subject: 'Nouveau password',
            html: '<h1>Ton nouveau password est </h1>' + randomPassword,
        });
    } catch (e){
        console.log(e)
    }
    const passwordhash = generate(randomPassword)
    console.log(passwordhash)
    const response = await updatePasswordByEmail(mail , passwordhash)
    return res.status(response.code).send(response.body)
}

/**
 * Try to login a user if the mail/pseudo and password match in repository.
 * @function
 * @memberOf Controllers
 * @name signIn
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.signIn = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksSignIn
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const user = req.body;
    const response = emptyRequest(user) ? emptyRequest(user) : await getUser(user)
    res.cookie('token-user', response.body.token , {maxAge: 9000000, httpOnly: true})
    return res.status(response.code).send(response.body)
};
//endregion


//region patch
/**
 * Update a user depending on request data.
 * @function
 * @memberOf Controllers
 * @name updateUser
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.updateUser = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksUpdate
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const user = req.body;
    user.id = req.user._id
    const response = emptyRequest(user) ? emptyRequest(user) : await updateUser(user)

    res.cookie('token-user', response.body.token , {maxAge: 9000000, httpOnly: true})
    return res.status(response.code).send(response.body)
};

//endregion

//region delete
/**
 * delete a user depending on request data.
 * @function
 * @memberOf Controllers
 * @name deleteUser
 * @param {Object.<Request>} req - request received
 * @param {Object.<Response>} res - response to dispatched
 * @param {Function} next - get control to the next middleware function
 * @returns {Promise<*|boolean|void>}
 */
exports.deleteUser = async (req, res, next) => {
    const validation = makeValidation(types => {
        return ({
            payload: req.body,
            checks: checksDelete
        });
    });
    if (!validation.success) return res.status(400).json(validation);
    const user = req.body;
    const response = emptyRequest(user) ? emptyRequest(user) : await deleteUser(user)
    return res.status(response.code).send(response.body)
};

//endregion


