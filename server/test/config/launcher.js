/**
 * This module requires {@link module:../../app}, {@link module:../../routes/const}.
 * @requires module:../../app
 * @requires module:../../routes/const
 */
const supertest = require('supertest');
const {app} = require("../../app")
const request = supertest(app);
const {url} = require("../../src/routes/const");

module.exports = {request, url}
