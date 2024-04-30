const express = require('express');
const router = express.Router();
const categoryController = require('../Controller/categoryController');


router.post('/Create', categoryController.createCategory);
router.get('/View', categoryController.getCategory);
router.get('/ViewAllCategoryWithBook', categoryController.getAllCategoryWithBooks);





module.exports = router;