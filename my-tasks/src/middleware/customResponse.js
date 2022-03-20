const taskRouter=require("../router/router.js");

taskRouter.use(function(req, res, next) {

    res.allOk = function(data) {
        return res.status(200).json(
            {
                "status": 200,
                "message": "OK",
                "data": [data]
            }
        );
    }

    res.created = function(createdData) {
        return res.status(201).json(
            {
                "status": 201,
                "message": "OK",
                "data": [createdData]
            }
        );
    }


    res.deleted = function(deletedData) {
        return res.status(200).json(
            {
                "status": 200,
                "message": "Deleted",
                "data": [deletedData]
            }
        );
    }


    res.error = function(errorMessage) {
        return res.status(400).json(
        {
            "status": 400,
            "message": errorMessage,
            "data": []
        })
    }

    res.notFound = function() {
        return res.status(404).json(
        {
            "status": 404,
            "message": "Nothing",
            "data": []
        })
    }


    res.unauthorized = function() {
        return res.status(401).json(
            {
                "message": "Auth Token Missing",
                "status": 401,
                "data": []
            }
        );
    }
    

    res.internal = function({errors={}, code=500, message="", result={}}) {
        return res.json({
            "status": code,
            "message": message,
            "data": []
        })
    }

    next();
})