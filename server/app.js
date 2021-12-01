/**
 * This file requires {@link module:./tools/rateLimiter} and {@link module:./router}.
 * @requires module:./tools/rateLimiter
 * @requires module:./router
 */
const { rateLimiterUsingThirdParty } = require('./src/tools/rateLimiter');
const router = require("./router");
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(rateLimiterUsingThirdParty);
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }));

router(app);

module.exports = {app}
