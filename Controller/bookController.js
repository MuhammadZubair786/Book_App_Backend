const bookModel = require("../Model/bookModel");
const userModel = require("../Model/userModel");
const { validateBook } = require("../Validator/BookValidate")


exports.createBook = async (req, res) => {
    // try {
    let validationResult = await validateBook(req.body)

    if (validationResult) {
        console.error('Validation error:', validationResult.message);
        return res.status(400).json({ message: validationResult.message });
    }

    var checkAdmin = await userModel.findById(req.userId)


    if (checkAdmin.userType == "admin") {

        let addCat = bookModel(req.body)
        await addCat.save()

        return res.status(200).json({
            message: "New Book Add Successfully",
            data: addCat
        })

    }
    else {
        return res.status(200).json({
            message: "PLease Login As Admin",

        })
    }





    // }
    // catch (e) {
    //     return res.status(400).json({
    //         message: "error"
    //     })

    // }


}


exports.getBooks = async (req, res) => {
    try {
        var findBooks = await bookModel.find({}).populate("category_id");
        var checkAdmin = await userModel.findById(req.userId)


        if (checkAdmin.userType == "admin") {

            return res.status(200).json({
                message: "Get All Books Successfully",
                data: findBooks
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



exports.getBookByCategory = async (req, res) => {
    try {
        if (req.query.category_id != null || req.query.category_id != undefined) {
            const CategoryId = req.query.category_id;
            var findBooks = await bookModel.find({ }).populate("category_id")

            const booksWithUserView = findBooks.map(book => {
                const isUserViewed = book.usersUsedBy.includes(req.userId);
                return { ...book.toObject(), isUserViewed };
            });
            
            console.log("book==>",booksWithUserView);

            return res.status(200).json({
                message: "Get Books Successfully",
                data: booksWithUserView
            })

        }
        else {
            return res.status(401).json({
                message: "Enter Category id",

            })
        }

    }

    catch (e) {
        return res.status(400).json({
            message: "error"
        })

    }
}

exports.paidUserAndViewBook = async (req, res) => {
    try {

        const categoryId = req.query.category_id;
        const bookId = req.query.book_id;
        // var Book = await bookModel.find({category_id:categoryId,_id:bookId}).populate("category_id");

        await bookModel.findByIdAndUpdate(
            { _id: bookId, category_id: categoryId },
            { $addToSet: { usersUsedBy: req.userId } },
            { new: true }
        )
            .then(updatedBook => {
                console.log('Book updated successfully:', updatedBook);
                return res.status(200).json({
                    message: "Purchase Successfully",
                    data: updatedBook
                })
            })
            .catch(err => {
                console.error('Error updating book:', err);
            });



    }

    catch (e) {
        return res.status(400).json({
            message: "error"
        })

    }

}