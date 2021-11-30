const express = require('express');
const users = require('../controllers/users.js');

const router = express.Router();

router
    .post('/', users.onCreateUser)
    .get('/:id', users.onGetUserByPseudo)
    .delete('/:id', users.onDeleteUserById)

module.exports = router;
