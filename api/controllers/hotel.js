const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

const hotelCtrl = {

    createHotel: async (req, res, next) => {

        const newHotel = new Hotel(req.body)
        try {
            const savedHotel = await newHotel.save()
            res.status(200).json(savedHotel)
        } catch (error) {
            next(error)
        }

    },

    updateHotel: async (req, res, next) => {
        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedHotel)
        } catch (error) {
            next(error)
        }
    },

    deleteHotel: async (req, res, next) => {
        try {
            const updatedHotel = await Hotel.findByIdAndDelete(req.params.id)
            res.status(200).json({ msg: 'Deleted Hotel' })
        } catch (error) {
            next(error)
        }
    },

    getHotel: async (req, res, next) => {
        try {
            const hotel = await Hotel.findById(req.params.id)
            res.status(200).json(hotel)
        } catch (error) {
            next(error)
        }
    },

    getHotels: async (req, res, next) => {

        const { min, max, ...others } = req.query

        console.log(others)

        try {
            const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999999 } })
                .limit(req.query.limit)
            res.status(200).json(hotels)
        } catch (error) {
            next(error)
        }

    },

    countByCity: async (req, res, next) => {

        const cities = req.query.cities.split(',')

        try {
            // Có 2 cách để đếm số lượng khách sạn

            // Cách 1
            // let result = []
            // let test
            // for (let city of cities) {
            //     test = await Hotel.countDocuments({ city: city })
            //     result.push(test)
            // }

            // Cách 2

            const list = await Promise.all(cities.map(city => {
                return Hotel.countDocuments({ city: city })
            }))

            res.status(200).json(list)

        } catch (error) {
            next(error)
        }

    },

    countByType: async (req, res, next) => {



        try {
            const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
            const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
            const resortCount = await Hotel.countDocuments({ type: 'resort' })
            const villaCount = await Hotel.countDocuments({ type: 'villa' })
            const cabinCount = await Hotel.countDocuments({ type: 'cabin' })

            res.status(200).json(
                [
                    { type: 'hotel', count: hotelCount },
                    { type: 'apartment', count: apartmentCount },
                    { type: 'resorts', count: resortCount },
                    { type: 'villa', count: villaCount },
                    { type: 'cabins', count: cabinCount },
                ]
            )

        } catch (error) {
            next(error)
        }
    },

    getHotelRooms: async (req, res, next) => {
        try {
            const hotel = await Hotel.findById(req.params.id)

            const list = await Promise.all(hotel.rooms.map(room => {
                return Room.findById(room)
            }))

            res.status(200).json(list)

        } catch (error) {
            next(error)
        }
    },
}

module.exports = hotelCtrl

