/**
 * This module requires {@link module:../../tools/repository/database}.
 * @requires module:../../tools/repository/database
 */
const databaseHelper = require('../../src/tools/DB/database');
require('dotenv').config();


beforeAll(() => {
    return databaseHelper.connect();
});

beforeEach(() => {
    return databaseHelper.truncate();
});

afterAll(() => {
    return databaseHelper.disconnect();
});
