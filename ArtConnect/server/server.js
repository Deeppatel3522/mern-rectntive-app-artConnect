const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

// DOTENV
dotenv.config()

//  MONGODB CONNECTION
connectDB();

// REST OBJECT 
const app = express()

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// ROUTES

// default
app.get('/', (req, res) => {
    res.status(200).json({
        "success": true,
        "message": 'Welcome to ArtConnect App'
    })
})

app.use('/api/g2/auth', require('./routes/userRoutes'))
app.use('/api/g2/art', require('./routes/artRoutes'))
app.use('/api/g2/event', require('./routes/eventRoutes'))

// PORT
const PORT = process.env.PORT || 6969

// LISTEN
app.listen(PORT, () => {
    console.log(`Server is running on PORT:  ${PORT}`.bgGreen.white);
})
