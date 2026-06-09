import mongoose from 'mongoose';

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
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);

export async function createUser(data) {
    const newUser = new User(data);
    return await newUser.save();
}

/**
 * @param email - Necesita un email para poder verificar que existe en MONGO
 */
export async function validateEmail(email) {
    return await User.findOne({ email: email });
}

export async function findUserById(id) {
    return await User.findById(id).select("-password");
}