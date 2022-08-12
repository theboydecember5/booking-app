const User = require('../models/User')

const UserCtrl = {

    updateHotel: async (req, res, next) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const updatedHotel = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ msg: 'Deleted Hotel' })
        } catch (error) {
            next(error)
        }
    },

    getUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    },
}

module.exports = UserCtrl
