const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// Create Schema
const PetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    userID: {
        type: ObjectId,
        required: true
    }
    
})

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet