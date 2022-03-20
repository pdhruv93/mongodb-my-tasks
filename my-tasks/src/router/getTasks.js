const moment = require('moment');
const validateToken=require("../middleware/tokenValidation.js");
const validateGetDates=require("../middleware/dateFormatValidator.js");
const taskRouter=require("./router.js");
const Task=require("../model/taskModel");


taskRouter.get("/getTasks", [validateToken, validateGetDates], async (req, res)=>{
    console.log("Inside getTasks()...");

    var queryCond = {}, paginationCond={}, dateCond={};

    if(req.query.taskId){
        queryCond.taskId=req.query.taskId;
    }

    if(req.query.recipient){
        queryCond.recipients=req.query.recipient;
    }

    if(req.query.from){
        queryCond.from=req.query.from;
    }
    
    if(req.query.startDate){
        queryCond.creationDate={$gte: moment.utc(req.query.startDate, "YYYYMMDDHHmmss")};
    }

    if(req.query.endDate){
        queryCond.creationDate={...queryCond.creationDate, $lt: moment.utc(req.query.endDate, "YYYYMMDDHHmmss")};
    }


    //PAGINATION CONDITION
    if(req.query.size){
        paginationCond.limit=req.query.size;
    }

    if(req.query.pageNumber){
        paginationCond.page=req.query.pageNumber;
    }

    if(req.query.sortBasis){
        var sortCond={};
        sortCond[req.query.sortBasis] = req.query.sort ? req.query.sort.toLowerCase() : "asc";
        paginationCond.sort=sortCond;
    }


    console.log("Search Query"+JSON.stringify(queryCond));
    console.log("Pagination Query"+JSON.stringify(paginationCond));

    try{
        const filteredTasks= await Task.paginate(queryCond, paginationCond)

        if(filteredTasks==null || filteredTasks.length==0){
            res.notFound();
            console.log("Could not find any such Tasks");
        }
        else{
            res.allOk(filteredTasks);
            console.log("Found some Tasks matching search filters");
        }
    }
    catch(error){
        res.error(error);
        console.log("Error while searching for Tasks"+error)
    }

});