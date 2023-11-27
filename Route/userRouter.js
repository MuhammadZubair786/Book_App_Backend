const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');





router.post("/create-ticket", userController.createTicket)
router.post("/get-all-ticket", userController.getAllTickets)




module.exports = router;