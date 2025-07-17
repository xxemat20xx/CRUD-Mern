const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        capitalize: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true,     
});

module.exports = mongoose.model('Data', DataSchema);