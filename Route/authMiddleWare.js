const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');
const seckret_key = process.env.seckret_key;

exports.authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.json({
                message: "Unauthorized - Token not provided",
            });
        }

        jwt.verify(authorization, seckret_key, async (err, decoded) => {
            if (err) {
                return res.json({ message: 'Failed to authenticate token' });
            }
            else {

                req.userId = decoded.userId;
                console.log(req.userId);
                return next(); 
            
                // res.set("authtoken", token);


            }


        });

    
    } catch (err) {
        console.error('Error in authMiddleware:', err);
        return res.json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};
