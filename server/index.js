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
const {setServerIo} = require('./chat-server')
const Server = require('socket.io');
require('dotenv').config();

database.connect()
const server = http.createServer(app);
const io = Server(server, {
    cors:true,
    origins:["http://localhost:3000"],
    credentials: true
})

var messagessend = [];
var users = []

io.on("connection", (socket) => {
    console.log("User connecté", socket.id)
    socket.on("create", function (room) {
        socket.join(room)
    });

    socket.on('hello', (arg) => {
        console.log(JSON.stringify(arg))
    })
    socket.on("joinRoom", ({ username, roomname }) => {
        const user = join_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(user.room);
        users.push(user)

        // message de bienvenue
        socket.emit("message", {
            userId: user.id,
            username: user.username,
            text: `Welcome ${user.username}`,
        });

        //On affiche la room avec les autres messages
        socket.broadcast.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            text: `${user.username} has joined the chat`,
        });
    });

    //Message envoyé
    socket.on("chat", (text) => {
        const user = get_Current_User(socket.id);

        io.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            text: text,
        });
        messagessend.push(text);
    });

    socket.on("disconnect", () => {
        // io.to(user.room).emit(`${user.username} has left the room`)
    });
})


/**
 * Our app listen port
 * @type {number}
 */
const PORT = process.env.PORT || 3050;
server.listen(PORT, () => {
    console.log("started " + PORT);
});
