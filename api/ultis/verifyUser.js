const verifyToken = require('./verifyToken')

const createError = (status, message) => {
    const err = new Error()
    error.status = status
    error.message = message
    return err
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, 'You are not authorized'))
        }
    })
}

module.exports = verifyUser