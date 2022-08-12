const jwt = require('jsonwebtoken')


const createError = (status, message) => {
    const err = new Error()
    error.status = status
    error.message = message
    return err
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(createError(401, 'You are not authenticated'))
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, 'Token is not valid'))
        req.user = user
    })
    next()
}

module.exports = verifyToken