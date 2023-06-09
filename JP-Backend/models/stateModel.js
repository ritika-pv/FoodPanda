const mongoose = require('mongoose');

const states = new mongoose.Schema({
    name:{type:String,required:[true,"Please Enter State Name"]},
    cities:[{type:mongoose.Schema.Types.ObjectId,ref:"Cities"}]
});
const State = mongoose.model("States",states);
module.exports = State;