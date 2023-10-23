const exp = require('express')
const router = exp.Router();
const {SignIn,SignUp} = require('../Controller/authCon')

router.post('/signup',SignUp)
router.post('/signin',SignIn)

module.exports = router;
