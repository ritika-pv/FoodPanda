const City = require("../models/cityModel");
const catchAsyncError = require("../middleware/catchAsyncError");

module.exports={
    createCity: catchAsyncError(async(req,res,next)=>{
        const city = await City.create(req.body);
        res.status(201).json({success:true,city});
    }),
    getCities: catchAsyncError(async(req,res,next)=>{
        const cities = await City.find();
        res.status(200).json({success:true,cities});
      })
}