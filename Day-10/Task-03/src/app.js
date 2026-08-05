const express = require("express");

const app = express();


app.get("/", (req,res)=>{

    res.send("Node.js Docker CI/CD Application");

});


module.exports = app;