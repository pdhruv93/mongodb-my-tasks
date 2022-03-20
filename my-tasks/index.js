require('dotenv').config();
const express=require("express");
var bodyParser = require('body-parser');
require("./src/db/connection.js");

const port=process.env.PORT || 3000;
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const taskRouter=require("./src/router/router.js");
app.use('/tasks', taskRouter);

app.listen(port, ()=>{
    console.log(`Connection Active at Port ${port}`);
})


//Swagger UI related work
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDefinition = YAML.load('./openapi.yaml');

const options = {
    swaggerDefinition,
    apis: ['./src/docs/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/tasks/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec));