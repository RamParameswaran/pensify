const mongoose = require('mongoose')
require('mongoose-type-url')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    name: {
        type: String,
        required: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    profilePicUrl: mongoose.SchemaTypes.Url,
})

module.exports = mongoose.model('User', userSchema)
