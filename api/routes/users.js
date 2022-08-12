const express = require('express')
const UserCtrl = require('../controllers/user')
const verifyAdmin = require('../ultis/verifyAdmin')
const verifyToken = require('../ultis/verifyToken')
const verifyUser = require('../ultis/verifyUser')
const router = express.Router()

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send({msg: 'You are autheticated'})
// })
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send({msg: 'You are autheticated and you can delete your account'})
// })
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send({msg: 'You are Admin'})
// })

router.put('/:id', verifyUser, UserCtrl.updateHotel)


router.delete('/:id', verifyUser, UserCtrl.deleteUser)


router.get('/:id', verifyUser, UserCtrl.getUser)


router.get('/', UserCtrl.getUsers)

module.exports = router