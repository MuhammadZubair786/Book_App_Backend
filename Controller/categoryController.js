const bookModel = require("../Model/bookModel");
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


exports.getAllCategoryWithBooks = async (req, res) => {
    try {
        // Find all categories
        const categories = await categoryModel.find({}).sort({ updatedAt: -1 });

        // Iterate through each category to find its associated books
        const categoriesWithBooks = await Promise.all(categories.map(async (category) => {
            // Find books associated with the current category
            const books = await bookModel.find({ category_id: category._id });

            const booksWithUserView = await Promise.all(books.map(async (book) => {
                const isUserViewed = book.usersUsedBy.includes(req.userId);
                return { ...book.toObject(), isUserViewed };
            }));
            // Return the category along with its associated books
            return {
                category: category,
                books: booksWithUserView
            };
        }));

        return res.status(200).json({
            message: "Get All Categories Successfully",
            data: categoriesWithBooks
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};