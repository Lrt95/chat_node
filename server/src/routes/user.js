/**
 * This file requires {@link module:../controllers/usersController}, {@link module:../middlewares/middleware }  and
 * {@link module:./const}.
 * @requires module:../controllers/usersController
 * @requires module:../middlewares/middleware
 * @requires module:./const
 */
const {signIn, signUp, updateUser, deleteUser, forgotPassword, sendMail} = require("../controllers/usersController");
const {authenticateTokenAdmin} = require("../middlewares/middleware")
const {url} = require("./const");

module.exports = (app) => {
    app.post(url + "user-signin", signIn);
    app.post(url + "users", signUp);
    app.post(url + "forgot-password", sendMail);
    app.put(url + "update-users", authenticateTokenAdmin, updateUser);
    app.delete(url + "delete-users", authenticateTokenAdmin, deleteUser);
};
