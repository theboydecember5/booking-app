const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//Routes
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const roomsRoute = require('./routes/rooms')
const hotelsRoute = require('./routes/hotels')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDB')
    } catch (error) {
        throw error
    }
}

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/hotels', hotelsRoute)

//Middleware
app.use((err, req, res, next) => {

    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8000, () => {
    connect()
    console.log('Connected to Backend')
})