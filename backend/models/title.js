const mongoose = require('mongoose')

const titleSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true },
        order: { type: Number, required: true },
        starred: { type: Boolean, default: false },
        archived: { type: Boolean, default: false },
        notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    },
    { timestamps: true }
)

module.exports = mongoose.model('Title', titleSchema)
