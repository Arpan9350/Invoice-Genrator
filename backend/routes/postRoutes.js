const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');
const jwtSecret="asd889asds5656asdas887";
const catModel = require('../db/userSchema')
const productModel = require('../db/productSchema')
const nodemailer=require('nodemailer');

router.post("/addpost",(req,res)=>{
    let ins = new catModel({name:req.body.name,contact:req.body.contact,firmname:req.body.firmname ,email:req.body.email, password:req.body.password, cpassword:req.body.cpassword})
    console.log(ins)
    ins.save((e)=>{
        if(e){
            res.send("Already added")
        }
        else{
            res.send("category added")
        }
    })
})

router.post("/fetchdata",(req,res)=>{
    let email=req.body.email;
    console.log(email)
    console.log(req.body.email)

    productModel.find({email:email},(err,data)=>{
        if(err) throw err;
        else{
        res.send(data)
        }
       })
})

router.post("/validate", (req, res) => {
    let email=req.body.email;
    let password=req.body.password;
    catModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            console.log(data)
            let payload={
                email:data.email,name:data.name, contact:data.contact, firmname:data.firmname
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})

router.post("/addinvoice",(req,res)=>{
      let productdata = new productModel({
          rname:req.body.rname, 
          remail:req.body.remail, 
          raddress:req.body.raddress, 
          rdate:req.body.rdate, 
          email:req.body.email,
          product:req.body.product, 
          status:req.body.status
        })
      productdata.save((e)=>{
        if(e){
            res.send("Already added")
        }
        else{
            res.send("category added")
        }
    })
})

router.post("/deleteinvoice",(req,res)=>{
    console.log(req.body, "In post routes")
    productModel.deleteOne({_id:req.body._id},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})

router.post("/updateinvoice",(req,res)=>{
    console.log(req.body, "In post routes")
    productModel.updateOne({_id:req.body._id},{$set:{status:'PAID'}},(err,data)=>{
        if(err) throw err;
        else{
            res.send(data)
        }
    })
})
module.exports=router;