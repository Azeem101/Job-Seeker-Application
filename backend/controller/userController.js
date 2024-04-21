import errorHandlers from '../middleware/error.js'
import { User } from '../models/userSchema.js'
import { catchAsyncFunction } from '../middleware/catchAsyncFunction.js'
import { sendToken } from "../utils/jwtToken.js"

export const register = catchAsyncFunction(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body
    if (!name || !email || !phone || !role || !password) {
        return next(new errorHandlers("Please Fill All Fields", 400))
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new errorHandlers("user Registered Already", 400))
    }

    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    })

    sendToken(user, 200, res, "User registered")
})


export const login = catchAsyncFunction(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new errorHandlers("Please provide email ,password and role."));
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user)
    if (!user) {
        return next(new errorHandlers("Invalid Email Or Password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new errorHandlers("Invalid Email Or Password.", 400));
    }
    if (user.role !== role) {
        return next(
            new errorHandlers(`User with provided email and ${role} not found!`, 404)
        );
    }
    sendToken(user, 201, res, "User Logged In!");
});



export const logout = catchAsyncFunction(async (req, res, next) => {

    res.status(200).clearCookie('token').json({
        success: true,
        message: "Logged Out Successfully.",
    });
})


export const getUser = catchAsyncFunction((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});