let serverIo

function setServerIo(server) {
    serverIo = server
}

function addMessage(message) {
    serverIo.emit('message', message)
}


module.exports = {
    setServerIo,
    addMessage,
    serverIo: serverIo
}






