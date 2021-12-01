/**
 * This file requires {@link module:../controllers/roomController}, {@link module:../middlewares/middleware }  and
 * {@link module:./const}.
 * @requires module:../controllers/roomController
 * @requires module:../middlewares/middleware
 * @requires module:./const
 */
const {getAllRooms, getRoom, createRoom, updateRoom, deleteRoom} = require("../controllers/roomController");
const {authenticateTokenAdmin, authenticateToken} = require("../middlewares/middleware")
const {url} = require("./const");

module.exports = (app) => {
    app.get(url + "rooms", authenticateToken,getAllRooms);
    app.get(url + "room/:id", authenticateToken, getRoom);
    app.post(url + "room", authenticateTokenAdmin, createRoom);
    app.put(url + "update-room", authenticateTokenAdmin, updateRoom);
    app.delete(url + "delete-room", authenticateTokenAdmin, deleteRoom);
};
