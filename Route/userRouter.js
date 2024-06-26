const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');





// router.post("/create-ticket", userController.createTicket)
router.post("/get-all-users", userController.getAllUsers)
router.post('/favorites/:bookId', userController.addFavoriteBook);
router.delete('/favorites/:bookId', userController.removeFavoriteBook);
router.get('/getfavorites', userController.getAllFavoriteBooks);





module.exports = router;