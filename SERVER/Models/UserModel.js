import mongoose from 'mongoose';
import pkg from 'bcrypt';

const { genSalt, hash, compare } = pkg;

let userSchema = mongoose.Schema({
    mail: String,
    password: String,
    pastries: [
        {
            name: String,
            number: Number,
            order: Number
        }
    ]
})

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }
        const salt = await genSalt(10);
        const hashedPassword = await hash(this.password, salt);
        this.password = hashedPassword
    } catch (error) {
        next(error)
    }
})

userSchema.methods.matchPassword = async function (password) {
    try {
        return await compare(password, this.password);
    } catch (error) {
        throw new Error(error)
    }
}

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret
    }
})

let userModel = mongoose.model("users", userSchema)

export default userModel