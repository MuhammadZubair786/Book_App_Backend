const express = require('express');
const router = express.Router();
const bookController = require("../Controller/bookController")


router.post('/Create', bookController.createBook);
router.get('/View', bookController.getBooks);
router.get('/ViewByCategory', bookController.getBookByCategory);
router.put('/buyBook', bookController.paidUserAndViewBook );






module.exports = router;