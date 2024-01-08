const userModel = require("../Model/userModel");
const { AuthValidator } = require("../Validator/AuthValidate");
const bcypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const { validateLogin } = require("../Validator/userValidate");
const seckret_key = process.env.seckret_key;

//ADMIN REGISTER
exports.createAdmin = async (req, res) => {
    try {

        await AuthValidator.validateAsync(req.body);

        const otp = Math.floor(100000 + Math.random() * 900000);

        let checkuser = await userModel.findOne({
            email: req.body.email
        })

        if (checkuser) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }
        else {
            var hashPass = await bcypt.hash(req.body.password, 12)

            const newUser = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: hashPass,
                userType: req.body.userType,
                otp: otp,
                isVerify: true,
                isCompleteProfile: true,

            })
            await newUser.save(); // Manually validate the item


            // const token = jwt.sign({ userId: newUser._id }, seckret_key, { expiresIn: '1h' });
            return res.status(200).json({
                message: "Admin Account Create Successfully",
                data: newUser,


            });
        }
    }
    catch (e) {

        // Handle other types of errors (e.g., server errors)
        return res.status(500).json({
            message: "Internal server error",
            error: e
        });


    }

}

//ADMIN LOGIN
exports.loginAdmin = async (req, res) => {

    const validationResult = validateLogin(req.body);
    const { email, password } = req.body
    console.log(seckret_key)

    if (validationResult) {
        console.error('Validation error:', validationResult.message);
        return res.json({ message: validationResult.message });

    }
    else {
        let user = await userModel.findOne({ email });

        if (user != null) {

            const isPasswordValid = await bcypt.compare(password, user.password);

            if (isPasswordValid) {
                if (user.isVerify) {
                    // if (user.isCompleteProfile) {
                    // const profile = await profileModel.findById(user.profileId);
                    // user.profileId = profile
                    const token = jwt.sign({ userId: user._id }, seckret_key, { expiresIn: '1h' });
                    return res.status(200).json({ message: "Admin Login SuccessFully", data: user, token });

                    // }
                    // else {
                    //     return res.status(200).json({ message: "Plz Compelete Your Profile", data: user });
                    // }

                }
                else {
                    return res.status(200).json({ message: "Plz Verify Your Account", data: user });
                }
            }
            else {
                return res.status(401).json({ message: "Password Incorrect" });
            }
        }
        else {
            console.log("innoi")
            return res.status(404).json({ message: "Email Not Regsister" });
        }

    }

}

exports.getAllUsers = async (req, res) => {
    try {
        var checkAdmin = await userModel.findById(req.userId)
        if (checkAdmin.userType == "admin") {
            var getUsers = await userModel.find({userType:"user"})

            return res.status(200).json({
                message: "Get All Users Successfully",
                data: getUsers
            })
        }
        else {
            return res.status(200).json({
                message: "PLease Login As Admin",
            })
        }
    }
    catch (e) {
        return res.status(400).json({ message: e });

    }


}