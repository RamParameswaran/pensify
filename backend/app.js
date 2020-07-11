const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')
const swaggerJsdoc = require('swagger-jsdoc')

const userRoutes = require('./routes/user')

mongoose.connect(
    'mongodb+srv://admin:' +
        process.env.MONGO_ATLAS_PW +
        '@pensify-dev.ckrka.mongodb.net/pensify?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(cors())

// Swagger auto-generated documentation
// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Pensify',
            version: '0.0.1',
            description: 'Pensify Note Taking Application',
            license: {
                name: 'MIT',
                url: 'https://choosealicense.com/licenses/mit/',
            },
            contact: {
                name: 'Ram Parameswaran',
                url: 'https://findram.dev',
                email: 'ramanan.parameswaran@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1',
            },
        ],
    },
    apis: ['./routes/*.js'],
}
const specs = swaggerJsdoc(options)
app.use(
    '/documentation',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
    })
)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        )
        return res.status(200).json({})
    }
    next()
})

// Routes which should handle requests
app.use('/api/v1/user', userRoutes)
// app.use('/api/v1/products', productRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message,
        },
    })
})

module.exports = app
