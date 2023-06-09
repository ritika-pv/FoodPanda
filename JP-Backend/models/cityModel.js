const mongoose = require('mongoose');

const cities = new mongoose.Schema({
    name:{type:String,required:[true,"Please Enter State Name"]}
});

const City = mongoose.model("Cities",cities);
module.exports = City;