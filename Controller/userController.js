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
const constantFunc = require("../constant/user")
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


exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.find({ user_id: req.userId });
        return res.status(200).json({ message: 'Tickets retrieved successfully', data: tickets });
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            message: 'Internal server error',
            error: e,
        });
    }
};

