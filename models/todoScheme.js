const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    todo_number:{type:Number},
    todo_data:{type:String},
   

})
const todoModel = mongoose.model('todo-Database',todoSchema)
module.exports = todoModel