const mongoose = require('mongoose');

const scriptSchema = mongoose.Schema({
    title:{
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const script = mongoose.model('Script', scriptSchema);

module.exports = { script }