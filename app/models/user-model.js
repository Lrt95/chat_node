const mongoose = require("mongoose");

const USER_TYPES = {
    USER: "USER",
    ADMIN: "ADMIN",
};

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        type: String
    },
    {
        collection: "users"
    }
);

module.exports = {
    userModel: mongoose.model('User', userSchema),
    userTypes: USER_TYPES
}
