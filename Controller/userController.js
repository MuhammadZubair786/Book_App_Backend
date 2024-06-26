const bcypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const { AuthValidator } = require("../Validator/AuthValidate");
const userModel = require("../Model/userModel");

const nodemailer = require("nodemailer");
const { check_missing_fields } = require("../helper/common_function");
const { ProfileValidator } = require("../Validator/ProfileValidate");
const profileModel = require("../Model/profileModel");
const { TicketValidator, validateTicket } = require("../Validator/TicketValidate");
const ticketModel = require("../Model/ticketModel");
const constantFunc = require("../constant/user");
const { default: mongoose } = require("mongoose");
const seckret_key = process.env.seckret_key;


exports.createTicket = async (req, res) => {
    try {
        const { admin_id, title, description, status } = req.body;

        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({
                message: "Unauthorized - Token not provided",
            });
        }



        const decoded = jwt.verify(authorization, seckret_key);
        req.userId = decoded.userId;
        const validationResult = validateTicket(req.body);



        if (validationResult) {
            console.error('Validation error:', validationResult.message);
            return res.status(400).json({ message: validationResult.message });
        }

        const user = await userModel.findById(req.userId).populate('profileId');
        const admin = await userModel.findById(admin_id);

        if (user && admin) {
            const ticketData = new ticketModel({
                user_id: req.userId,
                admin_id,
                title,
                description,
                status,
            });

            await ticketData.save();
            var token = constantFunc.TokenGenerate(user._id,res)


            return res.status(201).json({ message: 'Ticket created successfully', data: ticketData });
        } else {
            return res.status(404).json({ message: 'User or admin not found' });
        }

    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            message: 'Internal server error',
            error: e,
        });
    }




}


exports.getAllUsers = async (req, res) => {
    try {
        const Users = await userModel.find({ });
        return res.status(200).json({ message: 'get all Users', data: Users });
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            message: 'Internal server error',
            error: e,
        });
    }
};

exports.addFavoriteBook = async (req, res) => {
    try {
        const userId = req.userId; // Assuming user ID is available in req.user
        const bookId = req.params.bookId;

        // Check if bookId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the book is already in favorites
        if (user.favorites.includes(bookId)) {
            return res.status(400).json({ message: 'Book is already in favorites' });
        }

        // Add book to favorites
        user.favorites.push(bookId);
        await user.save();

        res.status(200).json({ message: 'Book added to favorites', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

// Remove a favorite book
exports.removeFavoriteBook = async (req, res) => {
    try {
        const userId = req.userId; // Assuming user ID is available in req.user
        const bookId = req.params.bookId;

        // Check if bookId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove book from favorites
        user.favorites = user.favorites.filter(id => !id.equals(bookId));
        await user.save();

        res.status(200).json({ message: 'Book removed from favorites', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.getAllFavoriteBooks = async (req, res) => {
    try {
        const userId = req.userId; // Assuming user ID is available in req.user

        const user = await userModel.findById(userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Favorite books retrieved successfully', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

