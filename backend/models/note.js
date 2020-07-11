const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true },
        order: { type: Number, required: true },
        starred: { type: Boolean, default: false },
        title: { type: Schema.Types.ObjectId, ref: 'Title' },
        content: { type: Object },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Note', noteSchema)
