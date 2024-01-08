const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminCon');


// router.post('/regsister', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);


module.exports = router;