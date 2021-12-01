// region Prepare to include the server code into our web_server
//region MongoDB connection
/**
 * This file requires {@link module:./tools/repository/database},  {@link module:./app}.
 * @requires module:./tools/repository/database
 * @requires module:./app
 */
const database = require("./src/tools/DB/database")
const http = require("http");
const {app} = require("./app")
require('dotenv').config();

database.connect()
const server = http.createServer(app);


/**
 * Our app listen port
 * @type {number}
 */
const PORT = process.env.PORT || 3050;
server.listen(PORT, () => {
    console.log("started " + PORT);
});
