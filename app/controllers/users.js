const makeValidation = require('@withvoid/make-validation')
const {
    createUser,
    getUserByPseudo
} = require('./../repository/users-repository')
const types = require("@withvoid/make-validation/lib/validationTypes");
const { userTypes } = require('./../models/user-model')

const checks = {
    pseudo: {type: types.string, options: {empty: false}},
    email: {type: types.string, options: {empty: false}},
    password: {type: types.string, options: {empty: false}},
    type: {type: types.enum, options: {enum: userTypes, empty: false}},
};

module.exports = {

    onGetUserByPseudo: async (req, res) => {
        try {
            const user = await getUserByPseudo(req.params.id);
            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },

    onCreateUser: async (req, res) => {
        try {
            const validation = makeValidation(types => {
                return ({
                    payload: req.body,
                    checks: checks
                });
            });
            if (!validation.success) return res.status(400).json(validation);

            const request = req.body;
            const user = await createUser(request);
            console.log(user)
            return res.status(200).json({ success: true, user });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },

    onDeleteUserById: async (req, res) => {
        try {
            const user = await UserModel.deleteByUserById(req.params.id);
            return res.status(200).json({
                success: true,
                message: `Deleted a count of ${user.deletedCount} user.`
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
}
