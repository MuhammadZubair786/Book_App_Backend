const exp = require('express')
const router = exp.Router();
 

router.use('/auth',require('./authRouter'))

router.use('/todo',require('./todoRouter'))

module.exports = router;