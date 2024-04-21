class errorHandlers extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Internal Server Error',
        err.statusCode = err.statusCode || 500

    if (err.name == 'CaseError') {
        const message = `Resource Not found. Invalid ${err.path}`
        err = new errorHandlers(message, 400)
    }
    if (err.name === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new errorHandlers(message, 400)
    }
    if (err.name == 'JasonWebTokenError') {
        const message = `Json Web Token is, Try Again`
        err = new errorHandlers(message, 400)
    }
    if (err.name == 'TokenExpiredError') {
        const message = `Json Web Token Is expired`
        err = new errorHandlers(message, 400)
    }

    return res.status(err.statusCode).json({
        success: false,
        message: message
    })
}

export default errorHandlers