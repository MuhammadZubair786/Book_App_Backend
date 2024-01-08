const express = require('express');
const router = express.Router();
const userrouter = require('./userRouter.js');
const adminrouter = require('./adminRouter.js');
const authrouter = require("./authRouter.js")
const categoryrouter = require("./categoryRouter.js")
const bookrouter = require("./BookRouter.js")

const { authMiddleware } = require('./authMiddleWare.js');

router.use("/auth",authrouter) //Auth 
// router.use('/user', authMiddleware);

router.use('/user',authMiddleware, userrouter);
router.use('/admin', adminrouter);
router.use("/category",authMiddleware,categoryrouter)
router.use("/book",authMiddleware,bookrouter)





module.exports = router; 