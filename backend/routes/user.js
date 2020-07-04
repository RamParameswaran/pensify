const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
var axios = require('axios')

const checkAuth = require('../middleware/check-auth')

const User = require('../models/user')

const googleClient = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENTID)

function createAuthToken(email, id) {
    return jwt.sign(
        {
            email: email,
            userId: id,
        },
        process.env.JWT_KEY,
        {
            expiresIn: '6h',
        }
    )
}

router.post('/login-with-google', (req, res, next) => {
    googleClient
        .verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_OAUTH_CLIENTID,
        })
        .then((payload) => {
            // Search if a user with this email address exists yet:
            User.findOne({ email: payload.getPayload().email })
                .exec()
                .then((existingUser) => {
                    if (existingUser) {
                        // GET EXISTING USER INSTANCE FROM DB
                        // Sign in this existing user
                        res.status(201).json({
                            message: 'Login successful',
                            token: createAuthToken(
                                existingUser.email,
                                existingUser._id
                            ),
                        })
                    } else {
                        // CREATE A NEW USER IN DB
                        const user = new User({
                            email: payload.getPayload().email,
                            name: payload.getPayload().name,
                            firstName: payload.getPayload().given_name,
                            lastName: payload.getPayload().family_name,
                            profilePicUrl: `https://graph.facebook.com/10218122206874683/picture?type=square`,
                        })
                        user.save()
                            .then((result) => {
                                // Sign in this new user
                                res.status(201).json({
                                    message: 'Signup successful',
                                    token: createAuthToken(
                                        result.email,
                                        result._id
                                    ),
                                })
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(500).json({
                                    error: err,
                                })
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        error: err,
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(401).json({
                message: 'Auth failed',
            })
        })
})

router.post('/login-with-facebook', (req, res, next) => {
    axios({
        url: `https://graph.facebook.com/me`,
        method: 'get',
        params: {
            fields: 'id,name,first_name,last_name,email',
            access_token: req.body.accessToken,
        },
    })
        .then((payload) => {
            console.log(payload)
            // Search if a user with this email address exists yet:
            User.findOne({ email: payload.data.email })
                .exec()
                .then((existingUser) => {
                    if (existingUser) {
                        console.log('Returning existing user')
                        // GET EXISTING USER INSTANCE FROM DB
                        // Sign in this existing user
                        res.status(201).json({
                            message: 'Login successful',
                            token: createAuthToken(
                                existingUser.email,
                                existingUser._id
                            ),
                        })
                    } else {
                        console.log('Creating new user')
                        // CREATE A NEW USER IN DB
                        const user = new User({
                            email: payload.data.email,
                            name: payload.data.name,
                            firstName: payload.data.given_name,
                            lastName: payload.data.family_name,
                            profilePicUrl: `https://graph.facebook.com/${payload.data.id}/picture?type=large`,
                        })
                        user.save()
                            .then((result) => {
                                // Sign in this new user
                                res.status(201).json({
                                    message: 'Signup successful',
                                    token: createAuthToken(
                                        result.email,
                                        result._id
                                    ),
                                })
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(500).json({
                                    error: err,
                                })
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        error: err,
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(401).json({
                message: 'Auth failed',
            })
        })
})

router.get('/', checkAuth, (req, res, next) => {
    res.status(200).json({ data: 'success!' })
})

module.exports = router
