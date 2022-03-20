const validateToken=require("../middleware/tokenValidation.js");
const validatePostDate=require("../middleware/dateFormatValidator.js");
const taskRouter=require("./router.js");
const Task=require("../model/taskModel");


taskRouter.post("/addTask", [validateToken, validatePostDate], (req, res)=>{
    console.log("Inside addTask()...");

    const task=new Task({...req.body});

    task.save().then(()=>{
        res.created(task);
        console.log("Task created in DB!!");
    }).catch(err=>{
        res.error(err);
        console.log("Error creating Task:"+err)
    })
});