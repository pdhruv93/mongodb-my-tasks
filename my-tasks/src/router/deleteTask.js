const validateToken=require("../middleware/tokenValidation.js");
const taskRouter=require("./router.js");
const Task=require("../model/taskModel");


taskRouter.delete("/deleteTask/:taskId", validateToken,  async (req, res)=>{
    console.log("Inside deleteTask()...");

    const taskId=req.params.taskId;

    try{
        const deletedTask=await Task.findOneAndDelete({
            taskId: {$eq: taskId}
        });
    
        if(deletedTask==null){
            res.notFound();
            console.log("Could not find any such Task");
        }
        else{
            res.deleted(deletedTask);
            console.log("Deleted Task!!");
        }
    }
    catch(error){
        res.error(error);
        console.log("Error Deleting Task:"+error)
    }
});