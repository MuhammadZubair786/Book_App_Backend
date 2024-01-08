const mongoose = require('mongoose');

const ticketModel = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category_image : {
        type: String,
        required: true
    }
   

})
module.exports = mongoose.model('category', ticketModel);