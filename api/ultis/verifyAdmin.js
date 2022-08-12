const verifyToken = require("./verifyToken")

const createError = (status, message) => {
    const err = new Error()
    error.status = status
    error.message = message
    return err
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, 'You are not Admin'))
        }
    })
}

module.exports = verifyAdmin