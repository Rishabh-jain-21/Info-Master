// import ecpress from its package
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const user = require('./model/userschema');

// fetching content from eviroment variables
dotenv.config({ path: './config.env' });

//calling database connection file in-order to connect with the server
require('./db/connection');

//usually we get object as replies from anything so we told the express to convert it into json
app.use(express.json());

//using routers on auth.js 
app.use(require('./router/auth'));

const localhost = process.env.PORT;

// Middleware
// middle check that if user is authenticated or not takes three arguments (req , res , next);
// next () -> it will call next if user is authenticated
// const middleware = (req, res, next) => {
//     console.log("middleware called");
//     next();
// }

app.listen(localhost, () => {
    console.log('server started at port http://localhost:' + localhost);
});