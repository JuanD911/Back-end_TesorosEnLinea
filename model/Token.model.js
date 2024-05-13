const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose')

const tokenSchema = new Mongoose.Schema({
    token: {
        type: String
    }
});

module.exports = Mongoose.model('Token', tokenSchema);