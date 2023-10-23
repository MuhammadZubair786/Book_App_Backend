// console.log("HELLO WORLD")
const exp = require('express')
const cors = require('cors')
const bd = require("body-parser")
const mongoose = require("mongoose")
const app = exp()
const port = 5000;
const mainRouter = require("./routes/mainRouter")

app.use(cors())

app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json())

mongoose.connect('mongodb+srv://Zubair:12312312@cluster0.me3ff.mongodb.net/',
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


mongoose.connection.on("connected", () => {
    console.log("Database Connected");

})

mongoose.connection.on("error", () => {
    console.log("Database Not Connected");
})

app.get('/', (req, res) => {
    console.log("hello Muhammad Zubair")
    res.send("hello to first API In Google Chorme") //send Response To User When User Run this
})
app.use(mainRouter)

//Help To Run Server => Listen
app.listen(port, () => {
    console.log("Running Server ")
})

