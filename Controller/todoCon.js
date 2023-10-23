const TodoModel = require("../models/todoScheme")

const addTodo =async(req,res)=>{
    //  console.log("Data :",req.body)
    let todoData = new TodoModel({todo_number:req.body.todo_number,todo_data:req.body.todo_data})
    todoData.save()
    .then((response)=>{
        console.log("Response Success",response)
        res.status(200).send({result:response,message:"Data Saved Successfully"})
    })
    .catch((err)=>{
        console.log("Error Generated:",err)
        res.status(400).send({result:response,message:"Error"})

    })

}

const getTodo = async(req,res)=>{
    var result = await TodoModel.find({})
    res.status(200).send({message:"All Data",data:result})
}


const getspecficTodo = async(req,res)=>{
    console.log(req.body.todo_number)
    var result = await TodoModel.findOne({_id:req.body.todo_number})
   
    res.status(200).send({message:"specfic Data",data:result})
}


const updateSpecficTodo = async(req,res)=>{
   
   var result = await TodoModel.updateOne({_id:req.body._id},{$set:{todo_data:req.body.todo_data}})
   .then((response)=>{
       console.log("Data:",response)
       res.status(200).send({result:response,message:"Data Update Successfully"})
    })
   .catch((err)=>{console.log(err)})
}


const deletespecficTodo = async(req,res)=>{
    console.log("Delet Key :",req.body._id)
    var result = await TodoModel.deleteOne({_id:req.body._id})
    .then((response)=>{
        console.log("Data:",response)
        res.status(200).send({result:response,message:"Data Delete Successfully"})
     })
    .catch((err)=>{console.log(err)})
}

module.exports = {addTodo,getTodo,getspecficTodo,updateSpecficTodo ,deletespecficTodo}