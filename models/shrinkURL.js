const mongoose = require('mongoose')
const shortId = require('shortid')

const shrinkURLSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    shrink: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShrinkURL', shrinkURLSchema)