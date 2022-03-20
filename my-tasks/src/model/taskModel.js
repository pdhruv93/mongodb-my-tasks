const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema=new mongoose.Schema({
    recipients: [{
        type: String,
        required: true
    }],
    sender:{
        type: String,
        required: true,
    },
    header:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    url:{
        type: String,
    },
    creationDate:{
        type: Date,
        default: Date.now
    },
    visibilityDate:{
        type: Date,
        default: Date.now
    },
    expiryDate:{
        type: Date
    }
});

taskSchema.plugin(AutoIncrement, {inc_field: 'taskId'});
taskSchema.plugin(mongoosePaginate);

const Task=new mongoose.model("Task", taskSchema);
module.exports=Task;