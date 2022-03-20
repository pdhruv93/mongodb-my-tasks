const keycloak = require('keycloak-backend')({
    "realm": process.env.REALM,
    "auth-server-url": process.env.AUTH_SERVER_URL,
    "client_id": process.env.CLIENT_ID,
    "client_secret": process.env.CLIENT_SECRET,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD

});

const validateToken = (req, res, next)=> {
    console.log("Checking if correct Auth Token has been prvoided in request!!");
    var token = req.headers.authorization;

    if(typeof token !== 'undefined') {

        token = token.replace("Bearer ","");

        keycloak.jwt.verify(token)
        .then((response)=>{
            next();
        })
        .catch((error)=>{
            console.log("Invalid Token provided in request!!");
            res.unauthorized();
        })
    } 
    else{
        res.unauthorized();
    }
}

module.exports=validateToken;