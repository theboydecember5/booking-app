const express = require('express')
const hotelCtrl = require('../controllers/hotel')
const Hotel = require('../models/Hotel')
const verifyAdmin = require('../ultis/verifyAdmin')
const router = express.Router()

//CREATE
router.post('/', hotelCtrl.createHotel)

//UPDATE
router.put('/:id', verifyAdmin, hotelCtrl.updateHotel)

//DELETE
router.delete('/:id/:hotelid', hotelCtrl.deleteHotel)

// GET 1 HOTEL
router.get('/find/:id', hotelCtrl.getHotel)

//GET ALL HOTELS
router.get('/', hotelCtrl.getHotels)

router.get('/countByCity', hotelCtrl.countByCity)

router.get('/countByType', hotelCtrl.countByType)

router.get('/room/:id', hotelCtrl.getHotelRooms)

module.exports = router