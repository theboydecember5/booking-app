const express = require('express')
const RoomCtrl = require('../controllers/room')
const verifyAdmin = require('../ultis/verifyAdmin')
const router = express.Router()

//CREATE
router.post('/:hotelid', verifyAdmin, RoomCtrl.createRoom)

//UPDATE
router.put('/:id', verifyAdmin, RoomCtrl.updateRoom)

router.put('/availability/:id', RoomCtrl.updateRoomAvailability)

//DELETE
router.delete('/:id', verifyAdmin, RoomCtrl.deleteRoom)

// GET 1 HOTEL
router.get('/:id', RoomCtrl.getRoom)

//GET ALL HOTELS
router.get('/', RoomCtrl.getRooms)

module.exports = router