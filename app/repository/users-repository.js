const {userModel} = require('../models/user-model')
const bcrypt = require('bcrypt')

module.exports = {
    createUser: (user) => {
        user.password = bcrypt.hashSync(user.password, 10)
        return userModel.create(user)
    },

    getUserByPseudo: async (pseudo, password) => {
        const user = await userModel.findOne({pseudo})
        if (bcrypt.compareSync(password, user['password'])){
            return user
        } else {
            return {error : 'password not match'}
        }
    }

}
