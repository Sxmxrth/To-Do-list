const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

let items = [];

app.get("/", function(req, res){

    let today = new Date();
    let options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay : day,
        newTasks : items

    });

})

app.post("/", function(req, res){

    let item = req.body.newItem;
    items.push(item)
    res.redirect("/");
    
})

app.listen(3000, function(){
    console.log("The server is up and running on port 3000");
})