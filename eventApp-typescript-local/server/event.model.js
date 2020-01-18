const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
    title: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model('Event', Event);