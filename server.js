const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

const db = require("./app/models");
db.mongoose.connect(`mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}:${process.env.DB_NAME}`)
    .then(() => {
        console.log("Connection réussie");
    })
    .catch(err => {
        process.exit();
    })