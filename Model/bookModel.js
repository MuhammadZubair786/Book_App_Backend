const { required } = require('joi');
const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
    
    book_name: {
        type: String,
        required: true
    },
    book_image: {
        type: String,
        required: true
    },
    book_link:{
        type:String,
        required:true
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: false,
    },
    price:{
        type: String,
        required: true
    },
    BookFree : {
        type : Boolean,
        required : true

    },
    usersUsedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Replace with the actual user model name
        }
    ]
   

})
module.exports = mongoose.model('Books', bookModel);