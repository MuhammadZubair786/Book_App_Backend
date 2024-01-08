const categoryModel = require("../Model/categoryModel");
const userModel = require("../Model/userModel");
const { validateCategory } = require("../Validator/categoryValidate")


exports.createCategory = async (req, res) => {
    try {
        let validationResult = await validateCategory(req.body)

        if (validationResult) {
            console.error('Validation error:', validationResult.message);
            return res.status(400).json({ message: validationResult.message });
        }

        var checkAdmin = await userModel.findById(req.userId)
        console.log(checkAdmin.userType)

        if (checkAdmin.userType == "admin") {

            let addCat = categoryModel(req.body)
            await addCat.save()

            return res.status(200).json({
                message: "New Category Add Successfully",
                data: addCat
            })

        }
        else {
            return res.status(200).json({
                message: "PLease Login As Admin",

            })
        }
    }
    catch (e) {
        return res.status(400).json({
            message: "error"
        })

    }


}
exports.getCategory = async (req, res) => {
    try {
        var findCategory = await categoryModel.find({})

        return res.status(200).json({
            message: "Get All  Category Successfully",
            data: findCategory
        })


    }
    catch (e) {
        return res.status(400).json({
            message: "error"
        })

    }
}