const mongoose=require("mongoose");

//DB connection
mongoose.connect("mongodb://localhost:27017/Dhruv_Hobby")
.then(()=> console.log("Successfully connected to MongoDB!!"))
.catch(err=> console.log("Error connecting to MongoDB", err));