import { User } from "../models/userSchema.js";
import { catchAsyncFunction } from "./catchAsyncFunction.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuth = catchAsyncFunction(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("User Not Authorized", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT);

    req.user = await User.findById(decoded.id);

    next();
});