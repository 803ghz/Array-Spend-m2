const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps:true,
    },
);

const User = mongoose.model("User", userSchema)

async function createUser(data) {
    const newUser = new User(data);
    return await newUser.save();
}

/**
 * @param email - Necesita un email para poder verificar que existe en MONGO
 */
async function validateEmail(email) {
    return await User.findOne({ email: email })

}

module.exports = { createUser, validateEmail }