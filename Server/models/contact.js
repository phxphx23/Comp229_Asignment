let mongoose = require('mongoose');

// create a model class
let bookModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String
},
{
    collection: "contact"
});

module.exports = mongoose.model('Contact', bookModel);