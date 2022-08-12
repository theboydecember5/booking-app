const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createError = (status, message) => {
    const err = new Error()
    error.status = status
    error.message = message
    return err
}

const authCtrl = {

    register: async (req, res, next) => {
        console.log(req.body)
        try {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)

            const newUser = new User({
                ...req.body,
                password: hash
            })

            await newUser.save()
            res.status(200).json('User has been created')

        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {

        try {

            const user = await User.findOne({ username: req.body.username })
            if (!user) return next(createError(404, 'User not found!'))
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordCorrect) return next(createError(400, 'Password is not correct'))

            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

            const { isAdmin, password, ...otherDetails } = user._doc

            res
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .status(200)
                .json({ details: { ...otherDetails }, isAdmin })

        } catch (error) {
            next(error)
        }
    },


}

module.exports = authCtrl

