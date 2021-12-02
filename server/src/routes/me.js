/**
 * This file requires {@link module:../controllers/meController}, {@link module:../middlewares/middleware }  and
 * {@link module:./const}.
 * @requires module:../controllers/meController
 * @requires module:../middlewares/middleware
 * @requires module:./const
 */
const { getMe } = require("../controllers/meController");
const {authenticateToken} = require("../middlewares/middleware")
const {url} = require("./const");

module.exports = (app) => {
    app.get(url + "me", authenticateToken, getMe);
};
