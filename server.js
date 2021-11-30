const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

const db = require("./config/mongo-db");
db.mongoose.connect(process.env.MONGODB_ADDON_URI)
    .then(() => {
        console.log("Connection réussie");
    })
    .catch(err => {
        process.exit();
    })
