import jwt from 'jsonwebtoken'

export const sendToken = (user, statusCode, res, message) => {

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: process.env.JWT_EXPIRE
    })

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Set httpOnly to true
    };
    console.log(token)
    res.status(statusCode).cookie("token", token, options).send({
        success: true,
        user,
        message,
        token,
    });
};