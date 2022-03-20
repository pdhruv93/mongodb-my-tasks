const moment = require('moment');

const validatePostDates = (req, res, next)=> {

    console.log("Checking if all the Dates are correct in POST request!!");

    var visibilityDate=req.body.visibilityDate;
    var expiryDate=req.body.expiryDate;

    var isValidVisiblityDate = visibilityDate ? moment(visibilityDate, 'YYYYMMDDHHmmss', true) : true;
    var isValidExpiryDate = expiryDate ? moment(expiryDate, 'YYYYMMDDHHmmss', true) : true;

    if(!isNaN(isValidVisiblityDate) && isValidVisiblityDate && !isNaN(isValidExpiryDate) && isValidExpiryDate){
        console.log("Dates are correct. Transforming them to Mongoose Compatible");
        req.body.visibilityDate=visibilityDate ? moment.utc(visibilityDate, "YYYYMMDDHHmmss") : "";
        req.body.expiryDate=expiryDate ? moment.utc(expiryDate, "YYYYMMDDHHmmss") : "";
        next();
    }
    else{
        res.error("Invalid Dates provided. Valid Date format: YYYYMMDDHHmmss");
    }
    
}


const validateGetDates = (req, res, next)=> {

    console.log("Checking if all the Dates are correct in GET request!!");

    var startDate=req.query.startDate;
    var endDate=req.query.endDate;

    var isValidStartDate = startDate ? moment(startDate, 'YYYYMMDDHHmmss', true) : true;
    var isValidEndDate = endDate ? moment(endDate, 'YYYYMMDDHHmmss', true) : true;

    if(!isNaN(isValidStartDate) && isValidStartDate && !isNaN(isValidEndDate) && isValidEndDate){
        console.log("Dates are correct. Transforming them to Mongoose Compatible");
        req.body.startDate=startDate ? moment.utc(startDate, "YYYYMMDDHHmmss") : "";
        req.body.endDate=endDate ? moment.utc(endDate, "YYYYMMDDHHmmss") : "";
        next();
    }
    else{
        res.error("Invalid Dates provided. Valid Date format: YYYYMMDDHHmmss");
    }
    
}

module.exports=validatePostDates, validateGetDates;