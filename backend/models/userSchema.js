import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide Your Name"],
        minLength: [3, "Name must Contain 3 letters"],
        maxLength: [30, "Name not exceed 30 Characters"]
    },
    email: {
        type: String,
        required: [true, "Please Provide Your Email"],
        validate: [validator.isEmail, 'Please Provide a valid Email']
    },
    phone: {
        type: Number,
        require: [true, "Please Provide your Phone Number"]
    },
    password: {
        type: String,
        require: [true, "Please Provide your Password"],
        minLength: [3, "Password must Contain 3 letters"],
        maxLength: [32, "Password not exceed 30 Characters"],
        select: false
    },
    role: {
        type: String,
        require: [true, "Please Provide your Role"],
        enum: ["Job Seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//hashing the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//compare password

userSchema.methods.comparePassword = async function (enterPassword) {
    try {
        console.log(enterPassword)
        return await bcrypt.compare(enterPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

//json web token generate
userSchema.methods.getJWTtoken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


export const User = mongoose.model('User', userSchema)