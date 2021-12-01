/**
 * This file requires {@link module:../controllers/messageController}, {@link module:../middlewares/middleware }  and
 * {@link module:./const}.
 * @requires module:../controllers/messageController
 * @requires module:../middlewares/middleware
 * @requires module:./const
 */
const { getMessage, createMessage, updateMessage, deleteMessage} = require("../controllers/messageController");
const {authenticateTokenAdmin} = require("../middlewares/middleware")
const {url} = require("./const");

module.exports = (app) => {
    app.get(url + "message/:id", getMessage);
    app.post(url + "message", createMessage);
    app.put(url + "update-message", authenticateTokenAdmin, updateMessage);
    app.delete(url + "delete-message", authenticateTokenAdmin, deleteMessage);
};
