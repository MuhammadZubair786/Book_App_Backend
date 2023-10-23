const AuthModel = require("../models/authScheme")
const bcypt = require("bcryptjs")

const SignUp = async (req, res) => {
    // res.send("Sigup Page",req.body)
    console.log(req.body)
    // console.log(req.body.course[1])

    let user_Check = await AuthModel.findOne({ email: req.body.email })
    // console.log(user_Check)
    // res.send({result:user_Check})
    if (user_Check) {
        //IF Email Already Regsister
        res.status(200).send({ result: user_Check, message: "Already Regsiter" })
    }
    else {
        //If email not already Regsister
        // res.send({message:"Yes You Can Sign Up"})
        var hashPass = await bcypt.hash(req.body.password, 12)
        // res.send({ pass: hashPass })

        let useCreate = new AuthModel({email:req.body.email,password:hashPass})
        useCreate.save()
        .then((response)=>{
            console.log("Response Success",response)
            res.status(200).send({result:response,message:"User Account Regsister"})
        })
        .catch((err)=>{
            console.log("Error Generated:",err)
            res.status(400).send({result:response,message:"Error"})

        })


    }

   
    // let useCreate = new AuthModel({email:req.body.email,password:req.body.password})
    // useCreate.save()
    // .then((response)=>{
    //     console.log("Response Success",response)
    //     res.status(200).send({result:response,message:"Data Saved Successfully"})
    // })
    // .catch((err)=>{
    //     console.log("Error Generated:",err)
    //     res.status(400).send({result:response,message:"Error"})

    // })

}


const SignIn = async(req,res)=>{
        
    let user_Check = await AuthModel.findOne({ email: req.body.email })
    if (user_Check) {
        //IF Email Already Regsister
        // res.status(200).send({ result: user_Check, message: "Already Regsiter" })
        // res.send({message:"Login Successfully"})
        let check_pass = await bcypt.compare(req.body.password,user_Check.password)
        // res.send(check_pass)
        if(check_pass){
            res.status(200).send({result:user_Check,message:"Login "})
        }
        else{
            res.status(403).send({message:"Password Incorrect"})
        }
    }
    else{
    res.status(403).send({ message:  "No User is Regsister With This Email" })

    }
}

module.exports={SignIn,SignUp}

https://we.tl/t-If1RVIiKr4
