const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    isCompleteProfile: {
        type: Boolean,
        default: false
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users-profile',
        required: false,
    },
    otp: {
        type: Number,
        default: 0
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Books'
        }
    ]
});



module.exports = mongoose.model('User', userSchema);
