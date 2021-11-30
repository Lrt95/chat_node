const express = require('express');
const users = require('../controllers/users.js');

const router = express.Router();

router
    .get('/', users.onGetAllUsers)
    .post('/', users.onCreateUser)
    .get('/:id', users.onGetUserById)
    .delete('/:id', users.onDeleteUserById)

module.exports = router;
