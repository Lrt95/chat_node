let messagesEnd = [];
let users = []
let socketIo;
let io = {};

let serverIo

function setServerIo(server) {
    serverIo = server
}

function addServer(roomName) {
    io[roomName] = require('socket.io')(serverIo)
    runServerIo(io[roomName])
}

function runServerIo(io) {

    io.on("connection", (socket) => {
        // test runSocketIo(socket)
        console.log("User connecté", socket.id)

        socket.on("chat", (text) => {
            const user = get_Current_User(socket.id);

            io.to(user.room).emit("message", {
                userId: user.id,
                username: user.username,
                text: text,
            });
            messagesEnd.push(text);
        });

        socket.on("test", () =>  {
            console.log("hello world")
        });

        socket.on("joinRoom", ({userId, userName, roomName}) => {
            const user = join_User(userId, userName, roomName);
            console.log(userId, "=id");
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

        socket.on("create", function (room) {
            socket.join(room)
        });

        socket.on("disconnect", () => {
            io.to(user.room).emit(`${user.username} has left the room`)
        });
    })


}


addServer('room1')

module.exports = {
    setServerIo,
    io: io
}






