const createError = (status, message) => {
    const err = new Error()
    error.status = status
    error.message = message
    return err
}

module.exports = createError